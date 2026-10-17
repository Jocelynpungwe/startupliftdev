import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Search,
  Pencil,
  Trash2,
  Plus,
  SlidersHorizontal,
  Download,
  ArrowUpRight,
  Users,
  CheckCircle2,
  Clock3,
  XCircle,
  Building2,
  RefreshCw,
  PhoneCall,
  Mail,
  CalendarDays,
} from 'lucide-react'

import { deleteLead, fetchLeads } from '../features/leads/leadsSlice.js'
import { useConfirm, useToast } from '../components/ui/UiProvider.jsx'
import { SkeletonRows } from '../components/ui/Skeleton.jsx'
import { LEAD_STATUSES } from '../lib/leadOptions.js'
import { moneyWhole } from '../lib/format'

// Groups leads under the month they were created, newest month first.
const monthKey = (date) => {
  const d = new Date(date)
  return Number.isNaN(d.getTime())
    ? 'unknown'
    : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

const monthLabel = (key) => {
  if (key === 'unknown') return 'No date'
  const [year, month] = key.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export default function Leads() {
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const toast = useToast()

  const { items, loading, error } = useSelector((s) => s.leads)
  const user = useSelector((s) => s.auth.user)

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sort: 'newest',
    mine: 'false',
  })

  const [showFilters, setShowFilters] = useState(false)
  const [month, setMonth] = useState('all')

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchLeads(filters))
    }, 250)

    return () => clearTimeout(timer)
  }, [dispatch, filters])

  /*
   * PERMISSIONS
   */
  const canEdit =
    user?.role === 'admin' ||
    user?.role === 'manager' ||
    user?.permissions?.includes('lead:update')

  const canDelete =
    user?.role === 'admin' || user?.permissions?.includes('lead:delete')

  const canCreate =
    user?.role === 'admin' || user?.permissions?.includes('lead:create')

  /*
   * STATISTICS
   */
  const statistics = useMemo(() => {
    return {
      total: items.length,

      approved: items.filter((lead) => lead.status === 'approved').length,
      contacted: items.filter((lead) => lead.status === 'contacted').length,

      emailed: items.filter((lead) => lead.status === 'emailed').length,
      pending: items.filter((lead) => lead.status === 'pending').length,

      rejected: items.filter((lead) => lead.status === 'rejected').length,

      revenue: items
        .filter((lead) => lead.status === 'approved')
        .reduce((total, lead) => total + Number(lead.dealValue || 0), 0),
    }
  }, [items])

  /*
   * GROUP BY MONTH CREATED
   */
  const monthGroups = useMemo(() => {
    const groups = new Map()

    items.forEach((lead) => {
      const key = monthKey(lead.createdAt)
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(lead)
    })

    const ascending = filters.sort === 'oldest'

    return [...groups.entries()]
      .sort(([a], [b]) => (ascending ? a.localeCompare(b) : b.localeCompare(a)))
      .map(([key, leads]) => ({ key, label: monthLabel(key), leads }))
  }, [items, filters.sort])

  // fall back to "all" if the chosen month no longer has any leads
  const activeMonth = monthGroups.some((g) => g.key === month) ? month : 'all'

  const visibleGroups =
    activeMonth === 'all'
      ? monthGroups
      : monthGroups.filter((g) => g.key === activeMonth)

  const visibleCount = visibleGroups.reduce((n, g) => n + g.leads.length, 0)

  /*
   * DELETE LEAD
   */
  const remove = async (id) => {
    const confirmed = await confirm({
      title: 'Delete this lead?',
      message: 'The lead will be permanently deleted. This cannot be undone.',
      confirmLabel: 'Delete lead',
      tone: 'danger',
    })

    if (!confirmed) return

    const result = await dispatch(deleteLead(id))

    if (deleteLead.fulfilled.match(result)) toast.success('Lead deleted.')
    else toast.error(result.payload || 'Could not delete the lead.')
  }

  /*
   * RESET FILTERS
   */
  const resetFilters = () => {
    setMonth('all')
    setFilters({
      search: '',
      status: 'all',
      sort: 'newest',
      mine: 'false',
    })
  }

  /*
   * INITIALS
   */
  const getInitials = (person) => {
    if (!person) return '?'

    return `${person.firstName?.[0] || ''}${
      person.lastName?.[0] || ''
    }`.toUpperCase()
  }

  return (
    <div className="leads-page">
      {/* =========================================
          PAGE HEADER
      ========================================== */}

      <div className="crm-page-header">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            SALES PIPELINE
          </div>

          <h1>All Leads</h1>

          <p>Track, search and manage your complete sales pipeline.</p>
        </div>

        <div className="header-actions">
          <button
            className="secondary-btn"
            onClick={() => dispatch(fetchLeads(filters))}
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          {canCreate && (
            <Link to="/leads/new" className="primary-btn">
              <Plus size={17} />
              Add Lead
              <ArrowUpRight size={15} />
            </Link>
          )}
        </div>
      </div>

      {/* =========================================
          KPI CARDS
      ========================================== */}

      <div className="lead-stat-grid">
        <LeadStat
          icon={<Users size={19} />}
          label="Total Leads"
          value={statistics.total}
          description="All leads"
        />

        <LeadStat
          icon={<CheckCircle2 size={19} />}
          label="Approved"
          value={statistics.approved}
          description="Successful deals"
          type="success"
        />

        <LeadStat
          icon={<PhoneCall size={19} />}
          label="Contacted"
          value={statistics.contacted}
          description="Reached out"
          type="success"
        />

        <LeadStat
          icon={<Mail size={19} />}
          label="Emailed"
          value={statistics.emailed}
          description="Email sent"
          type="warning"
        />

        <LeadStat
          icon={<Clock3 size={19} />}
          label="Pending"
          value={statistics.pending}
          description="Awaiting decision"
          type="warning"
        />

        <LeadStat
          icon={<XCircle size={19} />}
          label="Rejected"
          value={statistics.rejected}
          description="Unsuccessful"
          type="danger"
        />

        <LeadStat
          icon={<ArrowUpRight size={19} />}
          label="Approved Revenue"
          value={`$${statistics.revenue.toLocaleString()}`}
          description="Closed deal value"
          type="revenue"
        />
      </div>

      {/* =========================================
          MAIN PANEL
      ========================================== */}

      <section className="leads-panel">
        {/* PANEL HEADER */}

        <div className="leads-panel-header">
          <div>
            <h2>Lead Pipeline</h2>

            <p>
              {items.length} lead
              {items.length !== 1 ? 's' : ''} currently displayed
            </p>
          </div>

          <button
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>
        </div>

        {/* =========================================
            SEARCH
        ========================================== */}

        <div className="lead-search-row">
          <div className="lead-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search company, email, phone or location..."
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
            />

            {filters.search && (
              <button
                className="clear-search"
                onClick={() =>
                  setFilters({
                    ...filters,
                    search: '',
                  })
                }
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* =========================================
            FILTERS
        ========================================== */}

        <div className={`advanced-filters ${showFilters ? 'visible' : ''}`}>
          <div className="filter-field">
            <label>Status</label>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
            >
              <option value="all">All statuses</option>

              {LEAD_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label>Sort by</label>

            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sort: e.target.value,
                })
              }
            >
              <option value="newest">Latest first</option>

              <option value="oldest">Oldest first</option>

              <option value="valueHigh">Deal value: high to low</option>

              <option value="valueLow">Deal value: low to high</option>
            </select>
          </div>

          <label className="my-leads-toggle">
            <input
              type="checkbox"
              checked={filters.mine === 'true'}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  mine: e.target.checked ? 'true' : 'false',
                })
              }
            />

            <span className="toggle-ui"></span>

            <div>
              <strong>My Leads</strong>
              <small>Show only leads assigned to me</small>
            </div>
          </label>

          <button className="reset-filter-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>

        {/* =========================================
            MONTH FILTER
        ========================================== */}

        {monthGroups.length > 0 && (
          <div className="month-chips" role="group" aria-label="Filter by month created">
            <CalendarDays size={16} aria-hidden="true" />

            <button
              type="button"
              className={`month-chip ${activeMonth === 'all' ? 'active' : ''}`}
              onClick={() => setMonth('all')}
              aria-pressed={activeMonth === 'all'}
            >
              All months
              <span>{items.length}</span>
            </button>

            {monthGroups.map((group) => (
              <button
                type="button"
                key={group.key}
                className={`month-chip ${activeMonth === group.key ? 'active' : ''}`}
                onClick={() => setMonth(group.key)}
                aria-pressed={activeMonth === group.key}
              >
                {group.label}
                <span>{group.leads.length}</span>
              </button>
            ))}
          </div>
        )}

        {/* =========================================
            ERROR
        ========================================== */}

        {error && <div className="lead-alert error">{error}</div>}

        {/* =========================================
            LOADING
        ========================================== */}

        {loading && (
          <SkeletonRows rows={6} columns={5} />
        )}

        {/* =========================================
            TABLE
        ========================================== */}

        <div className="crm-table-wrapper">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Company</th>

                <th>Salesperson</th>

                <th>Contact</th>

                <th>Status</th>

                <th>Deal Value</th>

                <th>Created</th>

                {(canEdit || canDelete) && (
                  <th className="actions-column">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {visibleGroups.map((group) => (
                <React.Fragment key={group.key}>
                  <tr className="month-row">
                    <td colSpan={canEdit || canDelete ? 7 : 6}>
                      <span className="month-row__label">{group.label}</span>
                      <span className="month-row__count">
                        {group.leads.length} lead
                        {group.leads.length !== 1 ? 's' : ''}
                      </span>
                    </td>
                  </tr>

                  {group.leads.map((lead) => (
                <tr key={lead._id}>
                  {/* COMPANY */}

                  <td>
                    <div className="company-cell">
                      <div className="company-icon">
                        <Building2 size={17} />
                      </div>

                      <div>
                        <strong>{lead.companyName}</strong>

                        <span>{lead.location || 'Location not provided'}</span>
                      </div>
                    </div>
                  </td>

                  {/* SALESPERSON */}

                  <td>
                    <div className="salesperson-cell">
                      <div className="salesperson-avatar">
                        {lead.salesPerson?.profilePicture ? (
                          <img src={lead.salesPerson.profilePicture} alt="" />
                        ) : (
                          getInitials(lead.salesPerson)
                        )}
                      </div>

                      <div>
                        <strong>
                          {lead.salesPerson?.firstName}{' '}
                          {lead.salesPerson?.lastName}
                        </strong>

                        <span>Sales</span>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}

                  <td>
                    <div className="contact-cell">
                      <span>{lead.email || 'No email'}</span>

                      <small>{lead.phone || 'No phone'}</small>
                    </div>
                  </td>

                  {/* STATUS */}

                  <td>
                    <StatusBadge status={lead.status} />
                  </td>

                  {/* DEAL */}

                  <td>
                    <div className="deal-value">
                      <strong>
                        {Number(lead.dealValue) > 0
                          ? moneyWhole(lead.dealValue)
                          : '—'}
                      </strong>

                      {lead.status === 'approved' && <span>Closed</span>}
                    </div>
                  </td>

                  {/* CREATED */}

                  <td>
                    <div className="date-cell">
                      <strong>
                        {new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </strong>

                      <span>
                        {new Date(lead.createdAt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </td>

                  {/* ACTIONS */}

                  {(canEdit || canDelete) && (
                    <td>
                      <div className="lead-actions">
                        {canEdit && (
                          <Link
                            to={`/leads/${lead._id}`}
                            className="table-action edit"
                            title="Edit lead"
                          >
                            <Pencil size={16} />
                          </Link>
                        )}

                        {canDelete && (
                          <button
                            className="table-action delete"
                            onClick={() => remove(lead._id)}
                            title="Delete lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* EMPTY STATE */}

              {!items.length && !loading && (
                <tr>
                  <td colSpan={canEdit || canDelete ? 7 : 6}>
                    <div className="leads-empty">
                      <div className="empty-icon">
                        <Users size={25} />
                      </div>

                      <h3>No leads found</h3>

                      <p>Try changing your filters or create a new lead.</p>

                      {canCreate && (
                        <Link to="/leads/new" className="primary-btn">
                          <Plus size={16} />
                          Add your first lead
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =========================================
            FOOTER
        ========================================== */}

        <div className="leads-footer">
          <span>
            Showing <strong>{visibleCount}</strong> lead{visibleCount !== 1 ? 's' : ''}
          </span>

          <span>Updated just now</span>
        </div>
      </section>
    </div>
  )
}

/* =================================================
   STAT CARD
================================================= */

function LeadStat({ icon, label, value, description, type = '' }) {
  return (
    <div className={`lead-stat-card ${type}`}>
      <div className="lead-stat-top">
        <div className="lead-stat-icon">{icon}</div>

        <ArrowUpRight size={15} className="stat-arrow" />
      </div>

      <div className="lead-stat-value">{value}</div>

      <div className="lead-stat-label">{label}</div>

      <div className="lead-stat-description">{description}</div>
    </div>
  )
}

/* =================================================
   STATUS BADGE
================================================= */

function StatusBadge({ status }) {
  const config = {
    approved: {
      label: 'Approved',
      className: 'approved',
      icon: <CheckCircle2 size={13} />,
    },

    pending: {
      label: 'Pending',
      className: 'pending',
      icon: <Clock3 size={13} />,
    },

    contacted: {
      label: 'Contacted',
      className: 'contacted',
      icon: <PhoneCall size={13} />,
    },

    emailed: {
      label: 'Emailed',
      className: 'emailed',
      icon: <Mail size={13} />,
    },

    rejected: {
      label: 'Rejected',
      className: 'rejected',
      icon: <XCircle size={13} />,
    },

    new: {
      label: 'New',
      className: 'new',
      icon: <ArrowUpRight size={13} />,
    },
  }

  const current = config[status] || config.new

  return (
    <span className={`lead-status ${current.className}`}>
      {current.icon}
      {current.label}
    </span>
  )
}
