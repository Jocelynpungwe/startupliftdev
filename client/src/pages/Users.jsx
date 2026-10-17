import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../features/users/userSlice.js'
import { useConfirm, useToast } from '../components/ui/UiProvider.jsx'

const permissionsList = [
  ['dashboard:read', 'View Dashboard'],
  ['lead:create', 'Create Leads'],
  ['lead:read', 'View Leads'],
  ['lead:update', 'Edit Leads'],
  ['lead:delete', 'Delete Leads'],
  ['user:create', 'Create Users'],
  ['user:read', 'View Users'],
  ['user:update', 'Edit Users'],
  ['user:delete', 'Delete Users'],
]

const defaultPermissions = {
  admin: permissionsList.map(([value]) => value),

  manager: [
    'dashboard:read',
    'lead:create',
    'lead:read',
    'lead:update',
    'user:read',
  ],

  salesperson: ['dashboard:read', 'lead:create', 'lead:read'],
}

export default function Users() {
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const toast = useToast()

  const { users, loading, error } = useSelector((state) => state.users)

  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'salesperson',
    permissions: defaultPermissions.salesperson,
  })

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleRoleChange = (role) => {
    setForm({
      ...form,
      role,
      permissions: defaultPermissions[role],
    })
  }

  const togglePermission = (permission) => {
    setForm((current) => {
      const exists = current.permissions.includes(permission)

      return {
        ...current,
        permissions: exists
          ? current.permissions.filter((p) => p !== permission)
          : [...current.permissions, permission],
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await dispatch(createUser(form))

    if (!result.error) {
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'salesperson',
        permissions: defaultPermissions.salesperson,
      })

      setShowForm(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = await confirm({
      title: 'Delete this user?',
      message: 'They will lose access to the CRM immediately.',
      confirmLabel: 'Delete user',
      tone: 'danger',
    })

    if (!confirmed) return

    const result = await dispatch(deleteUser(id))

    if (deleteUser.fulfilled.match(result)) toast.success('User deleted.')
    else toast.error(result.payload || 'Could not delete the user.')
  }

  return (
    <div className="users-page">
      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="users-page-header">
        <div>
          <div className="users-eyebrow">TEAM & ACCESS</div>

          <h1>User Management</h1>

          <p>Create users, manage roles and control access to your CRM.</p>
        </div>

        <button
          type="button"
          className="users-create-btn"
          onClick={() => setShowForm(!showForm)}
        >
          <span>{showForm ? '×' : '+'}</span>

          {showForm ? 'Cancel' : 'Create User'}
        </button>
      </div>

      {/* =========================================
          ERROR
      ========================================= */}

      {error && (
        <div className="users-error">
          <span>!</span>
          {error}
        </div>
      )}

      {/* =========================================
          CREATE USER FORM
      ========================================= */}

      {showForm && (
        <form onSubmit={handleSubmit} className="users-create-card">
          <div className="users-section-header">
            <div className="users-section-icon">+</div>

            <div>
              <h2>Create New User</h2>

              <p>Add a team member and configure their CRM permissions.</p>
            </div>
          </div>

          {/* USER INFORMATION */}

          <div className="users-form-section">
            <div className="users-form-title">User Information</div>

            <div className="users-form-grid">
              <div className="users-field">
                <label>FIRST NAME</label>

                <input
                  type="text"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      firstName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="users-field">
                <label>LAST NAME</label>

                <input
                  type="text"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="users-field">
                <label>EMAIL ADDRESS</label>

                <input
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="users-field">
                <label>TEMPORARY PASSWORD</label>

                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  required
                  minLength={6}
                />
              </div>

              <div className="users-field users-role-field">
                <label>ROLE</label>

                <select
                  value={form.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                >
                  <option value="salesperson">Salesperson</option>

                  <option value="manager">Manager</option>

                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
          </div>

          {/* PERMISSIONS */}

          <div className="users-permissions-section">
            <div className="users-permissions-heading">
              <div>
                <div className="users-form-title">Permissions</div>

                <p>Select what this user can access within the CRM.</p>
              </div>

              <div className="permission-count">
                {form.permissions.length} selected
              </div>
            </div>

            <div className="permissions-grid">
              {permissionsList.map(([value, label]) => {
                const checked = form.permissions.includes(value)

                return (
                  <label
                    key={value}
                    className={`permission-card ${checked ? 'selected' : ''} ${
                      form.role === 'admin' ? 'disabled' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePermission(value)}
                      disabled={form.role === 'admin'}
                    />

                    <span className="permission-check">
                      {checked ? '✓' : ''}
                    </span>

                    <span className="permission-content">
                      <strong>{label}</strong>

                      <small>{value}</small>
                    </span>
                  </label>
                )
              })}
            </div>

            {form.role === 'admin' && (
              <div className="admin-permission-note">
                <span>✓</span>
                Administrators automatically receive all available permissions.
              </div>
            )}
          </div>

          {/* FORM ACTIONS */}

          <div className="users-form-actions">
            <button
              type="button"
              className="users-cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="users-submit-btn"
              disabled={loading}
            >
              {loading ? (
                'Creating...'
              ) : (
                <>
                  <span>+</span>
                  Create User
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* =========================================
          USER LIST
      ========================================= */}

      <section className="users-list-card">
        <div className="users-list-header">
          <div>
            <div className="users-form-title">Team Members</div>

            <p>Manage users currently registered in your CRM.</p>
          </div>

          <div className="users-total">
            <strong>{users.length}</strong>

            <span>Total Users</span>
          </div>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>USER</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>PERMISSIONS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="users-table-empty">
                    <div className="users-loading">
                      <div className="users-spinner"></div>
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="users-table-empty">
                    <div className="users-no-results">
                      <div>👥</div>

                      <strong>No users found</strong>

                      <span>Create your first team member to get started.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const initials = `${user.firstName?.[0] || ''}${
                    user.lastName?.[0] || ''
                  }`.toUpperCase()

                  return (
                    <tr key={user._id}>
                      <td>
                        <div className="user-table-person">
                          <div className="user-table-avatar">{initials}</div>

                          <div>
                            <strong>
                              {user.firstName} {user.lastName}
                            </strong>

                            <span>Team member</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="user-email">{user.email}</span>
                      </td>

                      <td>
                        <span className={`user-role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`user-status ${
                            user.isActive ? 'active' : 'disabled'
                          }`}
                        >
                          <span></span>

                          {user.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>

                      <td>
                        <span className="permission-number">
                          {user.permissions.length}
                        </span>

                        <span className="permission-label">permissions</span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="user-delete-btn"
                          onClick={() => handleDelete(user._id)}
                        >
                          <span>⌫</span>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
