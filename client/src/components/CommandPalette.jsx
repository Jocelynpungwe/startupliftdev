import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CornerDownLeft, Search } from 'lucide-react'

/** Ctrl/Cmd+K quick navigation across every CRM page the user can access. */
export default function CommandPalette({ open, onClose, sections }) {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const entries = useMemo(
    () =>
      sections.flatMap((s) =>
        s.items.map((it) => ({ ...it, section: s.title })),
      ),
    [sections],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries
    return entries.filter((e) =>
      `${e.section} ${e.label}`.toLowerCase().includes(q),
    )
  }, [entries, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // wait for the dialog to mount
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  if (!open) return null

  const go = (entry) => {
    if (!entry) return
    onClose()
    navigate(entry.to)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(results[active])
    }
  }

  return (
    <div
      className="palette-overlay"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        onKeyDown={onKeyDown}
      >
        <div className="palette-input">
          <Search size={17} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where do you want to go?"
            aria-label="Search pages"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={
              results[active] ? `palette-${active}` : undefined
            }
          />
          <kbd>Esc</kbd>
        </div>

        <ul className="palette-list" id="palette-list" role="listbox">
          {results.length === 0 && (
            <li className="palette-empty">No pages match “{query}”.</li>
          )}

          {results.map((e, i) => {
            const Icon = e.icon
            return (
              <li
                key={e.to}
                id={`palette-${i}`}
                role="option"
                aria-selected={i === active}
                className={`palette-item ${i === active ? 'active' : ''}`}
                onMouseMove={() => setActive(i)}
                onClick={() => go(e)}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{e.label}</span>
                <small>{e.section}</small>
                {i === active && (
                  <CornerDownLeft size={14} aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
