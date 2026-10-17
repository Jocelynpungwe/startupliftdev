import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowLeft,
  RefreshCw,
  Plus,
  Building2,
  MapPin,
  DollarSign,
  CalendarDays,
  Phone,
  Mail,
  Search,
  X,
} from 'lucide-react'

import { fetchPipeline, updateLeadStatus } from '../features/leads/leadsSlice'
import { useToast } from '../components/ui/UiProvider.jsx'
import { PIPELINE_COLUMNS, problemLabel } from '../lib/leadOptions.js'
import { moneyWhole as formatCurrency } from '../lib/format'

import './css/salesPipeline.css'

const formatDate = (date) => {
  if (!date) return 'No date'

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'No date'
  }

  return parsedDate.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
  })
}

function SalesPipeline() {
  const dispatch = useDispatch()
  const toast = useToast()

  const {
    pipeline = [],
    pipelineLoading,
    pipelineError,
  } = useSelector((state) => state.leads)

  const [search, setSearch] = useState('')
  const [draggedLead, setDraggedLead] = useState(null)
  const [movingLeadId, setMovingLeadId] = useState(null)

  useEffect(() => {
    dispatch(fetchPipeline())
  }, [dispatch])

  /*
   * The board is driven by lead status. Only the four pipeline statuses are
   * shown (rejected leads stay in All Leads).
   */
  const boardLeads = useMemo(() => {
    const columnIds = PIPELINE_COLUMNS.map((c) => c.id)
    const inPipeline = pipeline.filter((lead) => columnIds.includes(lead.status))

    if (!search.trim()) return inPipeline

    const value = search.toLowerCase().trim()

    return inPipeline.filter(
      (lead) =>
        lead.companyName?.toLowerCase().includes(value) ||
        lead.contactName?.toLowerCase().includes(value) ||
        lead.email?.toLowerCase().includes(value) ||
        lead.phone?.toLowerCase().includes(value) ||
        lead.location?.toLowerCase().includes(value),
    )
  }, [pipeline, search])

  const getColumnLeads = (statusId) =>
    boardLeads.filter((lead) => lead.status === statusId)

  const refreshPipeline = () => {
    dispatch(fetchPipeline())
  }

  /*
   * MOVE A LEAD (drag & drop and the "Move to" selector share this)
   */
  const moveLead = async (lead, newStatus) => {
    if (!lead || lead.status === newStatus) return

    setMovingLeadId(lead._id)

    try {
      await dispatch(updateLeadStatus({ id: lead._id, status: newStatus })).unwrap()

      const title = PIPELINE_COLUMNS.find((c) => c.id === newStatus)?.title
      toast.success(`${lead.companyName} moved to ${title}.`)
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Could not move the lead.',
      )
    } finally {
      setMovingLeadId(null)
      setDraggedLead(null)
    }
  }

  const handleDragStart = (event, lead) => {
    setDraggedLead(lead)

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', lead._id)
  }

  const handleDragEnd = () => setDraggedLead(null)

  const handleDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (event, newStatus) => {
    event.preventDefault()

    const leadId = event.dataTransfer.getData('text/plain')
    const lead = draggedLead || pipeline.find((item) => item._id === leadId)

    if (!lead || lead.status === newStatus) {
      setDraggedLead(null)
      return
    }

    moveLead(lead, newStatus)
  }

  return (
    <div className="sales-pipeline-page">
      {/* HEADER */}

      <header className="sales-pipeline-header">
        <div className="sales-pipeline-heading">
          <Link
            to="/leads"
            className="sales-pipeline-back"
            aria-label="Back to all leads"
          >
            <ArrowLeft size={17} />
          </Link>

          <div>
            <div className="sales-pipeline-label">SALES DEPARTMENT</div>

            <h1>Sales Pipeline</h1>

            <p>Move leads through each status, from new to approved.</p>
          </div>
        </div>

        <div className="sales-pipeline-actions">
          <button
            type="button"
            className="sales-pipeline-refresh"
            onClick={refreshPipeline}
            disabled={pipelineLoading}
            title="Refresh pipeline"
            aria-label="Refresh pipeline"
          >
            <RefreshCw
              size={16}
              className={pipelineLoading ? 'pipeline-spin' : ''}
            />
          </button>

          <Link to="/leads/new" className="sales-pipeline-add">
            <Plus size={16} />
            Add Lead
          </Link>
        </div>
      </header>

      {/* SUMMARY: one card per status */}

      <section className="sales-pipeline-summary">
        <div className="pipeline-summary-card">
          <span>In pipeline</span>
          <strong>
            {pipeline.filter((l) => PIPELINE_COLUMNS.some((c) => c.id === l.status)).length}
          </strong>
        </div>

        {PIPELINE_COLUMNS.map((column) => (
          <div className="pipeline-summary-card" key={column.id}>
            <span>{column.title}</span>
            <strong>
              {pipeline.filter((lead) => lead.status === column.id).length}
            </strong>
          </div>
        ))}
      </section>

      {/* TOOLBAR */}

      <section className="sales-pipeline-toolbar">
        <div className="pipeline-search">
          <Search size={15} />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search companies, contacts..."
            aria-label="Search the pipeline"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="pipeline-toolbar-info">
          {search
            ? `${boardLeads.length} matching leads`
            : `${boardLeads.length} leads`}
        </div>
      </section>

      {/* ERROR */}

      {pipelineError && (
        <div className="sales-pipeline-error">
          <strong>Could not load pipeline.</strong>
          <span>{pipelineError}</span>

          <button type="button" onClick={refreshPipeline}>
            Try again
          </button>
        </div>
      )}

      {/* LOADING */}

      {pipelineLoading && pipeline.length === 0 && (
        <div className="sales-pipeline-loading">
          <RefreshCw size={22} className="pipeline-spin" />

          <span>Loading sales pipeline...</span>
        </div>
      )}

      {/* BOARD */}

      {!(pipelineLoading && pipeline.length === 0) && (
        <section className="sales-pipeline-board">
          {PIPELINE_COLUMNS.map((column) => {
            const columnLeads = getColumnLeads(column.id)

            return (
              <div
                key={column.id}
                className={`sales-pipeline-column ${
                  draggedLead ? 'pipeline-column-drag-active' : ''
                }`}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, column.id)}
              >
                <div className="pipeline-column-header">
                  <div>
                    <h2>{column.title}</h2>

                    <p>{column.description}</p>
                  </div>

                  <span className="pipeline-column-count">
                    {columnLeads.length}
                  </span>
                </div>

                <div className="pipeline-column-body">
                  {columnLeads.length === 0 ? (
                    <div className="pipeline-empty">
                      <div className="pipeline-empty-icon">
                        <Building2 size={16} />
                      </div>

                      <span>Drop a lead here</span>
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <article
                        key={lead._id}
                        className={`pipeline-lead-card ${
                          movingLeadId === lead._id
                            ? 'pipeline-card-moving'
                            : ''
                        }`}
                        draggable={movingLeadId !== lead._id}
                        onDragStart={(event) => handleDragStart(event, lead)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="pipeline-card-top">
                          <div className="pipeline-company-icon">
                            <Building2 size={15} />
                          </div>

                          {/* works on touch screens and with the keyboard */}
                          <select
                            className="pipeline-card-move"
                            value={lead.status}
                            disabled={movingLeadId === lead._id}
                            onChange={(event) =>
                              moveLead(lead, event.target.value)
                            }
                            aria-label={`Move ${lead.companyName} to another status`}
                          >
                            {PIPELINE_COLUMNS.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <Link
                          to={`/leads/${lead._id}`}
                          className="pipeline-company-name"
                        >
                          {lead.companyName}
                        </Link>

                        {lead.contactName && (
                          <div className="pipeline-contact-name">
                            {lead.contactName}
                          </div>
                        )}

                        {lead.location && (
                          <div className="pipeline-card-meta">
                            <MapPin size={12} />

                            <span>{lead.location}</span>
                          </div>
                        )}

                        {Number(lead.dealValue) > 0 && (
                          <div className="pipeline-deal-value">
                            <DollarSign size={13} />

                            <strong>{formatCurrency(lead.dealValue)}</strong>
                          </div>
                        )}

                        {lead.primaryProblem && (
                          <div className="pipeline-card-section">
                            <span>Problem</span>

                            <strong>{problemLabel(lead.primaryProblem)}</strong>
                          </div>
                        )}

                        {lead.nextAction && (
                          <div className="pipeline-card-section">
                            <span>Next Action</span>

                            <strong>{lead.nextAction}</strong>
                          </div>
                        )}

                        <div className="pipeline-card-footer">
                          <div className="pipeline-footer-date">
                            <CalendarDays size={12} />

                            <span>{formatDate(lead.nextActionDate)}</span>
                          </div>

                          <div className="pipeline-contact-icons">
                            {lead.phone && (
                              <a
                                href={`tel:${lead.phone}`}
                                aria-label={`Call ${lead.companyName}`}
                              >
                                <Phone size={12} />
                              </a>
                            )}

                            {lead.email && lead.email !== 'noemail@gmail.com' && (
                              <a
                                href={`mailto:${lead.email}`}
                                aria-label={`Email ${lead.companyName}`}
                              >
                                <Mail size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>

                <Link to="/leads/new" className="pipeline-column-add">
                  <Plus size={14} />
                  Add lead
                </Link>
              </div>
            )
          })}
        </section>
      )}
    </div>
  )
}

export default SalesPipeline
