import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { updatePayroll } from './payrollSlice.js'

export default function PayrollEditor({ employee, payroll, onClose }) {
  const dispatch = useDispatch()

  const [meetingHours, setMeetingHours] = useState(payroll?.meetingHours || 0)

  const [hourlyRate, setHourlyRate] = useState(payroll?.hourlyRate || 0)

  const [bonus, setBonus] = useState(payroll?.bonus || 0)

  const [status, setStatus] = useState(payroll?.status || 'draft')

  const [notes, setNotes] = useState(payroll?.notes || '')

  const [commissions, setCommissions] = useState(payroll?.commissions || [])

  const [saving, setSaving] = useState(false)

  // =====================================================
  // ADD COMMISSION
  // =====================================================

  const addCommission = () => {
    setCommissions([
      ...commissions,

      {
        description: '',
        amount: 0,
      },
    ])
  }

  // =====================================================
  // UPDATE COMMISSION
  // =====================================================

  const updateCommission = (index, field, value) => {
    const updated = [...commissions]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setCommissions(updated)
  }

  // =====================================================
  // REMOVE COMMISSION
  // =====================================================

  const removeCommission = (index) => {
    setCommissions(commissions.filter((_, i) => i !== index))
  }

  // =====================================================
  // CALCULATIONS
  // =====================================================

  const meetingPay = Number(meetingHours || 0) * Number(hourlyRate || 0)

  const commissionTotal = commissions.reduce(
    (total, commission) => total + Number(commission.amount || 0),
    0,
  )

  const finalSalary = meetingPay + commissionTotal + Number(bonus || 0)

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSaving(true)

    try {
      await dispatch(
        updatePayroll({
          id: payroll._id,

          data: {
            meetingHours: Number(meetingHours),

            hourlyRate: Number(hourlyRate),

            commissions: commissions.map((commission) => ({
              description: commission.description,

              amount: Number(commission.amount || 0),
            })),

            bonus: Number(bonus),

            notes,

            status,
          },
        }),
      ).unwrap()

      onClose()
    } catch (error) {
      console.error('Payroll update failed:', error)

      alert(error || 'Failed to update payroll')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="payroll-editor modal">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="modal-header">
          <div>
            <h2>Edit Payroll</h2>

            <p>
              {employee?.firstName} {employee?.lastName}
            </p>
          </div>

          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ================================================= */}
          {/* MEETING HOURS */}
          {/* ================================================= */}

          <div className="form-group">
            <label>Meeting Hours</label>

            <input
              type="number"
              min="0"
              step="0.5"
              value={meetingHours}
              onChange={(e) => setMeetingHours(e.target.value)}
            />
          </div>

          {/* ================================================= */}
          {/* HOURLY RATE */}
          {/* ================================================= */}

          <div className="form-group">
            <label>Hourly Salary</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </div>

          {/* ================================================= */}
          {/* MEETING PAY */}
          {/* ================================================= */}

          <div className="calculation-row">
            <span>Meeting Pay</span>

            <strong>${meetingPay.toFixed(2)}</strong>
          </div>

          {/* ================================================= */}
          {/* COMMISSIONS */}
          {/* ================================================= */}

          <div className="commission-editor">
            <div className="section-header">
              <div>
                <h3>Commissions</h3>

                <p>Add multiple commissions.</p>
              </div>

              <button type="button" onClick={addCommission}>
                + Add Commission
              </button>
            </div>

            {commissions.length === 0 && <p>No commissions added.</p>}

            {commissions.map((commission, index) => (
              <div
                className="commission-editor-row"
                key={commission._id || index}
              >
                <input
                  type="text"
                  placeholder="Description"
                  value={commission.description || ''}
                  onChange={(e) =>
                    updateCommission(index, 'description', e.target.value)
                  }
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Amount"
                  value={commission.amount || 0}
                  onChange={(e) =>
                    updateCommission(index, 'amount', e.target.value)
                  }
                />

                <button type="button" onClick={() => removeCommission(index)}>
                  Remove
                </button>
              </div>
            ))}

            <div className="calculation-row">
              <span>Commission Total</span>

              <strong>${commissionTotal.toFixed(2)}</strong>
            </div>
          </div>

          {/* ================================================= */}
          {/* BONUS */}
          {/* ================================================= */}

          <div className="form-group">
            <label>Bonus</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
            />
          </div>

          {/* ================================================= */}
          {/* STATUS */}
          {/* ================================================= */}

          <div className="form-group">
            <label>Status</label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft</option>

              <option value="pending">Pending</option>

              <option value="approved">Approved</option>

              <option value="paid">Paid</option>
            </select>
          </div>

          {/* ================================================= */}
          {/* NOTES */}
          {/* ================================================= */}

          <div className="form-group">
            <label>Notes</label>

            <textarea
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* ================================================= */}
          {/* FINAL SALARY */}
          {/* ================================================= */}

          <div className="final-salary-preview">
            <span>Final Salary</span>

            <strong>${finalSalary.toFixed(2)}</strong>
          </div>

          {/* ================================================= */}
          {/* ACTIONS */}
          {/* ================================================= */}

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>

            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Payroll'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
