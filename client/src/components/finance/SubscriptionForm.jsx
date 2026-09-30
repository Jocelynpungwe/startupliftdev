import React, { useEffect, useState } from 'react'
import FinanceModal from './FinanceModal'

const getToday = () => {
  return new Date().toISOString().slice(0, 10)
}

const initialForm = {
  name: '',
  type: 'outgoing',
  amount: '',
  billingCycle: 'monthly',
  party: '',
  startDate: getToday(),
  nextBillingDate: getToday(),
  status: 'active',
  autoRenew: true,

  // Used when subscription is incoming
  incomeCategory: 'maintenance',

  // Used when subscription is outgoing
  expenseCategory: 'software',

  paymentMethod: 'bank-transfer',

  // Used for P&L
  isDirectCost: false,

  notes: '',
}

export default function SubscriptionForm({ item, onClose, onSave }) {
  const [formData, setFormData] = useState(initialForm)

  const [saving, setSaving] = useState(false)

  const [error, setError] = useState('')

  const isEditing = Boolean(item)

  // ==========================================
  // LOAD EXISTING SUBSCRIPTION
  // ==========================================

  useEffect(() => {
    if (!item) {
      setFormData(initialForm)
      return
    }

    setFormData({
      name: item.name || '',

      type: item.type || 'outgoing',

      amount: item.amount ?? '',

      billingCycle: item.billingCycle || 'monthly',

      party: item.party || '',

      startDate: item.startDate
        ? new Date(item.startDate).toISOString().slice(0, 10)
        : getToday(),

      nextBillingDate: item.nextBillingDate
        ? new Date(item.nextBillingDate).toISOString().slice(0, 10)
        : getToday(),

      status: item.status || 'active',

      autoRenew: item.autoRenew ?? true,

      incomeCategory: item.incomeCategory || 'maintenance',

      expenseCategory: item.expenseCategory || 'software',

      paymentMethod: item.paymentMethod || 'bank-transfer',

      isDirectCost: item.isDirectCost ?? false,

      notes: item.notes || '',
    })
  }, [item])

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((current) => ({
      ...current,

      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)
      setError('')

      const data = {
        ...formData,

        amount: Number(formData.amount),
      }

      await onSave(data)

      onClose()
    } catch (error) {
      console.error('Save subscription error:', error)

      setError(error.response?.data?.message || 'Unable to save subscription.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <FinanceModal
      title={isEditing ? 'Edit Subscription' : 'Add Subscription'}
      subtitle={
        formData.type === 'incoming'
          ? 'Track recurring revenue from a client.'
          : 'Track recurring business expenses.'
      }
      onClose={onClose}
    >
      <form className="fin-form" onSubmit={handleSubmit}>
        {/* ERROR */}

        {error && <div className="fin-error">{error}</div>}

        {/* SUBSCRIPTION NAME */}

        <label>
          Subscription Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={
              formData.type === 'incoming'
                ? 'Website Maintenance Plan'
                : 'Adobe Creative Cloud'
            }
            required
          />
        </label>

        <div className="fin-form-grid">
          {/* TYPE */}

          <label>
            Subscription Type
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="incoming">Incoming Revenue</option>

              <option value="outgoing">Outgoing Expense</option>
            </select>
          </label>

          {/* AMOUNT */}

          <label>
            Amount
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </label>

          {/* BILLING CYCLE */}

          <label>
            Billing Cycle
            <select
              name="billingCycle"
              value={formData.billingCycle}
              onChange={handleChange}
            >
              <option value="monthly">Monthly</option>

              <option value="quarterly">Quarterly</option>

              <option value="annually">Annually</option>
            </select>
          </label>

          {/* CLIENT / VENDOR */}

          <label>
            {formData.type === 'incoming' ? 'Client' : 'Vendor'}

            <input
              type="text"
              name="party"
              value={formData.party}
              onChange={handleChange}
              placeholder={
                formData.type === 'incoming' ? 'Client name' : 'Vendor name'
              }
            />
          </label>

          {/* PAYMENT METHOD */}

          <label>
            Payment Method
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="bank-transfer">Bank Transfer</option>

              <option value="credit-card">Credit Card</option>

              <option value="cash">Cash</option>

              <option value="paypal">PayPal</option>

              <option value="stripe">Stripe</option>

              <option value="other">Other</option>
            </select>
          </label>

          {/* STATUS */}

          <label>
            Status
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>

              <option value="paused">Paused</option>

              <option value="cancelled">Cancelled</option>
            </select>
          </label>

          {/* START DATE */}

          <label>
            Start Date
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </label>

          {/* NEXT BILLING DATE */}

          <label>
            Next Billing Date
            <input
              type="date"
              name="nextBillingDate"
              value={formData.nextBillingDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {/* =====================================
            INCOMING SUBSCRIPTION
        ===================================== */}

        {formData.type === 'incoming' && (
          <div className="fin-form-section">
            <h3>Revenue Settings</h3>

            <p>
              These settings determine how this subscription appears as income
              when payment is recorded.
            </p>

            <label>
              Revenue Category
              <select
                name="incomeCategory"
                value={formData.incomeCategory}
                onChange={handleChange}
              >
                <option value="website-development">Website Development</option>

                <option value="web-application">Web Application</option>

                <option value="maintenance">Maintenance</option>

                <option value="hosting">Hosting</option>

                <option value="seo">SEO</option>

                <option value="digital-marketing">Digital Marketing</option>

                <option value="consulting">Consulting</option>

                <option value="other">Other</option>
              </select>
            </label>
          </div>
        )}

        {/* =====================================
            OUTGOING SUBSCRIPTION
        ===================================== */}

        {formData.type === 'outgoing' && (
          <div className="fin-form-section">
            <h3>Expense Settings</h3>

            <p>
              These settings determine how this subscription appears as an
              expense when payment is recorded.
            </p>

            <label>
              Expense Category
              <select
                name="expenseCategory"
                value={formData.expenseCategory}
                onChange={handleChange}
              >
                <option value="software">Software</option>

                <option value="marketing">Marketing</option>

                <option value="payroll">Payroll</option>

                <option value="contractor">Contractor</option>

                <option value="office">Office</option>

                <option value="equipment">Equipment</option>

                <option value="professional-services">
                  Professional Services
                </option>

                <option value="travel">Travel</option>

                <option value="bank-fees">Bank Fees</option>

                <option value="taxes">Taxes</option>

                <option value="direct-cost">Direct Cost</option>

                <option value="other">Other</option>
              </select>
            </label>

            {/* DIRECT COST */}

            <label className="fin-check">
              <input
                type="checkbox"
                name="isDirectCost"
                checked={formData.isDirectCost}
                onChange={handleChange}
              />

              <span>Treat this subscription as a direct cost</span>
            </label>
          </div>
        )}

        {/* AUTO RENEW */}

        <label className="fin-check">
          <input
            type="checkbox"
            name="autoRenew"
            checked={formData.autoRenew}
            onChange={handleChange}
          />

          <span>
            Automatically move the next billing date after recording payment
          </span>
        </label>

        {/* NOTES */}

        <label>
          Notes
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional subscription information..."
            rows="4"
          />
        </label>

        {/* ACTIONS */}

        <footer>
          <button
            type="button"
            className="fin-btn secondary"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button type="submit" className="fin-btn" disabled={saving}>
            {saving
              ? 'Saving...'
              : isEditing
                ? 'Save Changes'
                : 'Add Subscription'}
          </button>
        </footer>
      </form>
    </FinanceModal>
  )
}
