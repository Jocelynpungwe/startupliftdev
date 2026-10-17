import api from '../lib/api'

// ============================================================
// QUERY PARAMETER HELPER
// Removes empty values before sending them to the backend
// ============================================================

const q = (params = {}) => ({
  params: Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  ),
})

// ============================================================
// FINANCE DASHBOARD
// ============================================================

export const getFinanceSummary = (params = {}) =>
  api.get('/finance/summary', q(params)).then((response) => response.data)

// ============================================================
// PROFIT & LOSS
// NEW
// ============================================================

export const getProfitAndLoss = (params = {}) =>
  api.get('/finance/profit-loss', q(params)).then((response) => response.data)

// ============================================================
// INCOME
// ============================================================

export const getIncome = (params = {}) =>
  api.get('/finance/income', q(params)).then((response) => response.data)

export const createIncome = (data) =>
  api.post('/finance/income', data).then((response) => response.data)

export const updateIncome = (id, data) =>
  api.put(`/finance/income/${id}`, data).then((response) => response.data)

export const deleteIncome = (id) =>
  api.delete(`/finance/income/${id}`).then((response) => response.data)

// ============================================================
// EXPENSES
// ============================================================

export const getExpenses = (params = {}) =>
  api.get('/finance/expenses', q(params)).then((response) => response.data)

export const createExpense = (data) =>
  api.post('/finance/expenses', data).then((response) => response.data)

export const updateExpense = (id, data) =>
  api.put(`/finance/expenses/${id}`, data).then((response) => response.data)

export const deleteExpense = (id) =>
  api.delete(`/finance/expenses/${id}`).then((response) => response.data)

// ============================================================
// SUBSCRIPTIONS
// ============================================================

export const getSubscriptions = (params = {}) =>
  api.get('/finance/subscriptions', q(params)).then((response) => response.data)

export const createSubscription = (data) =>
  api.post('/finance/subscriptions', data).then((response) => response.data)

export const updateSubscription = (id, data) =>
  api
    .put(`/finance/subscriptions/${id}`, data)
    .then((response) => response.data)

export const deleteSubscription = (id) =>
  api.delete(`/finance/subscriptions/${id}`).then((response) => response.data)

// ============================================================
// RECORD SUBSCRIPTION PAYMENT
//
// Incoming subscription:
// Subscription -> Income -> P&L
//
// Outgoing subscription:
// Subscription -> Expense -> P&L
// ============================================================

export const recordSubscriptionPayment = async (id, paymentDate = null) => {
  const response = await api.post(
    `/finance/subscriptions/${id}/record-payment`,
    {
      paymentDate: paymentDate || new Date().toISOString().slice(0, 10),
    },
  )

  return response.data
}
