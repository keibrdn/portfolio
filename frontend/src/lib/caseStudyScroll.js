function parseCssLengthToPx(value) {
  const s = String(value || '').trim()
  if (!s) return 96
  const m = s.match(/^([\d.]+)(rem|px|em)$/)
  if (!m) return 96
  const n = parseFloat(m[1])
  const root = parseFloat(getComputedStyle(document.documentElement).fontSize || '16')
  if (m[2] === 'px') return n
  if (m[2] === 'rem') return n * root
  return n * root
}

/** Pixel offset from viewport top — matches `--scroll-margin-case-study-anchor` on `.caseStudySection`. */
export function getCaseStudyAnchorOffsetPx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--scroll-margin-case-study-anchor')
    .trim()
  return parseCssLengthToPx(raw)
}

/**
 * Scroll so the section top sits `scroll-margin` below the viewport top (same as CSS anchor behavior,
 * without relying on inconsistent native hash + scroll-margin combinations).
 */
export function scrollToCaseStudySection(sectionKey) {
  if (sectionKey == null) return
  const id = `section-${sectionKey}`
  const el = document.getElementById(id)
  if (!el) return
  const offset = getCaseStudyAnchorOffsetPx()
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' })
  if (window.history.replaceState) {
    window.history.replaceState(null, '', `#${id}`)
  }
}
