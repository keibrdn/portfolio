import { useEffect, useRef, useState } from 'react'
import './AlphaLoopVideo.css'

function IconPlay() {
  return (
    <svg className="alphaLoopControlIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg className="alphaLoopControlIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  )
}

function IconRestart() {
  return (
    <svg
      className="alphaLoopControlIcon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 4.5v5h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Muted looping native video — preserves WebM alpha (Mux cannot). */
export default function AlphaLoopVideo({ src, hevcSrc, label, startPaused = false }) {
  const ref = useRef(null)
  const userPausedRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !src) return undefined

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    userPausedRef.current = reduceMotion || startPaused

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)

    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      io.disconnect()
    }
  }, [src, startPaused])

  const play = () => {
    const el = ref.current
    if (!el) return
    userPausedRef.current = false
    el.play().catch(() => {})
  }

  const pause = () => {
    const el = ref.current
    if (!el) return
    userPausedRef.current = true
    el.pause()
  }

  const restart = () => {
    const el = ref.current
    if (!el) return
    el.currentTime = 0
    play()
  }

  if (!src) return null

  return (
    <div className="alphaLoop">
      <div className="alphaLoopControls">
        <button
          type="button"
          className="alphaLoopControl"
          onClick={playing ? pause : play}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <IconPause /> : <IconPlay />}
        </button>
        <button
          type="button"
          className="alphaLoopControl"
          onClick={restart}
          aria-label="Start from beginning"
        >
          <IconRestart />
        </button>
      </div>
      <video
        ref={ref}
        className="alphaLoopVideo"
        muted
        loop
        playsInline
        autoPlay={!startPaused}
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        preload={startPaused ? 'auto' : 'metadata'}
        aria-label={label || undefined}
      >
        {hevcSrc ? <source src={hevcSrc} type="video/mp4" /> : null}
        <source src={src} type="video/webm" />
      </video>
    </div>
  )
}
