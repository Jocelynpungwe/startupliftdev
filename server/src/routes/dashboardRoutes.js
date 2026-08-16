import { Router } from 'express'
import Lead from '../models/Lead.js'

import { protect } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'

const router = Router()

router.get(
  '/',
  protect,
  requirePermission('dashboard:read'),
  async (req, res, next) => {
    try {
      const [
        totalLeads,
        statusCounts,
        revenueAgg,
        salespersonAgg,
        topDeals,
        personalStatus,
      ] = await Promise.all([
        Lead.countDocuments(),
        Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
        Lead.aggregate([
          { $match: { status: 'approved' } },
          {
            $group: {
              _id: { $month: { $ifNull: ['$closedAt', '$createdAt'] } },
              revenue: { $sum: '$dealValue' },
            },
          },
          { $sort: { _id: 1 } },
        ]),
        Lead.aggregate([
          {
            $group: {
              _id: '$salesPerson',
              leads: { $sum: 1 },
              approved: {
                $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] },
              },
              revenue: {
                $sum: {
                  $cond: [{ $eq: ['$status', 'approved'] }, '$dealValue', 0],
                },
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: '_id',
              as: 'user',
            },
          },
          { $unwind: '$user' },
          {
            $project: {
              _id: 0,
              salespersonId: '$_id',
              name: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
              leads: 1,
              approved: 1,
              revenue: 1,
            },
          },
          { $sort: { leads: -1 } },
        ]),
        Lead.find({ status: 'approved' })
          .sort({ dealValue: -1 })
          .limit(5)
          .populate('salesPerson', 'firstName lastName'),
        Lead.aggregate([
          { $match: { salesPerson: req.user._id } },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              revenue: { $sum: '$dealValue' },
            },
          },
        ]),
      ])

      const counts = Object.fromEntries(
        statusCounts.map((x) => [x._id, x.count]),
      )
      const personal = Object.fromEntries(
        personalStatus.map((x) => [
          x._id,
          { count: x.count, revenue: x.revenue },
        ]),
      )

      const monthly = Array.from({ length: 12 }, (_, i) => {
        const found = revenueAgg.find((x) => x._id === i + 1)
        return {
          month: new Date(2000, i, 1).toLocaleString('en', { month: 'short' }),
          revenue: found?.revenue || 0,
        }
      })

      const personalTotal = Object.values(personal).reduce(
        (sum, x) => sum + x.count,
        0,
      )
      const personalApproved = personal.approved?.count || 0

      res.json({
        kpis: {
          totalRevenue: revenueAgg.reduce((sum, x) => sum + x.revenue, 0),
          totalLeads,
          approved: counts.approved || 0,
          rejected: counts.rejected || 0,
          pending: counts.pending || 0,
          new: counts.new || 0,
        },
        leadsBySalesperson: salespersonAgg,
        revenueByMonth: monthly,
        deals: {
          total: totalLeads,
          approved: counts.approved || 0,
          rejected: counts.rejected || 0,
          pending: counts.pending || 0,
          approvalRate: totalLeads
            ? ((counts.approved || 0) / totalLeads) * 100
            : 0,
        },
        personal: {
          total: personalTotal,
          approved: personalApproved,
          rejected: personal.rejected?.count || 0,
          pending: personal.pending?.count || 0,
          new: personal.new?.count || 0,
          approvalRate: personalTotal
            ? (personalApproved / personalTotal) * 100
            : 0,
          revenue: personal.approved?.revenue || 0,
        },
        topDeals,
      })
    } catch (err) {
      next(err)
    }
  },
)

export default router
