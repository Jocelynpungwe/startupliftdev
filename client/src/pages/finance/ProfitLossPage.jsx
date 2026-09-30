import React, { useEffect, useState } from 'react'
import '../../styles/finance.css'
import { getFinanceReport } from '../../services/financeService'
const m = (n) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(
    n || 0,
  )
export default function ProfitLossPage() {
  const [r, setR] = useState(null),
    [range, setRange] = useState({ startDate: '', endDate: '' })
  useEffect(() => {
    getFinanceReport(range).then((x) => setR(x.report))
  }, [range.startDate, range.endDate])
  return (
    <div className="fin-page">
      <div className="fin-heading">
        <div>
          <h1>Profit & Loss</h1>
          <p>Income statement based on paid revenue and paid expenses.</p>
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
      </div>
      <div className="fin-card fin-statement">
        <h2>Profit & Loss Statement</h2>
        <div>
          <span>Revenue</span>
          <b>{m(r?.revenue)}</b>
        </div>
        <div>
          <span>Direct Costs</span>
          <b>-{m(r?.directCosts)}</b>
        </div>
        <div className="subtotal">
          <span>Gross Profit</span>
          <b>{m(r?.grossProfit)}</b>
        </div>
        <div>
          <span>Operating Expenses</span>
          <b>-{m(r?.operatingExpenses)}</b>
        </div>
        <div className="total">
          <span>Net Profit</span>
          <b>{m(r?.netProfit)}</b>
        </div>
        <div>
          <span>Net Profit Margin</span>
          <b>{(r?.margin || 0).toFixed(1)}%</b>
        </div>
      </div>
    </div>
  )
}
