import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ['incoming', 'outgoing'],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    billingCycle: {
      type: String,
      enum: ['monthly', 'quarterly', 'annually'],
      default: 'monthly',
    },

    party: {
      type: String,
      trim: true,
      default: '',
    },

    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    nextBillingDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ['active', 'paused', 'cancelled'],
      default: 'active',
    },

    autoRenew: {
      type: Boolean,
      default: true,
    },

    // Category used when creating Income
    incomeCategory: {
      type: String,
      enum: [
        'website-development',
        'web-application',
        'maintenance',
        'hosting',
        'seo',
        'digital-marketing',
        'consulting',
        'other',
      ],
      default: 'other',
    },

    // Category used when creating Expense
    expenseCategory: {
      type: String,
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
      default: 'software',
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

    // Useful for outgoing subscriptions
    isDirectCost: {
      type: Boolean,
      default: false,
    },

    // Last time a payment was recorded
    lastPaymentDate: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      default: '',
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

subscriptionSchema.index({
  nextBillingDate: 1,
  type: 1,
  status: 1,
})

export default mongoose.model('Subscription', subscriptionSchema)
