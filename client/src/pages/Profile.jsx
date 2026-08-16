import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchMyPayroll } from '../features/payroll/payrollSlice.js'
import PayrollEditor from '../features/payroll/PayrollEditor.jsx'

export default function Profile() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  const { payroll, loading, error } = useSelector((state) => state.payroll)

  const [editingPayroll, setEditingPayroll] = useState(null)

  // =====================================================
  // INITIALS
  // =====================================================

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`

  // =====================================================
  // LOAD PAYROLL
  // =====================================================

  useEffect(() => {
    if (user) {
      dispatch(fetchMyPayroll())
    }
  }, [dispatch, user])

  // =====================================================
  // USER NOT LOGGED IN
  // =====================================================

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty-login">
          <div className="profile-empty-icon">👤</div>
          <h2>Please log in</h2>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  // =====================================================
  // PAYROLL PERMISSION
  // =====================================================

  const canManagePayroll = user.role === 'admin' || user.role === 'manager'

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="profile-page">
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="profile-page-header">
        <div>
          <div className="profile-eyebrow">ACCOUNT</div>

          <h1>My Profile</h1>

          <p>Manage your account information, permissions and payroll.</p>
        </div>

        <div className="profile-header-badge">
          <span className="profile-status-dot"></span>

          <div>
            <span>ACCOUNT STATUS</span>
            <strong>{user.isActive === false ? 'Disabled' : 'Active'}</strong>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* PROFILE CARD */}
      {/* ================================================= */}

      <section className="profile-card">
        <div className="profile-avatar">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
            />
          ) : (
            initials
          )}
        </div>

        <div className="profile-info">
          <div className="profile-name-row">
            <h2>
              {user.firstName} {user.lastName}
            </h2>

            <span className="role-badge">{user.role}</span>
          </div>

          <p className="profile-email">{user.email}</p>

          <div className="profile-meta">
            <span>
              <span className="meta-dot"></span>
              {user.isActive === false ? 'Inactive account' : 'Active employee'}
            </span>

            <span>Account access enabled</span>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* PERMISSIONS */}
      {/* ================================================= */}

      <section className="profile-panel">
        <div className="profile-panel-header">
          <div>
            <div className="panel-eyebrow">ACCESS CONTROL</div>

            <h2>Permissions</h2>

            <p>Permissions currently assigned to your account.</p>
          </div>

          <div className="permission-count">
            <strong>{user.permissions?.length || 0}</strong>

            <span>Permissions</span>
          </div>
        </div>

        <div className="permission-list">
          {user.permissions?.length > 0 ? (
            user.permissions.map((permission) => (
              <span key={permission} className="permission-badge">
                <span className="permission-check">✓</span>

                {permission}
              </span>
            ))
          ) : (
            <span className="no-permissions">No permissions assigned</span>
          )}
        </div>
      </section>

      {/* ================================================= */}
      {/* PAYROLL */}
      {/* ================================================= */}

      <section className="profile-panel payroll-panel">
        {/* PAYROLL HEADER */}

        <div className="profile-panel-header payroll-header">
          <div>
            <div className="panel-eyebrow">FINANCE</div>

            <h2>Payroll</h2>

            <p>Your monthly payroll information and compensation history.</p>
          </div>

          {canManagePayroll && (
            <button
              className="profile-primary-button"
              type="button"
              onClick={() => {
                alert(
                  'Payroll management will be available from the Users/Payroll management page.',
                )
              }}
            >
              <span className="button-icon">↗</span>
              Manage Payroll
            </button>
          )}
        </div>

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading && (
          <div className="profile-loading">
            <div className="profile-spinner"></div>
            <span>Loading payroll...</span>
          </div>
        )}

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {!loading && error && (
          <div className="profile-error">
            <span className="error-icon">!</span>
            <span>{error}</span>
          </div>
        )}

        {/* ================================================= */}
        {/* NO PAYROLL */}
        {/* ================================================= */}

        {!loading && !error && payroll?.length === 0 && (
          <div className="profile-empty-payroll">
            <div className="payroll-empty-icon">$</div>

            <h3>No payroll records found</h3>

            <p>
              No payroll information is currently available for your account.
            </p>

            {canManagePayroll && (
              <span>
                Create payroll records from the payroll management section.
              </span>
            )}
          </div>
        )}

        {/* ================================================= */}
        {/* PAYROLL LIST */}
        {/* ================================================= */}

        {!loading && !error && payroll?.length > 0 && (
          <div className="payroll-list">
            {payroll.map((item) => (
              <PayrollCard
                key={item._id}
                payroll={item}
                canEdit={canManagePayroll}
                onEdit={() => setEditingPayroll(item)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ================================================= */}
      {/* PAYROLL EDITOR */}
      {/* ================================================= */}

      {editingPayroll && (
        <PayrollEditor
          employee={user}
          payroll={editingPayroll}
          onClose={() => setEditingPayroll(null)}
        />
      )}
    </div>
  )
}

// =========================================================
// PAYROLL CARD
// =========================================================

function PayrollCard({ payroll, canEdit, onEdit }) {
  // =======================================================
  // MONTH NAME
  // =======================================================

  const monthName = new Date(payroll.year, payroll.month - 1, 1).toLocaleString(
    'default',
    {
      month: 'long',
    },
  )

  // =======================================================
  // RETURN
  // =======================================================

  return (
    <div className="payroll-card">
      {/* ================================================= */}
      {/* CARD HEADER */}
      {/* ================================================= */}

      <div className="payroll-card-header">
        <div className="payroll-month">
          <div className="payroll-calendar">📅</div>

          <div>
            <h3>
              {monthName} {payroll.year}
            </h3>

            <span className="payroll-period">Monthly Payroll</span>
          </div>
        </div>

        <div className="payroll-card-actions">
          <span className="payroll-status">
            <span className="status-dot"></span>
            {payroll.status || 'draft'}
          </span>

          {canEdit && (
            <button
              className="payroll-edit-button"
              type="button"
              onClick={onEdit}
            >
              <span>✎</span>
              Edit
            </button>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* PAYROLL DETAILS */}
      {/* ================================================= */}

      <div className="payroll-details">
        {/* MEETING HOURS */}

        <div className="payroll-detail">
          <label>Meeting Hours</label>

          <strong>{payroll.meetingHours || 0}</strong>

          <span className="detail-subtext">Hours worked</span>
        </div>

        {/* HOURLY RATE */}

        <div className="payroll-detail">
          <label>Hourly Rate</label>

          <strong>${Number(payroll.hourlyRate || 0).toFixed(2)}</strong>

          <span className="detail-subtext">Per hour</span>
        </div>

        {/* MEETING PAY */}

        <div className="payroll-detail">
          <label>Meeting Pay</label>

          <strong>${Number(payroll.meetingPay || 0).toFixed(2)}</strong>

          <span className="detail-subtext">Hourly compensation</span>
        </div>

        {/* COMMISSION */}

        <div className="payroll-detail">
          <label>Commission</label>

          <strong className="commission-value">
            ${Number(payroll.commissionTotal || 0).toFixed(2)}
          </strong>

          <span className="detail-subtext">Commission earnings</span>
        </div>

        {/* BONUS */}

        <div className="payroll-detail">
          <label>Bonus</label>

          <strong>${Number(payroll.bonus || 0).toFixed(2)}</strong>

          <span className="detail-subtext">Additional bonus</span>
        </div>

        {/* FINAL SALARY */}

        <div className="payroll-detail final-salary">
          <label>FINAL SALARY</label>

          <strong>${Number(payroll.finalSalary || 0).toFixed(2)}</strong>

          <span className="detail-subtext">Total monthly compensation</span>
        </div>
      </div>

      {/* ================================================= */}
      {/* COMMISSIONS */}
      {/* ================================================= */}

      {payroll.commissions?.length > 0 && (
        <div className="commissions">
          <div className="commissions-header">
            <div>
              <h4>Commission Earnings</h4>

              <p>Individual commissions included in this payroll.</p>
            </div>

            <div className="commission-total">
              ${Number(payroll.commissionTotal || 0).toFixed(2)}
            </div>
          </div>

          <div className="commission-list">
            {payroll.commissions.map((commission, index) => (
              <div key={commission._id || index} className="commission-row">
                <div className="commission-left">
                  <div className="commission-icon">$</div>

                  <div>
                    <strong>{commission.description || 'Commission'}</strong>

                    <span>Commission #{index + 1}</span>
                  </div>
                </div>

                <strong className="commission-amount">
                  +$
                  {Number(commission.amount || 0).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
