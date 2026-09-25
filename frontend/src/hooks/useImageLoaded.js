import { useCallback, useEffect, useState } from 'react'

/** True once the image has painted, including when the browser serves it from cache (no onLoad). */
export function useImageLoaded(src) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [src])

  const markLoaded = useCallback(() => setLoaded(true), [])

  const ref = useCallback(
    (node) => {
      if (node?.complete && node.naturalWidth > 0) setLoaded(true)
    },
    [src],
  )

  return { loaded, onLoad: markLoaded, onError: markLoaded, ref }
}
