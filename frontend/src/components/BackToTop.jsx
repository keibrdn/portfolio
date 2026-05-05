import { useEffect, useState } from 'react'
import './BackToTop.css'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.25
      setVisible(window.scrollY > threshold)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const handleClick = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      className={['backToTop', visible ? 'backToTop--visible' : null].filter(Boolean).join(' ')}
      onClick={handleClick}
      aria-label="Back to top"
    >
      <svg
        className="backToTopIcon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polyline
          className="backToTopChevron"
          points="18 15 12 9 6 15"
        />
      </svg>
    </button>
  )
}
