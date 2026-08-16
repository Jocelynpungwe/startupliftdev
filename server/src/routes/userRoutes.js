import express from 'express'

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js'

import { protect } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'

const router = express.Router()

router.get('/', protect, requirePermission('user:read'), getUsers)

router.get('/:id', protect, requirePermission('user:read'), getUser)

router.post('/', protect, requirePermission('user:create'), createUser)

router.put('/:id', protect, requirePermission('user:update'), updateUser)

router.delete('/:id', protect, requirePermission('user:delete'), deleteUser)

export default router
