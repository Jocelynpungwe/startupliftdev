// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import api from '../lib/api.js'
// import { updateLead } from '../features/leads/leadsSlice.js'

// export default function EditLead() {
//   const { id } = useParams()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [form, setForm] = useState(null)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     api
//       .get(`/leads/${id}`)
//       .then((res) => {
//         const lead = res.data.lead
//         setForm({
//           companyName: lead.companyName,
//           phone: lead.phone,
//           email: lead.email,
//           businessInfo: lead.businessInfo || '',
//           location: lead.location || '',
//           status: lead.status,
//           dealValue: lead.dealValue || 0,
//           closedAt: lead.closedAt
//             ? new Date(lead.closedAt).toISOString().slice(0, 10)
//             : '',
//         })
//       })
//       .catch((err) =>
//         setError(err.response?.data?.message || 'Could not load lead'),
//       )
//   }, [id])

//   if (!form) return <div className="loading">{error || 'Loading lead...'}</div>

//   const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const submit = async (e) => {
//     e.preventDefault()
//     const result = await dispatch(updateLead({ id, data: form }))
//     if (updateLead.fulfilled.match(result)) navigate('/leads')
//     else setError(result.payload || 'Could not update lead')
//   }

//   return (
//     <div>
//       <div className="page-heading">
//         <div>
//           <h2>Edit Lead</h2>
//           <p>Update the opportunity details.</p>
//         </div>
//       </div>

//       <form className="panel form-grid" onSubmit={submit}>
//         {error && <div className="alert error full">{error}</div>}

//         <div className="field">
//           <label>Company name</label>
//           <input
//             name="companyName"
//             value={form.companyName}
//             onChange={update}
//             required
//           />
//         </div>
//         <div className="field">
//           <label>Phone</label>
//           <input name="phone" value={form.phone} onChange={update} required />
//         </div>
//         <div className="field">
//           <label>Email</label>
//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={update}
//             required
//           />
//         </div>
//         <div className="field">
//           <label>Location</label>
//           <input name="location" value={form.location} onChange={update} />
//         </div>
//         <div className="field">
//           <label>Status</label>
//           <select name="status" value={form.status} onChange={update}>
//             <option value="new">New</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//             <option value="pending">Pending</option>
//           </select>
//         </div>
//         <div className="field">
//           <label>Deal value</label>
//           <input
//             name="dealValue"
//             type="number"
//             min="0"
//             value={form.dealValue}
//             onChange={update}
//           />
//         </div>
//         <div className="field">
//           <label>Closed date</label>
//           <input
//             name="closedAt"
//             type="date"
//             value={form.closedAt}
//             onChange={update}
//           />
//         </div>
//         <div className="field full">
//           <label>Business information</label>
//           <textarea
//             name="businessInfo"
//             rows="6"
//             value={form.businessInfo}
//             onChange={update}
//           />
//         </div>
//         <div className="form-actions full">
//           <button
//             type="button"
//             className="secondary-btn"
//             onClick={() => navigate('/leads')}
//           >
//             Cancel
//           </button>
//           <button className="primary-btn">Save changes</button>
//         </div>
//       </form>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  CalendarDays,
  FileText,
  ArrowLeft,
  Save,
} from 'lucide-react'

import api from '../lib/api.js'
import { updateLead } from '../features/leads/leadsSlice.js'

export default function EditLead() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api
      .get(`/leads/${id}`)
      .then((res) => {
        const lead = res.data.lead

        setForm({
          companyName: lead.companyName || '',
          phone: lead.phone || '',
          email: lead.email || '',
          businessInfo: lead.businessInfo || '',
          location: lead.location || '',
          status: lead.status || 'new',
          dealValue: lead.dealValue || 0,
          closedAt: lead.closedAt
            ? new Date(lead.closedAt).toISOString().slice(0, 10)
            : '',
        })
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Could not load lead')
      })
  }, [id])

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const submit = async (e) => {
    e.preventDefault()

    setSaving(true)
    setError('')

    const result = await dispatch(
      updateLead({
        id,
        data: form,
      }),
    )

    setSaving(false)

    if (updateLead.fulfilled.match(result)) {
      navigate('/leads')
    } else {
      setError(result.payload || 'Could not update lead')
    }
  }

  if (!form) {
    return <div className="lead-page-loading">{error || 'Loading lead...'}</div>
  }

  return (
    <div className="lead-editor-page">
      {/* PAGE HEADER */}

      <div className="lead-editor-header">
        <div className="lead-header-left">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/leads')}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="eyebrow">SALES PIPELINE</div>

            <h1>Edit Lead</h1>

            <p>
              Update the opportunity information and keep your sales pipeline
              accurate.
            </p>
          </div>
        </div>

        <div className="lead-header-status">
          <span className={`status-dot ${form.status}`} />
          {form.status}
        </div>
      </div>

      {/* ERROR */}

      {error && <div className="lead-form-alert">{error}</div>}

      {/* FORM */}

      <form className="lead-editor-card" onSubmit={submit}>
        {/* BASIC INFORMATION */}

        <div className="form-section">
          <div className="form-section-header">
            <div className="section-icon">
              <Building2 size={20} />
            </div>

            <div>
              <h2>Company Information</h2>
              <p>Basic information about this business.</p>
            </div>
          </div>

          <div className="lead-form-grid">
            {/* COMPANY */}

            <div className="lead-field">
              <label>Company name</label>

              <div className="input-wrapper">
                <Building2 size={18} />

                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={update}
                  placeholder="Company name"
                  required
                />
              </div>
            </div>

            {/* PHONE */}

            <div className="lead-field">
              <label>Phone number</label>

              <div className="input-wrapper">
                <Phone size={18} />

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
              <label>Email address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  placeholder="company@email.com"
                  required
                />
              </div>
            </div>

            {/* LOCATION */}

            <div className="lead-field">
              <label>Location</label>

              <div className="input-wrapper">
                <MapPin size={18} />

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
          <div className="form-section-header">
            <div className="section-icon blue">
              <DollarSign size={20} />
            </div>

            <div>
              <h2>Deal Information</h2>
              <p>Update the status and financial details.</p>
            </div>
          </div>

          <div className="lead-form-grid">
            {/* STATUS */}

            <div className="lead-field">
              <label>Lead status</label>

              <div className="input-wrapper">
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
                <DollarSign size={18} />

                <input
                  name="dealValue"
                  type="number"
                  min="0"
                  value={form.dealValue}
                  onChange={update}
                  placeholder="0"
                />
              </div>
            </div>

            {/* CLOSED DATE */}

            <div className="lead-field">
              <label>Closed date</label>

              <div className="input-wrapper">
                <CalendarDays size={18} />

                <input
                  name="closedAt"
                  type="date"
                  value={form.closedAt}
                  onChange={update}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BUSINESS INFORMATION */}

        <div className="form-section">
          <div className="form-section-header">
            <div className="section-icon purple">
              <FileText size={20} />
            </div>

            <div>
              <h2>Business Information</h2>
              <p>
                Add notes and additional information about this opportunity.
              </p>
            </div>
          </div>

          <div className="lead-field">
            <label>Business notes</label>

            <textarea
              name="businessInfo"
              value={form.businessInfo}
              onChange={update}
              rows="7"
              placeholder="Describe the business, their needs, opportunity details, services they're interested in, notes from meetings, etc."
            />
          </div>
        </div>

        {/* FORM ACTIONS */}

        <div className="lead-form-actions">
          <button
            type="button"
            className="lead-cancel-btn"
            onClick={() => navigate('/leads')}
            disabled={saving}
          >
            Cancel
          </button>

          <button type="submit" className="lead-save-btn" disabled={saving}>
            <Save size={18} />

            {saving ? 'Saving changes...' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
