import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  ArrowLeft,
  Save,
} from 'lucide-react'
import { createLead } from '../features/leads/leadsSlice.js'

const initial = {
  companyName: '',
  phone: '',
  email: '',
  businessInfo: '',
  location: '',
  status: 'new',
  dealValue: '',
  closedAt: '',
}

export default function NewLead() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error } = useSelector((s) => s.leads)
  const user = useSelector((s) => s.auth.user)

  const [form, setForm] = useState(initial)

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const submit = async (e) => {
    e.preventDefault()

    const result = await dispatch(createLead(form))

    if (createLead.fulfilled.match(result)) {
      navigate('/leads')
    }
  }

  return (
    <div className="new-lead-page">
      {/* HEADER */}

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
              <h2>Create New Lead</h2>
              <p>Add a new company opportunity to your sales pipeline.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}

      <form className="lead-form-card" onSubmit={submit}>
        {/* FORM HEADER */}

        <div className="lead-form-header">
          <div>
            <span className="form-eyebrow">SALES PIPELINE</span>

            <h3>Lead information</h3>

            <p>Enter the details of the company and opportunity below.</p>
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

        {/* COMPANY INFORMATION */}

        <div className="form-section">
          <div className="form-section-title">
            <Building2 size={18} />

            <div>
              <h4>Company information</h4>
              <p>Basic information about the business.</p>
            </div>
          </div>

          <div className="lead-form-grid">
            {/* COMPANY */}

            <div className="lead-field">
              <label>
                Company name <span>*</span>
              </label>

              <div className="input-wrapper">
                <Building2 size={17} />

                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={update}
                  placeholder="Enter company name"
                  required
                />
              </div>
            </div>

            {/* PHONE */}

            <div className="lead-field">
              <label>
                Phone number <span>*</span>
              </label>

              <div className="input-wrapper">
                <Phone size={17} />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}

            <div className="lead-field">
              <label>
                Email address <span>*</span>
              </label>

              <div className="input-wrapper">
                <Mail size={17} />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="company@example.com"
                  required
                />
              </div>
            </div>

            {/* LOCATION */}

            <div className="lead-field">
              <label>Location</label>

              <div className="input-wrapper">
                <MapPin size={17} />

                <input
                  name="location"
                  value={form.location}
                  onChange={update}
                  placeholder="City, Province"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DEAL INFORMATION */}

        <div className="form-section">
          <div className="form-section-title">
            <DollarSign size={18} />

            <div>
              <h4>Deal information</h4>

              <p>Configure the opportunity and its current status.</p>
            </div>
          </div>

          <div className="lead-form-grid">
            {/* STATUS */}

            <div className="lead-field">
              <label>Lead status</label>

              <div className="input-wrapper select-wrapper">
                <select name="status" value={form.status} onChange={update}>
                  <option value="new">New</option>

                  <option value="pending">Pending</option>

                  <option value="approved">Approved</option>

                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* DEAL VALUE */}

            <div className="lead-field">
              <label>Deal value</label>

              <div className="input-wrapper">
                <DollarSign size={17} />

                <input
                  type="number"
                  min="0"
                  name="dealValue"
                  value={form.dealValue}
                  onChange={update}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* CLOSED DATE */}

            <div className="lead-field">
              <label>Expected / closed date</label>

              <div className="input-wrapper">
                <Calendar size={17} />

                <input
                  type="date"
                  name="closedAt"
                  value={form.closedAt}
                  onChange={update}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BUSINESS INFORMATION */}

        <div className="form-section">
          <div className="form-section-title">
            <FileText size={18} />

            <div>
              <h4>Business information</h4>

              <p>
                Add notes about the company, opportunity and customer needs.
              </p>
            </div>
          </div>

          <div className="lead-field">
            <label>Notes</label>

            <textarea
              name="businessInfo"
              value={form.businessInfo}
              onChange={update}
              rows="7"
              placeholder="Describe the business, their current situation, what they need, potential opportunities, notes from your meeting, etc."
            />
          </div>
        </div>

        {/* FOOTER */}

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
