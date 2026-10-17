import React, { useEffect, useMemo, useState } from 'react'

import '../../styles/finance.css'

import {
  Download,
  TrendingUp,
  TrendingDown,
  Wallet,
  RefreshCw,
} from 'lucide-react'

import { getIncome, getExpenses } from '../../services/financeService'
import { money, formatDate } from '../../lib/format'
import DateRange from '../../components/finance/DateRange'
import { SkeletonCards, SkeletonRows } from '../../components/ui/Skeleton'
import { useToast } from '../../components/ui/UiProvider.jsx'

// ============================================================
// HELPERS
// ============================================================

const nice = (value = '') =>
  value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')


// ============================================================
// REPORTS PAGE
// ============================================================

export default function ReportsPage() {
  const toast = useToast()
  const [income, setIncome] = useState([])

  const [expenses, setExpenses] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [range, setRange] = useState({
    startDate: '',
    endDate: '',
  })

  // ==========================================================
  // LOAD REPORT
  // ==========================================================

  const loadReport = async () => {
    try {
      setLoading(true)
      setError('')

      const params = {}

      if (range.startDate) {
        params.startDate = range.startDate
      }

      if (range.endDate) {
        params.endDate = range.endDate
      }

      const [incomeResponse, expenseResponse] = await Promise.all([
        getIncome(params),
        getExpenses(params),
      ])


      setIncome(
        Array.isArray(incomeResponse)
          ? incomeResponse
          : incomeResponse?.income || [],
      )

      setExpenses(
        Array.isArray(expenseResponse)
          ? expenseResponse
          : expenseResponse?.expenses || [],
      )
    } catch (error) {
      console.error('Financial reports error:', error)

      setError(
        error.response?.data?.message || 'Unable to load financial report.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReport()
  }, [range.startDate, range.endDate])

  // ==========================================================
  // PAID TRANSACTIONS
  // ==========================================================

  const paidIncome = useMemo(
    () => income.filter((item) => item.status === 'paid'),
    [income],
  )

  const paidExpenses = useMemo(
    () => expenses.filter((item) => item.status === 'paid'),
    [expenses],
  )

  // ==========================================================
  // TOTALS
  // ==========================================================

  const totalRevenue = useMemo(
    () =>
      paidIncome.reduce((total, item) => total + Number(item.amount || 0), 0),
    [paidIncome],
  )

  const totalExpenses = useMemo(
    () =>
      paidExpenses.reduce((total, item) => total + Number(item.amount || 0), 0),
    [paidExpenses],
  )

  const netProfit = totalRevenue - totalExpenses

  // ==========================================================
  // REVENUE BY CATEGORY
  // ==========================================================

  const revenueByCategory = useMemo(() => {
    return paidIncome.reduce((result, item) => {
      const category = item.category || 'other'

      if (!result[category]) {
        result[category] = 0
      }

      result[category] += Number(item.amount || 0)

      return result
    }, {})
  }, [paidIncome])

  // ==========================================================
  // EXPENSES BY CATEGORY
  // ==========================================================

  const expenseByCategory = useMemo(() => {
    return paidExpenses.reduce((result, item) => {
      const category = item.category || 'other'

      if (!result[category]) {
        result[category] = 0
      }

      result[category] += Number(item.amount || 0)

      return result
    }, {})
  }, [paidExpenses])

  // ==========================================================
  // ALL TRANSACTIONS
  // ==========================================================

  const transactions = useMemo(() => {
    const incomeRows = income.map((item) => ({
      id: item._id,
      type: 'Income',
      description: item.description,
      category: item.category,
      date: item.paymentDate,
      amount: Number(item.amount || 0),
      status: item.status,
      party: item.clientName || '',
    }))

    const expenseRows = expenses.map((item) => ({
      id: item._id,
      type: 'Expense',
      description: item.description,
      category: item.category,
      date: item.expenseDate,
      amount: Number(item.amount || 0),
      status: item.status,
      party: item.vendor || '',
    }))

    return [...incomeRows, ...expenseRows].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    )
  }, [income, expenses])

  // ==========================================================
  // CSV EXPORT
  // ==========================================================

  const exportCSV = () => {
    if (!transactions.length) {
      toast.info('There are no transactions to export.')

      return
    }

    const rows = [
      [
        'Type',
        'Description',
        'Client / Vendor',
        'Category',
        'Status',
        'Date',
        'Amount',
      ],

      ...transactions.map((item) => [
        item.type,
        item.description,
        item.party,
        nice(item.category),
        nice(item.status),
        formatDate(item.date),
        item.amount,
      ]),
    ]

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`)
          .join(','),
      )
      .join('\n')

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url

    link.download = `financial-report-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading && !income.length && !expenses.length) {
    return (
      <div className="fin-page">
        <SkeletonCards count={3} />

        <div className="fin-card pad">
          <SkeletonRows rows={5} columns={4} />
        </div>
      </div>
    )
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="fin-page">
      {/* HEADER */}

      <div className="fin-heading">
        <div>
          <h1>Financial Reports</h1>

          <p>
            Review financial performance by category and export transaction
            data.
          </p>
        </div>

        <button
          className="fin-btn"
          onClick={exportCSV}
          disabled={!transactions.length}
        >
          <Download size={17} />
          Export CSV
        </button>
      </div>

      {/* DATE RANGE */}

      <DateRange value={range} onChange={setRange} />

      {/* ERROR */}

      {error && <div className="fin-error">{error}</div>}

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="fin-stats">
        <div>
          <TrendingUp />

          <span>Total Revenue</span>

          <strong className="positive">{money(totalRevenue)}</strong>

          <small>{paidIncome.length} paid transactions</small>
        </div>

        <div>
          <TrendingDown />

          <span>Total Expenses</span>

          <strong className="negative">{money(totalExpenses)}</strong>

          <small>{paidExpenses.length} paid transactions</small>
        </div>

        <div>
          <Wallet />

          <span>Net Profit</span>

          <strong className={netProfit >= 0 ? 'positive' : 'negative'}>
            {money(netProfit)}
          </strong>

          <small>Revenue − expenses</small>
        </div>
      </div>

      {/* ======================================================
          CATEGORY REPORTS
      ====================================================== */}

      <div className="fin-grid-2">
        {/* REVENUE */}

        <div className="fin-card pad">
          <h2>Revenue by Category</h2>

          {Object.keys(revenueByCategory).length ? (
            <div className="fin-kv">
              {Object.entries(revenueByCategory).map(([category, value]) => (
                <React.Fragment key={category}>
                  <span>{nice(category)}</span>

                  <b className="positive">{money(value)}</b>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="fin-empty">
              <p>No paid income recorded.</p>
            </div>
          )}
        </div>

        {/* EXPENSES */}

        <div className="fin-card pad">
          <h2>Expenses by Category</h2>

          {Object.keys(expenseByCategory).length ? (
            <div className="fin-kv">
              {Object.entries(expenseByCategory).map(([category, value]) => (
                <React.Fragment key={category}>
                  <span>{nice(category)}</span>

                  <b className="negative">{money(value)}</b>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="fin-empty">
              <p>No paid expenses recorded.</p>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================
          TRANSACTIONS
      ====================================================== */}

      <div className="fin-card pad">
        <div className="fin-section-heading">
          <div>
            <h2>Transaction Report</h2>

            <p>
              {transactions.length} transaction
              {transactions.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        {transactions.length ? (
          <div className="fin-table-wrap">
            <table className="fin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Client / Vendor</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((item) => (
                  <tr key={`${item.type}-${item.id}`}>
                    <td>{formatDate(item.date)}</td>

                    <td>
                      <span
                        className={
                          item.type === 'Income'
                            ? 'fin-type income'
                            : 'fin-type outgoing'
                        }
                      >
                        {item.type}
                      </span>
                    </td>

                    <td>{item.description}</td>

                    <td>{item.party || '-'}</td>

                    <td>{nice(item.category)}</td>

                    <td>{nice(item.status)}</td>

                    <td
                      className={
                        item.type === 'Income' ? 'positive' : 'negative'
                      }
                    >
                      {item.type === 'Expense' ? '-' : ''}

                      {money(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="fin-empty">
            <Wallet size={30} />

            <h3>No transactions</h3>

            <p>Income and expenses will appear here once recorded.</p>
          </div>
        )}
      </div>
    </div>
  )
}
