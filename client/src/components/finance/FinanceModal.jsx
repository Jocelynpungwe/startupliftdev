import React, { useEffect, useId, useRef } from 'react'
import '../../styles/finance.css'
import { X } from 'lucide-react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'

export default function FinanceModal({ title, subtitle, onClose, children }) {
  const titleId = useId()
  const dialogRef = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const dialog = dialogRef.current

    // focus the first form field (skip the close button), else the dialog
    const fields = dialog?.querySelectorAll(
      'form input, form select, form textarea',
    )
    ;(fields?.[0] || dialog)?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialog) return

      const nodes = [...dialog.querySelectorAll(FOCUSABLE)]
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="fin-modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="fin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={dialogRef}
      >
        <header>
          <div>
            <h2 id={titleId}>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <button
            type="button"
            className="fin-icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </header>
        {children}
      </div>
    </div>
  )
}
