import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api.js'

/*
=========================================================
LOGIN
=========================================================
*/

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await api.post('/auth/login', data)

    // Save authentication immediately
    localStorage.setItem('crm_token', res.data.token)
    localStorage.setItem('crm_user', JSON.stringify(res.data.user))

    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Login failed',
    )
  }
})

/*
=========================================================
REGISTER
=========================================================
*/

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const res = await api.post('/auth/register', data)

      localStorage.setItem('crm_token', res.data.token)
      localStorage.setItem('crm_user', JSON.stringify(res.data.user))

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Registration failed',
      )
    }
  },
)

/*
=========================================================
LOAD CURRENT USER
=========================================================
*/

export const loadMe = createAsyncThunk('auth/loadMe', async (_, thunkAPI) => {
  try {
    const res = await api.get('/auth/me')

    return res.data.user
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Session expired',
    )
  }
})

/*
=========================================================
AUTH SLICE
=========================================================
*/

const slice = createSlice({
  name: 'auth',

  initialState: {
    user: null,

    token: localStorage.getItem('crm_token'),

    loading: false,

    // Important:
    // App starts false and becomes true after authentication
    // has been checked.
    initialized: false,

    error: null,
  },

  reducers: {
    /*
    =====================================================
    LOGOUT
    =====================================================
    */

    logout(state) {
      state.user = null
      state.token = null
      state.loading = false
      state.initialized = true
      state.error = null

      localStorage.removeItem('crm_token')
      localStorage.removeItem('crm_user')
    },

    /*
    =====================================================
    INITIALIZED
    =====================================================
    */

    initialized(state) {
      state.initialized = true
      state.loading = false
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      ===================================================
      LOGIN
      ===================================================
      */

      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.initialized = true
        state.error = null

        state.user = action.payload.user
        state.token = action.payload.token
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.initialized = true

        state.error = action.payload

        state.user = null
        state.token = null

        localStorage.removeItem('crm_token')
        localStorage.removeItem('crm_user')
      })

      /*
      ===================================================
      REGISTER
      ===================================================
      */

      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.initialized = true
        state.error = null

        // FIXED:
        // action.payload is res.data
        state.user = action.payload.user
        state.token = action.payload.token
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.initialized = true

        state.error = action.payload
      })

      /*
      ===================================================
      LOAD ME
      ===================================================
      */

      .addCase(loadMe.pending, (state) => {
        state.loading = true
      })

      .addCase(loadMe.fulfilled, (state, action) => {
        state.loading = false
        state.initialized = true
        state.error = null

        state.user = action.payload

        localStorage.setItem('crm_user', JSON.stringify(action.payload))
      })

      .addCase(loadMe.rejected, (state) => {
        state.loading = false
        state.initialized = true

        state.user = null
        state.token = null

        state.error = 'Session expired'

        localStorage.removeItem('crm_token')
        localStorage.removeItem('crm_user')
      })
  },
})

export const { logout, initialized } = slice.actions

export default slice.reducer
