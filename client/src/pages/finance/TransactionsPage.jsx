import React, { useEffect, useMemo, useState } from 'react'
import '../../styles/finance.css'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import TransactionForm from '../../components/finance/TransactionForm'
import * as api from '../../services/financeService'
import { money } from '../../lib/format'
import { useConfirm, useToast } from '../../components/ui/UiProvider.jsx'
const nice = (s) =>
  s
    ? String(s)
        .split('-')
        .map((x) => x[0].toUpperCase() + x.slice(1))
        .join(' ')
    : '-'
const date = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '-'
export default function TransactionsPage({ type }) {
  const confirm = useConfirm()
  const toast = useToast()
  const isIncome = type === 'income'
  const [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [modal, setModal] = useState(false),
    [editing, setEditing] = useState(null),
    [filters, setFilters] = useState({
      search: '',
      status: '',
      category: '',
      startDate: '',
      endDate: '',
    })
  const load = async () => {
    try {
      setLoading(true)
      const r = isIncome
        ? await api.getIncome(filters)
        : await api.getExpenses(filters)
      setItems(r[isIncome ? 'income' : 'expenses'] || [])
    } catch (e) {
      setError(e.response?.data?.message || 'Unable to load records')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const t = setTimeout(load, 250)
    return () => clearTimeout(t)
  }, [
    type,
    filters.search,
    filters.status,
    filters.category,
    filters.startDate,
    filters.endDate,
  ])
  const totals = useMemo(
    () => ({
      paid: items
        .filter((x) => x.status === 'paid')
        .reduce((s, x) => s + x.amount, 0),
      pending: items
        .filter((x) => x.status !== 'paid')
        .reduce((s, x) => s + x.amount, 0),
    }),
    [items],
  )
  const save = async (data) => {
    if (editing) {
      isIncome
        ? await api.updateIncome(editing._id, data)
        : await api.updateExpense(editing._id, data)
    } else {
      isIncome ? await api.createIncome(data) : await api.createExpense(data)
    }
    await load()
  }
  const del = async (x) => {
    const ok = await confirm({
      title: `Delete "${x.description}"?`,
      message: `This ${isIncome ? 'income' : 'expense'} record will be permanently deleted and your totals will change.`,
      confirmLabel: 'Delete',
      tone: 'danger',
    })
    if (!ok) return
    try {
      if (isIncome) await api.deleteIncome(x._id)
      else await api.deleteExpense(x._id)
      toast.success('Record deleted.')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete the record.')
    }
  }
  const cats = isIncome
    ? [
        'website-development',
        'web-application',
        'maintenance',
        'hosting',
        'seo',
        'digital-marketing',
        'consulting',
        'other',
      ]
    : [
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
  return (
    <div className="fin-page">
      <div className="fin-heading">
        <div>
          <h1>{isIncome ? 'Income' : 'Expenses'}</h1>
          <p>
            {isIncome
              ? 'Track revenue received and expected.'
              : 'Track business costs and direct costs.'}
          </p>
        </div>
        <button
          className="fin-btn"
          onClick={() => {
            setEditing(null)
            setModal(true)
          }}
        >
          <Plus size={17} /> Add {isIncome ? 'Income' : 'Expense'}
        </button>
      </div>
      <div className="fin-stats">
        <div>
          <span>{isIncome ? 'Paid Income' : 'Paid Expenses'}</span>
          <strong>{money(totals.paid)}</strong>
        </div>
        <div>
          <span>Pending</span>
          <strong>{money(totals.pending)}</strong>
        </div>
        <div>
          <span>Transactions</span>
          <strong>{items.length}</strong>
        </div>
      </div>
      <div className="fin-card">
        <div className="fin-filters">
          <label className="fin-search">
            <Search size={16} />
            <input
              placeholder="Search..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            {isIncome && <option value="partially-paid">Partially Paid</option>}
          </select>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All categories</option>
            {cats.map((x) => (
              <option key={x} value={x}>
                {nice(x)}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </div>
        {error && <div className="fin-error">{error}</div>}
        <div className="fin-table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>{isIncome ? 'Client' : 'Vendor'}</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="fin-empty">
                    Loading...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="fin-empty">
                    No records found.
                  </td>
                </tr>
              ) : (
                items.map((x) => (
                  <tr key={x._id}>
                    <td>
                      <strong>{x.description}</strong>
                      <small>{x.notes}</small>
                    </td>
                    <td>{nice(x.category)}</td>
                    <td>{x[isIncome ? 'clientName' : 'vendor'] || '-'}</td>
                    <td>{date(x[isIncome ? 'paymentDate' : 'expenseDate'])}</td>
                    <td>
                      <span className={`fin-badge ${x.status}`}>
                        {nice(x.status)}
                      </span>
                    </td>
                    <td className={isIncome ? 'positive' : 'negative'}>
                      {isIncome ? '+' : '-'}
                      {money(x.amount)}
                    </td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <TransactionForm
          type={type}
          item={editing}
          onClose={() => setModal(false)}
          onSave={save}
        />
      )}
    </div>
  )
}
