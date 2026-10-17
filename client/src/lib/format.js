// Shared display formatting for the CRM. One place so every page agrees.

const CURRENCY = 'CAD'
const LOCALE = 'en-CA'

const currency = (digits) =>
  new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })

const exact = currency(2)
const whole = currency(0)

/** Financial amounts: always show cents so totals visibly add up. */
export const money = (value) => exact.format(Number(value) || 0)

/** Pipeline estimates and chart axes, where cents are noise. */
export const moneyWhole = (value) => whole.format(Number(value) || 0)

const dateFmt = new Intl.DateTimeFormat(LOCALE, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

/** Returns '-' (or the given fallback) for missing / invalid dates. */
export const formatDate = (date, fallback = '-') => {
  if (!date) return fallback
  const d = new Date(date)
  return Number.isNaN(d.getTime()) ? fallback : dateFmt.format(d)
}

export const percent = (value, digits = 1) =>
  `${(Number(value) || 0).toFixed(digits)}%`
