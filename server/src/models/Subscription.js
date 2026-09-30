import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['incoming','outgoing'], required: true },
  amount: { type: Number, required: true, min: 0 },
  billingCycle: { type: String, enum: ['monthly','quarterly','annually'], default: 'monthly' },
  party: { type: String, trim: true, default: '' },
  startDate: { type: Date, required: true, default: Date.now },
  nextBillingDate: { type: Date, required: true },
  status: { type: String, enum: ['active','paused','cancelled'], default: 'active' },
  autoRenew: { type: Boolean, default: true },
  notes: { type: String, trim: true, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

subscriptionSchema.index({ nextBillingDate: 1, type: 1, status: 1 })
export default mongoose.model('Subscription', subscriptionSchema)
