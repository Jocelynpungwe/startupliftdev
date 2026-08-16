export const PERMISSIONS = [
  'dashboard:read',

  'lead:create',
  'lead:read',
  'lead:update',
  'lead:delete',

  'user:create',
  'user:read',
  'user:update',
  'user:delete',

  'payroll:read',
  'payroll:create',
  'payroll:update',
]

export const ROLE_PERMISSIONS = {
  admin: PERMISSIONS,

  manager: [
    'dashboard:read',
    'lead:create',
    'lead:read',
    'lead:update',
    'user:read',
    'payroll:read',
    'payroll:create',
    'payroll:update',
  ],

  salesperson: ['dashboard:read', 'lead:create', 'lead:read', 'payroll:read'],
}
