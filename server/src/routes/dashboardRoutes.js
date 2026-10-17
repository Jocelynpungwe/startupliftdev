import { Router } from 'express'
import Lead from '../models/Lead.js'

import { protect } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'

const router = Router()

// Statuses that count as "still being worked".
const IN_PROGRESS = ['new', 'contacted', 'emailed', 'pending']

const countStatus = (status) => ({
  $sum: { $cond: [{ $eq: ['$status', status] }, 1, 0] },
})

/*
|--------------------------------------------------------------------------
| DASHBOARD
|
| Admins see the performance of the whole team.
| Everyone else only ever sees their own leads, enforced here on the server
| (the UI hiding things is not a security boundary).
|--------------------------------------------------------------------------
*/

router.get(
  '/',
  protect,
  requirePermission('dashboard:read'),
  async (req, res, next) => {
    try {
      const isAdmin = req.user.role === 'admin'

      // Applied to every query below.
      const scope = isAdmin ? {} : { salesPerson: req.user._id }

      const [
        totalLeads,
        statusCounts,
        revenueAgg,
        salespersonAgg,
        topDeals,
        personalStatus,
      ] = await Promise.all([
        Lead.countDocuments(scope),

        Lead.aggregate([
          { $match: scope },
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ]),

        Lead.aggregate([
          { $match: { ...scope, status: 'approved' } },
          {
            $group: {
              _id: { $month: { $ifNull: ['$closedAt', '$createdAt'] } },
              revenue: { $sum: '$dealValue' },
            },
          },
          { $sort: { _id: 1 } },
        ]),

        // One row per salesperson (a single row for non-admins).
        Lead.aggregate([
          { $match: scope },
          {
            $group: {
              _id: '$salesPerson',
              leads: { $sum: 1 },
              new: countStatus('new'),
              contacted: countStatus('contacted'),
              emailed: countStatus('emailed'),
              pending: countStatus('pending'),
              approved: countStatus('approved'),
              rejected: countStatus('rejected'),
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
              new: 1,
              contacted: 1,
              emailed: 1,
              pending: 1,
              approved: 1,
              rejected: 1,
              revenue: 1,
            },
          },
          { $sort: { leads: -1 } },
        ]),

        Lead.find({ ...scope, status: 'approved' })
          .sort({ dealValue: -1 })
          .limit(5)
          .populate('salesPerson', 'firstName lastName'),

        // The signed-in user's own numbers (what "My performance" shows).
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

      const inProgress = (source, pick) =>
        IN_PROGRESS.reduce((sum, status) => sum + (pick(source, status) || 0), 0)

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
        // 'team' = admin view of everyone, 'personal' = only own leads
        scope: isAdmin ? 'team' : 'personal',

        kpis: {
          totalRevenue: revenueAgg.reduce((sum, x) => sum + x.revenue, 0),
          totalLeads,
          approved: counts.approved || 0,
          rejected: counts.rejected || 0,
          pending: counts.pending || 0,
          new: counts.new || 0,
          contacted: counts.contacted || 0,
          emailed: counts.emailed || 0,
          inProgress: inProgress(counts, (c, s) => c[s]),
        },

        leadsBySalesperson: salespersonAgg,
        revenueByMonth: monthly,

        deals: {
          total: totalLeads,
          approved: counts.approved || 0,
          rejected: counts.rejected || 0,
          pending: counts.pending || 0,
          new: counts.new || 0,
          contacted: counts.contacted || 0,
          emailed: counts.emailed || 0,
          inProgress: inProgress(counts, (c, s) => c[s]),
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
          contacted: personal.contacted?.count || 0,
          emailed: personal.emailed?.count || 0,
          inProgress: inProgress(personal, (p, s) => p[s]?.count),
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
