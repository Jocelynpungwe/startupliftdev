import React, { useEffect, useState } from 'react'
import '../../styles/finance.css'
import {
  DollarSign,
  TrendingDown,
  ChartNoAxesCombined,
  RefreshCw,
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
import { getFinanceSummary } from '../../services/financeService'
const money = (n) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n || 0)
export default function FinanceDashboard() {
  const [data, setData] = useState(null),
    [range, setRange] = useState({ startDate: '', endDate: '' })
  useEffect(() => {
    getFinanceSummary(range).then(setData)
  }, [range.startDate, range.endDate])
  const s = data?.summary || {}
  return (
    <div className="fin-page">
      <div className="fin-heading">
        <div>
          <h1>Financial Overview</h1>
          <p>Revenue, costs, profit and recurring performance in one place.</p>
        </div>
        <div className="fin-date-range">
          <input
            type="date"
            value={range.startDate}
            onChange={(e) => setRange({ ...range, startDate: e.target.value })}
          />
          <span>to</span>
          <input
            type="date"
            value={range.endDate}
            onChange={(e) => setRange({ ...range, endDate: e.target.value })}
          />
        </div>
      </div>
      <div className="fin-stats four">
        <div>
          <DollarSign />
          <span>Revenue</span>
          <strong>{money(s.revenue)}</strong>
        </div>
        <div>
          <TrendingDown />
          <span>Expenses</span>
          <strong>{money(s.totalExpenses)}</strong>
        </div>
        <div>
          <ChartNoAxesCombined />
          <span>Net Profit</span>
          <strong>{money(s.netProfit)}</strong>
          <small>{(s.margin || 0).toFixed(1)}% margin</small>
        </div>
        <div>
          <RefreshCw />
          <span>Net Recurring / mo.</span>
          <strong>{money(s.netRecurring)}</strong>
        </div>
      </div>
      <div className="fin-grid-2">
        <div className="fin-card pad">
          <h2>Revenue vs Expenses</h2>
          <div className="fin-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.monthly || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v) => money(v)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="currentColor"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="fin-card pad">
          <h2>Profit Snapshot</h2>
          <div className="fin-kv">
            <span>Direct costs</span>
            <b>{money(s.directCosts)}</b>
            <span>Gross profit</span>
            <b>{money(s.grossProfit)}</b>
            <span>MRR</span>
            <b>{money(s.mrr)}</b>
            <span>Subscription costs / mo.</span>
            <b>{money(s.monthlySubscriptions)}</b>
          </div>
        </div>
      </div>
      <div className="fin-card pad">
        <h2>Recent Transactions</h2>
        <div className="fin-recent">
          {(data?.recent || []).map((x) => (
            <div key={`${x.type}-${x.id}`}>
              <span>
                <b>{x.description}</b>
                <small>
                  {new Date(x.date).toLocaleDateString('en-CA')} · {x.type}
                </small>
              </span>
              <strong className={x.type === 'income' ? 'positive' : 'negative'}>
                {x.type === 'income' ? '+' : '-'}
                {money(x.amount)}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
