import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
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
  Calendar,
  MessageSquare,
  Tag,
  FileText,
  ArrowLeft,
  Save,
} from 'lucide-react'

import { createLead } from '../features/leads/leadsSlice.js'
import {
  CONTACT_METHODS,
  LEAD_STATUSES,
  NO_EMAIL,
  PRIORITY_OPTIONS,
  SOURCE_OPTIONS,
} from '../lib/leadOptions.js'
import {
  Field,
  ProblemPicker,
  SectionTitle,
  SelectField,
} from '../components/lead/LeadFormParts.jsx'

const initial = {
  // =====================================================
  // BUSINESS INFORMATION
  // =====================================================

  companyName: '',
  contactName: '',
  phone: '',
  email: NO_EMAIL,
  website: '',
  location: '',
  industry: '',
  businessInfo: '',

  // =====================================================
  // LEAD SOURCE
  // =====================================================

  source: 'other',
  sourceDetails: '',

  // =====================================================
  // SALES PIPELINE
  // =====================================================

  stage: 'new',
  status: 'new',

  // =====================================================
  // PRIORITY
  // =====================================================

  priority: 'medium',
  leadScore: '',

  // =====================================================
  // PROBLEMS
  // =====================================================

  primaryProblem: '',
  problems: [],

  // =====================================================
  // DISCOVERY
  // =====================================================

  needs: '',
  goals: '',
  targetAudience: '',
  currentSolution: '',
  painPoints: '',



  // =====================================================
  // FOLLOW-UP
  // =====================================================

  nextAction: '',
  nextActionDate: '',
  preferredContactMethod: '',

  // =====================================================
  // NOTES
  // =====================================================

  tags: [],
  notes: '',
}

export default function NewLead() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error } = useSelector((state) => state.leads)
  const user = useSelector((state) => state.auth.user)

  const [form, setForm] = useState(initial)

  // =====================================================
  // UPDATE INPUT
  // =====================================================

  const update = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // =====================================================
  // PROBLEM TOGGLE
  // =====================================================

  const toggleProblem = (problem) => {
    setForm((previous) => {
      const exists = previous.problems.includes(problem)

      return {
        ...previous,
        problems: exists
          ? previous.problems.filter((item) => item !== problem)
          : [...previous.problems, problem],
      }
    })
  }

  // =====================================================
  // TAGS
  // =====================================================

  const updateTags = (e) => {
    const value = e.target.value

    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    setForm((previous) => ({
      ...previous,
      tags,
    }))
  }

  // =====================================================
  // SUBMIT
  // =====================================================

  const submit = async (e) => {
    e.preventDefault()

    const payload = {
      ...form,

      email: form.email.trim() || NO_EMAIL,

      leadScore: Number(form.leadScore || 0),

      problems: form.problems || [],
      // the first problem ticked is recorded as the primary one
      primaryProblem: form.problems[0] || '',
      tags: form.tags || [],

      nextActionDate: form.nextActionDate || null,
    }

    const result = await dispatch(createLead(payload))

    if (createLead.fulfilled.match(result)) {
      navigate('/leads')
    }
  }

  return (
    <div className="new-lead-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="new-lead-header">
        <div>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/leads')}
          >
            <ArrowLeft size={18} />
          </button>

          <div className="new-lead-title">
            <div className="title-icon">
              <Building2 size={24} />
            </div>

            <div>
              <span className="form-eyebrow">SALES PIPELINE</span>

              <h2>Create New Lead</h2>

              <p>Add a business opportunity to your sales pipeline.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <form className="lead-form-card" onSubmit={submit}>
        {/* =================================================
            FORM HEADER
        ================================================= */}

        <div className="lead-form-header">
          <div>
            <span className="form-eyebrow">NEW OPPORTUNITY</span>

            <h3>Lead information</h3>

            <p>
              Capture enough information for your sales team to understand and
              work the opportunity.
            </p>
          </div>

          <div className="form-user">
            <div className="form-user-avatar">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="" />
              ) : (
                `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`
              )}
            </div>

            <div>
              <strong>
                {user?.firstName} {user?.lastName}
              </strong>

              <span>{user?.role}</span>
            </div>
          </div>
        </div>

        {/* ERROR */}

        {error && <div className="lead-error">{error}</div>}

        {/* =================================================
            SECTION 1 — BUSINESS INFORMATION
        ================================================= */}

        <div className="form-section">
          <SectionTitle
            icon={<Building2 size={18} />}
            title="Business information"
            description="Basic information about the company and contact."
          />

          <div className="lead-form-grid">
            <Field label="Company name" required icon={<Building2 size={17} />}>
              <input
                name="companyName"
                value={form.companyName}
                onChange={update}
                placeholder="ABC Roofing"
                required
              />
            </Field>

            <Field label="Contact name" icon={<User size={17} />}>
              <input
                name="contactName"
                value={form.contactName}
                onChange={update}
                placeholder="John Smith"
              />
            </Field>

            <Field label="Phone number" required icon={<Phone size={17} />}>
              <input
                name="phone"
                value={form.phone}
                onChange={update}
                placeholder="+1 (555) 000-0000"
                required
              />
            </Field>

            <Field label="Email address" required icon={<Mail size={17} />}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                placeholder="john@company.com"
                required
              />
            </Field>

            <Field label="Website" icon={<Globe size={17} />}>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={update}
                placeholder="https://example.com"
              />
            </Field>

            <Field label="Location" icon={<MapPin size={17} />}>
              <input
                name="location"
                value={form.location}
                onChange={update}
                placeholder="Ottawa, Ontario"
              />
            </Field>

            <Field label="Industry" icon={<BriefcaseBusiness size={17} />}>
              <input
                name="industry"
                value={form.industry}
                onChange={update}
                placeholder="Roofing, Restaurant, Construction..."
              />
            </Field>
          </div>

          <div className="lead-field full-width-field">
            <label>Business information</label>

            <textarea
              name="businessInfo"
              value={form.businessInfo}
              onChange={update}
              rows="5"
              placeholder="Describe the business, what they do, their size, location, online presence, etc."
            />
          </div>
        </div>

        {/* =================================================
            SECTION 2 — SOURCE
        ================================================= */}

        <div className="form-section">
          <SectionTitle
            icon={<Search size={18} />}
            title="Lead source"
            description="Record where the sales team discovered this business."
          />

          <div className="lead-form-grid">
            <SelectField
              label="Where did you find this business?"
              name="source"
              value={form.source}
              onChange={update}
              options={SOURCE_OPTIONS}
            />

            <Field label="Source details" icon={<FileText size={17} />}>
              <input
                name="sourceDetails"
                value={form.sourceDetails}
                onChange={update}
                placeholder="Example: Google Maps search for roofing companies"
              />
            </Field>
          </div>
        </div>

        {/* =================================================
            SECTION 3 — PIPELINE
        ================================================= */}

        <div className="form-section">
          <SectionTitle
            icon={<Target size={18} />}
            title="Sales pipeline"
            description="Define where the opportunity currently stands."
          />

          <div className="lead-form-grid">
            <SelectField
              label="Lead status"
              name="status"
              value={form.status}
              onChange={update}
              options={LEAD_STATUSES.map((s) => [s.value, s.label])}
            />

            <SelectField
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={update}
              options={PRIORITY_OPTIONS}
            />

            <Field label="Lead score" icon={<Target size={17} />}>
              <input
                type="number"
                min="0"
                name="leadScore"
                value={form.leadScore}
                onChange={update}
                placeholder="0"
              />
            </Field>
          </div>
        </div>

        {/* =================================================
            SECTION 4 — PROBLEMS
        ================================================= */}

        <div className="form-section">
          <SectionTitle
            icon={<CircleAlert size={18} />}
            title="Business problems"
            description="Identify the problems your sales team discovered."
          />

          <ProblemPicker selected={form.problems} onToggle={toggleProblem} />
        </div>

        {/* =================================================
            SECTION 7 — FOLLOW UP
        ================================================= */}

        <div className="form-section">
          <SectionTitle
            icon={<Calendar size={18} />}
            title="Next action"
            description="Make sure every lead has a clear next step."
          />

          <div className="lead-form-grid">
            <Field label="Next action" icon={<Target size={17} />}>
              <input
                name="nextAction"
                value={form.nextAction}
                onChange={update}
                placeholder="Call client, send proposal, schedule meeting..."
              />
            </Field>

            <Field label="Follow-up date" icon={<Calendar size={17} />}>
              <input
                type="date"
                name="nextActionDate"
                value={form.nextActionDate}
                onChange={update}
              />
            </Field>

            <SelectField
              label="Preferred contact method"
              name="preferredContactMethod"
              value={form.preferredContactMethod}
              onChange={update}
              options={[['', 'Select method'], ...CONTACT_METHODS]}
            />
          </div>
        </div>

        {/* =================================================
            SECTION 8 — NOTES
        ================================================= */}

        <div className="form-section">
          <SectionTitle
            icon={<FileText size={18} />}
            title="Sales notes"
            description="Add anything important for the sales team."
          />

          <div className="lead-field">
            <label>Notes</label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={update}
              rows="7"
              placeholder="Add important information from your research, calls, meetings or conversations..."
            />
          </div>

          <div className="lead-field">
            <label>Tags</label>

            <div className="input-wrapper">
              <Tag size={17} />

              <input
                name="tags"
                value={form.tags.join(', ')}
                onChange={updateTags}
                placeholder="hot-lead, local-business, redesign"
              />
            </div>

            <small className="field-help">Separate tags with commas.</small>
          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="lead-form-footer">
          <div className="required-note">
            <span>*</span> Required fields
          </div>

          <div className="lead-form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate('/leads')}
            >
              Cancel
            </button>

            <button type="submit" className="primary-btn" disabled={loading}>
              <Save size={17} />

              {loading ? 'Creating lead...' : 'Create lead'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
