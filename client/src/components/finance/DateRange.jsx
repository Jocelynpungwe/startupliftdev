import React from 'react'
import '../../styles/finance.css'

const iso = (d) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const PRESETS = [
  {
    label: 'This month',
    get: () => {
      const now = new Date()
      return {
        startDate: iso(new Date(now.getFullYear(), now.getMonth(), 1)),
        endDate: iso(now),
      }
    },
  },
  {
    label: 'Last 30 days',
    get: () => {
      const now = new Date()
      const start = new Date(now)
      start.setDate(start.getDate() - 30)
      return { startDate: iso(start), endDate: iso(now) }
    },
  },
  {
    label: 'This year',
    get: () => {
      const now = new Date()
      return {
        startDate: iso(new Date(now.getFullYear(), 0, 1)),
        endDate: iso(now),
      }
    },
  },
]

/**
 * Shared date filter for the finance pages.
 * value / onChange use { startDate: 'YYYY-MM-DD' | '', endDate: ... },
 * which is exactly what the finance API expects.
 */
export default function DateRange({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch })
  const active = Boolean(value.startDate || value.endDate)

  return (
    <div className="fin-range" role="group" aria-label="Date range">
      <div className="fin-range__fields">
        <label>
          <span>From</span>
          <input
            type="date"
            value={value.startDate}
            max={value.endDate || undefined}
            onChange={(e) => set({ startDate: e.target.value })}
          />
        </label>
        <label>
          <span>To</span>
          <input
            type="date"
            value={value.endDate}
            min={value.startDate || undefined}
            onChange={(e) => set({ endDate: e.target.value })}
          />
        </label>
      </div>

      <div className="fin-range__presets">
        {PRESETS.map((p) => (
          <button type="button" key={p.label} onClick={() => onChange(p.get())}>
            {p.label}
          </button>
        ))}
        {active && (
          <button
            type="button"
            className="is-clear"
            onClick={() => onChange({ startDate: '', endDate: '' })}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
