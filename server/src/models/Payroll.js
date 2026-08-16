import mongoose from 'mongoose'

const commissionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      default: '',
    },

    amount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: true,
  },
)

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    meetingHours: {
      type: Number,
      default: 0,
      min: 0,
    },

    hourlyRate: {
      type: Number,
      default: 0,
      min: 0,
    },

    commissions: {
      type: [commissionSchema],
      default: [],
    },

    bonus: {
      type: Number,
      default: 0,
      min: 0,
    },

    notes: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'paid'],
      default: 'draft',
    },

    meetingPay: {
      type: Number,
      default: 0,
    },

    commissionTotal: {
      type: Number,
      default: 0,
    },

    finalSalary: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// =====================================================
// PRE-SAVE CALCULATION
// =====================================================

payrollSchema.pre('save', function (next) {
  const meetingPay =
    Number(this.meetingHours || 0) * Number(this.hourlyRate || 0)

  const commissionTotal = (this.commissions || []).reduce(
    (total, commission) => {
      return total + Number(commission.amount || 0)
    },
    0,
  )

  this.meetingPay = meetingPay

  this.commissionTotal = commissionTotal

  this.finalSalary = meetingPay + commissionTotal + Number(this.bonus || 0)

  next()
})

// =====================================================
// PREVENT DUPLICATE MONTHLY PAYROLL
// =====================================================

payrollSchema.index(
  {
    employee: 1,
    year: 1,
    month: 1,
  },
  {
    unique: true,
  },
)

export default mongoose.model('Payroll', payrollSchema)
