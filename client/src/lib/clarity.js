import Clarity from '@microsoft/clarity'

const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID

export const initClarity = () => {
  if (!CLARITY_PROJECT_ID) {
    console.warn('Microsoft Clarity Project ID is missing.')
    return
  }

  Clarity.init(CLARITY_PROJECT_ID)

  console.log('Microsoft Clarity initialized')
}
