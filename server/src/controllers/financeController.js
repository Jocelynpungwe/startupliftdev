import Income from '../models/Income.js'
import Expense from '../models/Expense.js'
import Subscription from '../models/Subscription.js'

// ============================================================
// HELPERS
// ============================================================

const getDateRange = (query = {}) => {
  const { startDate, endDate } = query

  const range = {}

  if (startDate) {
    range.$gte = new Date(startDate)
  }

  if (endDate) {
    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)
    range.$lte = end
  }

  return Object.keys(range).length ? range : null
}

const getNextBillingDate = (currentDate, billingCycle) => {
  const date = new Date(currentDate)

  switch (billingCycle) {
    case 'monthly':
      date.setUTCMonth(date.getUTCMonth() + 1)
      break

    case 'quarterly':
      date.setUTCMonth(date.getUTCMonth() + 3)
      break

    case 'annually':
      date.setUTCFullYear(date.getUTCFullYear() + 1)
      break

    default:
      date.setUTCMonth(date.getUTCMonth() + 1)
  }

  return date
}

// ============================================================
// FINANCIAL SUMMARY
// ============================================================

export const getFinanceSummary = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query)

    const incomeFilter = {
      status: 'paid',
    }

    const expenseFilter = {
      status: 'paid',
    }

    if (dateRange) {
      incomeFilter.paymentDate = dateRange
      expenseFilter.expenseDate = dateRange
    }

    const [income, expenses, subscriptions] = await Promise.all([
      Income.find(incomeFilter),
      Expense.find(expenseFilter),
      Subscription.find({
        status: 'active',
      }),
    ])

    const totalIncome = income.reduce(
      (total, item) => total + Number(item.amount || 0),
      0,
    )

    const totalExpenses = expenses.reduce(
      (total, item) => total + Number(item.amount || 0),
      0,
    )

    const netProfit = totalIncome - totalExpenses

    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0

    const incomingSubscriptions = subscriptions.filter(
      (item) => item.type === 'incoming',
    )

    const outgoingSubscriptions = subscriptions.filter(
      (item) => item.type === 'outgoing',
    )

    const getMonthlyAmount = (subscription) => {
      const amount = Number(subscription.amount || 0)

      switch (subscription.billingCycle) {
        case 'annually':
          return amount / 12

        case 'quarterly':
          return amount / 3

        default:
          return amount
      }
    }

    const monthlyRecurringRevenue = incomingSubscriptions.reduce(
      (total, item) => total + getMonthlyAmount(item),
      0,
    )

    const monthlySubscriptionCosts = outgoingSubscriptions.reduce(
      (total, item) => total + getMonthlyAmount(item),
      0,
    )

    return res.status(200).json({
      success: true,

      summary: {
        totalIncome,
        totalExpenses,
        netProfit,
        profitMargin,

        monthlyRecurringRevenue,

        monthlySubscriptionCosts,

        netRecurring: monthlyRecurringRevenue - monthlySubscriptionCosts,

        activeSubscriptions: subscriptions.length,
      },
    })
  } catch (error) {
    console.error('Finance summary error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve financial summary.',
    })
  }
}

// ============================================================
// INCOME
// ============================================================

export const listIncome = async (req, res) => {
  try {
    const filter = {}

    if (req.query.status) {
      filter.status = req.query.status
    }

    if (req.query.category) {
      filter.category = req.query.category
    }

    const dateRange = getDateRange(req.query)

    if (dateRange) {
      filter.paymentDate = dateRange
    }

    if (req.query.search) {
      filter.$or = [
        {
          description: {
            $regex: req.query.search,
            $options: 'i',
          },
        },

        {
          clientName: {
            $regex: req.query.search,
            $options: 'i',
          },
        },
      ]
    }

    const income = await Income.find(filter)
      .populate('createdBy', 'name email')
      .populate('subscription', 'name type billingCycle')
      .sort({
        paymentDate: -1,
        createdAt: -1,
      })

    return res.status(200).json({
      success: true,
      count: income.length,
      income,
    })
  } catch (error) {
    console.error('List income error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve income.',
    })
  }
}

export const createIncome = async (req, res) => {
  try {
    const income = await Income.create({
      ...req.body,

      source: req.body.source || 'manual',

      createdBy: req.user._id,
    })

    return res.status(201).json({
      success: true,
      message: 'Income created successfully.',
      income,
    })
  } catch (error) {
    console.error('Create income error:', error)

    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to create income.',
    })
  }
}

export const updateIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id)

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income record not found.',
      })
    }

    const allowedFields = [
      'description',
      'amount',
      'category',
      'paymentMethod',
      'status',
      'paymentDate',
      'clientName',
      'notes',
    ]

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        income[field] = req.body[field]
      }
    })

    await income.save()

    return res.status(200).json({
      success: true,
      message: 'Income updated successfully.',
      income,
    })
  } catch (error) {
    console.error('Update income error:', error)

    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to update income.',
    })
  }
}

export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id)

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income record not found.',
      })
    }

    await income.deleteOne()

    return res.status(200).json({
      success: true,
      message: 'Income deleted successfully.',
    })
  } catch (error) {
    console.error('Delete income error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to delete income.',
    })
  }
}

// ============================================================
// EXPENSES
// ============================================================

export const listExpenses = async (req, res) => {
  try {
    const filter = {}

    if (req.query.status) {
      filter.status = req.query.status
    }

    if (req.query.category) {
      filter.category = req.query.category
    }

    const dateRange = getDateRange(req.query)

    if (dateRange) {
      filter.expenseDate = dateRange
    }

    if (req.query.search) {
      filter.$or = [
        {
          description: {
            $regex: req.query.search,
            $options: 'i',
          },
        },

        {
          vendor: {
            $regex: req.query.search,
            $options: 'i',
          },
        },
      ]
    }

    const expenses = await Expense.find(filter)
      .populate('createdBy', 'name email')
      .populate('subscription', 'name type billingCycle')
      .sort({
        expenseDate: -1,
        createdAt: -1,
      })

    return res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    })
  } catch (error) {
    console.error('List expenses error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve expenses.',
    })
  }
}

export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,

      source: req.body.source || 'manual',

      createdBy: req.user._id,
    })

    return res.status(201).json({
      success: true,
      message: 'Expense created successfully.',
      expense,
    })
  } catch (error) {
    console.error('Create expense error:', error)

    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to create expense.',
    })
  }
}

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense record not found.',
      })
    }

    const allowedFields = [
      'description',
      'amount',
      'category',
      'vendor',
      'paymentMethod',
      'status',
      'expenseDate',
      'isDirectCost',
      'notes',
    ]

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        expense[field] = req.body[field]
      }
    })

    await expense.save()

    return res.status(200).json({
      success: true,
      message: 'Expense updated successfully.',
      expense,
    })
  } catch (error) {
    console.error('Update expense error:', error)

    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to update expense.',
    })
  }
}

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense record not found.',
      })
    }

    await expense.deleteOne()

    return res.status(200).json({
      success: true,
      message: 'Expense deleted successfully.',
    })
  } catch (error) {
    console.error('Delete expense error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to delete expense.',
    })
  }
}

// ============================================================
// SUBSCRIPTIONS
// ============================================================

export const listSubscriptions = async (req, res) => {
  try {
    const filter = {}

    if (req.query.type) {
      filter.type = req.query.type
    }

    if (req.query.status) {
      filter.status = req.query.status
    }

    const subscriptions = await Subscription.find(filter)
      .populate('createdBy', 'name email')
      .sort({
        nextBillingDate: 1,
      })

    return res.status(200).json({
      success: true,

      count: subscriptions.length,

      subscriptions,
    })
  } catch (error) {
    console.error('List subscriptions error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve subscriptions.',
    })
  }
}

export const createSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,

      createdBy: req.user._id,
    })

    return res.status(201).json({
      success: true,

      message: 'Subscription created successfully.',

      subscription,
    })
  } catch (error) {
    console.error('Create subscription error:', error)

    return res.status(500).json({
      success: false,

      message: error.message || 'Unable to create subscription.',
    })
  }
}

export const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)

    if (!subscription) {
      return res.status(404).json({
        success: false,

        message: 'Subscription not found.',
      })
    }

    const allowedFields = [
      'name',
      'type',
      'amount',
      'billingCycle',
      'party',
      'startDate',
      'nextBillingDate',
      'status',
      'autoRenew',

      // New fields
      'incomeCategory',
      'expenseCategory',
      'paymentMethod',
      'isDirectCost',

      'notes',
    ]

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        subscription[field] = req.body[field]
      }
    })

    await subscription.save()

    return res.status(200).json({
      success: true,

      message: 'Subscription updated successfully.',

      subscription,
    })
  } catch (error) {
    console.error('Update subscription error:', error)

    return res.status(500).json({
      success: false,

      message: error.message || 'Unable to update subscription.',
    })
  }
}

export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)

    if (!subscription) {
      return res.status(404).json({
        success: false,

        message: 'Subscription not found.',
      })
    }

    await subscription.deleteOne()

    return res.status(200).json({
      success: true,

      message: 'Subscription deleted successfully.',
    })
  } catch (error) {
    console.error('Delete subscription error:', error)

    return res.status(500).json({
      success: false,

      message: 'Unable to delete subscription.',
    })
  }
}

// ============================================================
// RECORD SUBSCRIPTION PAYMENT
// ============================================================

export const recordSubscriptionPayment = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)

    // ----------------------------------------
    // CHECK SUBSCRIPTION EXISTS
    // ----------------------------------------

    if (!subscription) {
      return res.status(404).json({
        success: false,

        message: 'Subscription not found.',
      })
    }

    // ----------------------------------------
    // MUST BE ACTIVE
    // ----------------------------------------

    if (subscription.status !== 'active') {
      return res.status(400).json({
        success: false,

        message: 'Only active subscriptions can record payments.',
      })
    }

    // ----------------------------------------
    // PAYMENT DATE
    // ----------------------------------------

    const paymentDate = req.body.paymentDate
      ? new Date(req.body.paymentDate)
      : new Date()

    if (Number.isNaN(paymentDate.getTime())) {
      return res.status(400).json({
        success: false,

        message: 'Invalid payment date.',
      })
    }

    let transaction = null

    // ======================================================
    // INCOMING SUBSCRIPTION
    // CREATE INCOME
    // ======================================================

    if (subscription.type === 'incoming') {
      transaction = await Income.create({
        description: subscription.name,

        amount: subscription.amount,

        category: subscription.incomeCategory || 'other',

        paymentMethod: subscription.paymentMethod || 'bank-transfer',

        status: 'paid',

        paymentDate,

        clientName: subscription.party || '',

        source: 'subscription',

        subscription: subscription._id,

        notes: `Subscription payment: ${subscription.name}`,

        createdBy: req.user._id,
      })
    }

    // ======================================================
    // OUTGOING SUBSCRIPTION
    // CREATE EXPENSE
    // ======================================================

    if (subscription.type === 'outgoing') {
      transaction = await Expense.create({
        description: subscription.name,

        amount: subscription.amount,

        category: subscription.expenseCategory || 'software',

        vendor: subscription.party || '',

        paymentMethod: subscription.paymentMethod || 'bank-transfer',

        status: 'paid',

        expenseDate: paymentDate,

        isDirectCost: Boolean(subscription.isDirectCost),

        source: 'subscription',

        subscription: subscription._id,

        notes: `Subscription payment: ${subscription.name}`,

        createdBy: req.user._id,
      })
    }

    // ======================================================
    // UPDATE SUBSCRIPTION
    // ======================================================

    subscription.lastPaymentDate = paymentDate

    // Move next billing date
    // only when auto renew is enabled.

    if (subscription.autoRenew) {
      subscription.nextBillingDate = getNextBillingDate(
        subscription.nextBillingDate,
        subscription.billingCycle,
      )
    }

    await subscription.save()

    // ======================================================
    // RESPONSE
    // ======================================================

    return res.status(201).json({
      success: true,

      message:
        subscription.type === 'incoming'
          ? 'Subscription income recorded successfully.'
          : 'Subscription expense recorded successfully.',

      transaction,

      subscription,
    })
  } catch (error) {
    console.error('Record subscription payment error:', error)

    return res.status(500).json({
      success: false,

      message: error.message || 'Unable to record subscription payment.',
    })
  }
}

// ============================================================
// PROFIT & LOSS
// ============================================================

export const getProfitAndLoss = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query)

    const incomeFilter = {
      status: 'paid',
    }

    const expenseFilter = {
      status: 'paid',
    }

    if (dateRange) {
      incomeFilter.paymentDate = dateRange

      expenseFilter.expenseDate = dateRange
    }

    const [income, expenses] = await Promise.all([
      Income.find(incomeFilter),

      Expense.find(expenseFilter),
    ])

    // ----------------------------------------
    // REVENUE
    // ----------------------------------------

    const revenue = income.reduce(
      (total, item) => total + Number(item.amount || 0),
      0,
    )

    // ----------------------------------------
    // DIRECT COSTS
    // ----------------------------------------

    const directCosts = expenses
      .filter((item) => item.isDirectCost)
      .reduce((total, item) => total + Number(item.amount || 0), 0)

    // ----------------------------------------
    // OPERATING EXPENSES
    // ----------------------------------------

    const operatingExpenses = expenses
      .filter((item) => !item.isDirectCost)
      .reduce((total, item) => total + Number(item.amount || 0), 0)

    // ----------------------------------------
    // TOTAL EXPENSES
    // ----------------------------------------

    const totalExpenses = directCosts + operatingExpenses

    // ----------------------------------------
    // GROSS PROFIT
    // ----------------------------------------

    const grossProfit = revenue - directCosts

    // ----------------------------------------
    // NET PROFIT
    // ----------------------------------------

    const netProfit = revenue - totalExpenses

    // ----------------------------------------
    // PROFIT MARGIN
    // ----------------------------------------

    const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0

    return res.status(200).json({
      success: true,

      profitAndLoss: {
        revenue,

        directCosts,

        grossProfit,

        operatingExpenses,

        totalExpenses,

        netProfit,

        profitMargin,
      },
    })
  } catch (error) {
    console.error('P&L error:', error)

    return res.status(500).json({
      success: false,

      message: 'Unable to generate profit and loss statement.',
    })
  }
}
