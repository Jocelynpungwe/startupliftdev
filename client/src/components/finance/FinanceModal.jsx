import React from 'react'
import { X } from 'lucide-react'
export default function FinanceModal({ title, subtitle, onClose, children }) {
  return (
    <div
      className="fin-modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="fin-modal">
        <header>
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <button className="fin-icon-btn" onClick={onClose}>
            <X size={19} />
          </button>
        </header>
        {children}
      </div>
    </div>
  )
}
