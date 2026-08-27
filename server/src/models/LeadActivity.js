import mongoose from 'mongoose'

const leadActivitySchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        'call',
        'email',
        'message',
        'meeting',
        'note',
        'follow-up',
        'stage-change',
      ],
      required: true,
    },

    title: {
      type: String,
      trim: true,
      default: '',
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    scheduledAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
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

leadActivitySchema.index({
  lead: 1,
  createdAt: -1,
})

export default mongoose.model('LeadActivity', leadActivitySchema)
