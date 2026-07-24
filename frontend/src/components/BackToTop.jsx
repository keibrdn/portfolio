import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './BackToTop.css'

const FOOTER_HEIGHT = 300

export default function BackToTop() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const [footerOffset, setFooterOffset] = useState(0)

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.25
      setVisible(window.scrollY > threshold)

      // How many px of the footer are currently visible in the viewport
      const scrollBottom = window.scrollY + window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      setFooterOffset(Math.max(0, scrollBottom - (docHeight - FOOTER_HEIGHT)))
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
      className={['backToTop', visible ? 'backToTop--visible' : null].filter(Boolean).join(' ')}
      style={footerOffset > 0 ? { bottom: `calc(var(--space-md) + var(--space-back-to-top-lift) + ${footerOffset}px)` } : undefined}
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
