import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PayrollEditor from '../features/payroll/PayrollEditor.jsx'

import {
  fetchPayroll,
  createPayroll,
} from '../features/payroll/payrollSlice.js'

import api from '../lib/api.js'

// =====================================================
// MONTHS
// =====================================================

const PAYROLL_MONTHS = [
  { month: 8, year: 2026, label: 'August 2026' },
  { month: 9, year: 2026, label: 'September 2026' },
  { month: 10, year: 2026, label: 'October 2026' },
  { month: 11, year: 2026, label: 'November 2026' },
  { month: 12, year: 2026, label: 'December 2026' },
  { month: 1, year: 2027, label: 'January 2027' },
  { month: 2, year: 2027, label: 'February 2027' },
  { month: 3, year: 2027, label: 'March 2027' },
  { month: 4, year: 2027, label: 'April 2027' },
  { month: 5, year: 2027, label: 'May 2027' },
  { month: 6, year: 2027, label: 'June 2027' },
  { month: 7, year: 2027, label: 'July 2027' },
  { month: 8, year: 2027, label: 'August 2027' },
]

// =====================================================
// INLINE STYLES
// =====================================================

const styles = {
  page: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10px 0 60px',
    color: '#f8fafc',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '24px',
    marginBottom: '28px',
  },

  eyebrow: {
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '1.8px',
    color: '#60a5fa',
    marginBottom: '7px',
  },

  title: {
    margin: 0,
    fontSize: '32px',
    fontWeight: 750,
    letterSpacing: '-0.8px',
    color: '#f8fafc',
  },

  subtitle: {
    margin: '7px 0 0',
    color: '#8792a5',
    fontSize: '14px',
  },

  periodBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    padding: '11px 15px',
    borderRadius: '12px',
    background: '#111824',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#9aa6b8',
    fontSize: '12px',
    whiteSpace: 'nowrap',
  },

  periodStrong: {
    color: '#f1f5f9',
    fontWeight: 700,
  },

  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#22c55e',
    boxShadow: '0 0 10px rgba(34,197,94,.45)',
  },

  controlCard: {
    background: '#111722',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '18px',
    padding: '22px',
    marginBottom: '22px',
    boxShadow: '0 20px 55px rgba(0,0,0,.18)',
  },

  controlGrid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1fr',
    gap: '16px',
  },

  field: {
    minWidth: 0,
  },

  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '11px',
    fontWeight: 750,
    letterSpacing: '1px',
    color: '#8f9bad',
  },

  input: {
    width: '100%',
    height: '46px',
    boxSizing: 'border-box',
    padding: '0 14px',
    borderRadius: '10px',
    border: '1px solid #283344',
    background: '#0b1018',
    color: '#f8fafc',
    outline: 'none',
    fontSize: '14px',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.2)',
  },

  select: {
    width: '100%',
    height: '46px',
    boxSizing: 'border-box',
    padding: '0 38px 0 14px',
    borderRadius: '10px',
    border: '1px solid #283344',
    backgroundColor: '#0b1018',
    color: '#f8fafc',
    outline: 'none',
    fontSize: '14px',
    cursor: 'pointer',
  },

  workspace: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },

  card: {
    background: '#111722',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '18px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,.18)',
  },

  employeeCard: {
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },

  employeeMain: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    minWidth: 0,
  },

  avatar: {
    width: '58px',
    height: '58px',
    minWidth: '58px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg,#2563eb,#3b82f6)',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 800,
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(37,99,235,.25)',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  employeeName: {
    margin: 0,
    fontSize: '20px',
    color: '#f8fafc',
  },

  employeeEmail: {
    margin: '5px 0',
    color: '#7f8b9e',
    fontSize: '13px',
  },

  roleBadge: {
    display: 'inline-flex',
    padding: '4px 9px',
    borderRadius: '6px',
    background: 'rgba(59,130,246,.1)',
    border: '1px solid rgba(59,130,246,.15)',
    color: '#60a5fa',
    fontSize: '10px',
    fontWeight: 750,
    textTransform: 'capitalize',
  },

  selectedPeriod: {
    textAlign: 'right',
  },

  smallLabel: {
    display: 'block',
    fontSize: '10px',
    letterSpacing: '1px',
    fontWeight: 750,
    color: '#667387',
    marginBottom: '5px',
  },

  periodValue: {
    color: '#e2e8f0',
    fontSize: '14px',
    fontWeight: 700,
  },

  monthBar: {
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    background: '#0e141e',
    border: '1px solid rgba(255,255,255,.06)',
    borderRadius: '16px',
  },

  monthInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
  },

  calendar: {
    width: '42px',
    height: '42px',
    borderRadius: '11px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(59,130,246,.1)',
    border: '1px solid rgba(59,130,246,.15)',
    fontSize: '18px',
  },

  monthTitle: {
    margin: 0,
    color: '#f1f5f9',
    fontSize: '17px',
  },

  primaryButton: {
    height: '44px',
    padding: '0 18px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: '1px solid rgba(96,165,250,.25)',
    borderRadius: '10px',
    background: 'linear-gradient(135deg,#2563eb,#3b82f6)',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 750,
    cursor: 'pointer',
    boxShadow: '0 8px 22px rgba(37,99,235,.22)',
    transition: 'all .2s ease',
  },

  empty: {
    textAlign: 'center',
    padding: '60px 25px',
    background: '#111722',
    border: '1px solid rgba(255,255,255,.07)',
    borderRadius: '18px',
  },

  emptyIcon: {
    width: '52px',
    height: '52px',
    margin: '0 auto 15px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#151e2c',
    color: '#60a5fa',
    fontSize: '21px',
  },

  emptyTitle: {
    margin: 0,
    color: '#f1f5f9',
    fontSize: '18px',
  },

  emptyText: {
    margin: '8px auto 20px',
    maxWidth: '420px',
    color: '#7f8b9e',
    fontSize: '13px',
    lineHeight: 1.6,
  },

  salaryHero: {
    padding: '28px',
    borderRadius: '18px',
    background: 'linear-gradient(135deg,#111c2d,#101722)',
    border: '1px solid rgba(59,130,246,.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    boxShadow: '0 18px 50px rgba(0,0,0,.18)',
  },

  salaryLabel: {
    display: 'block',
    color: '#718096',
    fontSize: '10px',
    fontWeight: 800,
    letterSpacing: '1.2px',
    marginBottom: '8px',
  },

  salaryValue: {
    fontSize: '38px',
    fontWeight: 800,
    color: '#f8fafc',
    letterSpacing: '-1px',
  },

  salaryDescription: {
    margin: '5px 0 0',
    color: '#7f8b9e',
    fontSize: '12px',
  },

  status: {
    padding: '8px 13px',
    borderRadius: '999px',
    background: 'rgba(34,197,94,.08)',
    border: '1px solid rgba(34,197,94,.15)',
    color: '#86efac',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'capitalize',
  },

  metrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    gap: '14px',
  },

  metric: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
    background: '#111722',
    border: '1px solid rgba(255,255,255,.07)',
    borderRadius: '15px',
  },

  metricIcon: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '11px',
    background: 'rgba(59,130,246,.1)',
    color: '#60a5fa',
    fontWeight: 800,
  },

  metricLabel: {
    display: 'block',
    color: '#7f8b9e',
    fontSize: '11px',
    marginBottom: '4px',
  },

  metricValue: {
    color: '#f1f5f9',
    fontSize: '16px',
  },

  breakdown: {
    background: '#111722',
    border: '1px solid rgba(255,255,255,.07)',
    borderRadius: '18px',
    overflow: 'hidden',
  },

  sectionHeader: {
    padding: '22px 24px',
    borderBottom: '1px solid rgba(255,255,255,.06)',
  },

  sectionTitle: {
    margin: 0,
    color: '#f1f5f9',
    fontSize: '17px',
  },

  sectionText: {
    margin: '5px 0 0',
    color: '#778397',
    fontSize: '12px',
  },

  breakdownRow: {
    padding: '18px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,.05)',
  },

  breakdownName: {
    color: '#dbe3ee',
    fontSize: '13px',
    fontWeight: 650,
  },

  breakdownDescription: {
    display: 'block',
    marginTop: '4px',
    color: '#697589',
    fontSize: '11px',
  },

  amount: {
    color: '#e2e8f0',
    fontSize: '14px',
    fontWeight: 750,
  },

  total: {
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#0c121b',
  },

  totalLabel: {
    color: '#cbd5e1',
    fontSize: '14px',
    fontWeight: 700,
  },

  totalAmount: {
    color: '#60a5fa',
    fontSize: '20px',
    fontWeight: 800,
  },

  commissionCard: {
    background: '#111722',
    border: '1px solid rgba(255,255,255,.07)',
    borderRadius: '18px',
    overflow: 'hidden',
  },

  commissionHeader: {
    padding: '22px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255,255,255,.06)',
  },

  commissionTotal: {
    color: '#86efac',
    fontSize: '17px',
    fontWeight: 800,
  },

  commissionItem: {
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
    borderBottom: '1px solid rgba(255,255,255,.05)',
  },

  commissionIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(34,197,94,.1)',
    color: '#4ade80',
    fontWeight: 800,
  },

  commissionInfo: {
    flex: 1,
  },

  commissionName: {
    display: 'block',
    color: '#dbe3ee',
    fontSize: '13px',
  },

  commissionNumber: {
    display: 'block',
    marginTop: '3px',
    color: '#697589',
    fontSize: '11px',
  },

  commissionAmount: {
    color: '#4ade80',
    fontSize: '14px',
  },

  footer: {
    padding: '18px 22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#0e141e',
    border: '1px solid rgba(255,255,255,.07)',
    borderRadius: '15px',
  },

  loading: {
    padding: '30px',
    textAlign: 'center',
    color: '#94a3b8',
  },

  error: {
    padding: '15px 18px',
    marginBottom: '18px',
    borderRadius: '12px',
    background: 'rgba(239,68,68,.08)',
    border: '1px solid rgba(239,68,68,.2)',
    color: '#fca5a5',
  },
}

// =====================================================
// COMPONENT
// =====================================================

export default function PayrollManagement() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  const { payroll, loading, error } = useSelector((state) => state.payroll)

  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersError, setUsersError] = useState(null)

  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(PAYROLL_MONTHS[0])
  const [editingPayroll, setEditingPayroll] = useState(null)
  const [search, setSearch] = useState('')

  const canManagePayroll = user?.role === 'admin' || user?.role === 'manager'

  // =====================================================
  // LOAD USERS
  // =====================================================

  useEffect(() => {
    if (!canManagePayroll) return

    const loadUsers = async () => {
      try {
        setUsersLoading(true)
        setUsersError(null)

        const response = await api.get('/users')

        setUsers(response.data.users || [])
      } catch (error) {
        console.error('Failed to load users:', error)

        setUsersError(error.response?.data?.message || 'Failed to load users')
      } finally {
        setUsersLoading(false)
      }
    }

    loadUsers()
  }, [canManagePayroll])

  // =====================================================
  // LOAD PAYROLL
  // =====================================================

  useEffect(() => {
    if (canManagePayroll) {
      dispatch(fetchPayroll())
    }
  }, [dispatch, canManagePayroll])

  // =====================================================
  // ALLOWED USERS
  // =====================================================

  const allowedUsers = useMemo(() => {
    if (!user) return []

    if (user.role === 'admin') {
      return users
    }

    if (user.role === 'manager') {
      return users.filter(
        (employee) =>
          employee._id === user._id || employee.role === 'salesperson',
      )
    }

    return []
  }, [users, user])

  // =====================================================
  // FILTER USERS
  // =====================================================

  const filteredUsers = allowedUsers.filter((employee) => {
    const fullName = `${employee.firstName || ''} ${
      employee.lastName || ''
    }`.toLowerCase()

    const email = employee.email?.toLowerCase() || ''

    const searchValue = search.toLowerCase()

    return fullName.includes(searchValue) || email.includes(searchValue)
  })

  // =====================================================
  // EMPLOYEE
  // =====================================================

  const employee = users.find((item) => item._id === selectedEmployee)

  // =====================================================
  // PAYROLL
  // =====================================================

  const selectedPayroll = payroll.find((item) => {
    const employeeId = item.employee?._id || item.employee

    return (
      String(employeeId) === String(selectedEmployee) &&
      Number(item.year) === Number(selectedMonth.year) &&
      Number(item.month) === Number(selectedMonth.month)
    )
  })

  // =====================================================
  // CALCULATIONS
  // =====================================================

  const meetingPay =
    Number(selectedPayroll?.meetingHours || 0) *
    Number(selectedPayroll?.hourlyRate || 0)

  const commissionTotal =
    selectedPayroll?.commissions?.reduce(
      (total, commission) => total + Number(commission.amount || 0),
      0,
    ) || 0

  const bonus = Number(selectedPayroll?.bonus || 0)

  const finalSalary = meetingPay + commissionTotal + bonus

  // =====================================================
  // CREATE
  // =====================================================

  const handleCreatePayroll = async () => {
    if (!employee) return

    try {
      const created = await dispatch(
        createPayroll({
          employee: employee._id,
          year: selectedMonth.year,
          month: selectedMonth.month,
          meetingHours: 0,
          hourlyRate: 0,
          commissions: [],
          bonus: 0,
          notes: '',
          status: 'draft',
        }),
      ).unwrap()

      setEditingPayroll(created)
    } catch (error) {
      console.error('Create payroll error:', error)
    }
  }

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = () => {
    if (!selectedPayroll) return

    setEditingPayroll(selectedPayroll)
  }

  // =====================================================
  // ACCESS DENIED
  // =====================================================

  if (!canManagePayroll) {
    return (
      <div style={styles.page}>
        <section style={styles.empty}>
          <h2>Access Denied</h2>
          <p>You do not have permission to manage payroll.</p>
        </section>
      </div>
    )
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div style={styles.page}>
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header style={styles.header}>
        <div>
          <div style={styles.eyebrow}>FINANCE & PAYROLL</div>

          <h1 style={styles.title}>Payroll Management</h1>

          <p style={styles.subtitle}>
            Manage employee compensation, commissions and monthly payroll.
          </p>
        </div>

        <div style={styles.periodBadge}>
          <span style={styles.dot}></span>

          <span>Payroll Period</span>

          <strong style={styles.periodStrong}>Aug 2026 — Aug 2027</strong>
        </div>
      </header>

      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <section style={styles.controlCard}>
        <div style={styles.controlGrid}>
          <div style={styles.field}>
            <label style={styles.label}>SEARCH EMPLOYEE</label>

            <input
              style={styles.input}
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>EMPLOYEE</label>

            <select
              style={styles.select}
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">Select employee</option>

              {filteredUsers.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName} — {employee.role}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>PAYROLL MONTH</label>

            <select
              style={styles.select}
              value={`${selectedMonth.year}-${selectedMonth.month}`}
              onChange={(e) => {
                const [year, month] = e.target.value.split('-')

                const found = PAYROLL_MONTHS.find(
                  (item) =>
                    item.year === Number(year) && item.month === Number(month),
                )

                setSelectedMonth(found)
              }}
            >
              {PAYROLL_MONTHS.map((item) => (
                <option
                  key={`${item.year}-${item.month}`}
                  value={`${item.year}-${item.month}`}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {(loading || usersLoading) && (
        <div style={styles.loading}>Loading payroll...</div>
      )}

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {(error || usersError) && (
        <div style={styles.error}>{error || usersError}</div>
      )}

      {/* ================================================= */}
      {/* NO EMPLOYEE */}
      {/* ================================================= */}

      {!selectedEmployee && !loading && (
        <section style={styles.empty}>
          <div style={styles.emptyIcon}>👤</div>

          <h2 style={styles.emptyTitle}>Select an employee</h2>

          <p style={styles.emptyText}>
            Choose an employee above to view and manage their monthly payroll.
          </p>
        </section>
      )}

      {/* ================================================= */}
      {/* WORKSPACE */}
      {/* ================================================= */}

      {employee && !loading && (
        <div style={styles.workspace}>
          {/* ================================================= */}
          {/* EMPLOYEE */}
          {/* ================================================= */}

          <section
            style={{
              ...styles.card,
              ...styles.employeeCard,
            }}
          >
            <div style={styles.employeeMain}>
              <div style={styles.avatar}>
                {employee.profilePicture ? (
                  <img
                    src={employee.profilePicture}
                    alt=""
                    style={styles.avatarImage}
                  />
                ) : (
                  <>
                    {employee.firstName?.[0]}
                    {employee.lastName?.[0]}
                  </>
                )}
              </div>

              <div>
                <h2 style={styles.employeeName}>
                  {employee.firstName} {employee.lastName}
                </h2>

                <p style={styles.employeeEmail}>{employee.email}</p>

                <span style={styles.roleBadge}>{employee.role}</span>
              </div>
            </div>

            <div style={styles.selectedPeriod}>
              <span style={styles.smallLabel}>SELECTED PERIOD</span>

              <strong style={styles.periodValue}>{selectedMonth.label}</strong>
            </div>
          </section>

          {/* ================================================= */}
          {/* MONTH BAR */}
          {/* ================================================= */}

          <section style={styles.monthBar}>
            <div style={styles.monthInfo}>
              <div style={styles.calendar}>📅</div>

              <div>
                <span style={styles.smallLabel}>PAYROLL PERIOD</span>

                <h2 style={styles.monthTitle}>{selectedMonth.label}</h2>
              </div>
            </div>

            <button
              type="button"
              onClick={selectedPayroll ? handleEdit : handleCreatePayroll}
              style={styles.primaryButton}
            >
              {selectedPayroll ? '✎' : '＋'}

              {selectedPayroll ? ' Edit Payroll' : ' Create Payroll'}
            </button>
          </section>

          {/* ================================================= */}
          {/* NO PAYROLL */}
          {/* ================================================= */}

          {!selectedPayroll && (
            <section style={styles.empty}>
              <div style={styles.emptyIcon}>$</div>

              <h2 style={styles.emptyTitle}>No payroll created</h2>

              <p style={styles.emptyText}>
                There is no payroll record for{' '}
                <strong>{selectedMonth.label}</strong>.
              </p>

              <button
                type="button"
                onClick={handleCreatePayroll}
                style={styles.primaryButton}
              >
                ＋ Create Payroll
              </button>
            </section>
          )}

          {/* ================================================= */}
          {/* PAYROLL DATA */}
          {/* ================================================= */}

          {selectedPayroll && (
            <>
              {/* SALARY HERO */}

              <section style={styles.salaryHero}>
                <div>
                  <span style={styles.salaryLabel}>FINAL MONTHLY SALARY</span>

                  <div style={styles.salaryValue}>
                    $
                    {finalSalary.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>

                  <p style={styles.salaryDescription}>
                    Total compensation for {selectedMonth.label}
                  </p>
                </div>

                <div style={styles.status}>● {selectedPayroll.status}</div>
              </section>

              {/* ================================================= */}
              {/* METRICS */}
              {/* ================================================= */}

              <section style={styles.metrics}>
                <div style={styles.metric}>
                  <div style={styles.metricIcon}>⏱</div>

                  <div>
                    <span style={styles.metricLabel}>Meeting Hours</span>

                    <strong style={styles.metricValue}>
                      {selectedPayroll.meetingHours || 0}
                    </strong>
                  </div>
                </div>

                <div style={styles.metric}>
                  <div style={styles.metricIcon}>$</div>

                  <div>
                    <span style={styles.metricLabel}>Meeting Pay</span>

                    <strong style={styles.metricValue}>
                      ${meetingPay.toFixed(2)}
                    </strong>
                  </div>
                </div>

                <div style={styles.metric}>
                  <div style={styles.metricIcon}>%</div>

                  <div>
                    <span style={styles.metricLabel}>Commission</span>

                    <strong style={styles.metricValue}>
                      ${commissionTotal.toFixed(2)}
                    </strong>
                  </div>
                </div>

                <div style={styles.metric}>
                  <div style={styles.metricIcon}>★</div>

                  <div>
                    <span style={styles.metricLabel}>Bonus</span>

                    <strong style={styles.metricValue}>
                      ${bonus.toFixed(2)}
                    </strong>
                  </div>
                </div>
              </section>

              {/* ================================================= */}
              {/* BREAKDOWN */}
              {/* ================================================= */}

              <section style={styles.breakdown}>
                <div style={styles.sectionHeader}>
                  <h2 style={styles.sectionTitle}>Salary Breakdown</h2>

                  <p style={styles.sectionText}>
                    How the final salary was calculated.
                  </p>
                </div>

                <div style={styles.breakdownRow}>
                  <div>
                    <strong style={styles.breakdownName}>Meeting Pay</strong>

                    <span style={styles.breakdownDescription}>
                      {selectedPayroll.meetingHours || 0} hours × $
                      {Number(selectedPayroll.hourlyRate || 0).toFixed(2)}
                    </span>
                  </div>

                  <strong style={styles.amount}>
                    ${meetingPay.toFixed(2)}
                  </strong>
                </div>

                <div style={styles.breakdownRow}>
                  <div>
                    <strong style={styles.breakdownName}>
                      Commission Earnings
                    </strong>

                    <span style={styles.breakdownDescription}>
                      {selectedPayroll.commissions?.length || 0} commission(s)
                    </span>
                  </div>

                  <strong style={styles.amount}>
                    ${commissionTotal.toFixed(2)}
                  </strong>
                </div>

                <div style={styles.breakdownRow}>
                  <div>
                    <strong style={styles.breakdownName}>Bonus</strong>

                    <span style={styles.breakdownDescription}>
                      Additional performance bonus
                    </span>
                  </div>

                  <strong style={styles.amount}>${bonus.toFixed(2)}</strong>
                </div>

                <div style={styles.total}>
                  <span style={styles.totalLabel}>Total Salary</span>

                  <strong style={styles.totalAmount}>
                    ${finalSalary.toFixed(2)}
                  </strong>
                </div>
              </section>

              {/* ================================================= */}
              {/* COMMISSIONS */}
              {/* ================================================= */}

              <section style={styles.commissionCard}>
                <div style={styles.commissionHeader}>
                  <div>
                    <h2 style={styles.sectionTitle}>Commission Earnings</h2>

                    <p style={styles.sectionText}>
                      Individual commissions included in this month's payroll.
                    </p>
                  </div>

                  <strong style={styles.commissionTotal}>
                    ${commissionTotal.toFixed(2)}
                  </strong>
                </div>

                {selectedPayroll.commissions?.length > 0 ? (
                  <div>
                    {selectedPayroll.commissions.map((commission, index) => (
                      <div
                        key={commission._id || index}
                        style={styles.commissionItem}
                      >
                        <div style={styles.commissionIcon}>$</div>

                        <div style={styles.commissionInfo}>
                          <strong style={styles.commissionName}>
                            {commission.description || 'Commission'}
                          </strong>

                          <span style={styles.commissionNumber}>
                            Commission #{index + 1}
                          </span>
                        </div>

                        <strong style={styles.commissionAmount}>
                          +$
                          {Number(commission.amount || 0).toFixed(2)}
                        </strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '24px',
                      color: '#697589',
                      fontSize: '13px',
                    }}
                  >
                    No commissions have been added for this month.
                  </div>
                )}
              </section>

              {/* ================================================= */}
              {/* FOOTER */}
              {/* ================================================= */}

              <div style={styles.footer}>
                <div>
                  <span style={styles.smallLabel}>PAYROLL STATUS</span>

                  <strong
                    style={{
                      color: '#e2e8f0',
                      fontSize: '14px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {selectedPayroll.status}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={handleEdit}
                  style={styles.primaryButton}
                >
                  ✎ Edit Payroll
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ================================================= */}
      {/* PAYROLL EDITOR */}
      {/* ================================================= */}

      {editingPayroll && employee && (
        <PayrollEditor
          employee={employee}
          payroll={editingPayroll}
          onClose={() => {
            setEditingPayroll(null)
            dispatch(fetchPayroll())
          }}
        />
      )}
    </div>
  )
}
