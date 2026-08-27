import { Router } from 'express'
import Lead from '../models/Lead.js'

import { protect } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'

import {
  getMonthlyLeadStatistics,
  getSalesPipeline,
  updateLeadStage,
  addLeadActivity,
} from '../controllers/leadController.js'

const router = Router()

router.use(protect)

/*
|--------------------------------------------------------------------------
| MONTHLY STATISTICS
|--------------------------------------------------------------------------
*/

router.get(
  '/monthly-statistics',
  requirePermission('lead:read'),
  getMonthlyLeadStatistics,
)

/*
|--------------------------------------------------------------------------
| SALES PIPELINE
|--------------------------------------------------------------------------
|
| IMPORTANT:
| This route must come BEFORE /:id
|
*/

router.get('/pipeline', requirePermission('lead:read'), getSalesPipeline)

/*
|--------------------------------------------------------------------------
| GET ALL LEADS
|--------------------------------------------------------------------------
*/

router.get('/', requirePermission('lead:read'), async (req, res, next) => {
  try {
    const {
      status,
      stage,
      priority,
      search,
      sort = 'newest',
      mine = 'false',
    } = req.query

    const filter = {}

    // --------------------------------------------------
    // STATUS
    // --------------------------------------------------

    if (status && status !== 'all') {
      filter.status = status
    }

    // --------------------------------------------------
    // STAGE
    // --------------------------------------------------

    if (stage && stage !== 'all') {
      filter.stage = stage
    }

    // --------------------------------------------------
    // PRIORITY
    // --------------------------------------------------

    if (priority && priority !== 'all') {
      filter.priority = priority
    }

    // --------------------------------------------------
    // MINE
    // --------------------------------------------------

    if (mine === 'true') {
      filter.salesPerson = req.user._id
    }

    // --------------------------------------------------
    // SEARCH
    // --------------------------------------------------

    if (search) {
      filter.$or = [
        {
          companyName: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          contactName: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          email: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          phone: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          location: {
            $regex: search,
            $options: 'i',
          },
        },
      ]
    }

    // --------------------------------------------------
    // SORT
    // --------------------------------------------------

    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      valueHigh: { dealValue: -1 },
      valueLow: { dealValue: 1 },
      nextAction: { nextActionDate: 1 },
    }

    const leads = await Lead.find(filter)
      .populate('salesPerson', 'firstName lastName email profilePicture')
      .populate('assignedManager', 'firstName lastName email profilePicture')
      .sort(sortMap[sort] || sortMap.newest)

    res.json({
      success: true,
      leads,
    })
  } catch (err) {
    next(err)
  }
})

/*
|--------------------------------------------------------------------------
| GET SINGLE LEAD
|--------------------------------------------------------------------------
*/

router.get('/:id', requirePermission('lead:read'), async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('salesPerson', 'firstName lastName email profilePicture')
      .populate('assignedManager', 'firstName lastName email profilePicture')
      .populate(
        'activities.createdBy',
        'firstName lastName email profilePicture',
      )

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    // Salesperson can only see own lead
    if (
      req.user.role === 'salesperson' &&
      lead.salesPerson._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: 'You can only access your own leads',
      })
    }

    res.json({
      success: true,
      lead,
    })
  } catch (err) {
    next(err)
  }
})

/*
|--------------------------------------------------------------------------
| CREATE LEAD
|--------------------------------------------------------------------------
*/

router.post('/', requirePermission('lead:create'), async (req, res, next) => {
  try {
    const {
      companyName,
      contactName,
      phone,
      email,
      website,
      businessInfo,
      location,
      industry,

      source,
      sourceDetails,

      stage,
      status,

      priority,
      leadScore,

      problems,
      primaryProblem,

      needs,
      goals,
      targetAudience,
      currentSolution,
      painPoints,

      budget,
      timeline,

      dealValue,

      service,
      services,

      probability,

      nextAction,
      nextActionDate,

      preferredContactMethod,

      tags,

      notes,
    } = req.body

    const lead = await Lead.create({
      companyName,
      contactName,
      phone,
      email,
      website,
      businessInfo,
      location,
      industry,

      source: source || 'other',
      sourceDetails,

      stage: stage || 'new',
      status: status || 'new',

      priority: priority || 'medium',
      leadScore: Number(leadScore || 0),

      problems: problems || [],
      primaryProblem,

      needs,
      goals,
      targetAudience,
      currentSolution,
      painPoints,

      budget: Number(budget || 0),
      timeline,

      dealValue: Number(dealValue || 0),

      service,
      services: services || [],

      probability: Number(probability || 0),

      nextAction,
      nextActionDate: nextActionDate || null,

      preferredContactMethod,

      tags: tags || [],

      notes,

      salesPerson: req.user._id,
    })

    const populated = await lead.populate(
      'salesPerson',
      'firstName lastName email profilePicture',
    )

    res.status(201).json({
      success: true,
      lead: populated,
    })
  } catch (err) {
    next(err)
  }
})

/*
|--------------------------------------------------------------------------
| UPDATE LEAD STAGE
|--------------------------------------------------------------------------
*/

router.patch('/:id/stage', requirePermission('lead:update'), updateLeadStage)

/*
|--------------------------------------------------------------------------
| ADD ACTIVITY
|--------------------------------------------------------------------------
*/

router.post(
  '/:id/activities',
  requirePermission('lead:update'),
  addLeadActivity,
)

/*
|--------------------------------------------------------------------------
| UPDATE LEAD
|--------------------------------------------------------------------------
*/

router.put('/:id', requirePermission('lead:update'), async (req, res, next) => {
  try {
    const allowed = [
      'companyName',
      'contactName',
      'phone',
      'email',
      'website',
      'businessInfo',
      'location',
      'industry',

      'source',
      'sourceDetails',

      'stage',
      'status',

      'priority',
      'leadScore',

      'problems',
      'primaryProblem',

      'needs',
      'goals',
      'targetAudience',
      'currentSolution',
      'painPoints',

      'budget',
      'timeline',

      'dealValue',

      'service',
      'services',

      'probability',

      'nextAction',
      'nextActionDate',

      'lastContactedAt',
      'lastContactMethod',

      'proposal',

      'lostReason',
      'wonReason',

      'closedAt',

      'notes',

      'assignedManager',

      'preferredContactMethod',

      'tags',
    ]

    const update = {}

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        update[key] = req.body[key]
      }
    }

    if (update.dealValue !== undefined) {
      update.dealValue = Number(update.dealValue || 0)
    }

    if (update.budget !== undefined) {
      update.budget = Number(update.budget || 0)
    }

    if (update.leadScore !== undefined) {
      update.leadScore = Number(update.leadScore || 0)
    }

    if (update.probability !== undefined) {
      update.probability = Number(update.probability || 0)
    }

    // Automatically close the lead
    if (update.stage === 'won' || update.stage === 'lost') {
      update.closedAt = update.closedAt || new Date()
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    })
      .populate('salesPerson', 'firstName lastName email profilePicture')
      .populate('assignedManager', 'firstName lastName email profilePicture')

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    res.json({
      success: true,
      lead,
    })
  } catch (err) {
    next(err)
  }
})

/*
|--------------------------------------------------------------------------
| DELETE LEAD
|--------------------------------------------------------------------------
*/

router.delete(
  '/:id',
  requirePermission('lead:delete'),
  async (req, res, next) => {
    try {
      const lead = await Lead.findByIdAndDelete(req.params.id)

      if (!lead) {
        return res.status(404).json({
          message: 'Lead not found',
        })
      }

      res.json({
        success: true,
        message: 'Lead deleted',
      })
    } catch (err) {
      next(err)
    }
  },
)

export default router
