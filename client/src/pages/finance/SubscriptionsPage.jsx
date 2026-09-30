import React, { useEffect, useMemo, useState } from 'react'
import '../../styles/finance.css'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import SubscriptionForm from '../../components/finance/SubscriptionForm'
import * as api from '../../services/financeService'
const money = (n) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(
    n || 0,
  )
const monthly = (s) =>
  s.billingCycle === 'annually'
    ? s.amount / 12
    : s.billingCycle === 'quarterly'
      ? s.amount / 3
      : s.amount
export default function SubscriptionsPage() {
  const [items, setItems] = useState([]),
    [modal, setModal] = useState(false),
    [editing, setEditing] = useState(null)
  const load = () =>
    api.getSubscriptions().then((r) => setItems(r.subscriptions || []))
  useEffect(() => {
    load()
  }, [])
  const active = items.filter((x) => x.status === 'active')
  const sums = useMemo(
    () => ({
      mrr: active
        .filter((x) => x.type === 'incoming')
        .reduce((a, x) => a + monthly(x), 0),
      cost: active
        .filter((x) => x.type === 'outgoing')
        .reduce((a, x) => a + monthly(x), 0),
    }),
    [items],
  )
  const save = async (d) => {
    editing
      ? await api.updateSubscription(editing._id, d)
      : await api.createSubscription(d)
    load()
  }
  const del = async (x) => {
    if (confirm(`Delete ${x.name}?`)) {
      await api.deleteSubscription(x._id)
      load()
    }
  }
  return (
    <div className="fin-page">
      <div className="fin-heading">
        <div>
          <h1>Subscriptions</h1>
          <p>Manage recurring client revenue and recurring business costs.</p>
        </div>
        <button
          className="fin-btn"
          onClick={() => {
            setEditing(null)
            setModal(true)
          }}
        >
          <Plus size={17} /> Add Subscription
        </button>
      </div>
      <div className="fin-stats">
        <div>
          <span>Monthly Recurring Revenue</span>
          <strong>{money(sums.mrr)}</strong>
        </div>
        <div>
          <span>Monthly Subscription Costs</span>
          <strong>{money(sums.cost)}</strong>
        </div>
        <div>
          <span>Net Recurring</span>
          <strong>{money(sums.mrr - sums.cost)}</strong>
        </div>
        <div>
          <span>Active</span>
          <strong>{active.length}</strong>
        </div>
      </div>
      <div className="fin-card">
        <div className="fin-table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Party</th>
                <th>Billing</th>
                <th>Next Billing</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x._id}>
                  <td>
                    <strong>{x.name}</strong>
                  </td>
                  <td>{x.type}</td>
                  <td>{x.party || '-'}</td>
                  <td>{x.billingCycle}</td>
                  <td>
                    {new Date(x.nextBillingDate).toLocaleDateString('en-CA')}
                  </td>
                  <td>
                    <span className={`fin-badge ${x.status}`}>{x.status}</span>
                  </td>
                  <td>{money(x.amount)}</td>
                  <td>
                    <div className="fin-actions">
                      <button
                        onClick={() => {
                          setEditing(x)
                          setModal(true)
                        }}
                      >
                        <Pencil size={15} />
                      </button>
                      <button className="danger" onClick={() => del(x)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <SubscriptionForm
          item={editing}
          onClose={() => setModal(false)}
          onSave={save}
        />
      )}
    </div>
  )
}
