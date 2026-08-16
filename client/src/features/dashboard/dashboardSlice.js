import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api.js'

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetch',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/dashboard')
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not load dashboard',
      )
    }
  },
)

const slice = createSlice({
  name: 'dashboard',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default slice.reducer
