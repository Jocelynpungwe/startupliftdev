import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import leadsReducer from '../features/leads/leadsSlice.js'
import dashboardReducer from '../features/dashboard/dashboardSlice.js'
import userReducer from '../features/users/userSlice.js'
import payrollReducer from '../features/payroll/payrollSlice.js'
import contactReducer from '../features/contact/contactSlice'
import leadActivitiesReducer from '../features/leadActivities/leadActivitiesSlice.js'
import projectFormReducer from '../features/form/projectFormSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadsReducer,
    dashboard: dashboardReducer,
    users: userReducer,
    payroll: payrollReducer,
    contact: contactReducer,
    leadActivity: leadActivitiesReducer,
    projectForm: projectFormReducer,
  },
})
