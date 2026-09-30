import express from 'express'

import * as financeController from '../controllers/financeController.js'

import { protect } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'

const router = express.Router()

// ============================================================
// PROTECT ALL FINANCE ROUTES
// ============================================================

router.use(protect)

// ============================================================
// FINANCE PERMISSIONS
// ============================================================

const financeRead = requirePermission('finance:read')

const financeWrite = requirePermission('finance:write')

// ============================================================
// FINANCIAL OVERVIEW
// ============================================================

router.get('/summary', financeRead, financeController.getFinanceSummary)

// ============================================================
// INCOME
// ============================================================

// Get all income
router.get('/income', financeRead, financeController.listIncome)

// Create income
router.post('/income', financeWrite, financeController.createIncome)

// Update income
router.put('/income/:id', financeWrite, financeController.updateIncome)

// Delete income
router.delete('/income/:id', financeWrite, financeController.deleteIncome)

// ============================================================
// EXPENSES
// ============================================================

// Get all expenses
router.get('/expenses', financeRead, financeController.listExpenses)

// Create expense
router.post('/expenses', financeWrite, financeController.createExpense)

// Update expense
router.put('/expenses/:id', financeWrite, financeController.updateExpense)

// Delete expense
router.delete('/expenses/:id', financeWrite, financeController.deleteExpense)

// ============================================================
// SUBSCRIPTIONS
// ============================================================

// Get all subscriptions
router.get('/subscriptions', financeRead, financeController.listSubscriptions)

// Create subscription
router.post(
  '/subscriptions',
  financeWrite,
  financeController.createSubscription,
)

// ============================================================
// RECORD SUBSCRIPTION PAYMENT
//
// IMPORTANT:
// This needs to come before routes such as
// /subscriptions/:id if GET :id is added later.
//
// Incoming subscription:
// Subscription -> Income -> P&L
//
// Outgoing subscription:
// Subscription -> Expense -> P&L
// ============================================================

router.post(
  '/subscriptions/:id/record-payment',
  financeWrite,
  financeController.recordSubscriptionPayment,
)

// Update subscription
router.put(
  '/subscriptions/:id',
  financeWrite,
  financeController.updateSubscription,
)

// Delete subscription
router.delete(
  '/subscriptions/:id',
  financeWrite,
  financeController.deleteSubscription,
)

// ============================================================
// PROFIT & LOSS
// ============================================================

router.get('/profit-loss', financeRead, financeController.getProfitAndLoss)

// ============================================================
// EXPORT ROUTER
// ============================================================

export default router
