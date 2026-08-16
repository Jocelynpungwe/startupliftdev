import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../lib/api.js'

// =====================================================
// GET ALL PAYROLL
// =====================================================

export const fetchPayroll = createAsyncThunk(
  'payroll/fetchPayroll',

  async (_, thunkAPI) => {
    try {
      const response = await api.get('/payroll')

      return response.data.payroll
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch payroll',
      )
    }
  },
)

// =====================================================
// GET MY PAYROLL
// =====================================================

export const fetchMyPayroll = createAsyncThunk(
  'payroll/fetchMyPayroll',

  async (_, thunkAPI) => {
    try {
      const response = await api.get('/payroll/me')

      return response.data.payroll
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch your payroll',
      )
    }
  },
)

// =====================================================
// CREATE PAYROLL
// =====================================================

export const createPayroll = createAsyncThunk(
  'payroll/createPayroll',

  async (data, thunkAPI) => {
    try {
      const response = await api.post('/payroll', data)

      return response.data.payroll
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to create payroll',
      )
    }
  },
)

// =====================================================
// UPDATE PAYROLL
// =====================================================

export const updatePayroll = createAsyncThunk(
  'payroll/updatePayroll',

  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(`/payroll/${id}`, data)

      return response.data.payroll
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update payroll',
      )
    }
  },
)

// =====================================================
// DELETE PAYROLL
// =====================================================

export const deletePayroll = createAsyncThunk(
  'payroll/deletePayroll',

  async (id, thunkAPI) => {
    try {
      await api.delete(`/payroll/${id}`)

      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete payroll',
      )
    }
  },
)

// =====================================================
// SLICE
// =====================================================

const payrollSlice = createSlice({
  name: 'payroll',

  initialState: {
    payroll: [],

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==========================================
      // FETCH PAYROLL
      // ==========================================

      .addCase(fetchPayroll.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchPayroll.fulfilled, (state, action) => {
        state.loading = false

        state.payroll = action.payload || []
      })

      .addCase(fetchPayroll.rejected, (state, action) => {
        state.loading = false

        state.error = action.payload
      })

      // ==========================================
      // MY PAYROLL
      // ==========================================

      .addCase(fetchMyPayroll.pending, (state) => {
        state.loading = true

        state.error = null
      })

      .addCase(fetchMyPayroll.fulfilled, (state, action) => {
        state.loading = false

        state.payroll = action.payload || []
      })

      .addCase(fetchMyPayroll.rejected, (state, action) => {
        state.loading = false

        state.error = action.payload
      })

      // ==========================================
      // CREATE
      // ==========================================

      .addCase(createPayroll.fulfilled, (state, action) => {
        state.loading = false

        state.payroll.push(action.payload)
      })

      // ==========================================
      // UPDATE
      // ==========================================

      .addCase(updatePayroll.fulfilled, (state, action) => {
        state.loading = false

        const index = state.payroll.findIndex(
          (item) => item._id === action.payload._id,
        )

        if (index !== -1) {
          state.payroll[index] = action.payload
        }
      })

      // ==========================================
      // DELETE
      // ==========================================

      .addCase(deletePayroll.fulfilled, (state, action) => {
        state.payroll = state.payroll.filter(
          (item) => item._id !== action.payload,
        )
      })
  },
})

export default payrollSlice.reducer
