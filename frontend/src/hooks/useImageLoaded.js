import { useCallback, useEffect, useState } from 'react'

function imageAlreadyReady(src) {
  if (!src || typeof Image === 'undefined') return false
  const img = new Image()
  img.src = src
  return img.complete && img.naturalWidth > 0
}

/** True once the image has painted, including when the browser serves it from cache (no onLoad). */
export function useImageLoaded(src) {
  const [loaded, setLoaded] = useState(() => imageAlreadyReady(src))

  useEffect(() => {
    setLoaded(imageAlreadyReady(src))
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
