import Lead from '../models/Lead.js'
import LeadActivity from '../models/LeadActivity.js'

/*
|--------------------------------------------------------------------------
| GET ACTIVITIES FOR A LEAD
|--------------------------------------------------------------------------
*/

export const getLeadActivities = async (req, res, next) => {
  try {
    const { id } = req.params

    const lead = await Lead.findById(id)

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    const activities = await LeadActivity.find({
      lead: id,
    })
      .populate('createdBy', 'firstName lastName email profilePicture')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      activities,
    })
  } catch (err) {
    next(err)
  }
}

/*
|--------------------------------------------------------------------------
| CREATE ACTIVITY
|--------------------------------------------------------------------------
*/

export const createLeadActivity = async (req, res, next) => {
  try {
    const { id } = req.params

    const { type, title, description, scheduledAt, completedAt } = req.body

    const lead = await Lead.findById(id)

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    if (!type) {
      return res.status(400).json({
        message: 'Activity type is required',
      })
    }

    const allowedTypes = [
      'call',
      'email',
      'message',
      'meeting',
      'note',
      'follow-up',
      'stage-change',
    ]

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        message: 'Invalid activity type',
      })
    }

    const activity = await LeadActivity.create({
      lead: id,
      type,
      title: title || '',
      description: description || '',
      scheduledAt: scheduledAt || null,
      completedAt: completedAt || null,
      createdBy: req.user._id,
    })

    const populatedActivity = await activity.populate(
      'createdBy',
      'firstName lastName email profilePicture',
    )

    res.status(201).json({
      success: true,
      activity: populatedActivity,
    })
  } catch (err) {
    next(err)
  }
}

/*
|--------------------------------------------------------------------------
| DELETE ACTIVITY
|--------------------------------------------------------------------------
*/

export const deleteLeadActivity = async (req, res, next) => {
  try {
    const { activityId } = req.params

    const activity = await LeadActivity.findByIdAndDelete(activityId)

    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found',
      })
    }

    res.json({
      success: true,
      message: 'Activity deleted',
    })
  } catch (err) {
    next(err)
  }
}
