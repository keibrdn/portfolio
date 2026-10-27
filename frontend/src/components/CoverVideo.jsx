import { useEffect, useRef } from 'react'
import './CoverVideo.css'

/** Reddit cover reel — shared by the home card and the Reddit case study. */
export const REDDIT_COVER_VIDEO = {
  webm: '/covers/reddit-cover-reel.webm',
  mp4: '/covers/reddit-cover-reel.mp4',
  label: 'Reddit preview',
}

/** Muted, looping, inline video that pauses under prefers-reduced-motion. */
export default function CoverVideo({ src, title, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    function sync() {
      if (reduce.matches) video.pause()
      else video.play().catch(() => {})
    }
    sync()
    reduce.addEventListener('change', sync)
    return () => reduce.removeEventListener('change', sync)
  }, [])

  return (
    <video
      ref={ref}
      className={['coverVideo', className].filter(Boolean).join(' ')}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={src.label ?? (title ? `${title} preview` : 'Project preview')}
    >
      <source src={src.webm} type="video/webm" />
      <source src={src.mp4} type="video/mp4" />
    </video>
  )
}
