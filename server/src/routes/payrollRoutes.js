import express from 'express'

import {
  getPayroll,
  getMyPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll,
} from '../controllers/payrollController.js'

import { protect } from '../middleware/auth.js'
import { requirePermission as authorize } from '../middleware/permissions.js'

const router = express.Router()

// =====================================================
// MY PAYROLL
// =====================================================

router.get('/me', protect, getMyPayroll)

// =====================================================
// ALL PAYROLL
// ADMIN + MANAGER
// =====================================================

router.get('/', protect, authorize('admin', 'manager'), getPayroll)

// =====================================================
// CREATE
// ADMIN + MANAGER
// =====================================================

router.post('/', protect, authorize('admin', 'manager'), createPayroll)

// =====================================================
// UPDATE
// ADMIN + MANAGER
// =====================================================

router.put('/:id', protect, authorize('admin', 'manager'), updatePayroll)

// =====================================================
// DELETE
// ADMIN + MANAGER
// =====================================================

router.delete('/:id', protect, authorize('admin', 'manager'), deletePayroll)

export default router
