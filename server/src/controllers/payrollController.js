import Payroll from '../models/Payroll.js'
import User from '../models/User.js'

// =====================================================
// GET ALL PAYROLL
// =====================================================

export const getPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.find()
      .populate('employee', 'firstName lastName email role profilePicture')
      .sort({
        year: -1,
        month: -1,
      })

    res.json({
      success: true,
      payroll,
    })
  } catch (error) {
    console.error('Get payroll error:', error)

    res.status(500).json({
      message: 'Failed to fetch payroll',
    })
  }
}

// =====================================================
// GET MY PAYROLL
// =====================================================

export const getMyPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.find({
      employee: req.user._id,
    })
      .populate('employee', 'firstName lastName email role profilePicture')
      .sort({
        year: 1,
        month: 1,
      })

    res.json({
      success: true,
      payroll,
    })
  } catch (error) {
    console.error('Get my payroll error:', error)

    res.status(500).json({
      message: 'Failed to fetch your payroll',
    })
  }
}

// =====================================================
// CREATE PAYROLL
// =====================================================

export const createPayroll = async (req, res) => {
  try {
    const {
      employee,
      year,
      month,
      meetingHours,
      hourlyRate,
      commissions,
      bonus,
      notes,
      status,
    } = req.body

    if (!employee) {
      return res.status(400).json({
        message: 'Employee is required',
      })
    }

    // Check employee exists

    const employeeUser = await User.findById(employee)

    if (!employeeUser) {
      return res.status(404).json({
        message: 'Employee not found',
      })
    }

    // Check duplicate

    const existing = await Payroll.findOne({
      employee,
      year,
      month,
    })

    if (existing) {
      return res.status(409).json({
        message: 'Payroll already exists for this employee and month',
      })
    }

    const payroll = await Payroll.create({
      employee,
      year,
      month,
      meetingHours: meetingHours || 0,
      hourlyRate: hourlyRate || 0,
      commissions: commissions || [],
      bonus: bonus || 0,
      notes: notes || '',
      status: status || 'draft',
    })

    const populatedPayroll = await Payroll.findById(payroll._id).populate(
      'employee',
      'firstName lastName email role profilePicture',
    )

    res.status(201).json({
      success: true,
      payroll: populatedPayroll,
    })
  } catch (error) {
    console.error('Create payroll error:', error)

    res.status(500).json({
      message: 'Failed to create payroll',
    })
  }
}

// =====================================================
// UPDATE PAYROLL
// =====================================================

export const updatePayroll = async (req, res) => {
  try {
    const { meetingHours, hourlyRate, commissions, bonus, notes, status } =
      req.body

    const payroll = await Payroll.findById(req.params.id)

    if (!payroll) {
      return res.status(404).json({
        message: 'Payroll not found',
      })
    }

    payroll.meetingHours = meetingHours ?? payroll.meetingHours

    payroll.hourlyRate = hourlyRate ?? payroll.hourlyRate

    payroll.commissions = commissions ?? payroll.commissions

    payroll.bonus = bonus ?? payroll.bonus

    payroll.notes = notes ?? payroll.notes

    payroll.status = status ?? payroll.status

    await payroll.save()

    const populatedPayroll = await Payroll.findById(payroll._id).populate(
      'employee',
      'firstName lastName email role profilePicture',
    )

    res.json({
      success: true,
      payroll: populatedPayroll,
    })
  } catch (error) {
    console.error('Update payroll error:', error)

    res.status(500).json({
      message: 'Failed to update payroll',
    })
  }
}

// =====================================================
// DELETE PAYROLL
// =====================================================

export const deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id)

    if (!payroll) {
      return res.status(404).json({
        message: 'Payroll not found',
      })
    }

    res.json({
      success: true,
      message: 'Payroll deleted successfully',
    })
  } catch (error) {
    console.error('Delete payroll error:', error)

    res.status(500).json({
      message: 'Failed to delete payroll',
    })
  }
}
