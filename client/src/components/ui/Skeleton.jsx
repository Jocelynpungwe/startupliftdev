import React from 'react'

/** Shimmering placeholder block. Size it with width/height or className. */
export function Skeleton({ width, height = 14, radius, className = '', style }) {
  return (
    <span
      className={`ui-skeleton ${className}`}
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  )
}

/** A row of KPI-card placeholders. */
export function SkeletonCards({ count = 4 }) {
  return (
    <div
      className="ui-skeleton-cards"
      role="status"
      aria-label="Loading"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <div className="ui-skeleton-card" key={i}>
          <Skeleton width={36} height={36} radius={10} />
          <Skeleton width="55%" height={12} />
          <Skeleton width="70%" height={26} />
        </div>
      ))}
    </div>
  )
}

/** Table-body placeholder rows. */
export function SkeletonRows({ rows = 6, columns = 5 }) {
  return (
    <div
      className="ui-skeleton-rows"
      role="status"
      aria-label="Loading"
      aria-busy="true"
    >
      {Array.from({ length: rows }, (_, r) => (
        <div
          className="ui-skeleton-row"
          key={r}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }, (_, c) => (
            <Skeleton key={c} width={c === 0 ? '80%' : '60%'} />
          ))}
        </div>
      ))}
    </div>
  )
}
