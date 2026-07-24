import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollRevealProvider() {
  const { pathname } = useLocation()

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal-visible', '')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    )

    function observeUnrevealed() {
      document
        .querySelectorAll('[data-reveal]:not([data-reveal-visible])')
        .forEach((el) => intersectionObserver.observe(el))
    }

    observeUnrevealed()

    // Watch for new [data-reveal] elements added to the DOM (e.g. tab switches)
    const mutationObserver = new MutationObserver(observeUnrevealed)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      intersectionObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname])

  return null
}
