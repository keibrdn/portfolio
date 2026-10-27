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

  useEffect(() => {
    if (phase !== 'enter') return
    if (prefersReducedMotion()) {
      setPhase('idle')
      return
    }
    const timer = window.setTimeout(() => setPhase('idle'), SLIDE_FALLBACK_MS)
    return () => window.clearTimeout(timer)
  }, [phase])

  const onAnimationEnd = useCallback(
    (event) => {
      if (event.target !== event.currentTarget) return
      const name = String(event.animationName)
      if (name.includes('caseStudySlideOut')) {
        proceed()
        return
      }
      if (name.includes('caseStudySlideIn')) {
        setPhase('idle')
      }
    },
    [proceed],
  )

  const className =
    phase === 'exit'
      ? 'caseStudySlide caseStudySlide--exit'
      : phase === 'enter'
        ? 'caseStudySlide caseStudySlide--enter'
        : 'caseStudySlide'

  return { className, onAnimationEnd }
}
