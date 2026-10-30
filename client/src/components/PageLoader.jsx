import React from 'react'
import '../components/about/style/pageLoad.css'

// The same dark-and-gold look as the website, so a loading moment feels like
// part of the site instead of a different app.
export default function PageLoader() {
  return (
    <div
      className="page-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="page-loader-content">
        <div className="page-loader-mark">
          <span className="page-loader-ring" aria-hidden="true" />
          <img src="/logo-mark.png" alt="" width="44" height="37" />
        </div>

        <p className="page-loader-brand">
          StartupLift <em>Dev</em>
        </p>

        <div className="page-loader-line" aria-hidden="true">
          <span />
        </div>

        <p className="page-loader-note">Building your digital experience</p>
      </div>
    </div>
  )
}
