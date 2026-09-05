import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'lucide-react'

import { closeProjectForm } from '../features/form/projectFormSlice'

import FORM from './Form'

import './ProjectFormModal.css'

const ProjectFormModal = () => {
  const dispatch = useDispatch()

  const isOpen = useSelector((state) => state.projectForm.isOpen)

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        dispatch(closeProjectForm())
      }
    }

    document.addEventListener('keydown', handleEscape)

    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, dispatch])

  if (!isOpen) {
    return null
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(closeProjectForm())
    }
  }

  return (
    <div
      className="project-form-overlay"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="project-form-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Start a project"
      >
        <button
          type="button"
          className="project-form-close"
          onClick={() => dispatch(closeProjectForm())}
          aria-label="Close project form"
        >
          <X size={22} />
        </button>

        <FORM />
      </div>
    </div>
  )
}

export default ProjectFormModal
