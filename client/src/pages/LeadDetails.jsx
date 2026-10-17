import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CircleAlert,
  DollarSign,
  ExternalLink,
  FileText,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  RotateCcw,
  Save,
  Search,
  Tag,
  Target,
  Trash2,
  User,
  X,
  XCircle,
} from 'lucide-react'

import {
  deleteLead,
  fetchLead,
  updateLead,
  updateLeadStatus,
} from '../features/leads/leadsSlice.js'
import { useConfirm, useToast } from '../components/ui/UiProvider.jsx'
import { Skeleton } from '../components/ui/Skeleton.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import {
  Field,
  ProblemPicker,
  SectionTitle,
  SelectField,
  TextAreaField,
} from '../components/lead/LeadFormParts.jsx'
import {
  CONTACT_METHODS,
  LEAD_STATUSES,
  NO_EMAIL,
  PIPELINE_COLUMNS,
  PRIORITY_OPTIONS,
  PROBLEM_OPTIONS,
  SOURCE_OPTIONS,
  labelFor,
  problemLabel,
  statusLabel,
} from '../lib/leadOptions.js'
import { formatDate, moneyWhole } from '../lib/format.js'

import './css/leadDetails.css'

/* ----------------------------------------------------------------------- */
/* helpers                                                                 */
/* ----------------------------------------------------------------------- */

const toInputDate = (value) => {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0]
}

const toForm = (lead) => ({
  companyName: lead.companyName || '',
  contactName: lead.contactName || '',
  phone: lead.phone || '',
  email: lead.email || NO_EMAIL,
  website: lead.website || '',
  location: lead.location || '',
  industry: lead.industry || '',
  businessInfo: lead.businessInfo || '',

  source: lead.source || 'other',
  sourceDetails: lead.sourceDetails || '',

  status: lead.status || 'new',
  priority: lead.priority || 'medium',
  leadScore: lead.leadScore || 0,
  dealValue: lead.dealValue || 0,

  problems: Array.isArray(lead.problems) ? lead.problems : [],
  primaryProblem: lead.primaryProblem || '',

  nextAction: lead.nextAction || '',
  nextActionDate: toInputDate(lead.nextActionDate),
  preferredContactMethod: lead.preferredContactMethod || '',

  tags: Array.isArray(lead.tags) ? lead.tags : [],
  notes: lead.notes || '',
})

const externalUrl = (site) =>
  /^https?:\/\//i.test(site) ? site : `https://${site}`

const initials = (person) =>
  `${person?.firstName?.[0] || ''}${person?.lastName?.[0] || ''}`.toUpperCase() ||
  '?'

const isOverdue = (lead) => {
  if (!lead.nextActionDate) return false
  if (['approved', 'rejected'].includes(lead.status)) return false
  const due = new Date(lead.nextActionDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return due < today
}

/* ----------------------------------------------------------------------- */
/* page                                                                    */
/* ----------------------------------------------------------------------- */

export default function LeadDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const toast = useToast()

  const { items, error } = useSelector((state) => state.leads)
  const user = useSelector((state) => state.auth.user)

  const lead = items.find((item) => item._id === id)

  const [loaded, setLoaded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [movingTo, setMovingTo] = useState(null)
  const [form, setForm] = useState(null)

  // Always load this one lead (also brings the populated activity history).
  useEffect(() => {
    let alive = true
    setLoaded(false)
    setEditing(false) // never carry an open editor over to a different lead
    dispatch(fetchLead(id)).then(() => alive && setLoaded(true))
    return () => {
      alive = false
    }
  }, [dispatch, id])

  const canEdit =
    user?.role === 'admin' ||
    user?.role === 'manager' ||
    user?.permissions?.includes('lead:update')

  const canDelete =
    user?.role === 'admin' || user?.permissions?.includes('lead:delete')

  /* ------------------------------ actions ------------------------------ */

  const startEdit = () => {
    setForm(toForm(lead))
    setEditing(true)
  }

  const change = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const toggleProblem = (value) =>
    setForm((current) => ({
      ...current,
      problems: current.problems.includes(value)
        ? current.problems.filter((p) => p !== value)
        : [...current.problems, value],
    }))

  const changeTags = (event) =>
    setForm((current) => ({
      ...current,
      tags: event.target.value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }))

  const moveTo = async (status) => {
    if (!lead || lead.status === status || movingTo) return

    setMovingTo(status)

    try {
      await dispatch(updateLeadStatus({ id, status })).unwrap()
      toast.success(`Status changed to ${statusLabel(status)}.`)
      dispatch(fetchLead(id)) // refresh the activity history
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Could not change the status.')
    } finally {
      setMovingTo(null)
    }
  }

  const save = async (event) => {
    event.preventDefault()
    setSaving(true)

    const statusChanged = form.status !== lead.status

    // Only the fields this screen edits. Status goes through its own endpoint
    // so the change is logged and a closing date is set when approved.
    const { status, ...rest } = form
    const problems = form.problems || []

    const payload = {
      ...rest,
      email: form.email.trim() || NO_EMAIL,
      leadScore: Number(form.leadScore || 0),
      dealValue: Number(form.dealValue || 0),
      problems,
      primaryProblem: problems.includes(form.primaryProblem)
        ? form.primaryProblem
        : problems[0] || '',
      nextActionDate: form.nextActionDate || null,
    }

    const result = await dispatch(updateLead({ id, data: payload }))

    if (!updateLead.fulfilled.match(result)) {
      setSaving(false)
      toast.error(result.payload || 'Could not save the lead.')
      return
    }

    if (statusChanged) {
      await dispatch(updateLeadStatus({ id, status }))
    }

    dispatch(fetchLead(id))
    setSaving(false)
    setEditing(false)
    toast.success('Lead saved.')
  }

  const remove = async () => {
    const confirmed = await confirm({
      title: `Delete ${lead.companyName}?`,
      message: 'The lead will be permanently deleted. This cannot be undone.',
      confirmLabel: 'Delete lead',
      tone: 'danger',
    })

    if (!confirmed) return

    const result = await dispatch(deleteLead(id))

    if (deleteLead.fulfilled.match(result)) {
      toast.success('Lead deleted.')
      navigate('/leads')
    } else {
      toast.error(result.payload || 'Could not delete the lead.')
    }
  }

  /* ------------------------------- states ------------------------------ */

  if (!lead && !loaded) {
    return (
      <div className="ld">
        <Skeleton width={140} height={14} />
        <div style={{ margin: '22px 0' }}>
          <Skeleton width="38%" height={34} />
        </div>
        <Skeleton height={90} radius={16} />
        <div style={{ marginTop: 16 }}>
          <Skeleton height={320} radius={16} />
        </div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="ld">
        <EmptyState
          tone="error"
          icon={Building2}
          title="Lead not found"
          message={
            error ||
            'This lead may have been deleted, or you may not have permission to view it.'
          }
          action={
            <Link to="/leads" className="ui-btn ui-btn--primary">
              <ArrowLeft size={16} />
              Back to leads
            </Link>
          }
        />
      </div>
    )
  }

  const isRejected = lead.status === 'rejected'
  const currentStep = PIPELINE_COLUMNS.findIndex((c) => c.id === lead.status)
  const hasEmail = lead.email && lead.email !== NO_EMAIL
  const activities = [...(lead.activities || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8)

  /* -------------------------------- page ------------------------------- */

  return (
    <div className="ld">
      {/* ---------------------------- header ---------------------------- */}

      <header className="ld-header">
        <div className="ld-header__main">
          <Link to="/leads" className="ld-back">
            <ArrowLeft size={15} />
            All leads
          </Link>

          <div className="ld-title">
            <div className="ld-title__icon">
              <Building2 size={24} />
            </div>

            <div>
              <h1>{lead.companyName}</h1>

              <p>
                {lead.contactName ? `${lead.contactName} · ` : ''}
                {lead.location || 'No location'}
              </p>
            </div>

            <span className={`ld-badge ld-badge--${lead.status}`}>
              {statusLabel(lead.status)}
            </span>
          </div>
        </div>

        {!editing && (
          <div className="ld-actions">
            {canEdit && (
              <button type="button" className="ui-btn ui-btn--ghost" onClick={startEdit}>
                <Pencil size={15} />
                Edit lead
              </button>
            )}

            {canDelete && (
              <button type="button" className="ui-btn ui-btn--danger" onClick={remove}>
                <Trash2 size={15} />
                Delete
              </button>
            )}
          </div>
        )}
      </header>

      {/* ------------------------ status tracker ------------------------ */}

      <section className="ld-card ld-status" aria-label="Lead status">
        <div className="ld-status__head">
          <div>
            <span className="ld-eyebrow">Status</span>
            <h2>{statusLabel(lead.status)}</h2>
          </div>

          {canEdit && !editing && !isRejected && (
            <button
              type="button"
              className="ld-reject"
              onClick={() => moveTo('rejected')}
              disabled={Boolean(movingTo)}
            >
              <XCircle size={15} />
              Mark as rejected
            </button>
          )}
        </div>

        {isRejected ? (
          <div className="ld-rejected" role="status">
            <AlertTriangle size={18} />

            <div>
              <strong>This lead was rejected.</strong>
              <span>It is hidden from the sales pipeline board.</span>
            </div>

            {canEdit && !editing && (
              <button
                type="button"
                className="ui-btn ui-btn--ghost"
                onClick={() => moveTo('new')}
                disabled={Boolean(movingTo)}
              >
                <RotateCcw size={15} />
                Reopen as New
              </button>
            )}
          </div>
        ) : (
          <ol className="ld-steps">
            {PIPELINE_COLUMNS.map((step, index) => {
              const state =
                index < currentStep
                  ? 'done'
                  : index === currentStep
                    ? 'current'
                    : 'todo'

              return (
                <li key={step.id}>
                  <button
                    type="button"
                    className={`ld-step ld-step--${state}`}
                    onClick={() => moveTo(step.id)}
                    disabled={!canEdit || editing || Boolean(movingTo)}
                    aria-current={state === 'current' ? 'step' : undefined}
                    title={canEdit ? `Set status to ${step.title}` : undefined}
                  >
                    <span className="ld-step__dot">
                      {state === 'done' ? <Check size={13} strokeWidth={3} /> : index + 1}
                    </span>

                    <span className="ld-step__text">
                      <strong>{step.title}</strong>
                      <small>{step.description}</small>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        )}
      </section>

      {/* ---------------------------- edit mode ---------------------------- */}

      {editing && form ? (
        <form className="lead-form-card ld-form" onSubmit={save}>
          <div className="form-section">
            <SectionTitle
              icon={<Building2 size={18} />}
              title="Business information"
              description="Basic information about the company and contact."
            />

            <div className="lead-form-grid">
              <Field label="Company name" required icon={<Building2 size={17} />}>
                <input name="companyName" value={form.companyName} onChange={change} required />
              </Field>

              <Field label="Contact name" icon={<User size={17} />}>
                <input name="contactName" value={form.contactName} onChange={change} />
              </Field>

              <Field label="Phone number" required icon={<Phone size={17} />}>
                <input name="phone" value={form.phone} onChange={change} required />
              </Field>

              <Field label="Email address" required icon={<Mail size={17} />}>
                <input type="email" name="email" value={form.email} onChange={change} required />
              </Field>

              <Field label="Website" icon={<Globe size={17} />}>
                <input name="website" value={form.website} onChange={change} placeholder="https://example.com" />
              </Field>

              <Field label="Location" icon={<MapPin size={17} />}>
                <input name="location" value={form.location} onChange={change} />
              </Field>

              <Field label="Industry" icon={<Briefcase size={17} />}>
                <input name="industry" value={form.industry} onChange={change} />
              </Field>
            </div>

            <TextAreaField
              label="Business information"
              name="businessInfo"
              value={form.businessInfo}
              onChange={change}
            />
          </div>

          <div className="form-section">
            <SectionTitle
              icon={<Search size={18} />}
              title="Lead source"
              description="Where the sales team discovered this business."
            />

            <div className="lead-form-grid">
              <SelectField
                label="Where did you find this business?"
                name="source"
                value={form.source}
                onChange={change}
                options={SOURCE_OPTIONS}
              />

              <Field label="Source details" icon={<FileText size={17} />}>
                <input name="sourceDetails" value={form.sourceDetails} onChange={change} />
              </Field>
            </div>
          </div>

          <div className="form-section">
            <SectionTitle
              icon={<Target size={18} />}
              title="Status & priority"
              description="Where this lead stands right now."
            />

            <div className="lead-form-grid">
              <SelectField
                label="Lead status"
                name="status"
                value={form.status}
                onChange={change}
                options={LEAD_STATUSES.map((s) => [s.value, s.label])}
              />

              <SelectField
                label="Priority"
                name="priority"
                value={form.priority}
                onChange={change}
                options={PRIORITY_OPTIONS}
              />

              <Field label="Lead score" icon={<Target size={17} />}>
                <input type="number" min="0" name="leadScore" value={form.leadScore} onChange={change} />
              </Field>

              <Field label="Deal value" icon={<DollarSign size={17} />}>
                <input type="number" min="0" name="dealValue" value={form.dealValue} onChange={change} />
              </Field>
            </div>
          </div>

          <div className="form-section">
            <SectionTitle
              icon={<CircleAlert size={18} />}
              title="Business problems"
              description="Identify the problems your sales team discovered."
            />

            <ProblemPicker selected={form.problems} onToggle={toggleProblem} />

            {form.problems.some(
              (p) => !PROBLEM_OPTIONS.some((o) => o.value === p),
            ) && (
              <p className="ld-legacy-note">
                This lead also has older problems recorded (
                {form.problems
                  .filter((p) => !PROBLEM_OPTIONS.some((o) => o.value === p))
                  .map(problemLabel)
                  .join(', ')}
                ). They are kept as they are.
              </p>
            )}
          </div>

          <div className="form-section">
            <SectionTitle
              icon={<Calendar size={18} />}
              title="Next action"
              description="Make sure every lead has a clear next step."
            />

            <div className="lead-form-grid">
              <Field label="Next action" icon={<Target size={17} />}>
                <input name="nextAction" value={form.nextAction} onChange={change} />
              </Field>

              <Field label="Follow-up date" icon={<Calendar size={17} />}>
                <input type="date" name="nextActionDate" value={form.nextActionDate} onChange={change} />
              </Field>

              <SelectField
                label="Preferred contact method"
                name="preferredContactMethod"
                value={form.preferredContactMethod}
                onChange={change}
                options={[['', 'Select method'], ...CONTACT_METHODS]}
              />
            </div>
          </div>

          <div className="form-section">
            <SectionTitle
              icon={<FileText size={18} />}
              title="Sales notes"
              description="Add anything important for the sales team."
            />

            <TextAreaField label="Notes" name="notes" value={form.notes} onChange={change} rows={6} />

            <div className="lead-field">
              <label>Tags</label>

              <div className="input-wrapper">
                <Tag size={17} />
                <input
                  value={form.tags.join(', ')}
                  onChange={changeTags}
                  placeholder="hot-lead, local-business, redesign"
                />
              </div>

              <small className="field-help">Separate tags with commas.</small>
            </div>
          </div>

          <div className="lead-form-footer">
            <div className="required-note">
              <span>*</span> Required fields
            </div>

            <div className="lead-form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setEditing(false)}
                disabled={saving}
              >
                <X size={16} />
                Cancel
              </button>

              <button type="submit" className="primary-btn" disabled={saving}>
                <Save size={16} />
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          {/* ------------------------- quick facts ------------------------- */}

          <div className="ld-facts">
            <Fact label="Priority" value={labelFor(PRIORITY_OPTIONS, lead.priority)} tone={lead.priority} />
            <Fact label="Lead score" value={`${Number(lead.leadScore || 0)} pts`} />
            <Fact
              label="Deal value"
              value={Number(lead.dealValue) > 0 ? moneyWhole(lead.dealValue) : '—'}
            />
            <Fact
              label="Follow-up"
              value={formatDate(lead.nextActionDate, 'Not set')}
              flag={isOverdue(lead) ? 'Overdue' : null}
            />
            <Fact label="Created" value={formatDate(lead.createdAt)} />
          </div>

          <div className="ld-grid">
            <div className="ld-col">
              {/* contact */}
              <section className="ld-card">
                <h2 className="ld-card__title">
                  <User size={17} /> Contact
                </h2>

                <dl className="ld-list">
                  <Row icon={<User size={16} />} label="Contact">
                    {lead.contactName || <Muted>Not provided</Muted>}
                  </Row>

                  <Row icon={<Phone size={16} />} label="Phone">
                    {lead.phone ? (
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                    ) : (
                      <Muted>Not provided</Muted>
                    )}
                  </Row>

                  <Row icon={<Mail size={16} />} label="Email">
                    {hasEmail ? (
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    ) : (
                      <Muted>No email on file</Muted>
                    )}
                  </Row>

                  <Row icon={<Globe size={16} />} label="Website">
                    {lead.website ? (
                      <a href={externalUrl(lead.website)} target="_blank" rel="noopener noreferrer">
                        {lead.website.replace(/^https?:\/\//i, '')}
                        <ExternalLink size={13} />
                      </a>
                    ) : (
                      <Muted>No website</Muted>
                    )}
                  </Row>

                  <Row icon={<MapPin size={16} />} label="Location">
                    {lead.location || <Muted>Not provided</Muted>}
                  </Row>

                  <Row icon={<Briefcase size={16} />} label="Industry">
                    {lead.industry || <Muted>Not provided</Muted>}
                  </Row>
                </dl>

                {lead.businessInfo && (
                  <div className="ld-text">
                    <span>About the business</span>
                    <p>{lead.businessInfo}</p>
                  </div>
                )}
              </section>

              {/* problems */}
              <section className="ld-card">
                <h2 className="ld-card__title">
                  <CircleAlert size={17} /> Business problems
                </h2>

                {lead.problems?.length > 0 ? (
                  <ul className="ld-problems">
                    {lead.problems.map((problem) => {
                      const known = PROBLEM_OPTIONS.find((p) => p.value === problem)

                      return (
                        <li key={problem}>
                          <strong>{problemLabel(problem)}</strong>
                          {known && <small>{known.hint}</small>}
                          {lead.problems.length > 1 && problem === lead.primaryProblem && (
                            <span className="ld-primary">Primary</span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="ld-empty">No problems recorded for this lead.</p>
                )}
              </section>

              {/* notes */}
              <section className="ld-card">
                <h2 className="ld-card__title">
                  <FileText size={17} /> Notes
                </h2>

                {lead.notes ? (
                  <p className="ld-notes">{lead.notes}</p>
                ) : (
                  <p className="ld-empty">No notes have been added.</p>
                )}

                {lead.tags?.length > 0 && (
                  <ul className="ld-tags">
                    {lead.tags.map((tag) => (
                      <li key={tag}>
                        <Tag size={12} />
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <aside className="ld-col">
              {/* owner */}
              <section className="ld-card">
                <h2 className="ld-card__title">Sales owner</h2>

                <div className="ld-owner">
                  <div className="ld-owner__avatar">
                    {lead.salesPerson?.profilePicture ? (
                      <img src={lead.salesPerson.profilePicture} alt="" />
                    ) : (
                      initials(lead.salesPerson)
                    )}
                  </div>

                  <div>
                    <strong>
                      {lead.salesPerson?.firstName} {lead.salesPerson?.lastName}
                    </strong>
                    <span>{lead.salesPerson?.email || 'Sales team'}</span>
                  </div>
                </div>
              </section>

              {/* next action */}
              <section className="ld-card">
                <h2 className="ld-card__title">
                  <Calendar size={17} /> Next action
                </h2>

                {lead.nextAction ? (
                  <>
                    <p className="ld-next">{lead.nextAction}</p>
                    <p className="ld-next__date">
                      {formatDate(lead.nextActionDate, 'No date set')}
                      {isOverdue(lead) && <span className="ld-overdue">Overdue</span>}
                    </p>
                  </>
                ) : (
                  <p className="ld-empty">No next action planned.</p>
                )}

                <p className="ld-next__pref">
                  Prefers: {labelFor(CONTACT_METHODS, lead.preferredContactMethod, 'no preference')}
                </p>
              </section>

              {/* source */}
              <section className="ld-card">
                <h2 className="ld-card__title">
                  <Search size={17} /> Lead source
                </h2>

                <dl className="ld-list ld-list--tight">
                  <Row label="Source">{labelFor(SOURCE_OPTIONS, lead.source, 'Other')}</Row>
                  <Row label="Details">
                    {lead.sourceDetails || <Muted>None</Muted>}
                  </Row>
                  <Row label="Updated">{formatDate(lead.updatedAt)}</Row>
                </dl>
              </section>

              {/* activity */}
              {activities.length > 0 && (
                <section className="ld-card">
                  <h2 className="ld-card__title">
                    <Activity size={17} /> Recent activity
                  </h2>

                  <ol className="ld-activity">
                    {activities.map((item, index) => (
                      <li key={item._id || index}>
                        <p>{item.description || item.type}</p>
                        <small>
                          {item.createdBy?.firstName
                            ? `${item.createdBy.firstName} · `
                            : ''}
                          {formatDate(item.createdAt)}
                        </small>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </aside>
          </div>
        </>
      )}
    </div>
  )
}

/* ----------------------------------------------------------------------- */
/* small presentational pieces                                             */
/* ----------------------------------------------------------------------- */

function Fact({ label, value, flag, tone }) {
  return (
    <div className="ld-fact">
      <span>{label}</span>
      <strong className={tone ? `ld-tone ld-tone--${tone}` : undefined}>
        {value}
      </strong>
      {flag && <em className="ld-overdue">{flag}</em>}
    </div>
  )
}

function Row({ icon, label, children }) {
  return (
    <div className="ld-row">
      <dt>
        {icon}
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  )
}

function Muted({ children }) {
  return <span className="ld-muted">{children}</span>
}
