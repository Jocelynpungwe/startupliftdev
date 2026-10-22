import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Plus, Trash2 } from 'lucide-react'

import { updatePayroll } from './payrollSlice.js'
import { useToast } from '../../components/ui/UiProvider.jsx'
import FinanceModal from '../../components/finance/FinanceModal.jsx'
import { money } from '../../lib/format.js'

import './payrollEditor.css'

const STATUSES = [
  ['draft', 'Draft'],
  ['pending', 'Pending'],
  ['approved', 'Approved'],
  ['paid', 'Paid'],
]

// Empty string while typing, otherwise a plain number.
const num = (value) => (value === '' || value == null ? 0 : Number(value) || 0)

export default function PayrollEditor({ employee, payroll, onClose }) {
  const dispatch = useDispatch()
  const toast = useToast()

  // Kept as the raw input value so a field can be cleared and retyped.
  const [meetingHours, setMeetingHours] = useState(payroll?.meetingHours ?? 0)
  const [hourlyRate, setHourlyRate] = useState(payroll?.hourlyRate ?? 0)
  const [bonus, setBonus] = useState(payroll?.bonus ?? 0)
  const [status, setStatus] = useState(payroll?.status || 'draft')
  const [notes, setNotes] = useState(payroll?.notes || '')
  const [commissions, setCommissions] = useState(
    (payroll?.commissions || []).map((c) => ({
      description: c.description || '',
      amount: c.amount ?? 0,
    })),
  )
  const [saving, setSaving] = useState(false)

  /* ---------------------------- commissions ---------------------------- */

  const addCommission = () =>
    setCommissions((list) => [...list, { description: '', amount: '' }])

  const updateCommission = (index, field, value) =>
    setCommissions((list) =>
      list.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    )

  const removeCommission = (index) =>
    setCommissions((list) => list.filter((_, i) => i !== index))

  /* ---------------------------- calculations --------------------------- */

  const { meetingPay, commissionTotal, finalSalary } = useMemo(() => {
    const pay = num(meetingHours) * num(hourlyRate)
    const commission = commissions.reduce((t, c) => t + num(c.amount), 0)

    return {
      meetingPay: pay,
      commissionTotal: commission,
      finalSalary: pay + commission + num(bonus),
    }
  }, [meetingHours, hourlyRate, commissions, bonus])

  /* -------------------------------- save -------------------------------- */

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!payroll?._id) {
      toast.error('This payroll record could not be found. Please refresh.')
      return
    }

    if (commissions.some((c) => num(c.amount) > 0 && !c.description.trim())) {
      toast.error('Add a description for each commission that has an amount.')
      return
    }

    setSaving(true)

    try {
      await dispatch(
        updatePayroll({
          id: payroll._id,

          data: {
            meetingHours: num(meetingHours),
            hourlyRate: num(hourlyRate),

            // blank, zero-value rows are dropped instead of saved
            commissions: commissions
              .filter((c) => c.description.trim() || num(c.amount) > 0)
              .map((c) => ({
                description: c.description.trim(),
                amount: num(c.amount),
              })),

            bonus: num(bonus),
            notes,
            status,
          },
        }),
      ).unwrap()

      toast.success('Payroll saved.')
      onClose()
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Failed to update payroll.',
      )
    } finally {
      setSaving(false)
    }
  }

  const fullName = `${employee?.firstName || ''} ${employee?.lastName || ''}`.trim()

  return (
    <FinanceModal
      title="Edit payroll"
      subtitle={fullName || 'Employee'}
      onClose={onClose}
    >
      <form className="pe" onSubmit={handleSubmit}>
        {/* ---------------------------- meeting pay ---------------------------- */}

        <section className="pe-section">
          <h3>Meeting pay</h3>

          <div className="pe-grid">
            <label className="pe-field">
              <span>Meeting hours</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={meetingHours}
                onChange={(e) => setMeetingHours(e.target.value)}
              />
            </label>

            <label className="pe-field">
              <span>Hourly rate</span>
              <div className="pe-money">
                <i>$</i>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </div>
            </label>
          </div>

          <p className="pe-hint">
            {num(meetingHours)} h × {money(num(hourlyRate))} ={' '}
            <strong>{money(meetingPay)}</strong>
          </p>
        </section>

        {/* ----------------------------- commissions ----------------------------- */}

        <section className="pe-section">
          <div className="pe-section__head">
            <div>
              <h3>Commissions</h3>
              <p>Add as many as you need.</p>
            </div>

            <button type="button" className="pe-add" onClick={addCommission}>
              <Plus size={15} />
              Add commission
            </button>
          </div>

          {commissions.length === 0 ? (
            <div className="pe-empty">No commissions added yet.</div>
          ) : (
            <ul className="pe-commissions">
              {commissions.map((commission, index) => (
                <li key={index}>
                  <input
                    type="text"
                    placeholder="Description (e.g. Maple Roofing website)"
                    aria-label={`Commission ${index + 1} description`}
                    value={commission.description}
                    onChange={(e) =>
                      updateCommission(index, 'description', e.target.value)
                    }
                  />

                  <div className="pe-money">
                    <i>$</i>
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      aria-label={`Commission ${index + 1} amount`}
                      value={commission.amount}
                      onChange={(e) =>
                        updateCommission(index, 'amount', e.target.value)
                      }
                    />
                  </div>

                  <button
                    type="button"
                    className="pe-remove"
                    onClick={() => removeCommission(index)}
                    aria-label={`Remove commission ${index + 1}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p className="pe-hint">
            Commission total <strong>{money(commissionTotal)}</strong>
          </p>
        </section>

        {/* ---------------------------- bonus + status ---------------------------- */}

        <section className="pe-section">
          <h3>Bonus & status</h3>

          <div className="pe-grid">
            <label className="pe-field">
              <span>Bonus</span>
              <div className="pe-money">
                <i>$</i>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                />
              </div>
            </label>

            <label className="pe-field">
              <span>Status</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                {STATUSES.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="pe-field">
            <span>Notes</span>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything worth remembering about this pay period"
            />
          </label>
        </section>

        {/* -------------------------------- summary -------------------------------- */}

        <section className="pe-summary" aria-label="Pay summary">
          <dl>
            <div>
              <dt>Meeting pay</dt>
              <dd>{money(meetingPay)}</dd>
            </div>
            <div>
              <dt>Commissions</dt>
              <dd>{money(commissionTotal)}</dd>
            </div>
            <div>
              <dt>Bonus</dt>
              <dd>{money(num(bonus))}</dd>
            </div>
          </dl>

          <div className="pe-total">
            <span>Final salary</span>
            <strong>{money(finalSalary)}</strong>
          </div>
        </section>

        {/* -------------------------------- actions -------------------------------- */}

        <footer className="pe-actions">
          <button
            type="button"
            className="ui-btn ui-btn--ghost"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button type="submit" className="ui-btn ui-btn--primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save payroll'}
          </button>
        </footer>
      </form>
    </FinanceModal>
  )
}
