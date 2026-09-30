import React, { useEffect, useState } from 'react'
import '../../styles/finance.css'
import { Download } from 'lucide-react'
import { getFinanceReport } from '../../services/financeService'
const m = (n) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(
    n || 0,
  )
const nice = (s) =>
  s
    .split('-')
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(' ')
export default function ReportsPage() {
  const [r, setR] = useState(null),
    [range, setRange] = useState({ startDate: '', endDate: '' })
  useEffect(() => {
    getFinanceReport(range).then((x) => setR(x.report))
  }, [range.startDate, range.endDate])
  const csv = () => {
    const rows = [
      ['Type', 'Description', 'Category', 'Date', 'Amount'],
      ...(r?.income || []).map((x) => [
        'Income',
        x.description,
        x.category,
        x.paymentDate,
        x.amount,
      ]),
      ...(r?.expenses || []).map((x) => [
        'Expense',
        x.description,
        x.category,
        x.expenseDate,
        x.amount,
      ]),
    ]
    const blob = new Blob(
      [
        rows
          .map((row) =>
            row
              .map((v) => `"${String(v ?? '').replaceAll('"', '""')}"`)
              .join(','),
          )
          .join('\n'),
      ],
      { type: 'text/csv' },
    )
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'financial-report.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }
  return (
    <div className="fin-page">
      <div className="fin-heading">
        <div>
          <h1>Financial Reports</h1>
          <p>Review category performance and export transaction data.</p>
        </div>
        <button className="fin-btn" onClick={csv}>
          <Download size={17} /> Export CSV
        </button>
      </div>
      <div className="fin-date-range">
        <input
          type="date"
          onChange={(e) => setRange({ ...range, startDate: e.target.value })}
        />
        <span>to</span>
        <input
          type="date"
          onChange={(e) => setRange({ ...range, endDate: e.target.value })}
        />
      </div>
      <div className="fin-grid-2">
        <div className="fin-card pad">
          <h2>Revenue by Category</h2>
          <div className="fin-kv">
            {Object.entries(r?.revenueByCategory || {}).map(([k, v]) => (
              <>
                <span key={`${k}a`}>{nice(k)}</span>
                <b key={`${k}b`}>{m(v)}</b>
              </>
            ))}
          </div>
        </div>
        <div className="fin-card pad">
          <h2>Expenses by Category</h2>
          <div className="fin-kv">
            {Object.entries(r?.expenseByCategory || {}).map(([k, v]) => (
              <>
                <span key={`${k}a`}>{nice(k)}</span>
                <b key={`${k}b`}>{m(v)}</b>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
