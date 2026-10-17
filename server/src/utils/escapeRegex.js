// Escapes user input before it is used inside a MongoDB $regex, so a search
// such as "C++" or "(" matches literally instead of throwing a 500.
export const escapeRegex = (value = '') =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
