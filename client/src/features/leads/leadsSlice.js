import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api.js'

export const fetchLeads = createAsyncThunk(
  'leads/fetch',
  async (params = {}, thunkAPI) => {
    try {
      const res = await api.get('/leads', { params })
      return res.data.leads
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not load leads',
      )
    }
  },
)

export const createLead = createAsyncThunk(
  'leads/create',
  async (data, thunkAPI) => {
    try {
      const res = await api.post('/leads', data)
      return res.data.lead
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not create lead',
      )
    }
  },
)

export const updateLead = createAsyncThunk(
  'leads/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/leads/${id}`, data)
      return res.data.lead
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not update lead',
      )
    }
  },
)

export const deleteLead = createAsyncThunk(
  'leads/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/leads/${id}`)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not delete lead',
      )
    }
  },
)

export const fetchMonthlyLeadStatistics = createAsyncThunk(
  'leads/fetchMonthlyLeadStatistics',

  async (salesPerson = '', thunkAPI) => {
    try {
      const params = salesPerson
        ? {
            salesPerson,
          }
        : {}

      const response = await api.get('/leads/monthly-statistics', {
        params,
      })

      return response.data.statistics
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch monthly lead statistics',
      )
    }
  },
)

const slice = createSlice({
  name: 'leads',
  initialState: {
    items: [],
    loading: false,
    error: null,
    monthlyStatistics: [],
    monthlyStatisticsLoading: false,
    monthlyStatisticsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        const index = state.items.findIndex((x) => x._id === action.payload._id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => x._id !== action.payload)
      })
      .addCase(fetchMonthlyLeadStatistics.pending, (state) => {
        state.monthlyStatisticsLoading = true

        state.monthlyStatisticsError = null
      })

      .addCase(fetchMonthlyLeadStatistics.fulfilled, (state, action) => {
        state.monthlyStatisticsLoading = false

        state.monthlyStatistics = action.payload || []
      })

      .addCase(fetchMonthlyLeadStatistics.rejected, (state, action) => {
        state.monthlyStatisticsLoading = false

        state.monthlyStatisticsError = action.payload
      })
  },
})

export default slice.reducer
