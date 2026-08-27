import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Phone,
  Mail,
  MessageCircle,
  CalendarDays,
  FileText,
  RotateCcw,
  GitBranch,
  Plus,
  Trash2,
  Clock3,
  User,
  CheckCircle2,
  X,
} from 'lucide-react'

import {
  fetchLeadActivities,
  createLeadActivity,
  deleteLeadActivity,
} from '../features/leadActivities/leadActivitiesSlice.js'

import './LeadActivityTimeline.css'

export default function LeadActivityTimeline({ leadId }) {
  const dispatch = useDispatch()

  const { items, loading, creating, deleting, error, createError } =
    useSelector((state) => state.leadActivities)

  const user = useSelector((state) => state.auth.user)

  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    type: 'call',
    title: '',
    description: '',
    scheduledAt: '',
  })

  useEffect(() => {
    if (!leadId) return

    dispatch(fetchLeadActivities(leadId))
  }, [dispatch, leadId])

  /*
  |--------------------------------------------------------------------------
  | ACTIVITY CONFIGURATION
  |--------------------------------------------------------------------------
  */

  const activityTypes = {
    call: {
      label: 'Phone Call',
      icon: Phone,
      className: 'call',
    },

    email: {
      label: 'Email',
      icon: Mail,
      className: 'email',
    },

    message: {
      label: 'Message',
      icon: MessageCircle,
      className: 'message',
    },

    meeting: {
      label: 'Meeting',
      icon: CalendarDays,
      className: 'meeting',
    },

    note: {
      label: 'Note',
      icon: FileText,
      className: 'note',
    },

    'follow-up': {
      label: 'Follow-up',
      icon: RotateCcw,
      className: 'follow-up',
    },

    'stage-change': {
      label: 'Stage Change',
      icon: GitBranch,
      className: 'stage-change',
    },
  }

  /*
  |--------------------------------------------------------------------------
  | FORM HANDLERS
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setForm({
      type: 'call',
      title: '',
      description: '',
      scheduledAt: '',
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!leadId) return

    if (!form.title.trim()) {
      return
    }

    const data = {
      type: form.type,
      title: form.title.trim(),
      description: form.description.trim(),
      scheduledAt: form.scheduledAt
        ? new Date(form.scheduledAt).toISOString()
        : null,
      completedAt: new Date().toISOString(),
    }

    const result = await dispatch(
      createLeadActivity({
        leadId,
        data,
      }),
    )

    if (createLeadActivity.fulfilled.match(result)) {
      resetForm()
      setShowForm(false)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (activityId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this activity?',
    )

    if (!confirmed) return

    dispatch(
      deleteLeadActivity({
        leadId,
        activityId,
      }),
    )
  }

  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {
    if (!date) return ''

    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  /*
  |--------------------------------------------------------------------------
  | GET USER INITIALS
  |--------------------------------------------------------------------------
  */

  const getInitials = (person) => {
    if (!person) return '?'

    const first = person.firstName?.[0] || ''
    const last = person.lastName?.[0] || ''

    return `${first}${last}`.toUpperCase() || '?'
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <section className="lead-activity-section">
      {/* HEADER */}

      <div className="activity-header">
        <div>
          <div className="activity-eyebrow">
            <Clock3 size={14} />
            SALES ACTIVITY
          </div>

          <h2>Activity Timeline</h2>

          <p>Record calls, emails, meetings, notes and follow-ups.</p>
        </div>

        <button
          type="button"
          className="activity-add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={17} /> : <Plus size={17} />}

          {showForm ? 'Cancel' : 'Add Activity'}
        </button>
      </div>

      {/* ADD ACTIVITY FORM */}

      {showForm && (
        <form className="activity-form" onSubmit={handleSubmit}>
          <div className="activity-form-header">
            <div>
              <h3>Record Activity</h3>

              <p>Add what happened with this lead.</p>
            </div>
          </div>

          <div className="activity-type-grid">
            {Object.entries(activityTypes)
              .filter(([type]) => type !== 'stage-change')
              .map(([type, config]) => {
                const Icon = config.icon

                return (
                  <button
                    key={type}
                    type="button"
                    className={`activity-type-option ${
                      form.type === type ? 'active' : ''
                    }`}
                    onClick={() =>
                      setForm((previous) => ({
                        ...previous,
                        type,
                      }))
                    }
                  >
                    <Icon size={17} />

                    <span>{config.label}</span>
                  </button>
                )
              })}
          </div>

          <div className="activity-form-grid">
            <div className="activity-field">
              <label htmlFor="activity-title">Title</label>

              <input
                id="activity-title"
                name="title"
                type="text"
                placeholder="Example: Spoke with business owner"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="activity-field">
              <label htmlFor="activity-scheduled">Follow-up Date</label>

              <input
                id="activity-scheduled"
                name="scheduledAt"
                type="datetime-local"
                value={form.scheduledAt}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="activity-field">
            <label htmlFor="activity-description">Notes</label>

            <textarea
              id="activity-description"
              name="description"
              rows="4"
              placeholder="What happened? What did the client say? What is the next step?"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {createError && <div className="activity-error">{createError}</div>}

          <div className="activity-form-actions">
            <button
              type="button"
              className="activity-cancel-btn"
              onClick={() => {
                resetForm()
                setShowForm(false)
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="activity-save-btn"
              disabled={creating}
            >
              {creating ? (
                <>
                  <span className="activity-spinner"></span>
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  Save Activity
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ERROR */}

      {error && <div className="activity-error">{error}</div>}

      {/* LOADING */}

      {loading && (
        <div className="activity-loading">
          <span className="activity-spinner"></span>

          <span>Loading activity...</span>
        </div>
      )}

      {/* EMPTY */}

      {!loading && items.length === 0 && (
        <div className="activity-empty">
          <div className="activity-empty-icon">
            <Clock3 size={24} />
          </div>

          <h3>No activity yet</h3>

          <p>Start recording your interactions with this lead.</p>

          <button
            type="button"
            className="activity-empty-btn"
            onClick={() => setShowForm(true)}
          >
            <Plus size={16} />
            Add First Activity
          </button>
        </div>
      )}

      {/* TIMELINE */}

      {!loading && items.length > 0 && (
        <div className="activity-timeline">
          {items.map((activity) => {
            const config = activityTypes[activity.type] || activityTypes.note

            const Icon = config.icon

            return (
              <article className="activity-item" key={activity._id}>
                {/* TIMELINE LINE */}

                <div className={`activity-icon ${config.className}`}>
                  <Icon size={17} />
                </div>

                <div className="activity-content">
                  {/* TOP */}

                  <div className="activity-top">
                    <div>
                      <div className="activity-type-label">{config.label}</div>

                      <h3>{activity.title}</h3>
                    </div>

                    <button
                      type="button"
                      className="activity-delete-btn"
                      onClick={() => handleDelete(activity._id)}
                      disabled={deleting}
                      title="Delete activity"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* DESCRIPTION */}

                  {activity.description && (
                    <p className="activity-description">
                      {activity.description}
                    </p>
                  )}

                  {/* FOLLOW-UP */}

                  {activity.scheduledAt && (
                    <div className="activity-follow-up">
                      <RotateCcw size={14} />

                      <span>
                        Follow-up scheduled for{' '}
                        <strong>{formatDate(activity.scheduledAt)}</strong>
                      </span>
                    </div>
                  )}

                  {/* FOOTER */}

                  <div className="activity-meta">
                    <div className="activity-user">
                      <div className="activity-avatar">
                        {activity.createdBy?.profilePicture ? (
                          <img src={activity.createdBy.profilePicture} alt="" />
                        ) : (
                          getInitials(activity.createdBy)
                        )}
                      </div>

                      <span>
                        {activity.createdBy?.firstName || 'Unknown'}{' '}
                        {activity.createdBy?.lastName || ''}
                      </span>
                    </div>

                    <span className="activity-date">
                      {formatDate(activity.createdAt)}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
