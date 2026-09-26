import { useEffect, useRef } from 'react'
import './AlphaLoopVideo.css'

/** Muted looping native video — preserves WebM alpha (Mux cannot). */
export default function AlphaLoopVideo({ src, hevcSrc, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !src) return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [src])

  if (!src) return null

  return (
    <video
      ref={ref}
      className="alphaLoopVideo"
      muted
      loop
      playsInline
      autoPlay
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      preload="metadata"
      aria-label={label || undefined}
    >
      {hevcSrc ? <source src={hevcSrc} type="video/mp4" /> : null}
      <source src={src} type="video/webm" />
    </video>
  )
}
