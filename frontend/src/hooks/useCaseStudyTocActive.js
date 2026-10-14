import { useCallback, useEffect, useState } from 'react'
import { getCaseStudyTocSpyLinePx } from '../lib/caseStudyScroll.js'

function flattenTocItems(tocSections) {
  const items = []
  for (const section of tocSections) {
    if (!section) continue
    items.push(section)
    if (Array.isArray(section.children)) items.push(...section.children)
  }
  return items
}

function getActiveSectionKey(tocSections) {
  const items = flattenTocItems(tocSections)
  if (!items.length) return null
  const line = getCaseStudyTocSpyLinePx()
  let activeKey = items[0]._key
  for (let i = 0; i < items.length; i++) {
    const s = items[i]
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
