const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID

// Loaded on demand so the Clarity SDK stays out of the main bundle
// (and is skipped entirely when no project id is configured).
export const initClarity = () => {
  if (!CLARITY_PROJECT_ID) return

  import('@microsoft/clarity').then(({ default: Clarity }) => {
    Clarity.init(CLARITY_PROJECT_ID)
  })
}
