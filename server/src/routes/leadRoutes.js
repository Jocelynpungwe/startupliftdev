import { Router } from 'express'
import Lead from '../models/Lead.js'
import { protect } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'
import { getMonthlyLeadStatistics } from '../controllers/leadController.js'

const router = Router()

router.use(protect)

router.get(
  '/monthly-statistics',
  requirePermission('lead:read'),
  getMonthlyLeadStatistics,
)

router.get('/', requirePermission('lead:read'), async (req, res, next) => {
  try {
    const { status, search, sort = 'newest', mine = 'false' } = req.query

    const filter = {}

    if (status && status !== 'all') {
      filter.status = status
    }

    if (mine === 'true') {
      filter.salesPerson = req.user._id
    }

    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ]
    }

    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      valueHigh: { dealValue: -1 },
      valueLow: { dealValue: 1 },
    }

    const leads = await Lead.find(filter)
      .populate('salesPerson', 'firstName lastName email profilePicture')
      .sort(sortMap[sort] || sortMap.newest)

    res.json({ leads })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', requirePermission('lead:read'), async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      'salesPerson',
      'firstName lastName email profilePicture',
    )

    if (!lead) return res.status(404).json({ message: 'Lead not found' })

    res.json({ lead })
  } catch (err) {
    next(err)
  }
})

router.post('/', requirePermission('lead:create'), async (req, res, next) => {
  try {
    const {
      companyName,
      phone,
      email,
      businessInfo,
      location,
      status,
      dealValue,
      closedAt,
    } = req.body

    const lead = await Lead.create({
      companyName,
      phone,
      email,
      businessInfo,
      location,
      status: status || 'new',
      dealValue: Number(dealValue || 0),
      closedAt: closedAt || null,
      salesPerson: req.user._id,
    })

    const populated = await lead.populate(
      'salesPerson',
      'firstName lastName email profilePicture',
    )

    res.status(201).json({ lead: populated })
  } catch (err) {
    next(err)
  }
})

router.put(
  '/:id',
  protect,
  requirePermission('lead:update'),
  async (req, res, next) => {
    try {
      const allowed = [
        'companyName',
        'phone',
        'email',
        'businessInfo',
        'location',
        'status',
        'dealValue',
        'closedAt',
      ]

      const update = {}
      for (const key of allowed) {
        if (req.body[key] !== undefined) update[key] = req.body[key]
      }

      if (update.dealValue !== undefined) {
        update.dealValue = Number(update.dealValue)
      }

      const lead = await Lead.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
      }).populate('salesPerson', 'firstName lastName email profilePicture')

      if (!lead) return res.status(404).json({ message: 'Lead not found' })

      res.json({ lead })
    } catch (err) {
      next(err)
    }
  },
)

router.delete(
  '/:id',
  requirePermission('lead:delete'),
  async (req, res, next) => {
    try {
      const lead = await Lead.findByIdAndDelete(req.params.id)

      if (!lead) return res.status(404).json({ message: 'Lead not found' })

      res.json({ message: 'Lead deleted' })
    } catch (err) {
      next(err)
    }
  },
)

export default router
