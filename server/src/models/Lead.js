import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    // =====================================================
    // BASIC BUSINESS INFORMATION
    // =====================================================

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    contactName: {
      type: String,
      default: '',
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    website: {
      type: String,
      default: '',
      trim: true,
    },

    location: {
      type: String,
      default: '',
      trim: true,
    },

    businessInfo: {
      type: String,
      default: '',
      trim: true,
    },

    industry: {
      type: String,
      default: '',
      trim: true,
    },

    // =====================================================
    // LEAD SOURCE
    // =====================================================

    source: {
      type: String,
      enum: [
        'google-maps',
        'google-search',
        'facebook',
        'instagram',
        'linkedin',
        'referral',
        'website',
        'cold-call',
        'email',
        'advertisement',
        'networking',
        'other',
      ],
      default: 'other',
    },

    sourceDetails: {
      type: String,
      default: '',
      trim: true,
    },

    // Example:
    // source: "google-maps"
    // sourceDetails: "Google Maps search for roofing companies"

    // =====================================================
    // SALES PIPELINE
    // =====================================================

    stage: {
      type: String,
      enum: [
        'new',
        'contacted',
        'qualified',
        'discovery',
        'solution-presented',
        'proposal',
        'negotiation',
        'won',
        'lost',
        'nurture',
      ],
      default: 'new',
    },

    // Keep this because your existing CRM uses status.
    // Stage represents the sales process.
    // Status represents the overall lead outcome.

    status: {
      type: String,
      enum: ['new', 'contacted', 'approved', 'rejected', 'pending'],
      default: 'new',
    },

    // =====================================================
    // LEAD PRIORITY / SCORING
    // =====================================================

    priority: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      default: 'medium',
    },

    leadScore: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =====================================================
    // BUSINESS PROBLEMS
    // =====================================================

    problems: [
      {
        type: String,
        trim: true,
      },
    ],

    primaryProblem: {
      type: String,
      default: '',
      trim: true,
    },

    // Example:
    // problems: [
    //   "no-website",
    //   "outdated-website",
    //   "broken-link",
    //   "poor-mobile-experience"
    // ]

    // =====================================================
    // DISCOVERY / NEED ANALYSIS
    // =====================================================

    needs: {
      type: String,
      default: '',
      trim: true,
    },

    goals: {
      type: String,
      default: '',
      trim: true,
    },

    targetAudience: {
      type: String,
      default: '',
      trim: true,
    },

    currentSolution: {
      type: String,
      default: '',
      trim: true,
    },

    painPoints: {
      type: String,
      default: '',
      trim: true,
    },

    budget: {
      type: Number,
      default: 0,
      min: 0,
    },

    timeline: {
      type: String,
      default: '',
      trim: true,
    },

    // =====================================================
    // DEAL INFORMATION
    // =====================================================

    dealValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    service: {
      type: String,
      default: '',
      trim: true,
    },

    services: [
      {
        type: String,
        trim: true,
      },
    ],

    probability: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // =====================================================
    // NEXT ACTION / FOLLOW-UP
    // =====================================================

    nextAction: {
      type: String,
      default: '',
      trim: true,
    },

    nextActionDate: {
      type: Date,
      default: null,
    },

    lastContactedAt: {
      type: Date,
      default: null,
    },

    lastContactMethod: {
      type: String,
      enum: [
        'phone',
        'email',
        'sms',
        'facebook',
        'instagram',
        'linkedin',
        'meeting',
        'other',
        '',
      ],
      default: '',
    },

    // =====================================================
    // PROPOSAL
    // =====================================================

    proposal: {
      status: {
        type: String,
        enum: [
          'not-created',
          'draft',
          'sent',
          'viewed',
          'accepted',
          'rejected',
          'expired',
        ],
        default: 'not-created',
      },

      amount: {
        type: Number,
        default: 0,
        min: 0,
      },

      sentAt: {
        type: Date,
        default: null,
      },

      viewedAt: {
        type: Date,
        default: null,
      },

      respondedAt: {
        type: Date,
        default: null,
      },

      expiresAt: {
        type: Date,
        default: null,
      },

      notes: {
        type: String,
        default: '',
        trim: true,
      },
    },

    // =====================================================
    // LOST / WON INFORMATION
    // =====================================================

    lostReason: {
      type: String,
      default: '',
      trim: true,
    },

    wonReason: {
      type: String,
      default: '',
      trim: true,
    },

    closedAt: {
      type: Date,
      default: null,
    },

    // =====================================================
    // SALES NOTES
    // =====================================================

    notes: {
      type: String,
      default: '',
      trim: true,
    },

    // =====================================================
    // SALES PERSON
    // =====================================================

    salesPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // =====================================================
    // OPTIONAL ASSIGNMENT / TEAM SUPPORT
    // =====================================================

    assignedManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    // =====================================================
    // CONTACT PREFERENCES
    // =====================================================

    preferredContactMethod: {
      type: String,
      enum: [
        'phone',
        'email',
        'sms',
        'facebook',
        'instagram',
        'linkedin',
        'other',
        '',
      ],
      default: '',
    },

    // =====================================================
    // TAGS
    // =====================================================

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // =====================================================
    // SALES ACTIVITY
    // =====================================================

    activities: [
      {
        type: {
          type: String,
          enum: [
            'call',
            'email',
            'sms',
            'meeting',
            'proposal',
            'note',
            'stage-change',
            'follow-up',
            'other',
          ],
          required: true,
        },

        description: {
          type: String,
          default: '',
          trim: true,
        },

        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          default: null,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
)

// =====================================================
// INDEXES
// =====================================================

leadSchema.index({
  companyName: 'text',
  email: 'text',
  phone: 'text',
  location: 'text',
  businessInfo: 'text',
})

leadSchema.index({
  salesPerson: 1,
})

leadSchema.index({
  stage: 1,
})

leadSchema.index({
  status: 1,
})

leadSchema.index({
  priority: 1,
})

leadSchema.index({
  source: 1,
})

leadSchema.index({
  nextActionDate: 1,
})

leadSchema.index({
  createdAt: -1,
})

export default mongoose.model('Lead', leadSchema)
