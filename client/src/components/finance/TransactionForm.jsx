import React, { useEffect, useState } from 'react'
import FinanceModal from './FinanceModal'
const incomeCats = [
  'website-development',
  'web-application',
  'maintenance',
  'hosting',
  'seo',
  'digital-marketing',
  'consulting',
  'other',
]
const expenseCats = [
  'software',
  'marketing',
  'payroll',
  'contractor',
  'office',
  'equipment',
  'professional-services',
  'travel',
  'bank-fees',
  'taxes',
  'direct-cost',
  'other',
]
const methods = [
  'bank-transfer',
  'credit-card',
  'cash',
  'paypal',
  'stripe',
  'other',
]
const label = (s) =>
  s
    .split('-')
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(' ')
export default function TransactionForm({ type, item, onClose, onSave }) {
  const isIncome = type === 'income'
  const empty = isIncome
    ? {
        description: '',
        amount: '',
        category: '',
        paymentMethod: 'bank-transfer',
        status: 'paid',
        paymentDate: new Date().toISOString().slice(0, 10),
        clientName: '',
        notes: '',
      }
    : {
        description: '',
        amount: '',
        category: '',
        vendor: '',
        paymentMethod: 'bank-transfer',
        status: 'paid',
        expenseDate: new Date().toISOString().slice(0, 10),
        isDirectCost: false,
        notes: '',
      }
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    if (item)
      setForm({
        ...empty,
        ...item,
        [isIncome ? 'paymentDate' : 'expenseDate']: new Date(
          item[isIncome ? 'paymentDate' : 'expenseDate'],
        )
          .toISOString()
          .slice(0, 10),
      })
  }, [item])
  const change = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))
  const submit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      setError('')
      await onSave({ ...form, amount: Number(form.amount) })
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save transaction')
    } finally {
      setSaving(false)
    }
  }
  return (
    <FinanceModal
      title={`${item ? 'Edit' : 'Add'} ${isIncome ? 'Income' : 'Expense'}`}
      subtitle={
        isIncome ? 'Record business revenue.' : 'Record a business cost.'
      }
      onClose={onClose}
    >
      <form className="fin-form" onSubmit={submit}>
        {error && <div className="fin-error">{error}</div>}
        <label>
          Description
          <input
            name="description"
            value={form.description}
            onChange={change}
            required
          />
        </label>
        <div className="fin-form-grid">
          <label>
            Amount
            <input
              type="number"
              min="0"
              step="0.01"
              name="amount"
              value={form.amount}
              onChange={change}
              required
            />
          </label>
          <label>
            Category
            <select
              name="category"
              value={form.category}
              onChange={change}
              required
            >
              <option value="">Select category</option>
              {(isIncome ? incomeCats : expenseCats).map((x) => (
                <option key={x} value={x}>
                  {label(x)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {isIncome ? 'Client' : 'Vendor'}
            <input
              name={isIncome ? 'clientName' : 'vendor'}
              value={form[isIncome ? 'clientName' : 'vendor']}
              onChange={change}
            />
          </label>
          <label>
            Payment Method
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={change}
            >
              {methods.map((x) => (
                <option key={x} value={x}>
                  {label(x)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select name="status" value={form.status} onChange={change}>
              {(isIncome
                ? ['paid', 'pending', 'partially-paid']
                : ['paid', 'pending']
              ).map((x) => (
                <option key={x} value={x}>
                  {label(x)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {isIncome ? 'Payment' : 'Expense'} Date
            <input
              type="date"
              name={isIncome ? 'paymentDate' : 'expenseDate'}
              value={form[isIncome ? 'paymentDate' : 'expenseDate']}
              onChange={change}
              required
            />
          </label>
        </div>
        {!isIncome && (
          <label className="fin-check">
            <input
              type="checkbox"
              name="isDirectCost"
              checked={form.isDirectCost}
              onChange={change}
            />{' '}
            Treat as direct cost / cost of service
          </label>
        )}
        <label>
          Notes
          <textarea
            rows="3"
            name="notes"
            value={form.notes}
            onChange={change}
          />
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
