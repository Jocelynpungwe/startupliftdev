import React, { useEffect, useState } from 'react'
import { Link, Links, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  ArrowLeft,
  Building2,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  BriefcaseBusiness,
  Search,
  Target,
  CircleAlert,
  DollarSign,
  Calendar,
  Clock,
  MessageSquare,
  Tag,
  FileText,
  Pencil,
  Trash2,
  Save,
  X,
  ChevronDown,
  Activity,
  CheckCircle2,
} from 'lucide-react'

import {
  fetchLeads,
  updateLead,
  deleteLead,
} from '../features/leads/leadsSlice.js'

import './css/leadDetails.css'

/*
|--------------------------------------------------------------------------
| SALES STAGES
|--------------------------------------------------------------------------
*/

const stages = [
  'new',
  'contacted',
  'qualified',
  'discovery',
  'solution-presented',
  'proposal',
  'negotiation',
  'won',
  'lost',
  'nurture',
]

const stageLabels = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  discovery: 'Discovery',
  'solution-presented': 'Solution Presented',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
  nurture: 'Nurture',
}

/*
|--------------------------------------------------------------------------
| PROBLEMS
|--------------------------------------------------------------------------
*/

const problemOptions = [
  {
    value: 'no-website',
    label: 'No website',
  },
  {
    value: 'outdated-website',
    label: 'Outdated website',
  },
  {
    value: 'broken-link',
    label: 'Website link not working',
  },
  {
    value: 'poor-mobile-experience',
    label: 'Poor mobile experience',
  },
  {
    value: 'poor-seo',
    label: 'Poor SEO / difficult to find',
  },
  {
    value: 'no-booking-system',
    label: 'No booking system',
  },
  {
    value: 'no-quote-system',
    label: 'No quote/request system',
  },
  {
    value: 'slow-website',
    label: 'Slow website',
  },
  {
    value: 'poor-user-experience',
    label: 'Poor user experience',
  },
  {
    value: 'weak-online-presence',
    label: 'Weak online presence',
  },
  {
    value: 'broken-forms',
    label: 'Broken contact forms',
  },
  {
    value: 'poor-conversion',
    label: 'Website not converting visitors',
  },
]

/*
|--------------------------------------------------------------------------
| SERVICES
|--------------------------------------------------------------------------
*/

const serviceOptions = [
  'Website Development',
  'Website Redesign',
  'Web Application',
  'SEO',
  'Local SEO',
  'Digital Marketing',
  'Website Maintenance',
  'Hosting',
  'E-commerce',
  'Booking System',
  'Custom Software',
]

/*
|--------------------------------------------------------------------------
| SOURCES
|--------------------------------------------------------------------------
*/

const sourceOptions = [
  ['google-maps', 'Google Maps'],
  ['google-search', 'Google Search'],
  ['facebook', 'Facebook'],
  ['instagram', 'Instagram'],
  ['linkedin', 'LinkedIn'],
  ['referral', 'Referral'],
  ['website', 'Website'],
  ['cold-call', 'Cold Call'],
  ['email', 'Email'],
  ['advertisement', 'Advertisement'],
  ['networking', 'Networking'],
  ['other', 'Other'],
]

/*
|--------------------------------------------------------------------------
| STATUS
|--------------------------------------------------------------------------
*/

const statusOptions = [
  ['new', 'New'],
  ['pending', 'Pending'],
  ['approved', 'Approved'],
  ['rejected', 'Rejected'],
]

/*
|--------------------------------------------------------------------------
| CONTACT METHODS
|--------------------------------------------------------------------------
*/

const contactMethods = [
  ['', 'Select method'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['sms', 'SMS'],
  ['facebook', 'Facebook'],
  ['instagram', 'Instagram'],
  ['linkedin', 'LinkedIn'],
  ['other', 'Other'],
]

/*
|--------------------------------------------------------------------------
| MAIN COMPONENT
|--------------------------------------------------------------------------
*/

function LeadDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { items, loading, error } = useSelector((state) => state.leads)

  const user = useSelector((state) => state.auth.user)

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  /*
  |--------------------------------------------------------------------------
  | FORM
  |--------------------------------------------------------------------------
  */

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    website: '',
    location: '',
    industry: '',
    businessInfo: '',

    source: 'other',
    sourceDetails: '',

    stage: 'new',
    status: 'new',

    priority: 'medium',
    leadScore: 0,

    primaryProblem: '',
    problems: [],

    needs: '',
    goals: '',
    targetAudience: '',
    currentSolution: '',
    painPoints: '',

    budget: 0,
    timeline: '',

    service: '',
    services: [],
    dealValue: 0,
    probability: 0,

    nextAction: '',
    nextActionDate: '',
    preferredContactMethod: '',

    tags: [],
    notes: '',
  })

  /*
  |--------------------------------------------------------------------------
  | FIND LEAD
  |--------------------------------------------------------------------------
  */

  const lead = items.find((item) => item._id === id)

  /*
  |--------------------------------------------------------------------------
  | LOAD LEAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!lead) {
      dispatch(fetchLeads())
    }
  }, [dispatch, lead])

  /*
  |--------------------------------------------------------------------------
  | LOAD LEAD INTO FORM
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!lead) return

    setFormData({
      companyName: lead.companyName || '',
      contactName: lead.contactName || '',
      phone: lead.phone || '',
      email: lead.email || '',
      website: lead.website || '',
      location: lead.location || '',
      industry: lead.industry || '',
      businessInfo: lead.businessInfo || '',

      source: lead.source || 'other',
      sourceDetails: lead.sourceDetails || '',

      stage: lead.stage || 'new',
      status: lead.status || 'new',

      priority: lead.priority || 'medium',
      leadScore: lead.leadScore || 0,

      primaryProblem: lead.primaryProblem || '',
      problems: Array.isArray(lead.problems) ? lead.problems : [],

      needs: lead.needs || '',
      goals: lead.goals || '',
      targetAudience: lead.targetAudience || '',
      currentSolution: lead.currentSolution || '',
      painPoints: lead.painPoints || '',

      budget: lead.budget || 0,
      timeline: lead.timeline || '',

      service: lead.service || '',
      services: Array.isArray(lead.services) ? lead.services : [],
      dealValue: lead.dealValue || 0,
      probability: lead.probability || 0,

      nextAction: lead.nextAction || '',
      nextActionDate: formatDateForInput(lead.nextActionDate),
      preferredContactMethod: lead.preferredContactMethod || '',

      tags: Array.isArray(lead.tags) ? lead.tags : [],
      notes: lead.notes || '',
    })
  }, [lead])

  /*
  |--------------------------------------------------------------------------
  | PERMISSIONS
  |--------------------------------------------------------------------------
  */

  const canEdit =
    user?.role === 'admin' ||
    user?.role === 'manager' ||
    user?.permissions?.includes('lead:update')

  const canDelete =
    user?.role === 'admin' || user?.permissions?.includes('lead:delete')

  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  /*
  |--------------------------------------------------------------------------
  | PROBLEM TOGGLE
  |--------------------------------------------------------------------------
  */

  const toggleProblem = (problem) => {
    setFormData((current) => {
      const exists = current.problems.includes(problem)

      return {
        ...current,
        problems: exists
          ? current.problems.filter((item) => item !== problem)
          : [...current.problems, problem],
      }
    })
  }

  /*
  |--------------------------------------------------------------------------
  | SERVICE TOGGLE
  |--------------------------------------------------------------------------
  */

  const toggleService = (service) => {
    setFormData((current) => {
      const exists = current.services.includes(service)

      return {
        ...current,
        services: exists
          ? current.services.filter((item) => item !== service)
          : [...current.services, service],
      }
    })
  }

  /*
  |--------------------------------------------------------------------------
  | TAGS
  |--------------------------------------------------------------------------
  */

  const updateTags = (event) => {
    const value = event.target.value

    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    setFormData((current) => ({
      ...current,
      tags,
    }))
  }

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  */

  const handleSave = async (event) => {
    event.preventDefault()

    setSaving(true)

    const payload = {
      ...formData,

      leadScore: Number(formData.leadScore || 0),
      budget: Number(formData.budget || 0),
      dealValue: Number(formData.dealValue || 0),
      probability: Number(formData.probability || 0),

      problems: formData.problems || [],
      services: formData.services || [],
      tags: formData.tags || [],

      nextActionDate: formData.nextActionDate || null,
    }

    const result = await dispatch(
      updateLead({
        id,
        data: payload,
      }),
    )

    setSaving(false)

    if (updateLead.fulfilled.match(result)) {
      setEditing(false)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${lead.companyName}? This cannot be undone.`,
    )

    if (!confirmed) return

    const result = await dispatch(deleteLead(id))

    if (deleteLead.fulfilled.match(result)) {
      navigate('/leads')
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading && !lead) {
    return (
      <div className="lead-details-page">
        <div className="lead-details-loading">
          <div className="details-loading-spinner"></div>
          <span>Loading lead...</span>
        </div>
      </div>
    )
  }

  /*
  |--------------------------------------------------------------------------
  | NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!lead) {
    return (
      <div className="lead-details-page">
        <div className="lead-details-not-found">
          <Building2 size={40} />

          <h2>Lead not found</h2>

          <p>
            This lead may have been deleted or you may not have permission to
            view it.
          </p>

          <Link to="/leads" className="primary-btn">
            <ArrowLeft size={16} />
            Back to Leads
          </Link>
        </div>
      </div>
    )
  }

  const currentStageIndex = stages.indexOf(lead.stage)

  /*
  |--------------------------------------------------------------------------
  | PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <div className="lead-details-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="lead-details-header">
        <div>
          <Link to="/leads" className="back-to-leads">
            <ArrowLeft size={16} />
            Back to Leads
          </Link>

          <div className="lead-details-title">
            <div className="lead-details-company-icon">
              <Building2 size={25} />
            </div>

            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot"></span>
                SALES PIPELINE
              </div>

              <h1>{lead.companyName}</h1>

              <p>
                {lead.contactName ? `${lead.contactName} • ` : ''}
                {lead.location || 'Location not provided'}
              </p>
            </div>
          </div>
        </div>

        <div className="lead-details-actions">
          {canEdit && !editing && (
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setEditing(true)}
            >
              <Pencil size={16} />
              Edit Lead
            </button>
          )}

          {canDelete && (
            <button type="button" className="danger-btn" onClick={handleDelete}>
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* =====================================================
          QUICK STATS
      ===================================================== */}

      <div className="lead-detail-stats">
        <DetailStat
          icon={<DollarSign size={18} />}
          label="Deal Value"
          value={`$${Number(lead.dealValue || 0).toLocaleString()}`}
        />

        <DetailStat
          icon={<Target size={18} />}
          label="Lead Score"
          value={`${Number(lead.leadScore || 0)} pts`}
        />

        <DetailStat
          icon={<Activity size={18} />}
          label="Probability"
          value={`${Number(lead.probability || 0)}%`}
        />

        <DetailStat
          icon={<CircleAlert size={18} />}
          label="Priority"
          value={capitalize(lead.priority)}
        />

        <DetailStat
          icon={<CheckCircle2 size={18} />}
          label="Status"
          value={capitalize(lead.status)}
        />
      </div>

      {/* =====================================================
          SALES STAGE
      ===================================================== */}

      <section className="lead-stage-panel">
        <div className="stage-panel-heading">
          <div>
            <span className="section-label">SALES STAGE</span>

            <h2>{stageLabels[lead.stage] || 'New'}</h2>
          </div>

          <span className={`lead-status-badge ${lead.status}`}>
            {capitalize(lead.status)}
          </span>
        </div>

        <div className="stage-progress">
          {stages.map((stage, index) => {
            const completed =
              currentStageIndex >= 0 && index <= currentStageIndex

            return (
              <div
                key={stage}
                className={`stage-step ${
                  completed ? 'completed' : ''
                } ${stage === lead.stage ? 'current' : ''}`}
              >
                <span></span>

                <small>{stageLabels[stage]}</small>
              </div>
            )
          })}
        </div>
      </section>

      {/* =====================================================
          EDIT MODE
      ===================================================== */}

      {editing ? (
        <form className="lead-details-edit-form" onSubmit={handleSave}>
          {/* BUSINESS */}

          <DetailsSection
            icon={<Building2 size={18} />}
            title="Business information"
            description="Update the company and contact information."
          >
            <div className="details-form-grid">
              <InputField
                label="Company name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />

              <InputField
                label="Contact name"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
              />

              <InputField
                label="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputField
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />

              <InputField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />

              <InputField
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>

            <TextArea
              label="Business information"
              name="businessInfo"
              value={formData.businessInfo}
              onChange={handleChange}
              rows={5}
            />
          </DetailsSection>

          {/* SOURCE */}

          <DetailsSection
            icon={<Search size={18} />}
            title="Lead source"
            description="Where did the sales team discover this business?"
          >
            <div className="details-form-grid">
              <SelectField
                label="Lead source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                options={sourceOptions}
              />

              <InputField
                label="Source details"
                name="sourceDetails"
                value={formData.sourceDetails}
                onChange={handleChange}
              />
            </div>
          </DetailsSection>

          {/* PIPELINE */}

          <DetailsSection
            icon={<Target size={18} />}
            title="Sales pipeline"
            description="Manage the current position of the opportunity."
          >
            <div className="details-form-grid">
              <SelectField
                label="Sales stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                options={stages.map((stage) => [stage, stageLabels[stage]])}
              />

              <SelectField
                label="Lead status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
              />

              <SelectField
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                options={[
                  ['critical', 'Critical'],
                  ['high', 'High'],
                  ['medium', 'Medium'],
                  ['low', 'Low'],
                ]}
              />

              <InputField
                label="Lead score"
                name="leadScore"
                type="number"
                value={formData.leadScore}
                onChange={handleChange}
              />
            </div>
          </DetailsSection>

          {/* PROBLEMS */}

          <DetailsSection
            icon={<CircleAlert size={18} />}
            title="Business problems"
            description="Problems identified during lead research or discovery."
          >
            <div className="problem-grid details-problem-grid">
              {problemOptions.map((problem) => (
                <label
                  key={problem.value}
                  className={`problem-option ${
                    formData.problems.includes(problem.value) ? 'selected' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.problems.includes(problem.value)}
                    onChange={() => toggleProblem(problem.value)}
                  />

                  <span className="problem-checkbox"></span>

                  <span>{problem.label}</span>
                </label>
              ))}
            </div>

            <div className="details-form-grid">
              <SelectField
                label="Primary problem"
                name="primaryProblem"
                value={formData.primaryProblem}
                onChange={handleChange}
                options={[
                  ['', 'Select primary problem'],
                  ...problemOptions.map((problem) => [
                    problem.value,
                    problem.label,
                  ]),
                ]}
              />
            </div>
          </DetailsSection>

          {/* NEED ANALYSIS */}

          <DetailsSection
            icon={<MessageSquare size={18} />}
            title="Need analysis"
            description="Understand what the prospect needs and wants."
          >
            <div className="details-form-grid">
              <TextArea
                label="Script Start"
                name="needs"
                value={formData.needs}
                onChange={handleChange}
              />

              <TextArea
                label="What is the problem?"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
              />

              <TextArea
                label="What can we do?"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
              />

              <TextArea
                label="How are we going to do that?"
                name="currentSolution"
                value={formData.currentSolution}
                onChange={handleChange}
              />

              <TextArea
                label="Try Close"
                name="painPoints"
                value={formData.painPoints}
                onChange={handleChange}
              />
            </div>
          </DetailsSection>

          {/* OPPORTUNITY */}

          <DetailsSection
            icon={<DollarSign size={18} />}
            title="Opportunity"
            description="Financial information and services of interest."
          >
            <div className="details-form-grid">
              <InputField
                label="Budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
              />

              <InputField
                label="Estimated deal value"
                name="dealValue"
                type="number"
                value={formData.dealValue}
                onChange={handleChange}
              />

              <InputField
                label="Probability (%)"
                name="probability"
                type="number"
                value={formData.probability}
                onChange={handleChange}
              />

              <InputField
                label="Expected timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
              />
            </div>

            <div className="details-subsection">
              <label>Services of interest</label>

              <div className="service-grid">
                {serviceOptions.map((service) => (
                  <label
                    key={service}
                    className={`service-option ${
                      formData.services.includes(service) ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => toggleService(service)}
                    />

                    <span className="service-checkbox">
                      {formData.services.includes(service) ? '✓' : ''}
                    </span>

                    {service}
                  </label>
                ))}
              </div>
            </div>
          </DetailsSection>

          {/* FOLLOW UP */}

          <DetailsSection
            icon={<Calendar size={18} />}
            title="Next action"
            description="Make sure this opportunity has a clear next step."
          >
            <div className="details-form-grid">
              <InputField
                label="Next action"
                name="nextAction"
                value={formData.nextAction}
                onChange={handleChange}
              />

              <InputField
                label="Follow-up date"
                name="nextActionDate"
                type="date"
                value={formData.nextActionDate}
                onChange={handleChange}
              />

              <SelectField
                label="Preferred contact method"
                name="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={handleChange}
                options={contactMethods}
              />
            </div>
          </DetailsSection>

          {/* NOTES */}

          <DetailsSection
            icon={<FileText size={18} />}
            title="Sales notes"
            description="Important information for the sales team."
          >
            <TextArea
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={7}
            />

            <div className="details-field">
              <label>Tags</label>

              <div className="details-input-wrapper">
                <Tag size={17} />

                <input
                  value={formData.tags.join(', ')}
                  onChange={updateTags}
                  placeholder="hot-lead, local-business, redesign"
                />
              </div>

              <small>Separate tags with commas.</small>
            </div>
          </DetailsSection>

          {/* EDIT ACTIONS */}

          <div className="lead-details-edit-actions">
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

              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* =====================================================
              VIEW MODE
          ===================================================== */}

          <div className="lead-details-content">
            <main className="lead-details-main">
              {/* CONTACT */}

              <DetailsSection
                icon={<User size={18} />}
                title="Contact information"
                description="Primary business and contact details."
              >
                <div className="details-info-grid">
                  <InfoItem
                    icon={<User size={18} />}
                    label="Contact"
                    value={lead.contactName || 'Not provided'}
                  />

                  <InfoItem
                    icon={<Phone size={18} />}
                    label="Phone"
                    value={lead.phone || 'Not provided'}
                  />

                  <InfoItem
                    icon={<Mail size={18} />}
                    label="Email"
                    value={lead.email || 'Not provided'}
                  />

                  <Link to={lead.website} target="_">
                    <InfoItem
                      icon={<Globe size={18} />}
                      label="Website"
                      value={lead.website || 'No website'}
                    />
                  </Link>

                  <InfoItem
                    icon={<MapPin size={18} />}
                    label="Location"
                    value={lead.location || 'Not provided'}
                  />

                  <InfoItem
                    icon={<BriefcaseBusiness size={18} />}
                    label="Industry"
                    value={lead.industry || 'Not provided'}
                  />
                </div>

                <DetailText
                  label="Business information"
                  value={lead.businessInfo}
                  empty="No business information has been added."
                />
              </DetailsSection>

              {/* SOURCE */}

              <DetailsSection
                icon={<Search size={18} />}
                title="Lead source"
                description="How this business entered the sales pipeline."
              >
                <div className="details-info-grid">
                  <InfoItem
                    icon={<Search size={18} />}
                    label="Source"
                    value={formatSource(lead.source)}
                  />

                  <InfoItem
                    icon={<FileText size={18} />}
                    label="Source details"
                    value={lead.sourceDetails || 'No details'}
                  />
                </div>
              </DetailsSection>

              {/* PROBLEMS */}

              <DetailsSection
                icon={<CircleAlert size={18} />}
                title="Business problems"
                description="Problems identified for this lead."
              >
                {lead.problems?.length > 0 ? (
                  <div className="details-tag-list">
                    {lead.problems.map((problem) => (
                      <span key={problem} className="detail-problem-tag">
                        {getProblemLabel(problem)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <EmptyText text="No problems have been identified." />
                )}

                <div className="detail-highlight">
                  <span>Primary problem</span>

                  <strong>{getProblemLabel(lead.primaryProblem)}</strong>
                </div>
              </DetailsSection>

              {/* NEED ANALYSIS */}

              <DetailsSection
                icon={<MessageSquare size={18} />}
                title="Need analysis"
                description="What the prospect needs and what they are trying to achieve."
              >
                <div className="detail-text-grid">
                  <DetailText
                    label="Script Start"
                    value={lead.needs}
                    empty="No needs recorded."
                  />

                  <DetailText
                    label="What is the problem?"
                    value={lead.goals}
                    empty="No goals recorded."
                  />

                  <DetailText
                    label="What can we do?"
                    value={lead.targetAudience}
                    empty="No target audience recorded."
                  />

                  <DetailText
                    label="How are we going to do that?"
                    value={lead.currentSolution}
                    empty="No current solution recorded."
                  />

                  <DetailText
                    label="Try Close"
                    value={lead.painPoints}
                    empty="No pain points recorded."
                  />
                </div>
              </DetailsSection>

              {/* OPPORTUNITY */}

              <DetailsSection
                icon={<DollarSign size={18} />}
                title="Opportunity"
                description="Financial details and services of interest."
              >
                <div className="details-info-grid">
                  <InfoItem
                    icon={<DollarSign size={18} />}
                    label="Budget"
                    value={formatMoney(lead.budget)}
                  />

                  <InfoItem
                    icon={<DollarSign size={18} />}
                    label="Deal value"
                    value={formatMoney(lead.dealValue)}
                  />

                  <InfoItem
                    icon={<Target size={18} />}
                    label="Probability"
                    value={`${Number(lead.probability || 0)}%`}
                  />

                  <InfoItem
                    icon={<Clock size={18} />}
                    label="Timeline"
                    value={lead.timeline || 'Not provided'}
                  />
                </div>

                <div className="details-subsection">
                  <span className="detail-subsection-label">
                    Services of interest
                  </span>

                  {lead.services?.length > 0 ? (
                    <div className="details-tag-list">
                      {lead.services.map((service) => (
                        <span key={service} className="detail-service-tag">
                          {service}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <EmptyText text="No services selected." />
                  )}
                </div>
              </DetailsSection>

              {/* NEXT ACTION */}

              <DetailsSection
                icon={<Calendar size={18} />}
                title="Next action"
                description="The next step required to move this opportunity forward."
              >
                <div className="details-info-grid">
                  <InfoItem
                    icon={<Target size={18} />}
                    label="Next action"
                    value={lead.nextAction || 'No next action'}
                  />

                  <InfoItem
                    icon={<Calendar size={18} />}
                    label="Follow-up date"
                    value={formatDate(lead.nextActionDate)}
                  />

                  <InfoItem
                    icon={<Phone size={18} />}
                    label="Preferred contact"
                    value={formatContactMethod(lead.preferredContactMethod)}
                  />
                </div>
              </DetailsSection>

              {/* NOTES */}

              <DetailsSection
                icon={<FileText size={18} />}
                title="Sales notes"
                description="Important information recorded by the sales team."
              >
                <DetailText
                  label="Notes"
                  value={lead.notes}
                  empty="No sales notes have been added."
                />

                <div className="details-subsection">
                  <span className="detail-subsection-label">Tags</span>

                  {lead.tags?.length > 0 ? (
                    <div className="details-tag-list">
                      {lead.tags.map((tag) => (
                        <span key={tag} className="detail-tag">
                          <Tag size={13} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <EmptyText text="No tags added." />
                  )}
                </div>
              </DetailsSection>
            </main>

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <aside className="lead-details-sidebar">
              {/* SALES OWNER */}

              <section className="lead-sidebar-card">
                <span className="section-label">SALES OWNER</span>

                <div className="sales-owner">
                  <div className="sales-owner-avatar">
                    {lead.salesPerson?.profilePicture ? (
                      <img src={lead.salesPerson.profilePicture} alt="" />
                    ) : (
                      getInitials(lead.salesPerson)
                    )}
                  </div>

                  <div>
                    <strong>
                      {lead.salesPerson?.firstName || ''}{' '}
                      {lead.salesPerson?.lastName || ''}
                    </strong>

                    <span>{lead.salesPerson?.email || 'Sales team'}</span>
                  </div>
                </div>
              </section>

              {/* PIPELINE */}

              <section className="lead-sidebar-card">
                <span className="section-label">PIPELINE INFORMATION</span>

                <div className="sidebar-details">
                  <SidebarItem
                    icon={<Target size={16} />}
                    label="Stage"
                    value={stageLabels[lead.stage] || 'New'}
                  />

                  <SidebarItem
                    icon={<CircleAlert size={16} />}
                    label="Priority"
                    value={capitalize(lead.priority)}
                  />

                  <SidebarItem
                    icon={<Activity size={16} />}
                    label="Lead score"
                    value={`${Number(lead.leadScore || 0)} pts`}
                  />

                  <SidebarItem
                    icon={<CheckCircle2 size={16} />}
                    label="Status"
                    value={capitalize(lead.status)}
                  />
                </div>
              </section>

              {/* DATES */}

              <section className="lead-sidebar-card">
                <span className="section-label">LEAD INFORMATION</span>

                <div className="sidebar-details">
                  <SidebarItem
                    icon={<Calendar size={16} />}
                    label="Created"
                    value={formatDate(lead.createdAt)}
                  />

                  <SidebarItem
                    icon={<Calendar size={16} />}
                    label="Last Updated"
                    value={formatDate(lead.updatedAt)}
                  />

                  <SidebarItem
                    icon={<Calendar size={16} />}
                    label="Follow-up"
                    value={formatDate(lead.nextActionDate)}
                  />
                </div>
              </section>
            </aside>
          </div>
        </>
      )}

      {error && <div className="lead-details-error">{error}</div>}
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| DETAILS SECTION
|--------------------------------------------------------------------------
*/

function DetailsSection({ icon, title, description, children }) {
  return (
    <section className="lead-info-card details-section">
      <div className="details-section-header">
        <div className="details-section-icon">{icon}</div>

        <div>
          <span className="section-label">LEAD DETAILS</span>

          <h2>{title}</h2>

          {description && <p>{description}</p>}
        </div>
      </div>

      <div className="details-section-body">{children}</div>
    </section>
  )
}

/*
|--------------------------------------------------------------------------
| INPUT
|--------------------------------------------------------------------------
*/

function InputField({ label, name, value, onChange, type = 'text' }) {
  return (
    <div className="details-field">
      <label htmlFor={name}>{label}</label>

      <div className="details-input-wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| SELECT
|--------------------------------------------------------------------------
*/

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="details-field">
      <label htmlFor={name}>{label}</label>

      <div className="details-input-wrapper details-select-wrapper">
        <select id={name} name={name} value={value} onChange={onChange}>
          {options.map(([optionValue, optionLabel]) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>

        <ChevronDown size={16} />
      </div>
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| TEXT AREA
|--------------------------------------------------------------------------
*/

function TextArea({ label, name, value, onChange, rows = 5 }) {
  return (
    <div className="details-field details-textarea-field">
      <label htmlFor={name}>{label}</label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| INFO ITEM
|--------------------------------------------------------------------------
*/

function InfoItem({ icon, label, value }) {
  return (
    <div className="details-info-item">
      <div className="details-info-icon">{icon}</div>

      <div>
        <span>{label}</span>

        <strong>{value || 'Not provided'}</strong>
      </div>
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| DETAIL TEXT
|--------------------------------------------------------------------------
*/

function DetailText({ label, value, empty = 'Not provided' }) {
  return (
    <div className="detail-text-block">
      <span>{label}</span>

      <p>{value || empty}</p>
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| SIDEBAR ITEM
|--------------------------------------------------------------------------
*/

function SidebarItem({ icon, label, value }) {
  return (
    <div className="sidebar-item">
      <div className="sidebar-item-icon">{icon}</div>

      <div>
        <span>{label}</span>

        <strong>{value}</strong>
      </div>
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| DETAIL STAT
|--------------------------------------------------------------------------
*/

function DetailStat({ icon, label, value }) {
  return (
    <div className="lead-detail-stat">
      <div className="lead-detail-stat-icon">{icon}</div>

      <div>
        <span>{label}</span>

        <strong>{value}</strong>
      </div>
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| EMPTY
|--------------------------------------------------------------------------
*/

function EmptyText({ text }) {
  return <p className="details-empty-text">{text}</p>
}

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function getInitials(person) {
  if (!person) return '?'

  const first = person.firstName?.[0] || ''

  const last = person.lastName?.[0] || ''

  return `${first}${last}`.toUpperCase() || '?'
}

function capitalize(value = '') {
  if (!value) return 'Not provided'

  return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString()}`
}

function formatDate(date) {
  if (!date) return 'Not available'

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return 'Not available'
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDateForInput(date) {
  if (!date) return ''

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return ''
  }

  return parsed.toISOString().split('T')[0]
}

function formatSource(source) {
  const found = sourceOptions.find(([value]) => value === source)

  return found ? found[1] : capitalize(source)
}

function formatContactMethod(method) {
  const found = contactMethods.find(([value]) => value === method)

  return found ? found[1] : capitalize(method)
}

function getProblemLabel(problem) {
  if (!problem) return 'Not selected'

  const found = problemOptions.find((item) => item.value === problem)

  return found ? found.label : problem
}

export default LeadDetails
