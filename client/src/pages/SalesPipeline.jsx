import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowLeft,
  RefreshCw,
  Plus,
  MoreHorizontal,
  Building2,
  MapPin,
  DollarSign,
  CalendarDays,
  Phone,
  Mail,
  Search,
  X,
} from 'lucide-react'

import { fetchPipeline, updateLeadStage } from '../features/leads/leadsSlice'

import './css/salesPipeline.css'

const STAGES = [
  {
    id: 'new',
    title: 'New',
    description: 'Newly discovered leads',
  },
  {
    id: 'contacted',
    title: 'Contacted',
    description: 'Initial outreach completed',
  },
  {
    id: 'qualified',
    title: 'Qualified',
    description: 'Lead appears to be a fit',
  },
  {
    id: 'discovery',
    title: 'Discovery',
    description: 'Understanding their needs',
  },
  {
    id: 'solution-presented',
    title: 'Solution Presented',
    description: 'Solution has been discussed',
  },
  {
    id: 'proposal',
    title: 'Proposal',
    description: 'Proposal has been presented',
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    description: 'Discussing terms and pricing',
  },
  {
    id: 'won',
    title: 'Won',
    description: 'Deal successfully closed',
  },
  {
    id: 'lost',
    title: 'Lost',
    description: 'Opportunity was lost',
  },
  {
    id: 'nurture',
    title: 'Nurture',
    description: 'Follow up later',
  },
]

const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}

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

  const {
    pipeline = [],
    pipelineSummary = {},
    pipelineLoading,
    pipelineError,
  } = useSelector((state) => state.leads)

  const [search, setSearch] = useState('')
  const [draggedLead, setDraggedLead] = useState(null)
  const [movingLeadId, setMovingLeadId] = useState(null)

  /*
  |--------------------------------------------------------------------------
  | LOAD PIPELINE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(fetchPipeline())
  }, [dispatch])

  /*
  |--------------------------------------------------------------------------
  | FILTER LEADS
  |--------------------------------------------------------------------------
  */

  const filteredLeads = useMemo(() => {
    if (!search.trim()) {
      return pipeline
    }

    const value = search.toLowerCase().trim()

    return pipeline.filter((lead) => {
      return (
        lead.companyName?.toLowerCase().includes(value) ||
        lead.contactName?.toLowerCase().includes(value) ||
        lead.email?.toLowerCase().includes(value) ||
        lead.phone?.toLowerCase().includes(value) ||
        lead.location?.toLowerCase().includes(value)
      )
    })
  }, [pipeline, search])

  /*
  |--------------------------------------------------------------------------
  | GET STAGE LEADS
  |--------------------------------------------------------------------------
  */

  const getStageLeads = (stageId) => {
    return filteredLeads.filter((lead) => lead.stage === stageId)
  }

  /*
  |--------------------------------------------------------------------------
  | REFRESH
  |--------------------------------------------------------------------------
  */

  const refreshPipeline = () => {
    dispatch(fetchPipeline())
  }

  /*
  |--------------------------------------------------------------------------
  | DRAG START
  |--------------------------------------------------------------------------
  */

  const handleDragStart = (event, lead) => {
    setDraggedLead(lead)

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', lead._id)
  }

  /*
  |--------------------------------------------------------------------------
  | DRAG END
  |--------------------------------------------------------------------------
  */

  const handleDragEnd = () => {
    setDraggedLead(null)
  }

  /*
  |--------------------------------------------------------------------------
  | DRAG OVER
  |--------------------------------------------------------------------------
  */

  const handleDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  /*
  |--------------------------------------------------------------------------
  | DROP LEAD
  |--------------------------------------------------------------------------
  */

  const handleDrop = async (event, newStage) => {
    event.preventDefault()

    const leadId = event.dataTransfer.getData('text/plain')

    const lead = draggedLead || pipeline.find((item) => item._id === leadId)

    if (!lead) {
      return
    }

    if (lead.stage === newStage) {
      setDraggedLead(null)
      return
    }

    setMovingLeadId(lead._id)

    try {
      await dispatch(
        updateLeadStage({
          id: lead._id,
          stage: newStage,
        }),
      ).unwrap()
    } catch (error) {
      console.error('Failed to update lead stage:', error)
    } finally {
      setMovingLeadId(null)
      setDraggedLead(null)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | STAGE COUNT
  |--------------------------------------------------------------------------
  */

  const getStageCount = (stageId) => {
    return getStageLeads(stageId).length
  }

  /*
  |--------------------------------------------------------------------------
  | TOTAL PIPELINE VALUE
  |--------------------------------------------------------------------------
  */

  const calculatedPipelineValue = pipeline.reduce((total, lead) => {
    return total + (Number(lead.dealValue) || 0)
  }, 0)

  /*
  |--------------------------------------------------------------------------
  | OPEN PIPELINE VALUE
  |--------------------------------------------------------------------------
  */

  const openPipelineValue = pipeline
    .filter((lead) => lead.stage !== 'won' && lead.stage !== 'lost')
    .reduce((total, lead) => {
      return total + (Number(lead.dealValue) || 0)
    }, 0)

  return (
    <div className="sales-pipeline-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sales-pipeline-header">
        <div className="sales-pipeline-heading">
          <Link
            to="/sales"
            className="sales-pipeline-back"
            aria-label="Back to sales department"
          >
            <ArrowLeft size={17} />
          </Link>

          <div>
            <div className="sales-pipeline-label">SALES DEPARTMENT</div>

            <h1>Sales Pipeline</h1>

            <p>Track opportunities from first contact to closed deal.</p>
          </div>
        </div>

        <div className="sales-pipeline-actions">
          <button
            type="button"
            className="sales-pipeline-refresh"
            onClick={refreshPipeline}
            disabled={pipelineLoading}
            title="Refresh pipeline"
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

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <section className="sales-pipeline-summary">
        <div className="pipeline-summary-card">
          <span>Total Leads</span>
          <strong>{pipelineSummary.total ?? pipeline.length}</strong>
        </div>

        <div className="pipeline-summary-card">
          <span>Pipeline Value</span>
          <strong>
            {formatCurrency(
              pipelineSummary.totalValue ?? calculatedPipelineValue,
            )}
          </strong>
        </div>

        <div className="pipeline-summary-card">
          <span>Open Pipeline</span>
          <strong>{formatCurrency(openPipelineValue)}</strong>
        </div>

        <div className="pipeline-summary-card">
          <span>Proposals</span>
          <strong>
            {pipelineSummary.proposal ?? getStageCount('proposal')}
          </strong>
        </div>

        <div className="pipeline-summary-card">
          <span>Negotiations</span>
          <strong>
            {pipelineSummary.negotiation ?? getStageCount('negotiation')}
          </strong>
        </div>
      </section>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <section className="sales-pipeline-toolbar">
        <div className="pipeline-search">
          <Search size={15} />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search companies, contacts..."
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
            ? `${filteredLeads.length} matching leads`
            : `${pipeline.length} leads`}
        </div>
      </section>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {pipelineError && (
        <div className="sales-pipeline-error">
          <strong>Could not load pipeline.</strong>
          <span>{pipelineError}</span>

          <button type="button" onClick={refreshPipeline}>
            Try again
          </button>
        </div>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {pipelineLoading && pipeline.length === 0 && (
        <div className="sales-pipeline-loading">
          <RefreshCw size={22} className="pipeline-spin" />

          <span>Loading sales pipeline...</span>
        </div>
      )}

      {/* =====================================================
          PIPELINE BOARD
      ===================================================== */}

      {!(pipelineLoading && pipeline.length === 0) && (
        <section className="sales-pipeline-board">
          {STAGES.map((stage) => {
            const stageLeads = getStageLeads(stage.id)

            return (
              <div
                key={stage.id}
                className={`sales-pipeline-column ${
                  draggedLead ? 'pipeline-column-drag-active' : ''
                }`}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, stage.id)}
              >
                {/* COLUMN HEADER */}

                <div className="pipeline-column-header">
                  <div>
                    <h2>{stage.title}</h2>

                    <p>{stage.description}</p>
                  </div>

                  <span className="pipeline-column-count">
                    {stageLeads.length}
                  </span>
                </div>

                {/* LEADS */}

                <div className="pipeline-column-body">
                  {stageLeads.length === 0 ? (
                    <div className="pipeline-empty">
                      <div className="pipeline-empty-icon">
                        <Building2 size={16} />
                      </div>

                      <span>Drop a lead here</span>
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
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
                        {/* CARD TOP */}

                        <div className="pipeline-card-top">
                          <div className="pipeline-company-icon">
                            <Building2 size={15} />
                          </div>

                          <button
                            type="button"
                            className="pipeline-card-menu"
                            aria-label={`Actions for ${lead.companyName}`}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </div>

                        {/* COMPANY */}

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

                        {/* LOCATION */}

                        {lead.location && (
                          <div className="pipeline-card-meta">
                            <MapPin size={12} />

                            <span>{lead.location}</span>
                          </div>
                        )}

                        {/* DEAL VALUE */}

                        <div className="pipeline-deal-value">
                          <DollarSign size={13} />

                          <strong>{formatCurrency(lead.dealValue)}</strong>

                          {lead.probability > 0 && (
                            <span>{lead.probability}%</span>
                          )}
                        </div>

                        {/* PROBLEM */}

                        {lead.primaryProblem && (
                          <div className="pipeline-card-section">
                            <span>Problem</span>

                            <strong>{lead.primaryProblem}</strong>
                          </div>
                        )}

                        {/* NEXT ACTION */}

                        {lead.nextAction && (
                          <div className="pipeline-card-section">
                            <span>Next Action</span>

                            <strong>{lead.nextAction}</strong>
                          </div>
                        )}

                        {/* FOOTER */}

                        <div className="pipeline-card-footer">
                          <div className="pipeline-footer-date">
                            <CalendarDays size={12} />

                            <span>{formatDate(lead.nextActionDate)}</span>
                          </div>

                          <div className="pipeline-contact-icons">
                            {lead.phone && (
                              <a
                                href={`tel:${lead.phone}`}
                                onClick={(event) => event.stopPropagation()}
                                aria-label={`Call ${lead.companyName}`}
                              >
                                <Phone size={12} />
                              </a>
                            )}

                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}`}
                                onClick={(event) => event.stopPropagation()}
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

                {/* ADD BUTTON */}

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
