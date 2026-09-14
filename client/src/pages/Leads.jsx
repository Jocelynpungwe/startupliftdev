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
} from 'lucide-react'

import { deleteLead, fetchLeads } from '../features/leads/leadsSlice.js'

export default function Leads() {
  const dispatch = useDispatch()

  const { items, loading, error } = useSelector((s) => s.leads)
  const user = useSelector((s) => s.auth.user)

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sort: 'newest',
    mine: 'false',
  })

  const [showFilters, setShowFilters] = useState(false)

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

      pending: items.filter((lead) => lead.status === 'pending').length,

      rejected: items.filter((lead) => lead.status === 'rejected').length,

      revenue: items
        .filter((lead) => lead.status === 'approved')
        .reduce((total, lead) => total + Number(lead.dealValue || 0), 0),
    }
  }, [items])

  /*
   * DELETE LEAD
   */
  const remove = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this lead?',
    )

    if (!confirmed) return

    dispatch(deleteLead(id))
  }

  /*
   * RESET FILTERS
   */
  const resetFilters = () => {
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
          description="Send Email"
          type="success"
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

              <option value="new">New</option>

              <option value="approved">Approved</option>
              <option value="contacted">Contacted</option>

              <option value="pending">Pending</option>

              <option value="rejected">Rejected</option>
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
            ERROR
        ========================================== */}

        {error && <div className="lead-alert error">{error}</div>}

        {/* =========================================
            LOADING
        ========================================== */}

        {loading && (
          <div className="lead-loading">
            <div className="loading-spinner"></div>

            <span>Loading leads...</span>
          </div>
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
              {items.map((lead) => (
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
                        ${Number(lead.dealValue || 0).toLocaleString()}
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
            Showing <strong>{items.length}</strong> leads
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
      className: 'approved',
      icon: <PhoneCall size={13} />,
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
