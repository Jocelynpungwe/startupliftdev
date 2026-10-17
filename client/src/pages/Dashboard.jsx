import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

import {
  AlertTriangle,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
  TrendingUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Target,
} from 'lucide-react'

import { fetchDashboard } from '../features/dashboard/dashboardSlice.js'
import { SkeletonCards, SkeletonRows } from '../components/ui/Skeleton.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { moneyWhole } from '../lib/format'

const PIE_COLORS = [
  '#2563eb',
  '#38bdf8',
  '#8b5cf6',
  '#06b6d4',
  '#6366f1',
  '#14b8a6',
]

export default function Dashboard() {
  const dispatch = useDispatch()

  const { data, loading, error } = useSelector((state) => state.dashboard)

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(fetchDashboard())
  }, [dispatch])

  if (loading && !data) {
    return (
      <div className="crm-dashboard">
        <SkeletonCards count={5} />
        <div className="dashboard-panel" style={{ padding: 22 }}>
          <SkeletonRows rows={5} columns={3} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        tone="error"
        icon={AlertTriangle}
        title="We couldn't load the dashboard"
        message={error}
        action={
          <button
            type="button"
            className="ui-btn ui-btn--primary"
            onClick={() => dispatch(fetchDashboard())}
          >
            Try again
          </button>
        }
      />
    )
  }

  if (!data) return null

  const pie = data.leadsBySalesperson.map((person) => ({
    name: person.name,
    value: person.leads,
  }))

  const formatMoney = moneyWhole

  // Admins get the whole team; everyone else only ever receives their own data.
  const isTeam = data.scope === 'team'

  const statusRows = [
    ['New', data.deals.new, '#60a5fa'],
    ['Contacted', data.deals.contacted, '#22d3ee'],
    ['Emailed', data.deals.emailed, '#a78bfa'],
    ['Pending', data.deals.pending, '#fbbf24'],
    ['Approved', data.deals.approved, '#34d399'],
    ['Rejected', data.deals.rejected, '#f87171'],
  ]

  return (
    <div className="crm-dashboard">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="dashboard-header">
        <div>
          <div className="dashboard-eyebrow">
            <span className="live-dot"></span>
            {isTeam ? 'TEAM OVERVIEW' : 'MY OVERVIEW'}
          </div>

          <h1>
            Welcome back, <span>{user?.firstName || 'there'}</span>
          </h1>

          <p>
            {isTeam
              ? "Here's how every salesperson on the team is performing."
              : "Here's how your own leads are performing."}
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="dashboard-date">
            <span>Dashboard</span>
            <strong>
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="dashboard-kpis">
        <DashboardKpi
          title="Total Revenue"
          value={formatMoney(data.kpis.totalRevenue)}
          icon={<DollarSign size={21} />}
          trend="Revenue"
          className="blue"
        />

        <DashboardKpi
          title="Total Leads"
          value={data.kpis.totalLeads}
          icon={<Users size={21} />}
          trend={isTeam ? 'Across the team' : 'Assigned to you'}
          className="purple"
        />

        <DashboardKpi
          title="Approved Deals"
          value={data.kpis.approved}
          icon={<CheckCircle2 size={21} />}
          trend="Successfully closed"
          className="green"
        />

        <DashboardKpi
          title="Rejected"
          value={data.kpis.rejected}
          icon={<XCircle size={21} />}
          trend="Rejected leads"
          className="red"
        />

        <DashboardKpi
          title="In progress"
          value={data.kpis.inProgress ?? data.kpis.pending}
          icon={<Clock3 size={21} />}
          trend="New, contacted or emailed"
          className="orange"
        />
      </div>

      {/* =====================================================
          MAIN CHART ROW
      ===================================================== */}

      <div className="dashboard-main-grid">
        {/* REVENUE */}

        <section className="dashboard-panel revenue-panel">
          <div className="panel-top">
            <div>
              <div className="panel-label">REVENUE</div>

              <h2>Revenue analysis</h2>

              <p>Approved deal revenue throughout the year.</p>
            </div>

            <div className="panel-icon blue-icon">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="revenue-summary">
            <div>
              <span>Total revenue</span>

              <strong>{formatMoney(data.kpis.totalRevenue)}</strong>
            </div>

            <div className="revenue-growth">
              <ArrowUpRight size={15} />
              Sales performance
            </div>
          </div>

          <div className="large-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.revenueByMonth}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopOpacity={0.35} />

                    <stop offset="100%" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />

                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />

                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                  formatter={(value) => [formatMoney(value), 'Revenue']}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    strokeWidth: 3,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {isTeam ? (
          <section className="dashboard-panel salesperson-panel">
            <div className="panel-top">
              <div>
                <div className="panel-label">SALES TEAM</div>

                <h2>Leads by salesperson</h2>

                <p>Lead distribution across your team.</p>
              </div>

              <div className="panel-icon purple-icon">
                <Users size={20} />
              </div>
            </div>

            <div className="pie-chart-wrapper">
              {pie.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="48%"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {pie.map((_, index) => (
                        <Cell
                          key={index}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background: '#0f172a',
                        border: '1px solid rgba(255,255,255,.1)',
                        borderRadius: '12px',
                        color: '#fff',
                      }}
                    />

                    <Legend verticalAlign="bottom" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-state">No lead data yet.</div>
              )}
            </div>
          </section>
        ) : (
          <section className="dashboard-panel salesperson-panel">
            <div className="panel-top">
              <div>
                <div className="panel-label">MY LEADS</div>

                <h2>Where your leads stand</h2>

                <p>Your leads by status.</p>
              </div>

              <div className="panel-icon purple-icon">
                <Users size={20} />
              </div>
            </div>

            <div className="status-breakdown">
              {statusRows.map(([label, value, color]) => {
                const total = data.deals.total || 0
                const width = total ? (Number(value || 0) / total) * 100 : 0

                return (
                  <div className="status-breakdown__row" key={label}>
                    <div className="status-breakdown__head">
                      <span>
                        <i style={{ background: color }} />
                        {label}
                      </span>

                      <strong>{value || 0}</strong>
                    </div>

                    <div className="status-breakdown__bar">
                      <div style={{ width: `${width}%`, background: color }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>

      {/* =====================================================
          PERFORMANCE + DEAL STATISTICS
      ===================================================== */}

      <div className="dashboard-secondary-grid">
        {/* MY PERFORMANCE */}

        <section className="dashboard-panel">
          <div className="panel-top">
            <div>
              <div className="panel-label">PERSONAL</div>

              <h2>{isTeam ? 'My deal performance' : 'Deal performance'}</h2>

              <p>Your current sales performance.</p>
            </div>

            <div className="panel-icon green-icon">
              <Target size={20} />
            </div>
          </div>

          <div className="performance-layout">
            <div className="approval-ring">
              <div className="approval-ring-inner">
                <strong>{data.personal.approvalRate.toFixed(1)}%</strong>

                <span>Approval</span>
              </div>
            </div>

            <div className="performance-items">
              <PerformanceItem
                label="Total Leads"
                value={data.personal.total}
              />

              <PerformanceItem
                label="Approved"
                value={data.personal.approved}
                positive
              />

              <PerformanceItem
                label="Rejected"
                value={data.personal.rejected}
              />

              <PerformanceItem
                label="In progress"
                value={data.personal.inProgress ?? data.personal.pending}
              />

              <PerformanceItem
                label="Approved Revenue"
                value={formatMoney(data.personal.revenue)}
                money
              />
            </div>
          </div>
        </section>

        {/* DEAL STATISTICS */}

        <section className="dashboard-panel">
          <div className="panel-top">
            <div>
              <div className="panel-label">PIPELINE</div>

              <h2>Deals statistics</h2>

              <p>Current pipeline breakdown.</p>
            </div>

            <div className="panel-icon blue-icon">
              <BriefcaseBusiness size={20} />
            </div>
          </div>

          <div className="deal-stat-grid">
            <DealStat label="All Leads" value={data.deals.total} />

            <DealStat label="Approved" value={data.deals.approved} positive />

            <DealStat label="Rejected" value={data.deals.rejected} />

            <DealStat
              label="In progress"
              value={data.deals.inProgress ?? data.deals.pending}
            />

            <DealStat
              label="Approval Rate"
              value={`${data.deals.approvalRate.toFixed(1)}%`}
              highlight
            />
          </div>
        </section>
      </div>

      {/* =====================================================
          TOP DEALS
      ===================================================== */}

      <section className="dashboard-panel top-deals-panel">
        <div className="panel-top">
          <div>
            <div className="panel-label">PERFORMANCE</div>

            <h2>Top deals</h2>

            <p>
              {isTeam
                ? 'The largest approved deals across the team.'
                : 'Your largest approved deals.'}
            </p>
          </div>

          <div className="panel-icon purple-icon">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="top-deals-list">
          {data.topDeals.length ? (
            data.topDeals.map((deal, index) => (
              <div className="top-deal-row" key={deal._id}>
                <div className="deal-rank">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="deal-company">
                  <div className="company-avatar">{deal.companyName?.[0]}</div>

                  <div>
                    <strong>{deal.companyName}</strong>

                    <span>
                      {deal.salesPerson?.firstName} {deal.salesPerson?.lastName}
                    </span>
                  </div>
                </div>

                <div className="deal-status">
                  <span>Approved</span>
                </div>

                <div className="deal-value">{formatMoney(deal.dealValue)}</div>
              </div>
            ))
          ) : (
            <div className="empty-state">No approved deals yet.</div>
          )}
        </div>
      </section>

      {/* =====================================================
          SALESPERSON TABLE  (admin only: every salesperson's numbers)
      ===================================================== */}

      {isTeam && (
        <section className="dashboard-panel">
          <div className="panel-top">
            <div>
              <div className="panel-label">TEAM PERFORMANCE</div>

              <h2>Every salesperson</h2>

              <p>Leads by status, approvals and revenue for each person.</p>
            </div>
          </div>

          <div className="sales-table-wrapper">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Salesperson</th>
                  <th>Leads</th>
                  <th>New</th>
                  <th>Contacted</th>
                  <th>Emailed</th>
                  <th>Pending</th>
                  <th>Approved</th>
                  <th>Rejected</th>
                  <th>Approval %</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {data.leadsBySalesperson.map((person) => {
                  const rate = person.leads
                    ? (person.approved / person.leads) * 100
                    : 0

                  return (
                    <tr key={person.salespersonId}>
                      <td>
                        <div className="salesperson-cell">
                          <div className="mini-avatar">{person.name?.[0]}</div>

                          <strong>{person.name}</strong>
                        </div>
                      </td>

                      <td>{person.leads}</td>
                      <td>{person.new ?? 0}</td>
                      <td>{person.contacted ?? 0}</td>
                      <td>{person.emailed ?? 0}</td>
                      <td>{person.pending ?? 0}</td>

                      <td>
                        <span className="approved-number">{person.approved}</span>
                      </td>

                      <td>{person.rejected ?? 0}</td>

                      <td>
                        <div className="approval-bar">
                          <div style={{ width: `${rate}%` }} />
                        </div>

                        <span className="approval-percent">
                          {rate.toFixed(1)}%
                        </span>
                      </td>

                      <td className="revenue-cell">
                        {formatMoney(person.revenue)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}

/* ============================================================
   COMPONENTS
============================================================ */

function DashboardKpi({ title, value, icon, trend, className }) {
  return (
    <div className={`dashboard-kpi ${className}`}>
      <div className="kpi-top">
        <div className="kpi-icon">{icon}</div>

        <ArrowUpRight size={16} />
      </div>

      <div className="kpi-title">{title}</div>

      <div className="kpi-value">{value}</div>

      <div className="kpi-trend">{trend}</div>
    </div>
  )
}

function PerformanceItem({ label, value, positive, money }) {
  return (
    <div className="performance-item">
      <span>{label}</span>

      <strong className={positive ? 'positive' : ''}>{value}</strong>
    </div>
  )
}

function DealStat({ label, value, positive, highlight }) {
  return (
    <div className={`deal-stat-box ${highlight ? 'highlight' : ''}`}>
      <span>{label}</span>

      <strong className={positive ? 'positive' : ''}>{value}</strong>
    </div>
  )
}
