import React, { useEffect, useState } from 'react'

import '../../styles/finance.css'

import {
  DollarSign,
  TrendingDown,
  ChartNoAxesCombined,
  RefreshCw,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

import {
  getFinanceSummary,
  getIncome,
  getExpenses,
} from '../../services/financeService'

// ============================================================
// HELPERS
// ============================================================

const money = (value) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

const formatDate = (date) => {
  if (!date) return '-'

  return new Date(date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// ============================================================
// DASHBOARD
// ============================================================

export default function FinanceDashboard() {
  const [data, setData] = useState(null)

  const [income, setIncome] = useState([])

  const [expenses, setExpenses] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [range, setRange] = useState({
    startDate: '',
    endDate: '',
  })

  // ==========================================================
  // LOAD DASHBOARD
  // ==========================================================

  const loadDashboard = async () => {
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

      const [summaryResponse, incomeResponse, expenseResponse] =
        await Promise.all([
          getFinanceSummary(params),
          getIncome(params),
          getExpenses(params),
        ])

      console.log('Finance summary:', summaryResponse)

      console.log('Income response:', incomeResponse)

      console.log('Expense response:', expenseResponse)

      setData(summaryResponse)

      setIncome(incomeResponse?.income || incomeResponse?.data || [])

      setExpenses(expenseResponse?.expenses || expenseResponse?.data || [])
    } catch (error) {
      console.error('Finance dashboard error:', error)

      setError(
        error.response?.data?.message || 'Unable to load financial data.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [range.startDate, range.endDate])

  // ==========================================================
  // BACKEND SUMMARY
  // ==========================================================

  const summary = data?.summary || {}

  // Support both old and new backend property names

  const revenue = Number(summary.totalIncome ?? summary.revenue ?? 0)

  const totalExpenses = Number(summary.totalExpenses ?? 0)

  const netProfit = Number(summary.netProfit ?? revenue - totalExpenses)

  const profitMargin = Number(
    summary.profitMargin ??
      summary.margin ??
      (revenue > 0 ? (netProfit / revenue) * 100 : 0),
  )

  const mrr = Number(summary.monthlyRecurringRevenue ?? summary.mrr ?? 0)

  const monthlySubscriptions = Number(
    summary.monthlySubscriptionCosts ?? summary.monthlySubscriptions ?? 0,
  )

  const netRecurring = Number(
    summary.netRecurring ?? mrr - monthlySubscriptions,
  )

  // ==========================================================
  // CALCULATE DIRECT COSTS
  // ==========================================================

  const directCosts = expenses
    .filter(
      (expense) => expense.status === 'paid' && expense.isDirectCost === true,
    )
    .reduce((total, expense) => total + Number(expense.amount || 0), 0)

  const grossProfit = revenue - directCosts

  // ==========================================================
  // MONTHLY CHART DATA
  // ==========================================================

  const createMonthlyData = () => {
    const months = {}

    income.forEach((item) => {
      if (item.status && item.status !== 'paid') {
        return
      }

      if (!item.paymentDate) {
        return
      }

      const date = new Date(item.paymentDate)

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0',
      )}`

      if (!months[key]) {
        months[key] = {
          key,
          month: date.toLocaleDateString('en-CA', {
            month: 'short',
            year: '2-digit',
          }),
          revenue: 0,
          expenses: 0,
        }
      }

      months[key].revenue += Number(item.amount || 0)
    })

    expenses.forEach((item) => {
      if (item.status && item.status !== 'paid') {
        return
      }

      if (!item.expenseDate) {
        return
      }

      const date = new Date(item.expenseDate)

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0',
      )}`

      if (!months[key]) {
        months[key] = {
          key,
          month: date.toLocaleDateString('en-CA', {
            month: 'short',
            year: '2-digit',
          }),
          revenue: 0,
          expenses: 0,
        }
      }

      months[key].expenses += Number(item.amount || 0)
    })

    return Object.values(months).sort((a, b) => a.key.localeCompare(b.key))
  }

  const monthlyData = data?.monthly?.length ? data.monthly : createMonthlyData()

  // ==========================================================
  // RECENT TRANSACTIONS
  // ==========================================================

  const incomeTransactions = income.map((item) => ({
    id: item._id,
    type: 'income',
    description: item.description || 'Income',
    amount: Number(item.amount || 0),
    date: item.paymentDate || item.createdAt,
    status: item.status,
  }))

  const expenseTransactions = expenses.map((item) => ({
    id: item._id,
    type: 'expense',
    description: item.description || 'Expense',
    amount: Number(item.amount || 0),
    date: item.expenseDate || item.createdAt,
    status: item.status,
  }))

  const recentTransactions = data?.recent?.length
    ? data.recent
    : [...incomeTransactions, ...expenseTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 8)

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading && !data) {
    return (
      <div className="fin-page">
        <div className="fin-card pad">
          <div className="fin-empty">
            <RefreshCw size={30} />

            <p>Loading financial dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="fin-page">
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="fin-heading">
        <div>
          <h1>Financial Overview</h1>

          <p>Revenue, costs, profit and recurring performance in one place.</p>
        </div>

        <div className="fin-date-range">
          <input
            type="date"
            value={range.startDate}
            onChange={(e) =>
              setRange({
                ...range,
                startDate: e.target.value,
              })
            }
          />

          <span>to</span>

          <input
            type="date"
            value={range.endDate}
            onChange={(e) =>
              setRange({
                ...range,
                endDate: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* ERROR */}

      {error && <div className="fin-error">{error}</div>}

      {/* ==========================================
          MAIN STAT CARDS
      ========================================== */}

      <div className="fin-stats four">
        {/* REVENUE */}

        <div>
          <DollarSign />

          <span>Revenue</span>

          <strong>{money(revenue)}</strong>

          <small>Paid income</small>
        </div>

        {/* EXPENSES */}

        <div>
          <TrendingDown />

          <span>Expenses</span>

          <strong>{money(totalExpenses)}</strong>

          <small>Paid expenses</small>
        </div>

        {/* NET PROFIT */}

        <div>
          <ChartNoAxesCombined />

          <span>Net Profit</span>

          <strong>{money(netProfit)}</strong>

          <small>{profitMargin.toFixed(1)}% margin</small>
        </div>

        {/* RECURRING */}

        <div>
          <RefreshCw />

          <span>Net Recurring / mo.</span>

          <strong>{money(netRecurring)}</strong>

          <small>Revenue minus recurring costs</small>
        </div>
      </div>

      {/* ==========================================
          CHART + PROFIT
      ========================================== */}

      <div className="fin-grid-2">
        {/* CHART */}

        <div className="fin-card pad">
          <h2>Revenue vs Expenses</h2>

          <div className="fin-chart">
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip formatter={(value) => money(value)} />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="currentColor"
                    strokeWidth={2}
                  />

                  <Line
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="fin-empty">
                <ChartNoAxesCombined size={30} />

                <p>No transaction data available yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* PROFIT SNAPSHOT */}

        <div className="fin-card pad">
          <h2>Profit Snapshot</h2>

          <div className="fin-kv">
            <span>Revenue</span>

            <b>{money(revenue)}</b>

            <span>Direct costs</span>

            <b>{money(directCosts)}</b>

            <span>Gross profit</span>

            <b>{money(grossProfit)}</b>

            <span>Net profit</span>

            <b>{money(netProfit)}</b>

            <span>MRR</span>

            <b>{money(mrr)}</b>

            <span>Subscription costs / mo.</span>

            <b>{money(monthlySubscriptions)}</b>
          </div>
        </div>
      </div>

      {/* ==========================================
          TRANSACTION COUNTS
      ========================================== */}

      <div className="fin-stats">
        <div>
          <ArrowUpRight />

          <span>Income Transactions</span>

          <strong>{income.length}</strong>
        </div>

        <div>
          <ArrowDownRight />

          <span>Expense Transactions</span>

          <strong>{expenses.length}</strong>
        </div>

        <div>
          <Wallet />

          <span>Gross Profit</span>

          <strong>{money(grossProfit)}</strong>
        </div>

        <div>
          <RefreshCw />

          <span>MRR</span>

          <strong>{money(mrr)}</strong>
        </div>
      </div>

      {/* ==========================================
          RECENT TRANSACTIONS
      ========================================== */}

      <div className="fin-card pad">
        <h2>Recent Transactions</h2>

        {recentTransactions.length > 0 ? (
          <div className="fin-recent">
            {recentTransactions.map((transaction) => (
              <div key={`${transaction.type}-${transaction.id}`}>
                <span>
                  <b>{transaction.description}</b>

                  <small>
                    {formatDate(transaction.date)}

                    {' · '}

                    {transaction.type === 'income' ? 'Income' : 'Expense'}
                  </small>
                </span>

                <strong
                  className={
                    transaction.type === 'income' ? 'positive' : 'negative'
                  }
                >
                  {transaction.type === 'income' ? '+' : '-'}

                  {money(transaction.amount)}
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="fin-empty">
            <Wallet size={30} />

            <p>No transactions yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
