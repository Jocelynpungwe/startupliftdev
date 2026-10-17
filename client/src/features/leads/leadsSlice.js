import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api.js'

/*
|--------------------------------------------------------------------------
| FETCH ALL LEADS
|--------------------------------------------------------------------------
*/

export const fetchLeads = createAsyncThunk(
  'leads/fetch',
  async (params = {}, thunkAPI) => {
    try {
      const res = await api.get('/leads', {
        params,
      })

      return res.data.leads
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not load leads',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| FETCH SALES PIPELINE
|--------------------------------------------------------------------------
*/

export const fetchPipeline = createAsyncThunk(
  'leads/fetchPipeline',
  async (params = {}, thunkAPI) => {
    try {
      const res = await api.get('/leads/pipeline', {
        params,
      })

      return {
        leads: res.data.leads || [],
        summary: res.data.summary || {},
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not load sales pipeline',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| CREATE LEAD
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| UPDATE LEAD
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| UPDATE LEAD STAGE
|--------------------------------------------------------------------------
*/

export const updateLeadStage = createAsyncThunk(
  'leads/updateStage',
  async ({ id, stage }, thunkAPI) => {
    try {
      const res = await api.patch(`/leads/${id}/stage`, {
        stage,
      })

      return res.data.lead
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not update lead stage',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| FETCH ONE LEAD (lead details page)
|--------------------------------------------------------------------------
*/

export const fetchLead = createAsyncThunk(
  'leads/fetchOne',
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/leads/${id}`)

      return res.data.lead
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not load lead',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| UPDATE LEAD STATUS (sales pipeline board)
|--------------------------------------------------------------------------
*/

export const updateLeadStatus = createAsyncThunk(
  'leads/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await api.patch(`/leads/${id}/status`, {
        status,
      })

      return res.data.lead
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not update lead status',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| FETCH LEAD ACTIVITIES
|--------------------------------------------------------------------------
*/

export const fetchLeadActivities = createAsyncThunk(
  'leads/fetchLeadActivities',
  async (leadId, thunkAPI) => {
    try {
      const res = await api.get(`/leads/${leadId}/activities`)

      return {
        leadId,
        activities: res.data.activities || [],
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not load lead activities',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| CREATE LEAD ACTIVITY
|--------------------------------------------------------------------------
*/

export const createLeadActivity = createAsyncThunk(
  'leads/createLeadActivity',
  async ({ leadId, data }, thunkAPI) => {
    try {
      const res = await api.post(`/leads/${leadId}/activities`, data)

      return {
        leadId,
        activity: res.data.activity,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not create activity',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| DELETE LEAD ACTIVITY
|--------------------------------------------------------------------------
*/

export const deleteLeadActivity = createAsyncThunk(
  'leads/deleteLeadActivity',
  async ({ leadId, activityId }, thunkAPI) => {
    try {
      await api.delete(`/leads/${leadId}/activities/${activityId}`)

      return {
        leadId,
        activityId,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Could not delete activity',
      )
    }
  },
)

/*
|--------------------------------------------------------------------------
| DELETE LEAD
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| MONTHLY LEAD STATISTICS
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| INITIAL STATE
|--------------------------------------------------------------------------
*/

const initialState = {
  /*
  |--------------------------------------------------------------------------
  | LEADS
  |--------------------------------------------------------------------------
  */

  items: [],

  loading: false,

  error: null,

  /*
  |--------------------------------------------------------------------------
  | SALES PIPELINE
  |--------------------------------------------------------------------------
  */

  pipeline: [],

  pipelineSummary: {},

  pipelineLoading: false,

  pipelineError: null,

  /*
  |--------------------------------------------------------------------------
  | LEAD ACTIVITIES
  |--------------------------------------------------------------------------
  */

  // Activities are stored by lead ID.
  //
  // Example:
  //
  // leadActivities: {
  //   "lead123": [
  //     {...},
  //     {...}
  //   ]
  // }

  leadActivities: {},

  leadActivitiesLoading: false,

  leadActivitiesError: null,

  activityCreating: false,

  activityCreateError: null,

  activityDeleting: false,

  activityDeleteError: null,

  /*
  |--------------------------------------------------------------------------
  | MONTHLY STATISTICS
  |--------------------------------------------------------------------------
  */

  monthlyStatistics: [],

  monthlyStatisticsLoading: false,

  monthlyStatisticsError: null,
}

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const slice = createSlice({
  name: 'leads',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | FETCH LEADS
      |--------------------------------------------------------------------------
      */

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

      /*
      |--------------------------------------------------------------------------
      | FETCH PIPELINE
      |--------------------------------------------------------------------------
      */

      .addCase(fetchPipeline.pending, (state) => {
        state.pipelineLoading = true
        state.pipelineError = null
      })

      .addCase(fetchPipeline.fulfilled, (state, action) => {
        state.pipelineLoading = false

        state.pipeline = action.payload.leads

        state.pipelineSummary = action.payload.summary
      })

      .addCase(fetchPipeline.rejected, (state, action) => {
        state.pipelineLoading = false
        state.pipelineError = action.payload
      })

      /*
      |--------------------------------------------------------------------------
      | CREATE LEAD
      |--------------------------------------------------------------------------
      */

      .addCase(createLead.fulfilled, (state, action) => {
        state.items.unshift(action.payload)

        state.pipeline.unshift(action.payload)
      })

      /*
      |--------------------------------------------------------------------------
      | UPDATE LEAD
      |--------------------------------------------------------------------------
      */

      .addCase(updateLead.fulfilled, (state, action) => {
        const updatedLead = action.payload

        /*
          | Update normal leads
          */

        const itemIndex = state.items.findIndex(
          (lead) => lead._id === updatedLead._id,
        )

        if (itemIndex !== -1) {
          state.items[itemIndex] = updatedLead
        }

        /*
          | Update pipeline
          */

        const pipelineIndex = state.pipeline.findIndex(
          (lead) => lead._id === updatedLead._id,
        )

        if (pipelineIndex !== -1) {
          state.pipeline[pipelineIndex] = updatedLead
        }
      })

      /*
      |--------------------------------------------------------------------------
      | UPDATE LEAD STAGE
      |--------------------------------------------------------------------------
      */

      .addCase(updateLeadStage.fulfilled, (state, action) => {
        const updatedLead = action.payload

        /*
          | Update normal leads
          */

        const itemIndex = state.items.findIndex(
          (lead) => lead._id === updatedLead._id,
        )

        if (itemIndex !== -1) {
          state.items[itemIndex] = updatedLead
        }

        /*
          | Update pipeline
          */

        const pipelineIndex = state.pipeline.findIndex(
          (lead) => lead._id === updatedLead._id,
        )

        if (pipelineIndex !== -1) {
          state.pipeline[pipelineIndex] = updatedLead
        }
      })

      /*
      |--------------------------------------------------------------------------
      | FETCH ONE LEAD
      |--------------------------------------------------------------------------
      */

      .addCase(fetchLead.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchLead.fulfilled, (state, action) => {
        state.loading = false

        const lead = action.payload
        const index = state.items.findIndex((item) => item._id === lead._id)

        if (index === -1) state.items.push(lead)
        else state.items[index] = lead
      })

      .addCase(fetchLead.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      /*
      |--------------------------------------------------------------------------
      | UPDATE LEAD STATUS
      |--------------------------------------------------------------------------
      */

      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        const updatedLead = action.payload

        const itemIndex = state.items.findIndex(
          (lead) => lead._id === updatedLead._id,
        )

        if (itemIndex !== -1) {
          state.items[itemIndex] = updatedLead
        }

        const pipelineIndex = state.pipeline.findIndex(
          (lead) => lead._id === updatedLead._id,
        )

        if (pipelineIndex !== -1) {
          state.pipeline[pipelineIndex] = updatedLead
        }
      })

      /*
      |--------------------------------------------------------------------------
      | FETCH LEAD ACTIVITIES
      |--------------------------------------------------------------------------
      */

      .addCase(fetchLeadActivities.pending, (state) => {
        state.leadActivitiesLoading = true

        state.leadActivitiesError = null
      })

      .addCase(fetchLeadActivities.fulfilled, (state, action) => {
        state.leadActivitiesLoading = false

        state.leadActivities[action.payload.leadId] = action.payload.activities
      })

      .addCase(fetchLeadActivities.rejected, (state, action) => {
        state.leadActivitiesLoading = false

        state.leadActivitiesError = action.payload
      })

      /*
      |--------------------------------------------------------------------------
      | CREATE LEAD ACTIVITY
      |--------------------------------------------------------------------------
      */

      .addCase(createLeadActivity.pending, (state) => {
        state.activityCreating = true

        state.activityCreateError = null
      })

      .addCase(createLeadActivity.fulfilled, (state, action) => {
        state.activityCreating = false

        const { leadId, activity } = action.payload

        /*
          | Create array if it doesn't
          | exist yet.
          */

        if (!state.leadActivities[leadId]) {
          state.leadActivities[leadId] = []
        }

        /*
          | Put newest activity first.
          */

        state.leadActivities[leadId].unshift(activity)
      })

      .addCase(createLeadActivity.rejected, (state, action) => {
        state.activityCreating = false

        state.activityCreateError = action.payload
      })

      /*
      |--------------------------------------------------------------------------
      | DELETE LEAD ACTIVITY
      |--------------------------------------------------------------------------
      */

      .addCase(deleteLeadActivity.pending, (state) => {
        state.activityDeleting = true

        state.activityDeleteError = null
      })

      .addCase(deleteLeadActivity.fulfilled, (state, action) => {
        state.activityDeleting = false

        const { leadId, activityId } = action.payload

        if (!state.leadActivities[leadId]) {
          return
        }

        state.leadActivities[leadId] = state.leadActivities[leadId].filter(
          (activity) => activity._id !== activityId,
        )
      })

      .addCase(deleteLeadActivity.rejected, (state, action) => {
        state.activityDeleting = false

        state.activityDeleteError = action.payload
      })

      /*
      |--------------------------------------------------------------------------
      | DELETE LEAD
      |--------------------------------------------------------------------------
      */

      .addCase(deleteLead.fulfilled, (state, action) => {
        state.items = state.items.filter((lead) => lead._id !== action.payload)

        state.pipeline = state.pipeline.filter(
          (lead) => lead._id !== action.payload,
        )

        /*
          | Remove the lead's activities
          | from Redux as well.
          */

        delete state.leadActivities[action.payload]
      })

      /*
      |--------------------------------------------------------------------------
      | MONTHLY STATISTICS
      |--------------------------------------------------------------------------
      */

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
