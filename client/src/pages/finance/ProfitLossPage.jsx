import React, { useEffect, useState } from 'react'

import '../../styles/finance.css'

import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
  RefreshCw,
} from 'lucide-react'

import { getProfitAndLoss } from '../../services/financeService'
import { money } from '../../lib/format'
import DateRange from '../../components/finance/DateRange'
import { SkeletonCards, SkeletonRows } from '../../components/ui/Skeleton'

export default function ProfitLossPage() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [range, setRange] = useState({
    startDate: '',
    endDate: '',
  })

  // ============================================================
  // LOAD P&L
  // ============================================================

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

      const response = await getProfitAndLoss(params)

      // IMPORTANT:
      // Backend returns:
      //
      // {
      //   success: true,
      //   profitAndLoss: {...}
      // }

      setReport(response?.profitAndLoss || {})
    } catch (error) {
      console.error('Profit & Loss error:', error)

      setError(
        error.response?.data?.message || 'Unable to load Profit & Loss report.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReport()
  }, [range.startDate, range.endDate])

  // ============================================================
  // VALUES
  // ============================================================

  const revenue = Number(report?.revenue || 0)

  const directCosts = Number(report?.directCosts || 0)

  const grossProfit = Number(report?.grossProfit || 0)

  const operatingExpenses = Number(report?.operatingExpenses || 0)

  const totalExpenses = Number(report?.totalExpenses || 0)

  const netProfit = Number(report?.netProfit || 0)

  const profitMargin = Number(report?.profitMargin || 0)

  // ============================================================
  // LOADING
  // ============================================================

  if (loading && !report) {
    return (
      <div className="fin-page">
        <SkeletonCards count={3} />

        <div className="fin-card pad">
          <SkeletonRows rows={5} columns={4} />
        </div>
      </div>
    )
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="fin-page">
      {/* HEADER */}

      <div className="fin-heading">
        <div>
          <h1>Profit & Loss</h1>

          <p>Income statement based on paid revenue and paid expenses.</p>
        </div>

        {/* DATE RANGE */}

        <DateRange value={range} onChange={setRange} />
      </div>

      {/* ERROR */}

      {error && <div className="fin-error">{error}</div>}

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="fin-stats four">
        {/* REVENUE */}

        <div>
          <DollarSign />

          <span>Revenue</span>

          <strong>{money(revenue)}</strong>

          <small>Paid income</small>
        </div>

        {/* DIRECT COSTS */}

        <div>
          <TrendingDown />

          <span>Direct Costs</span>

          <strong>{money(directCosts)}</strong>

          <small>Cost of delivering services</small>
        </div>

        {/* GROSS PROFIT */}

        <div>
          <Wallet />

          <span>Gross Profit</span>

          <strong>{money(grossProfit)}</strong>

          <small>Revenue − direct costs</small>
        </div>

        {/* NET PROFIT */}

        <div>
          <TrendingUp />

          <span>Net Profit</span>

          <strong className={netProfit >= 0 ? 'positive' : 'negative'}>
            {money(netProfit)}
          </strong>

          <small>{profitMargin.toFixed(1)}% margin</small>
        </div>
      </div>

      {/* ======================================================
          P&L STATEMENT
      ====================================================== */}

      <div className="fin-card fin-statement">
        <div className="fin-statement-header">
          <div>
            <h2>Profit & Loss Statement</h2>

            <p>Income Statement</p>
          </div>
        </div>

        {/* REVENUE */}

        <div>
          <span>Revenue</span>

          <b className="positive">{money(revenue)}</b>
        </div>

        {/* DIRECT COSTS */}

        <div>
          <span>Direct Costs</span>

          <b>-{money(directCosts)}</b>
        </div>

        {/* GROSS PROFIT */}

        <div className="subtotal">
          <span>Gross Profit</span>

          <b>{money(grossProfit)}</b>
        </div>

        {/* OPERATING EXPENSES */}

        <div>
          <span>Operating Expenses</span>

          <b>-{money(operatingExpenses)}</b>
        </div>

        {/* TOTAL EXPENSES */}

        <div>
          <span>Total Expenses</span>

          <b>-{money(totalExpenses)}</b>
        </div>

        {/* NET PROFIT */}

        <div className="total">
          <span>Net Profit</span>

          <b className={netProfit >= 0 ? 'positive' : 'negative'}>
            {money(netProfit)}
          </b>
        </div>

        {/* PROFIT MARGIN */}

        <div>
          <span>Net Profit Margin</span>

          <b className={profitMargin >= 0 ? 'positive' : 'negative'}>
            {profitMargin.toFixed(1)}%
          </b>
        </div>
      </div>

      {/* ======================================================
          CALCULATION BREAKDOWN
      ====================================================== */}

      <div className="fin-card pad">
        <h2>P&L Breakdown</h2>

        <div className="fin-kv">
          <span>Total Revenue</span>

          <b>{money(revenue)}</b>

          <span>Less: Direct Costs</span>

          <b>-{money(directCosts)}</b>

          <span>Gross Profit</span>

          <b>{money(grossProfit)}</b>

          <span>Less: Operating Expenses</span>

          <b>-{money(operatingExpenses)}</b>

          <span>Net Profit</span>

          <b className={netProfit >= 0 ? 'positive' : 'negative'}>
            {money(netProfit)}
          </b>
        </div>
      </div>
    </div>
  )
}
