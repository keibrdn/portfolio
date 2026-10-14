import { useEffect } from 'react'
import { persistWindowScroll } from '../lib/scrollRestore.js'

/** Keep the last window scroll so a refresh can restore it. */
export function usePersistWindowScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

    const persist = () => persistWindowScroll()
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') persist()
    }
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        persist()
      })
    }

    persist()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', persist)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', persist)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])
}
