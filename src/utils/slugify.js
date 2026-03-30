/**
 * Converts a topic title into a stable, URL-safe slug.
 *
 * Rules:
 *  - Lowercase everything
 *  - Replace '&' with 'and'
 *  - Strip characters that are not letters, digits, spaces, or hyphens
 *  - Collapse whitespace/hyphens into a single hyphen
 *  - Trim leading/trailing hyphens
 *
 * Examples:
 *  'Variables & Data Types'        → 'variables-and-data-types'
 *  'CSS Selectors & Specificity'   → 'css-selectors-and-specificity'
 *  'ES6+ Features'                 → 'es6-features'
 *  'V8 Engine Internals'           → 'v8-engine-internals'
 */
export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
}
