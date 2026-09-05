import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const projectFormSlice = createSlice({
  name: 'projectForm',
  initialState,
  reducers: {
    openProjectForm: (state) => {
      state.isOpen = true
    },

    closeProjectForm: (state) => {
      state.isOpen = false
    },

    toggleProjectForm: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { openProjectForm, closeProjectForm, toggleProjectForm } =
  projectFormSlice.actions

export default projectFormSlice.reducer
