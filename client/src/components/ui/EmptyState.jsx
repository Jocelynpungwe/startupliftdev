import React from 'react'

/** Friendly empty / error panel. `action` is any node (usually a button or link). */
export default function EmptyState({
  icon: Icon,
  title,
  message,
  action,
  tone = 'default',
}) {
  return (
    <div className={`ui-empty ui-empty--${tone}`}>
      {Icon && (
        <span className="ui-empty__icon">
          <Icon size={22} aria-hidden="true" />
        </span>
      )}
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action && <div className="ui-empty__action">{action}</div>}
    </div>
  )
}
