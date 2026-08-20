import React from 'react'

export default function SectionTitle({
  section,
  h2_start,
  h2_glow,
  h2_end,
  par,
}) {
  return (
    <div className="build-grow-own-heading">
      <p className="section-label">{section}</p>

      <h2>
        {h2_start}
        <span> {h2_glow}</span>
        {h2_end}
      </h2>

      <p>{par}</p>
    </div>
  )
}
