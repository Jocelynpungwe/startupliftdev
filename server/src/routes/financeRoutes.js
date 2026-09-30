import express from 'express'
import { protect } from '../middleware/auth.js'
import * as f from '../controllers/financeController.js'
const router=express.Router()
const financeAccess = (req, res, next) => {
  if (['admin', 'manager', 'finance'].includes(req.user?.role) || req.user?.permissions?.includes('finance:read')) return next()
  return res.status(403).json({ success: false, message: 'Finance access denied' })
}
const financeWrite = (req, res, next) => {
  if (['admin', 'manager', 'finance'].includes(req.user?.role) || req.user?.permissions?.includes('finance:write')) return next()
  return res.status(403).json({ success: false, message: 'Finance write access denied' })
}
router.use(protect, financeAccess)
router.get('/summary',f.getSummary);router.get('/reports',f.getReport)
router.get('/income',f.listIncome);router.post('/income',financeWrite,f.createIncome);router.put('/income/:id',financeWrite,f.updateIncome);router.delete('/income/:id',financeWrite,f.deleteIncome)
router.get('/expenses',f.listExpenses);router.post('/expenses',financeWrite,f.createExpense);router.put('/expenses/:id',financeWrite,f.updateExpense);router.delete('/expenses/:id',financeWrite,f.deleteExpense)
router.get('/subscriptions',f.listSubscriptions);router.post('/subscriptions',financeWrite,f.createSubscription);router.put('/subscriptions/:id',financeWrite,f.updateSubscription);router.delete('/subscriptions/:id',financeWrite,f.deleteSubscription)
export default router
