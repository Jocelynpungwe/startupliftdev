import React, { useEffect, useMemo, useState } from 'react'

import '../../styles/finance.css'

import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  RefreshCw,
  CalendarDays,
} from 'lucide-react'

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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)

const getMonthKey = (date) => {
  const d = new Date(date)

  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

const getMonthLabel = (date) => {
  return new Date(date).toLocaleDateString('en-CA', {
    month: 'long',
    year: 'numeric',
  })
}

// ============================================================
// CASH FLOW PAGE
// ============================================================

export default function CashFlowPage() {
  const [summaryData, setSummaryData] = useState(null)

  const [income, setIncome] = useState([])

  const [expenses, setExpenses] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [range, setRange] = useState({
    startDate: '',
    endDate: '',
  })

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  const loadCashFlow = async () => {
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
          getIncome({
            ...params,
            status: 'paid',
          }),
          getExpenses({
            ...params,
            status: 'paid',
          }),
        ])

      console.log('Cash flow summary:', summaryResponse)

      console.log('Cash flow income:', incomeResponse)

      console.log('Cash flow expenses:', expenseResponse)

      setSummaryData(summaryResponse)

      setIncome(incomeResponse?.income || [])

      setExpenses(expenseResponse?.expenses || [])
    } catch (error) {
      console.error('Cash flow error:', error)

      setError(error.response?.data?.message || 'Unable to load cash flow.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCashFlow()
  }, [range.startDate, range.endDate])

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const summary = summaryData?.summary || {}

  const cashIn = Number(summary.totalIncome || 0)

  const cashOut = Number(summary.totalExpenses || 0)

  const netCashFlow = cashIn - cashOut

  // ==========================================================
  // MONTHLY CASH FLOW
  // ==========================================================

  const monthlyCashFlow = useMemo(() => {
    const months = {}

    // ----------------------------------------
    // INCOME
    // ----------------------------------------

    income.forEach((item) => {
      if (!item.paymentDate) {
        return
      }

      const key = getMonthKey(item.paymentDate)

      if (!months[key]) {
        months[key] = {
          key,
          date: item.paymentDate,
          cashIn: 0,
          cashOut: 0,
        }
      }

      months[key].cashIn += Number(item.amount || 0)
    })

    // ----------------------------------------
    // EXPENSES
    // ----------------------------------------

    expenses.forEach((item) => {
      if (!item.expenseDate) {
        return
      }

      const key = getMonthKey(item.expenseDate)

      if (!months[key]) {
        months[key] = {
          key,
          date: item.expenseDate,
          cashIn: 0,
          cashOut: 0,
        }
      }

      months[key].cashOut += Number(item.amount || 0)
    })

    return Object.values(months)
      .map((month) => ({
        ...month,

        month: getMonthLabel(month.date),

        net: month.cashIn - month.cashOut,
      }))
      .sort((a, b) => b.key.localeCompare(a.key))
  }, [income, expenses])

  // ==========================================================
  // TOTALS FROM TRANSACTIONS
  // ==========================================================

  const transactionCashIn = income.reduce(
    (total, item) => total + Number(item.amount || 0),
    0,
  )

  const transactionCashOut = expenses.reduce(
    (total, item) => total + Number(item.amount || 0),
    0,
  )

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading && !summaryData) {
    return (
      <div className="fin-page">
        <div className="fin-card pad">
          <div className="fin-empty">
            <RefreshCw size={30} />

            <p>Loading cash flow...</p>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="fin-page">
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="fin-heading">
        <div>
          <h1>Cash Flow</h1>

          <p>Cash received versus cash paid from recorded paid transactions.</p>
        </div>

        {/* DATE RANGE */}

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
          SUMMARY
      ========================================== */}

      <div className="fin-stats">
        {/* CASH IN */}

        <div>
          <ArrowDownLeft />

          <span>Cash In</span>

          <strong className="positive">{money(cashIn)}</strong>

          <small>
            {income.length} paid income
            {income.length === 1 ? ' transaction' : ' transactions'}
          </small>
        </div>

        {/* CASH OUT */}

        <div>
          <ArrowUpRight />

          <span>Cash Out</span>

          <strong className="negative">{money(cashOut)}</strong>

          <small>
            {expenses.length} paid expense
            {expenses.length === 1 ? ' transaction' : ' transactions'}
          </small>
        </div>

        {/* NET CASH */}

        <div>
          <Wallet />

          <span>Net Cash Flow</span>

          <strong className={netCashFlow >= 0 ? 'positive' : 'negative'}>
            {money(netCashFlow)}
          </strong>

          <small>Cash in − cash out</small>
        </div>
      </div>

      {/* ==========================================
          MONTHLY CASH FLOW
      ========================================== */}

      <div className="fin-card pad">
        <div className="fin-section-heading">
          <div>
            <h2>Monthly Cash Flow</h2>

            <p>Breakdown of paid income and expenses by month.</p>
          </div>

          <CalendarDays size={20} />
        </div>

        {monthlyCashFlow.length > 0 ? (
          <div className="fin-table-wrap">
            <table className="fin-table">
              <thead>
                <tr>
                  <th>Month</th>

                  <th>Cash In</th>

                  <th>Cash Out</th>

                  <th>Net Cash Flow</th>
                </tr>
              </thead>

              <tbody>
                {monthlyCashFlow.map((month) => (
                  <tr key={month.key}>
                    <td>
                      <strong>{month.month}</strong>
                    </td>

                    <td className="positive">{money(month.cashIn)}</td>

                    <td className="negative">{money(month.cashOut)}</td>

                    <td>
                      <strong
                        className={month.net >= 0 ? 'positive' : 'negative'}
                      >
                        {money(month.net)}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* TOTAL */}

              <tfoot>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>

                  <td className="positive">
                    <strong>{money(transactionCashIn)}</strong>
                  </td>

                  <td className="negative">
                    <strong>{money(transactionCashOut)}</strong>
                  </td>

                  <td>
                    <strong
                      className={
                        transactionCashIn - transactionCashOut >= 0
                          ? 'positive'
                          : 'negative'
                      }
                    >
                      {money(transactionCashIn - transactionCashOut)}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="fin-empty">
            <Wallet size={32} />

            <h3>No cash flow data</h3>

            <p>Paid income and expenses will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
