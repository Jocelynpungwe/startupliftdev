import React, { useEffect, useMemo, useState } from 'react'

import { Plus, Pencil, Trash2, CircleDollarSign, RefreshCw } from 'lucide-react'

import SubscriptionForm from '../../components/finance/SubscriptionForm'

import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  recordSubscriptionPayment,
} from '../../services/financeService'

// ============================================================
// HELPERS
// ============================================================

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(Number(amount || 0))
}

const formatDate = (date) => {
  if (!date) {
    return '-'
  }

  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

const formatText = (text) => {
  if (!text) {
    return '-'
  }

  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getMonthlyAmount = (subscription) => {
  const amount = Number(subscription.amount || 0)

  switch (subscription.billingCycle) {
    case 'annually':
      return amount / 12

    case 'quarterly':
      return amount / 3

    default:
      return amount
  }
}

// ============================================================
// COMPONENT
// ============================================================

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)

  const [selectedSubscription, setSelectedSubscription] = useState(null)

  const [recordingPaymentId, setRecordingPaymentId] = useState(null)

  const [deletingId, setDeletingId] = useState(null)

  // ============================================================
  // LOAD SUBSCRIPTIONS
  // ============================================================

  const loadSubscriptions = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getSubscriptions()

      setSubscriptions(data.subscriptions || [])
    } catch (error) {
      console.error('Load subscriptions error:', error)

      setError(error.response?.data?.message || 'Unable to load subscriptions.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubscriptions()
  }, [])

  // ============================================================
  // SUMMARY
  // ============================================================

  const summary = useMemo(() => {
    const active = subscriptions.filter((item) => item.status === 'active')

    const monthlyRevenue = active
      .filter((item) => item.type === 'incoming')
      .reduce((total, item) => total + getMonthlyAmount(item), 0)

    const monthlyCosts = active
      .filter((item) => item.type === 'outgoing')
      .reduce((total, item) => total + getMonthlyAmount(item), 0)

    return {
      active: active.length,

      monthlyRevenue,

      monthlyCosts,

      netRecurring: monthlyRevenue - monthlyCosts,
    }
  }, [subscriptions])

  // ============================================================
  // ADD
  // ============================================================

  const handleAdd = () => {
    setSelectedSubscription(null)
    setShowForm(true)
  }

  // ============================================================
  // EDIT
  // ============================================================

  const handleEdit = (subscription) => {
    setSelectedSubscription(subscription)

    setShowForm(true)
  }

  // ============================================================
  // CLOSE FORM
  // ============================================================

  const handleCloseForm = () => {
    setShowForm(false)

    setSelectedSubscription(null)
  }

  // ============================================================
  // SAVE
  // ============================================================

  const handleSave = async (subscriptionData) => {
    if (selectedSubscription) {
      await updateSubscription(selectedSubscription._id, subscriptionData)
    } else {
      await createSubscription(subscriptionData)
    }

    await loadSubscriptions()
  }

  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = async (subscription) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${subscription.name}"?`,
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(subscription._id)

      setError('')

      await deleteSubscription(subscription._id)

      await loadSubscriptions()
    } catch (error) {
      console.error('Delete subscription error:', error)

      setError(
        error.response?.data?.message || 'Unable to delete subscription.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  // ============================================================
  // RECORD PAYMENT
  // ============================================================

  const handleRecordPayment = async (subscription) => {
    const isIncoming = subscription.type === 'incoming'

    const action = isIncoming ? 'received' : 'paid'

    const confirmed = window.confirm(
      `Record ${formatCurrency(
        subscription.amount,
      )} ${action} for "${subscription.name}"?`,
    )

    if (!confirmed) {
      return
    }

    try {
      setRecordingPaymentId(subscription._id)

      setError('')

      const paymentDate = new Date().toISOString().slice(0, 10)

      const result = await recordSubscriptionPayment(
        subscription._id,
        paymentDate,
      )

      await loadSubscriptions()

      window.alert(result.message || 'Payment recorded successfully.')
    } catch (error) {
      console.error('Record subscription payment error:', error)

      setError(
        error.response?.data?.message ||
          'Unable to record subscription payment.',
      )
    } finally {
      setRecordingPaymentId(null)
    }
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="fin-page">
      {/* HEADER */}

      <div className="fin-heading">
        <div>
          <h1>Subscriptions</h1>

          <p>Manage recurring client revenue and recurring business costs.</p>
        </div>

        <button type="button" className="fin-btn" onClick={handleAdd}>
          <Plus size={17} />
          Add Subscription
        </button>
      </div>

      {/* ERROR */}

      {error && <div className="fin-error">{error}</div>}

      {/* SUMMARY */}

      <div className="fin-stats">
        <div>
          <span>Monthly Recurring Revenue</span>

          <strong>{formatCurrency(summary.monthlyRevenue)}</strong>
        </div>

        <div>
          <span>Monthly Subscription Costs</span>

          <strong>{formatCurrency(summary.monthlyCosts)}</strong>
        </div>

        <div>
          <span>Net Recurring</span>

          <strong>{formatCurrency(summary.netRecurring)}</strong>
        </div>

        <div>
          <span>Active Subscriptions</span>

          <strong>{summary.active}</strong>
        </div>
      </div>

      {/* TABLE */}

      <div className="fin-card">
        {loading ? (
          <div className="fin-empty">
            <RefreshCw size={28} />

            <p>Loading subscriptions...</p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="fin-empty">
            <CircleDollarSign size={38} />

            <h3>No subscriptions</h3>

            <p>Add your first recurring revenue or business subscription.</p>

            <button type="button" className="fin-btn" onClick={handleAdd}>
              <Plus size={17} />
              Add Subscription
            </button>
          </div>
        ) : (
          <div className="fin-table-wrap">
            <table className="fin-table">
              <thead>
                <tr>
                  <th>Subscription</th>

                  <th>Type</th>

                  <th>Client / Vendor</th>

                  <th>Billing</th>

                  <th>Next Billing</th>

                  <th>Last Payment</th>

                  <th>Status</th>

                  <th>Amount</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription._id}>
                    {/* NAME */}

                    <td>
                      <strong>{subscription.name}</strong>

                      {subscription.notes && (
                        <div className="fin-table-note">
                          {subscription.notes}
                        </div>
                      )}
                    </td>

                    {/* TYPE */}

                    <td>
                      <span
                        className={
                          subscription.type === 'incoming'
                            ? 'fin-type incoming'
                            : 'fin-type outgoing'
                        }
                      >
                        {subscription.type === 'incoming'
                          ? 'Revenue'
                          : 'Expense'}
                      </span>
                    </td>

                    {/* PARTY */}

                    <td>{subscription.party || '-'}</td>

                    {/* BILLING */}

                    <td>{formatText(subscription.billingCycle)}</td>

                    {/* NEXT BILLING */}

                    <td>{formatDate(subscription.nextBillingDate)}</td>

                    {/* LAST PAYMENT */}

                    <td>
                      {subscription.lastPaymentDate ? (
                        formatDate(subscription.lastPaymentDate)
                      ) : (
                        <span className="fin-muted">Not recorded</span>
                      )}
                    </td>

                    {/* STATUS */}

                    <td>
                      <span className={`fin-badge ${subscription.status}`}>
                        {formatText(subscription.status)}
                      </span>
                    </td>

                    {/* AMOUNT */}

                    <td>
                      <strong>{formatCurrency(subscription.amount)}</strong>

                      <div className="fin-table-note">
                        {formatText(subscription.billingCycle)}
                      </div>
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="fin-actions">
                        {/* RECORD PAYMENT */}

                        {subscription.status === 'active' && (
                          <button
                            type="button"
                            className="fin-payment-btn"
                            onClick={() => handleRecordPayment(subscription)}
                            disabled={recordingPaymentId === subscription._id}
                            title={
                              subscription.type === 'incoming'
                                ? 'Record payment received'
                                : 'Record payment made'
                            }
                          >
                            {recordingPaymentId === subscription._id ? (
                              <RefreshCw size={15} />
                            ) : (
                              <CircleDollarSign size={15} />
                            )}
                          </button>
                        )}

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() => handleEdit(subscription)}
                          title="Edit subscription"
                        >
                          <Pencil size={15} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          className="danger"
                          onClick={() => handleDelete(subscription)}
                          disabled={deletingId === subscription._id}
                          title="Delete subscription"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FORM */}

      {showForm && (
        <SubscriptionForm
          item={selectedSubscription}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
