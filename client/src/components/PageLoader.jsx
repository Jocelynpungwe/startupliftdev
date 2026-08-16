import React from 'react'
import { Rocket } from 'lucide-react'
import '../components/about/style/pageLoad.css'
export default function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader-content">
        <div className="page-loader-logo">
          <Rocket size={28} />
        </div>

        <div className="page-loader-brand">
          <span>STARTUP</span>
          <strong>LIFT</strong>
        </div>

        <div className="page-loader-line">
          <span></span>
        </div>

        <p>Building your digital experience...</p>
      </div>
    </div>
  )
}
