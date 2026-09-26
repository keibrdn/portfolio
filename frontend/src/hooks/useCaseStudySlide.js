import { useCallback, useEffect, useRef, useState } from 'react'
import { useBlocker } from 'react-router-dom'

const SLIDE_FALLBACK_MS = 540

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useCaseStudySlide() {
  const [phase, setPhase] = useState('enter')
  const proceededRef = useRef(false)

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (prefersReducedMotion()) return false
    if (proceededRef.current) return false
    return currentLocation.pathname !== nextLocation.pathname
  })

  const proceed = useCallback(() => {
    if (proceededRef.current) return
    if (blocker.state !== 'blocked') return
    proceededRef.current = true
    blocker.proceed()
  }, [blocker])

  useEffect(() => {
    if (blocker.state !== 'blocked') return
    setPhase('exit')
    const timer = window.setTimeout(proceed, SLIDE_FALLBACK_MS)
    return () => window.clearTimeout(timer)
  }, [blocker.state, proceed])

  const onAnimationEnd = useCallback(
    (event) => {
      if (event.target !== event.currentTarget) return
      if (!String(event.animationName).includes('caseStudySlideOut')) return
      proceed()
    },
    [proceed],
  )

  const className =
    phase === 'exit'
      ? 'caseStudySlide caseStudySlide--exit'
      : 'caseStudySlide caseStudySlide--enter'

  return { className, onAnimationEnd }
}
