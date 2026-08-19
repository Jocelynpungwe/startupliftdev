import ReactGA from 'react-ga4'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export const initAnalytics = () => {
  if (!GA_ID) {
    console.warn('Google Analytics Measurement ID is missing.')
    return
  }

  ReactGA.initialize(GA_ID)
}

export const trackPageView = (path) => {
  if (!GA_ID) return

  ReactGA.send({
    hitType: 'pageview',
    page: path,
  })
}

export const trackEvent = (action, category, label) => {
  if (!GA_ID) return

  ReactGA.event({
    action,
    category,
    label,
  })
}
