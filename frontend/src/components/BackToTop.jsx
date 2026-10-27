import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './BackToTop.css'

const MOBILE_QUERY = '(max-width: 56rem)'

/** Horizontal center of the page's side nav, or null when there isn't one on screen. */
function sideNavCenterX() {
  if (window.matchMedia(MOBILE_QUERY).matches) return null
  const nav = document.querySelector('.caseStudyToc')
  if (!nav) return null
  const box = nav.getBoundingClientRect()
  if (!box.width) return null
  return box.left + box.width / 2
}

function BackToTopInner() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const [navCenterX, setNavCenterX] = useState(null)

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.25
      setVisible(window.scrollY > threshold)
      setNavCenterX(sideNavCenterX())
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  const handleClick = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      className={[
        'backToTop',
        visible ? 'backToTop--visible' : null,
        navCenterX != null ? 'backToTop--underNav' : null,
      ]
        .filter(Boolean)
        .join(' ')}
      style={navCenterX != null ? { left: `${navCenterX}px` } : undefined}
      onClick={handleClick}
      aria-label="Back to top"
    >
      <svg
        className="backToTopIcon"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
      </svg>
      <span className="backToTopLabel" aria-hidden="true">back to top</span>
    </button>
  )
}

export default function BackToTop() {
  const { pathname } = useLocation()

  // Home page uses internal column scroll — no page-level back-to-top needed
  if (pathname === '/') return null

  return <BackToTopInner />
}
