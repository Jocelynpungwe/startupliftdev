import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
  description: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, enum: ['website-development','web-application','maintenance','hosting','seo','digital-marketing','consulting','other'] },
  paymentMethod: { type: String, enum: ['bank-transfer','credit-card','cash','paypal','stripe','other'], default: 'bank-transfer' },
  status: { type: String, enum: ['paid','pending','partially-paid'], default: 'paid' },
  paymentDate: { type: Date, default: Date.now, required: true },
  clientName: { type: String, trim: true, default: '' },
  notes: { type: String, trim: true, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

incomeSchema.index({ paymentDate: -1, status: 1, category: 1 })
export default mongoose.model('Income', incomeSchema)
