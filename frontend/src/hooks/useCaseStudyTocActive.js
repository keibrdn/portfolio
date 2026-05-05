import { useCallback, useEffect, useState } from 'react'

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

function readScrollSpyLinePx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--scroll-margin-case-study-anchor')
    .trim()
  return parseCssLengthToPx(raw)
}

function getActiveSectionKey(tocSections) {
  if (!tocSections.length) return null
  const line = readScrollSpyLinePx()
  let activeKey = tocSections[0]._key
  for (let i = 0; i < tocSections.length; i++) {
    const s = tocSections[i]
    const k = s._key
    if (k == null) continue
    const el = document.getElementById(`section-${k}`)
    if (!el) continue
    if (el.getBoundingClientRect().top <= line) activeKey = k
  }
  return activeKey
}

export function useCaseStudyTocActive(tocSections) {
  const [activeKey, setActiveKey] = useState(() => tocSections[0]?._key ?? null)

  const sync = useCallback(() => {
    setActiveKey(getActiveSectionKey(tocSections))
  }, [tocSections])

  useEffect(() => {
    sync()
    let rafId = null
    const onScrollOrResize = () => {
      if (rafId != null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        setActiveKey(getActiveSectionKey(tocSections))
      })
    }
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafId != null) window.cancelAnimationFrame(rafId)
    }
  }, [tocSections, sync])

  return activeKey
}
