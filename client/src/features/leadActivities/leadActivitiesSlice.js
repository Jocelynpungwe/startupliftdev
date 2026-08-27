import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api.js'

/*
|--------------------------------------------------------------------------
| FETCH ACTIVITIES FOR A LEAD
|--------------------------------------------------------------------------
*/

export const fetchLeadActivities = createAsyncThunk(
  'leadActivities/fetchLeadActivities',
  async (leadId, thunkAPI) => {
    try {
      const response = await api.get(`/leads/${leadId}/activities`)

      return response.data.activities || []
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to load lead activities',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| CREATE ACTIVITY
|--------------------------------------------------------------------------
*/

export const createLeadActivity = createAsyncThunk(
  'leadActivities/createLeadActivity',
  async ({ leadId, data }, thunkAPI) => {
    try {
      const response = await api.post(`/leads/${leadId}/activities`, data)

      return response.data.activity
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to create activity',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| DELETE ACTIVITY
|--------------------------------------------------------------------------
*/

export const deleteLeadActivity = createAsyncThunk(
  'leadActivities/deleteLeadActivity',
  async ({ leadId, activityId }, thunkAPI) => {
    try {
      await api.delete(`/leads/${leadId}/activities/${activityId}`)

      return activityId
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete activity',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| INITIAL STATE
|--------------------------------------------------------------------------
*/

const initialState = {
  items: [],

  loading: false,

  creating: false,

  deleting: false,

  error: null,

  createError: null,

  deleteError: null,
}

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const leadActivitiesSlice = createSlice({
  name: 'leadActivities',

  initialState,

  reducers: {
    clearLeadActivities: (state) => {
      state.items = []
      state.loading = false
      state.creating = false
      state.deleting = false
      state.error = null
      state.createError = null
      state.deleteError = null
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | FETCH ACTIVITIES
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchLeadActivities.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchLeadActivities.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload || []
      })

      .addCase(fetchLeadActivities.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    /*
    |--------------------------------------------------------------------------
    | CREATE ACTIVITY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(createLeadActivity.pending, (state) => {
        state.creating = true
        state.createError = null
      })

      .addCase(createLeadActivity.fulfilled, (state, action) => {
        state.creating = false

        /*
         * Put the newest activity at the top
         * of the timeline.
         */
        state.items.unshift(action.payload)
      })

      .addCase(createLeadActivity.rejected, (state, action) => {
        state.creating = false
        state.createError = action.payload
      })

    /*
    |--------------------------------------------------------------------------
    | DELETE ACTIVITY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(deleteLeadActivity.pending, (state) => {
        state.deleting = true
        state.deleteError = null
      })

      .addCase(deleteLeadActivity.fulfilled, (state, action) => {
        state.deleting = false

        state.items = state.items.filter(
          (activity) => activity._id !== action.payload,
        )
      })

      .addCase(deleteLeadActivity.rejected, (state, action) => {
        state.deleting = false
        state.deleteError = action.payload
      })
  },
})

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/

export const { clearLeadActivities } = leadActivitiesSlice.actions

/*
|--------------------------------------------------------------------------
| SELECTOR
|--------------------------------------------------------------------------
*/

export const selectLeadActivities = (state) => state.leadActivities.items

/*
|--------------------------------------------------------------------------
| REDUCER
|--------------------------------------------------------------------------
*/

export default leadActivitiesSlice.reducer
