import { Router } from 'express'

import {
  getLeadActivities,
  createLeadActivity,
  deleteLeadActivity,
} from '../controllers/leadActivityController.js'

import { protect } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'

const router = Router()

router.use(protect)

/*
|--------------------------------------------------------------------------
| GET ACTIVITIES
|--------------------------------------------------------------------------
*/

router.get(
  '/leads/:id/activities',
  requirePermission('lead:read'),
  getLeadActivities,
)

/*
|--------------------------------------------------------------------------
| CREATE ACTIVITY
|--------------------------------------------------------------------------
*/

router.post(
  '/leads/:id/activities',
  requirePermission('lead:update'),
  createLeadActivity,
)

/*
|--------------------------------------------------------------------------
| DELETE ACTIVITY
|--------------------------------------------------------------------------
*/

router.delete(
  '/leads/:id/activities/:activityId',
  requirePermission('lead:update'),
  deleteLeadActivity,
)

export default router
