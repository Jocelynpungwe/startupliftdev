import React, { useEffect, useState } from 'react'
import '../../styles/finance.css'
import { getFinanceSummary } from '../../services/financeService'
const m = (n) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(
    n || 0,
  )
export default function CashFlowPage() {
  const [d, setD] = useState(null)
  useEffect(() => {
    getFinanceSummary().then(setD)
  }, [])
  const s = d?.summary || {}
  return (
    <div className="fin-page">
      <div className="fin-heading">
        <div>
          <h1>Cash Flow</h1>
          <p>Cash received versus cash paid from recorded paid transactions.</p>
        </div>
      </div>
      <div className="fin-stats">
        <div>
          <span>Cash In</span>
          <strong>{m(s.revenue)}</strong>
        </div>
        <div>
          <span>Cash Out</span>
          <strong>{m(s.totalExpenses)}</strong>
        </div>
        <div>
          <span>Net Cash Flow</span>
          <strong>{m((s.revenue || 0) - (s.totalExpenses || 0))}</strong>
        </div>
      </div>
      <div className="fin-card pad">
        <h2>Monthly Cash Flow</h2>
        <div className="fin-table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Cash In</th>
                <th>Cash Out</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {(d?.monthly || []).map((x) => (
                <tr key={x.month}>
                  <td>{x.month}</td>
                  <td className="positive">{m(x.revenue)}</td>
                  <td className="negative">{m(x.expenses)}</td>
                  <td>{m(x.revenue - x.expenses)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
