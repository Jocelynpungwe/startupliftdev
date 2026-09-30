import React from 'react'
import { useEffect, useState } from 'react'
import FinanceModal from './FinanceModal'
export default function SubscriptionForm({ item, onClose, onSave }) {
  const empty = {
    name: '',
    type: 'outgoing',
    amount: '',
    billingCycle: 'monthly',
    party: '',
    startDate: new Date().toISOString().slice(0, 10),
    nextBillingDate: new Date().toISOString().slice(0, 10),
    status: 'active',
    autoRenew: true,
    notes: '',
  }
  const [f, setF] = useState(empty),
    [saving, setSaving] = useState(false),
    [error, setError] = useState('')
  useEffect(() => {
    if (item)
      setF({
        ...empty,
        ...item,
        startDate: new Date(item.startDate).toISOString().slice(0, 10),
        nextBillingDate: new Date(item.nextBillingDate)
          .toISOString()
          .slice(0, 10),
      })
  }, [item])
  const c = (e) =>
    setF((x) => ({
      ...x,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))
  const submit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await onSave({ ...f, amount: Number(f.amount) })
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save subscription')
    } finally {
      setSaving(false)
    }
  }
  return (
    <FinanceModal
      title={`${item ? 'Edit' : 'Add'} Subscription`}
      subtitle="Track recurring revenue or recurring business costs."
      onClose={onClose}
    >
      <form className="fin-form" onSubmit={submit}>
        {error && <div className="fin-error">{error}</div>}
        <label>
          Name
          <input name="name" value={f.name} onChange={c} required />
        </label>
        <div className="fin-form-grid">
          <label>
            Type
            <select name="type" value={f.type} onChange={c}>
              <option value="incoming">Incoming revenue</option>
              <option value="outgoing">Outgoing expense</option>
            </select>
          </label>
          <label>
            Amount
            <input
              type="number"
              min="0"
              step="0.01"
              name="amount"
              value={f.amount}
              onChange={c}
              required
            />
          </label>
          <label>
            Billing Cycle
            <select name="billingCycle" value={f.billingCycle} onChange={c}>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </label>
          <label>
            Client / Vendor
            <input name="party" value={f.party} onChange={c} />
          </label>
          <label>
            Start Date
            <input
              type="date"
              name="startDate"
              value={f.startDate}
              onChange={c}
            />
          </label>
          <label>
            Next Billing Date
            <input
              type="date"
              name="nextBillingDate"
              value={f.nextBillingDate}
              onChange={c}
              required
            />
          </label>
          <label>
            Status
            <select name="status" value={f.status} onChange={c}>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </div>
        <label className="fin-check">
          <input
            type="checkbox"
            name="autoRenew"
            checked={f.autoRenew}
            onChange={c}
          />{' '}
          Auto renew
        </label>
        <label>
          Notes
          <textarea rows="3" name="notes" value={f.notes} onChange={c} />
        </label>
        <footer>
          <button type="button" className="fin-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="fin-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </footer>
      </form>
    </FinanceModal>
  )
}
