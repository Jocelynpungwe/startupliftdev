import mongoose from 'mongoose'
import Lead from '../models/Lead.js'

export const getMonthlyLeadStatistics = async (req, res, next) => {
  try {
    const { salesPerson } = req.query

    const match = {}

    // ============================================
    // SALES USERS
    // ============================================

    if (req.user.role === 'salesperson') {
      match.salesPerson = req.user._id
    }

    // ============================================
    // ADMIN / MANAGER
    // ============================================

    if (req.user.role === 'admin' || req.user.role === 'manager') {
      if (salesPerson) {
        match.salesPerson = new mongoose.Types.ObjectId(salesPerson)
      }
    }

    // ============================================
    // GROUP BY MONTH
    // ============================================

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

    // ============================================
    // FORMAT RESULTS
    // ============================================

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
