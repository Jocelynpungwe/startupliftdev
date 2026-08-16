import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api.js'

// Send contact form
export const sendContactMessage = createAsyncThunk(
  'contact/sendContactMessage',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/contact', formData)

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while sending your message.',
      )
    }
  },
)

const initialState = {
  loading: false,
  success: false,
  message: '',
  error: null,
}

const contactSlice = createSlice({
  name: 'contact',

  initialState,

  reducers: {
    resetContact: (state) => {
      state.loading = false
      state.success = false
      state.message = ''
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder

      // Sending
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true
        state.success = false
        state.message = ''
        state.error = null
      })

      // Success
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload?.message || 'Message sent successfully.'
        state.error = null
      })

      // Failed
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.message = ''
        state.error =
          action.payload || 'Failed to send your message. Please try again.'
      })
  },
})

export const { resetContact } = contactSlice.actions

export default contactSlice.reducer
