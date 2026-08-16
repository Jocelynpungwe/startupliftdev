import React from 'react'
import { Rocket } from 'lucide-react'
import '../components/about/style/loading.css'
export default function LoadingScreen() {
  return (
    <div className="startup-loading">
      <div className="startup-loading-background">
        <div className="loading-glow loading-glow-one"></div>
        <div className="loading-glow loading-glow-two"></div>
      </div>

      <div className="startup-loading-content">
        <div className="loading-logo">
          <div className="loading-logo-ring">
            <Rocket size={28} strokeWidth={1.8} />
          </div>
        </div>

        <div className="loading-brand">
          <span>STARTUP</span>
          <strong>LIFT</strong>
        </div>

        <p className="loading-subtitle">Building your digital future.</p>

        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>

        <div className="loading-status">
          <span className="loading-dot"></span>
          <span>Loading your workspace</span>
        </div>
      </div>
    </div>
  )
}
