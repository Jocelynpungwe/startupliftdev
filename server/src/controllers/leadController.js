import mongoose from 'mongoose'
import Lead from '../models/Lead.js'

/*
|--------------------------------------------------------------------------
| GET MONTHLY LEAD STATISTICS
|--------------------------------------------------------------------------
*/

export const getMonthlyLeadStatistics = async (req, res, next) => {
  try {
    const { salesPerson } = req.query

    const match = {}

    // Salesperson can only see their own leads
    if (req.user.role === 'salesperson') {
      match.salesPerson = req.user._id
    }

    // Admin / Manager can optionally filter by salesperson
    if (req.user.role === 'admin' || req.user.role === 'manager') {
      if (salesPerson) {
        match.salesPerson = new mongoose.Types.ObjectId(salesPerson)
      }
    }

    const statistics = await Lead.aggregate([
      {
        $match: match,
      },

      {
        $group: {
          _id: {
            year: {
              $year: '$createdAt',
            },

            month: {
              $month: '$createdAt',
            },
          },

          leadsGenerated: {
            $sum: 1,
          },

          approved: {
            $sum: {
              $cond: [
                {
                  $eq: ['$status', 'approved'],
                },
                1,
                0,
              ],
            },
          },

          rejected: {
            $sum: {
              $cond: [
                {
                  $eq: ['$status', 'rejected'],
                },
                1,
                0,
              ],
            },
          },

          pending: {
            $sum: {
              $cond: [
                {
                  $in: ['$status', ['pending', 'new']],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
        },
      },
    ])

    const formatted = statistics.map((item) => {
      const approvalRate =
        item.leadsGenerated > 0
          ? ((item.approved / item.leadsGenerated) * 100).toFixed(1)
          : '0.0'

      return {
        year: item._id.year,
        month: item._id.month,
        leadsGenerated: item.leadsGenerated,
        approved: item.approved,
        rejected: item.rejected,
        pending: item.pending,
        approvalRate: Number(approvalRate),
      }
    })

    res.json({
      success: true,
      statistics: formatted,
    })
  } catch (err) {
    next(err)
  }
}

/*
|--------------------------------------------------------------------------
| GET SALES PIPELINE
|--------------------------------------------------------------------------
*/

export const getSalesPipeline = async (req, res, next) => {
  try {
    const { stage, priority, salesPerson, mine = 'false', search } = req.query

    const filter = {}

    // ----------------------------------------------------
    // SALESPERSON ACCESS
    // ----------------------------------------------------

    if (req.user.role === 'salesperson') {
      filter.salesPerson = req.user._id
    }

    // ----------------------------------------------------
    // MINE FILTER
    // ----------------------------------------------------

    if (mine === 'true' && req.user.role !== 'salesperson') {
      filter.salesPerson = req.user._id
    }

    // ----------------------------------------------------
    // ADMIN / MANAGER FILTER
    // ----------------------------------------------------

    if (
      salesPerson &&
      (req.user.role === 'admin' || req.user.role === 'manager')
    ) {
      if (mongoose.Types.ObjectId.isValid(salesPerson)) {
        filter.salesPerson = new mongoose.Types.ObjectId(salesPerson)
      }
    }

    // ----------------------------------------------------
    // STAGE
    // ----------------------------------------------------

    if (stage && stage !== 'all') {
      filter.stage = stage
    }

    // ----------------------------------------------------
    // PRIORITY
    // ----------------------------------------------------

    if (priority && priority !== 'all') {
      filter.priority = priority
    }

    // ----------------------------------------------------
    // SEARCH
    // ----------------------------------------------------

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

    const leads = await Lead.find(filter)
      .populate('salesPerson', 'firstName lastName email profilePicture')
      .populate('assignedManager', 'firstName lastName email profilePicture')
      .sort({ updatedAt: -1 })

    // ----------------------------------------------------
    // PIPELINE SUMMARY
    // ----------------------------------------------------

    const summary = {
      total: leads.length,

      totalValue: leads.reduce(
        (total, lead) => total + Number(lead.dealValue || 0),
        0,
      ),

      new: 0,
      contacted: 0,
      qualified: 0,
      discovery: 0,
      solutionPresented: 0,
      proposal: 0,
      negotiation: 0,
      won: 0,
      lost: 0,
      nurture: 0,
    }

    leads.forEach((lead) => {
      switch (lead.stage) {
        case 'new':
          summary.new++
          break

        case 'contacted':
          summary.contacted++
          break

        case 'qualified':
          summary.qualified++
          break

        case 'discovery':
          summary.discovery++
          break

        case 'solution-presented':
          summary.solutionPresented++
          break

        case 'proposal':
          summary.proposal++
          break

        case 'negotiation':
          summary.negotiation++
          break

        case 'won':
          summary.won++
          break

        case 'lost':
          summary.lost++
          break

        case 'nurture':
          summary.nurture++
          break

        default:
          break
      }
    })

    res.json({
      success: true,
      leads,
      summary,
    })
  } catch (err) {
    next(err)
  }
}

/*
|--------------------------------------------------------------------------
| UPDATE LEAD STAGE
|--------------------------------------------------------------------------
*/

export const updateLeadStage = async (req, res, next) => {
  try {
    const { stage } = req.body

    const validStages = [
      'new',
      'contacted',
      'qualified',
      'discovery',
      'solution-presented',
      'proposal',
      'negotiation',
      'won',
      'lost',
      'nurture',
    ]

    if (!validStages.includes(stage)) {
      return res.status(400).json({
        message: 'Invalid pipeline stage',
      })
    }

    const lead = await Lead.findById(req.params.id)

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    // ----------------------------------------------------
    // SALESPERSON OWNERSHIP
    // ----------------------------------------------------

    if (
      req.user.role === 'salesperson' &&
      lead.salesPerson.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: 'You can only update your own leads',
      })
    }

    const previousStage = lead.stage

    lead.stage = stage

    // Automatically close the lead when won/lost
    if (stage === 'won' || stage === 'lost') {
      lead.closedAt = new Date()
    } else {
      lead.closedAt = null
    }

    // ----------------------------------------------------
    // ACTIVITY HISTORY
    // ----------------------------------------------------

    if (previousStage !== stage) {
      lead.activities.push({
        type: 'stage-change',

        description: `Stage changed from ${previousStage} to ${stage}`,

        createdBy: req.user._id,
      })
    }

    await lead.save()

    const populated = await lead.populate([
      {
        path: 'salesPerson',
        select: 'firstName lastName email profilePicture',
      },
      {
        path: 'assignedManager',
        select: 'firstName lastName email profilePicture',
      },
    ])

    res.json({
      success: true,
      lead: populated,
    })
  } catch (err) {
    next(err)
  }
}

/*
|--------------------------------------------------------------------------
| ADD SALES ACTIVITY
|--------------------------------------------------------------------------
*/

export const addLeadActivity = async (req, res, next) => {
  try {
    const { type, description } = req.body

    const validActivityTypes = [
      'call',
      'email',
      'sms',
      'meeting',
      'proposal',
      'note',
      'stage-change',
      'follow-up',
      'other',
    ]

    if (!validActivityTypes.includes(type)) {
      return res.status(400).json({
        message: 'Invalid activity type',
      })
    }

    if (!description?.trim()) {
      return res.status(400).json({
        message: 'Activity description is required',
      })
    }

    const lead = await Lead.findById(req.params.id)

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    if (
      req.user.role === 'salesperson' &&
      lead.salesPerson.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: 'You can only add activities to your own leads',
      })
    }

    lead.activities.push({
      type,
      description: description.trim(),
      createdBy: req.user._id,
    })

    // Update contact information
    if (['call', 'email', 'sms', 'meeting'].includes(type)) {
      lead.lastContactedAt = new Date()
      lead.lastContactMethod = type
    }

    await lead.save()

    const populated = await lead.populate([
      {
        path: 'salesPerson',
        select: 'firstName lastName email profilePicture',
      },
      {
        path: 'activities.createdBy',
        select: 'firstName lastName email profilePicture',
      },
    ])

    res.status(201).json({
      success: true,
      lead: populated,
    })
  } catch (err) {
    next(err)
  }
}
