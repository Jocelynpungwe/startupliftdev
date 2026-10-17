// Single source of truth for lead statuses and business problems.

/** Every status a lead can have (form dropdowns, filters). */
export const LEAD_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'emailed', label: 'Emailed' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'approved', label: 'Approved' },
]

/** Columns on the sales pipeline board, in order. Driven by lead status. */
export const PIPELINE_COLUMNS = [
  { id: 'new', title: 'New', description: 'Newly added leads' },
  { id: 'contacted', title: 'Contacted', description: 'Reached out to them' },
  { id: 'emailed', title: 'Emailed', description: 'Email has been sent' },
  { id: 'pending', title: 'Pending', description: 'Waiting on a decision' },
  { id: 'approved', title: 'Approved', description: 'Lead approved' },
]

export const statusLabel = (value) =>
  LEAD_STATUSES.find((s) => s.value === value)?.label ||
  (value ? value.charAt(0).toUpperCase() + value.slice(1) : '')

/** The problems a salesperson can record for a lead. */
export const PROBLEM_OPTIONS = [
  {
    value: 'no-website',
    label: 'No website',
    hint: "The business doesn't have a website",
  },
  {
    value: 'outdated-website',
    label: 'Outdated website',
    hint: 'The site looks dated or is hard to use',
  },
  {
    value: 'broken-link',
    label: 'Website link not working',
    hint: 'Their website link is dead or shows an error',
  },
]

/** Human label for a stored problem value (older leads may hold other values). */
export const problemLabel = (value) =>
  PROBLEM_OPTIONS.find((p) => p.value === value)?.label ||
  (value
    ? value
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : '')

export const SOURCE_OPTIONS = [
  ['google-maps', 'Google Maps'],
  ['google-search', 'Google Search'],
  ['facebook', 'Facebook'],
  ['instagram', 'Instagram'],
  ['linkedin', 'LinkedIn'],
  ['referral', 'Referral'],
  ['website', 'Website'],
  ['cold-call', 'Cold Call'],
  ['email', 'Email'],
  ['advertisement', 'Advertisement'],
  ['networking', 'Networking'],
  ['other', 'Other'],
]

export const PRIORITY_OPTIONS = [
  ['critical', 'Critical'],
  ['high', 'High'],
  ['medium', 'Medium'],
  ['low', 'Low'],
]

export const CONTACT_METHODS = [
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['sms', 'SMS'],
  ['facebook', 'Facebook'],
  ['instagram', 'Instagram'],
  ['linkedin', 'LinkedIn'],
  ['other', 'Other'],
]

/** Placeholder email used when a business has none on file. */
export const NO_EMAIL = 'noemail@gmail.com'

export const labelFor = (options, value, fallback = 'Not provided') =>
  options.find(([v]) => v === value)?.[1] || (value ? value : fallback)
