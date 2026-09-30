import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        'software',
        'marketing',
        'payroll',
        'contractor',
        'office',
        'equipment',
        'professional-services',
        'travel',
        'bank-fees',
        'taxes',
        'direct-cost',
        'other',
      ],
    },

    vendor: {
      type: String,
      trim: true,
      default: '',
    },

    paymentMethod: {
      type: String,
      enum: [
        'bank-transfer',
        'credit-card',
        'cash',
        'paypal',
        'stripe',
        'other',
      ],
      default: 'bank-transfer',
    },

    status: {
      type: String,
      enum: ['paid', 'pending'],
      default: 'paid',
    },

    expenseDate: {
      type: Date,
      default: Date.now,
      required: true,
    },

    isDirectCost: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      trim: true,
      default: '',
    },

    source: {
      type: String,
      enum: ['manual', 'subscription'],
      default: 'manual',
    },

    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

expenseSchema.index({
  expenseDate: -1,
  status: 1,
  category: 1,
})

export default mongoose.model('Expense', expenseSchema)
