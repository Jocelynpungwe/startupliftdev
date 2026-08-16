import React from 'react'
import { Zap, Smartphone, Search, BarChart3 } from 'lucide-react'
import '../../styles/Why.css'

const differences = [
  {
    icon: Zap,
    value: '100%',
    title: 'Custom solutions',
    text: 'Every website and digital solution is built around your business and goals.',
  },
  {
    icon: Smartphone,
    value: '24/7',
    title: 'Digital presence',
    text: 'Your business stays accessible to customers around the clock.',
  },
  {
    icon: Search,
    value: '∞',
    title: 'Growth potential',
    text: 'Your digital presence is built to evolve as your business grows.',
  },
  {
    icon: BarChart3,
    value: '1',
    title: 'Digital partner',
    text: 'One partner to help you build, grow, and manage your digital presence.',
  },
]

export default function WhyUs() {
  return (
    <section className="stats-section why-us-section">
      <div className="stats-grid">
        {differences.map((item) => {
          const Icon = item.icon

          return (
            <div className="big-stat" key={item.title}>
              <div className="why-us-icon">
                <Icon size={20} />
              </div>

              <strong>{item.value}</strong>

              <span className="why-us-title">{item.title}</span>

              <p>{item.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
