import Income from '../models/Income.js'
import Expense from '../models/Expense.js'
import Subscription from '../models/Subscription.js'

const parseDates = (query, field) => {
  const filter = {}
  if (query.startDate || query.endDate) {
    filter[field] = {}
    if (query.startDate) filter[field].$gte = new Date(`${query.startDate}T00:00:00.000Z`)
    if (query.endDate) filter[field].$lte = new Date(`${query.endDate}T23:59:59.999Z`)
  }
  return filter
}
const sendError = (res, error) => res.status(500).json({ success: false, message: error.message || 'Finance request failed' })

export const listIncome = async (req,res) => { try { const filter={...parseDates(req.query,'paymentDate')}; if(req.query.status)filter.status=req.query.status;if(req.query.category)filter.category=req.query.category;if(req.query.search)filter.$or=[{description:{$regex:req.query.search,$options:'i'}},{clientName:{$regex:req.query.search,$options:'i'}}]; const income=await Income.find(filter).populate('createdBy','firstName lastName email').sort({paymentDate:-1});res.json({success:true,income}) } catch(e){sendError(res,e)} }
export const createIncome = async (req,res) => { try { const income=await Income.create({...req.body,createdBy:req.user._id});res.status(201).json({success:true,income}) } catch(e){sendError(res,e)} }
export const updateIncome = async (req,res) => { try { const income=await Income.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!income)return res.status(404).json({message:'Income not found'});res.json({success:true,income}) } catch(e){sendError(res,e)} }
export const deleteIncome = async (req,res) => { try { const income=await Income.findByIdAndDelete(req.params.id);if(!income)return res.status(404).json({message:'Income not found'});res.json({success:true}) } catch(e){sendError(res,e)} }

export const listExpenses = async (req,res) => { try { const filter={...parseDates(req.query,'expenseDate')};if(req.query.status)filter.status=req.query.status;if(req.query.category)filter.category=req.query.category;if(req.query.search)filter.$or=[{description:{$regex:req.query.search,$options:'i'}},{vendor:{$regex:req.query.search,$options:'i'}}];const expenses=await Expense.find(filter).populate('createdBy','firstName lastName email').sort({expenseDate:-1});res.json({success:true,expenses}) } catch(e){sendError(res,e)} }
export const createExpense = async (req,res) => { try { const expense=await Expense.create({...req.body,createdBy:req.user._id});res.status(201).json({success:true,expense}) } catch(e){sendError(res,e)} }
export const updateExpense = async (req,res) => { try { const expense=await Expense.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!expense)return res.status(404).json({message:'Expense not found'});res.json({success:true,expense}) } catch(e){sendError(res,e)} }
export const deleteExpense = async (req,res) => { try { const expense=await Expense.findByIdAndDelete(req.params.id);if(!expense)return res.status(404).json({message:'Expense not found'});res.json({success:true}) } catch(e){sendError(res,e)} }

export const listSubscriptions = async (req,res) => { try { const subscriptions=await Subscription.find().sort({nextBillingDate:1});res.json({success:true,subscriptions}) } catch(e){sendError(res,e)} }
export const createSubscription = async (req,res) => { try { const subscription=await Subscription.create({...req.body,createdBy:req.user._id});res.status(201).json({success:true,subscription}) } catch(e){sendError(res,e)} }
export const updateSubscription = async (req,res) => { try { const subscription=await Subscription.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!subscription)return res.status(404).json({message:'Subscription not found'});res.json({success:true,subscription}) } catch(e){sendError(res,e)} }
export const deleteSubscription = async (req,res) => { try { const subscription=await Subscription.findByIdAndDelete(req.params.id);if(!subscription)return res.status(404).json({message:'Subscription not found'});res.json({success:true}) } catch(e){sendError(res,e)} }

const monthlyValue = (s) => s.billingCycle === 'annually' ? s.amount/12 : s.billingCycle === 'quarterly' ? s.amount/3 : s.amount
export const getSummary = async (req,res) => { try {
  const incomeFilter={status:'paid',...parseDates(req.query,'paymentDate')}; const expenseFilter={status:'paid',...parseDates(req.query,'expenseDate')}
  const [income,expenses,subscriptions]=await Promise.all([Income.find(incomeFilter),Expense.find(expenseFilter),Subscription.find({status:'active'})])
  const revenue=income.reduce((s,x)=>s+x.amount,0), totalExpenses=expenses.reduce((s,x)=>s+x.amount,0), directCosts=expenses.filter(x=>x.isDirectCost||x.category==='direct-cost').reduce((s,x)=>s+x.amount,0)
  const grossProfit=revenue-directCosts, netProfit=revenue-totalExpenses, margin=revenue?netProfit/revenue*100:0
  const mrr=subscriptions.filter(x=>x.type==='incoming').reduce((s,x)=>s+monthlyValue(x),0), monthlySubscriptions=subscriptions.filter(x=>x.type==='outgoing').reduce((s,x)=>s+monthlyValue(x),0)
  const byMonth={}; for(const x of income){const k=x.paymentDate.toISOString().slice(0,7);byMonth[k]??={month:k,revenue:0,expenses:0};byMonth[k].revenue+=x.amount} for(const x of expenses){const k=x.expenseDate.toISOString().slice(0,7);byMonth[k]??={month:k,revenue:0,expenses:0};byMonth[k].expenses+=x.amount}
  const recent=[...income.map(x=>({id:x._id,date:x.paymentDate,description:x.description,type:'income',amount:x.amount})),...expenses.map(x=>({id:x._id,date:x.expenseDate,description:x.description,type:'expense',amount:x.amount}))].sort((a,b)=>b.date-a.date).slice(0,8)
  res.json({success:true,summary:{revenue,totalExpenses,directCosts,grossProfit,netProfit,margin,mrr,monthlySubscriptions,netRecurring:mrr-monthlySubscriptions},monthly:Object.values(byMonth).sort((a,b)=>a.month.localeCompare(b.month)),recent})
} catch(e){sendError(res,e)} }

export const getReport = async (req,res) => { try {
  const [income,expenses]=await Promise.all([Income.find({status:'paid',...parseDates(req.query,'paymentDate')}),Expense.find({status:'paid',...parseDates(req.query,'expenseDate')})])
  const revenueByCategory={},expenseByCategory={}; income.forEach(x=>revenueByCategory[x.category]=(revenueByCategory[x.category]||0)+x.amount);expenses.forEach(x=>expenseByCategory[x.category]=(expenseByCategory[x.category]||0)+x.amount)
  const revenue=income.reduce((s,x)=>s+x.amount,0),totalExpenses=expenses.reduce((s,x)=>s+x.amount,0),directCosts=expenses.filter(x=>x.isDirectCost||x.category==='direct-cost').reduce((s,x)=>s+x.amount,0)
  res.json({success:true,report:{revenue,totalExpenses,directCosts,grossProfit:revenue-directCosts,operatingExpenses:totalExpenses-directCosts,netProfit:revenue-totalExpenses,margin:revenue?(revenue-totalExpenses)/revenue*100:0,revenueByCategory,expenseByCategory,income,expenses}})
} catch(e){sendError(res,e)} }
