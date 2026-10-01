import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './SearchTypingAnimation.css'

const DEFAULT_QUERIES = [
  'how often should i water my pothos reddit',
  'can i eat rice that was left out for 2 hours reddit',
  'protein vs creatine reddit',
]

function renderHighlighted(displayed, fullQuery, word) {
  if (!word || !fullQuery) return displayed

  const start = fullQuery.toLowerCase().indexOf(word.toLowerCase())
  if (start === -1) return displayed

  const end = start + word.length
  if (displayed.length <= start) return displayed

  const before = displayed.slice(0, start)
  const matchEnd = Math.min(displayed.length, end)
  const match = displayed.slice(start, matchEnd)
  const after = displayed.slice(matchEnd)

  return (
    <>
      {before}
      <span className="searchTypingHighlight">{match}</span>
      {after}
    </>
  )
}

function SearchIcon() {
  return (
    <svg
      className="searchTypingIcon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export default function SearchTypingAnimation({
  queries = DEFAULT_QUERIES,
  highlightWord = 'reddit',
  typingSpeed = 39,
  deletingSpeed = 21,
  pauseAfterTyping = 1600,
  pauseAfterDelete = 500,
  loop = true,
}) {
  const [displayed, setDisplayed] = useState('')
  const [activeQuery, setActiveQuery] = useState((queries && queries[0]) || '')
  const wrapRef = useRef(null)
  const measureRef = useRef(null)
  const [fit, setFit] = useState({ scale: 1, width: 0, height: 0 })
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const configRef = useRef({})
  configRef.current = {
    queries,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDelete,
    loop,
  }

  useEffect(() => {
    if (prefersReducedMotion.current) {
      const first = (configRef.current.queries || [])[0] || ''
      setDisplayed(first)
      setActiveQuery(first)
      return undefined
    }

    let queryIndex = 0
    let i = 0
    let deleting = false
    let timeoutId
    let cancelled = false

    const tick = () => {
      if (cancelled) return

      const {
        queries: currentQueries,
        typingSpeed: tSpeed,
        deletingSpeed: dSpeed,
        pauseAfterTyping: pTyping,
        pauseAfterDelete: pDelete,
        loop: shouldLoop,
      } = configRef.current

      if (!currentQueries || currentQueries.length === 0) return
      if (queryIndex >= currentQueries.length) queryIndex = 0
      const currentQuery = currentQueries[queryIndex]

      if (!deleting) {
        if (i <= currentQuery.length) {
          setDisplayed(currentQuery.slice(0, i))
          setActiveQuery(currentQuery)
          i += 1
          timeoutId = setTimeout(tick, tSpeed)
        } else {
          const isLastQuery = queryIndex === currentQueries.length - 1
          if (isLastQuery && !shouldLoop) return
          timeoutId = setTimeout(() => {
            deleting = true
            tick()
          }, pTyping)
        }
      } else if (i >= 0) {
        setDisplayed(currentQuery.slice(0, i))
        setActiveQuery(currentQuery)
        i -= 1
        timeoutId = setTimeout(tick, dSpeed)
      } else {
        deleting = false
        i = 0
        queryIndex = (queryIndex + 1) % currentQueries.length
        timeoutId = setTimeout(tick, pDelete)
      }
    }

    tick()

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [])

  const longestQuery = (queries || []).reduce(
    (longest, query) => (query.length > longest.length ? query : longest),
    '',
  )

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const measure = measureRef.current
    if (!wrap || !measure) return undefined

    const update = () => {
      const available = wrap.clientWidth
      const width = measure.offsetWidth
      const height = measure.offsetHeight
      if (!available || !width) return
      setFit({
        scale: Math.min(1, available / width),
        width,
        height,
      })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(wrap)
    observer.observe(measure)
    return () => observer.disconnect()
  }, [longestQuery])

  return (
    <div
      className="searchTyping"
      ref={wrapRef}
      style={{
        '--search-typing-scale': fit.scale,
        '--search-typing-width': fit.width ? `${fit.width}px` : undefined,
        '--search-typing-height': fit.height ? `${fit.height}px` : undefined,
      }}
    >
      <div className="searchTypingMeasure" ref={measureRef} aria-hidden="true">
        <div className="searchTypingBar">
          <SearchIcon />
          <div className="searchTypingText">
            <span>{longestQuery}</span>
            <span className="searchTypingCursor searchTypingCursor--static" />
          </div>
        </div>
      </div>
      <div className="searchTypingScaled">
        <div className="searchTypingBar">
          <SearchIcon />
          <div className="searchTypingText">
            <span>
              {renderHighlighted(displayed, activeQuery, highlightWord)}
            </span>
            <span
              className={
                prefersReducedMotion.current
                  ? 'searchTypingCursor searchTypingCursor--static'
                  : 'searchTypingCursor'
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
