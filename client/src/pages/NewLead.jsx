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
  DollarSign,
  Calendar,
  Clock,
  MessageSquare,
  Tag,
  FileText,
  ArrowLeft,
  Save,
  ChevronDown,
} from 'lucide-react'

import { createLead } from '../features/leads/leadsSlice.js'

const initial = {
  // =====================================================
  // BUSINESS INFORMATION
  // =====================================================

  companyName: '',
  contactName: '',
  phone: '',
  email: '',
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

  budget: '',
  timeline: '',

  // =====================================================
  // DEAL
  // =====================================================

  service: '',
  services: [],
  dealValue: '',
  probability: '',

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
  // SERVICE TOGGLE
  // =====================================================

  const toggleService = (service) => {
    setForm((previous) => {
      const exists = previous.services.includes(service)

      return {
        ...previous,
        services: exists
          ? previous.services.filter((item) => item !== service)
          : [...previous.services, service],
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

      leadScore: Number(form.leadScore || 0),
      budget: Number(form.budget || 0),
      dealValue: Number(form.dealValue || 0),
      probability: Number(form.probability || 0),

      problems: form.problems || [],
      services: form.services || [],
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
              options={[
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
              ]}
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
              label="Sales stage"
              name="stage"
              value={form.stage}
              onChange={update}
              options={[
                ['new', 'New'],
                ['contacted', 'Contacted'],
                ['qualified', 'Qualified'],
                ['discovery', 'Discovery'],
                ['solution-presented', 'Solution Presented'],
                ['proposal', 'Proposal'],
                ['negotiation', 'Negotiation'],
                ['won', 'Won'],
                ['lost', 'Lost'],
                ['nurture', 'Nurture'],
              ]}
            />

            <SelectField
              label="Lead status"
              name="status"
              value={form.status}
              onChange={update}
              options={[
                ['new', 'New'],
                ['pending', 'Pending'],
                ['approved', 'Approved'],
                ['rejected', 'Rejected'],
              ]}
            />

            <SelectField
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={update}
              options={[
                ['critical', 'Critical'],
                ['high', 'High'],
                ['medium', 'Medium'],
                ['low', 'Low'],
              ]}
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

          <div className="problem-grid">
            {problemOptions.map((problem) => (
              <label
                key={problem.value}
                className={`problem-option ${
                  form.problems.includes(problem.value) ? 'selected' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.problems.includes(problem.value)}
                  onChange={() => toggleProblem(problem.value)}
                />

                <span className="problem-checkbox"></span>

                <span>{problem.label}</span>
              </label>
            ))}
          </div>

          <div className="lead-form-grid problem-detail-grid">
            <SelectField
              label="Primary problem"
              name="primaryProblem"
              value={form.primaryProblem}
              onChange={update}
              options={[
                ['', 'Select primary problem'],
                ...problemOptions.map((problem) => [
                  problem.value,
                  problem.label,
                ]),
              ]}
            />
          </div>
        </div>

        {/* =================================================
            SECTION 5 — NEED ANALYSIS
        ================================================= */}

        <div className="form-section">
          <SectionTitle
            icon={<MessageSquare size={18} />}
            title="Need analysis"
            description="Capture what the prospect actually needs."
          />

          <div className="lead-form-grid">
            <TextAreaField
              label="Script Start"
              name="needs"
              value={form.needs}
              onChange={update}
              placeholder="What does the client need?"
            />

            <TextAreaField
              label="What is the Problem?"
              name="goals"
              value={form.goals}
              onChange={update}
              placeholder="What are they trying to achieve?"
            />

            <TextAreaField
              label="What can we do?"
              name="targetAudience"
              value={form.targetAudience}
              onChange={update}
              placeholder="Who are their customers?"
            />

            <TextAreaField
              label="How are we going to do that?"
              name="currentSolution"
              value={form.currentSolution}
              onChange={update}
              placeholder="What are they currently using?"
            />

            <TextAreaField
              label="Try Close"
              name="painPoints"
              value={form.painPoints}
              onChange={update}
              placeholder="What problems or frustrations are they experiencing?"
            />
          </div>
        </div>

        {/* =================================================
            SECTION 6 — DEAL
        ================================================= */}

        <div className="form-section">
          <SectionTitle
            icon={<DollarSign size={18} />}
            title="Opportunity"
            description="Estimate the potential value of the opportunity."
          />

          <div className="lead-form-grid">
            <Field label="Budget" icon={<DollarSign size={17} />}>
              <input
                type="number"
                min="0"
                name="budget"
                value={form.budget}
                onChange={update}
                placeholder="0"
              />
            </Field>

            <Field label="Estimated deal value" icon={<DollarSign size={17} />}>
              <input
                type="number"
                min="0"
                name="dealValue"
                value={form.dealValue}
                onChange={update}
                placeholder="0"
              />
            </Field>

            <Field label="Probability (%)" icon={<Target size={17} />}>
              <input
                type="number"
                min="0"
                max="100"
                name="probability"
                value={form.probability}
                onChange={update}
                placeholder="0"
              />
            </Field>

            <Field label="Expected timeline" icon={<Clock size={17} />}>
              <input
                name="timeline"
                value={form.timeline}
                onChange={update}
                placeholder="Example: 2-4 weeks"
              />
            </Field>
          </div>

          <div className="lead-field">
            <label>Services of interest</label>

            <div className="service-grid">
              {serviceOptions.map((service) => (
                <label
                  key={service}
                  className={`service-option ${
                    form.services.includes(service) ? 'selected' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.services.includes(service)}
                    onChange={() => toggleService(service)}
                  />

                  <span className="service-checkbox">
                    {form.services.includes(service) ? '✓' : ''}
                  </span>

                  {service}
                </label>
              ))}
            </div>
          </div>
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
              options={[
                ['', 'Select method'],
                ['phone', 'Phone'],
                ['email', 'Email'],
                ['sms', 'SMS'],
                ['facebook', 'Facebook'],
                ['instagram', 'Instagram'],
                ['linkedin', 'LinkedIn'],
                ['other', 'Other'],
              ]}
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

/* =====================================================
   SECTION TITLE
===================================================== */

function SectionTitle({ icon, title, description }) {
  return (
    <div className="form-section-title">
      <div className="section-title-icon">{icon}</div>

      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}

/* =====================================================
   FIELD
===================================================== */

function Field({ label, required = false, icon, children }) {
  return (
    <div className="lead-field">
      <label>
        {label}

        {required && <span>*</span>}
      </label>

      <div className="input-wrapper">
        {icon}
        {children}
      </div>
    </div>
  )
}

/* =====================================================
   SELECT FIELD
===================================================== */

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="lead-field">
      <label>{label}</label>

      <div className="input-wrapper select-wrapper">
        <select name={name} value={value} onChange={onChange}>
          {options.map(([optionValue, optionLabel]) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>

        <ChevronDown size={16} className="select-icon" />
      </div>
    </div>
  )
}

/* =====================================================
   TEXT AREA FIELD
===================================================== */

function TextAreaField({ label, name, value, onChange, placeholder }) {
  return (
    <div className="lead-field">
      <label>{label}</label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="5"
        placeholder={placeholder}
      />
    </div>
  )
}
