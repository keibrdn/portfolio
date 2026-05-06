import { useCallback, useEffect, useState } from 'react'
import { getCaseStudyAnchorOffsetPx } from '../lib/caseStudyScroll.js'

function getActiveSectionKey(tocSections) {
  if (!tocSections.length) return null
  const line = getCaseStudyAnchorOffsetPx()
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
