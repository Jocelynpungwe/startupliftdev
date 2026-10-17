import React from 'react'
import { ChevronDown } from 'lucide-react'

import { PROBLEM_OPTIONS } from '../../lib/leadOptions.js'

/*
 * Form building blocks shared by "New lead" and the lead details editor.
 * Styles live in styles/newLead.css so both screens look identical.
 */

export function SectionTitle({ icon, title, description }) {
  return (
    <div className="form-section-title">
      <div className="section-title-icon">{icon}</div>

      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}

export function Field({ label, required = false, icon, children }) {
  return (
    <div className="lead-field">
      <label>
        {label}

        {required && <span>*</span>}
      </label>

      <div className="input-wrapper">
        {icon}
        {children}
      </div>
    </div>
  )
}

export function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="lead-field">
      <label>{label}</label>

      <div className="input-wrapper select-wrapper">
        <select name={name} value={value} onChange={onChange}>
          {options.map(([optionValue, optionLabel]) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>

        <ChevronDown size={16} className="select-icon" />
      </div>
    </div>
  )
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
}) {
  return (
    <div className="lead-field">
      <label>{label}</label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  )
}

/**
 * The three business problems as selectable cards.
 * `selected` is the array of chosen values; `onToggle(value)` flips one.
 */
export function ProblemPicker({ selected, onToggle }) {
  return (
    <div className="problem-cards" role="group" aria-label="Business problems">
      {PROBLEM_OPTIONS.map((problem) => {
        const isSelected = selected.includes(problem.value)

        return (
          <label
            key={problem.value}
            className={`problem-card ${isSelected ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(problem.value)}
            />

            <span className="problem-card__check" aria-hidden="true">
              {isSelected ? '✓' : ''}
            </span>

            <span className="problem-card__text">
              <strong>{problem.label}</strong>
              <small>{problem.hint}</small>
            </span>
          </label>
        )
      })}
    </div>
  )
}
