import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api.js'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users')

      return response.data.users
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch users',
      )
    }
  },
)

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users', userData)

      return response.data.user
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create user',
      )
    }
  },
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${id}`, data)

      return response.data.user
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update user',
      )
    }
  },
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`)

      return id
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete user',
      )
    }
  },
)

const userSlice = createSlice({
  name: 'users',

  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // CREATE USER
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload)
      })

      // UPDATE USER
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id,
        )

        if (index !== -1) {
          state.users[index] = action.payload
        }
      })

      // DELETE USER
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload)
      })
  },
})

export default userSlice.reducer
