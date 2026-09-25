import { useState, useRef, useEffect } from 'react'
import AppShell from '../components/layout/AppShell.jsx'
import CaseStudyGrid from '../components/CaseStudyGrid.jsx'
import Footer from '../components/layout/Footer.jsx'
import { useCaseStudies } from '../hooks/useCaseStudies.js'
import { AboutContent } from './About.jsx'
import './About.css'
import './Home.css'

/* ── Icons (same SVG paths as before) ─────────────────────── */
function IconDownload() {
  return (
    <svg className="homeSocialIcon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1V8M6 8L3.5 5.5M6 8L8.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 10.5H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconCopy() {
  return (
    <svg className="homeSocialIcon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="4.5" y="4.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7.5H2C1.44772 7.5 1 7.05228 1 6.5V2C1 1.44772 1.44772 1 2 1H6.5C7.05228 1 7.5 1.44772 7.5 2V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const NAV_ITEMS = [
  { id: 'work', label: 'work' },
  { id: 'play', label: 'play' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const DOT_SIZE = 10
const DOT_HOP_MS = 420

function HomeFixedNav({ leadRef }) {
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const hopTimer = useRef(null)
  const lockTimer = useRef(null)
  const lockedTarget = useRef(null)
  const activeId = useRef('work')
  const [dot, setDot] = useState({ top: 0, ready: false })
  const [hopping, setHopping] = useState(false)
  const [active, setActive] = useState('work')
  const [menuOpen, setMenuOpen] = useState(false)

  function measureDot(id) {
    const el = itemRefs.current[id]
    if (!el) return
    setDot({
      top: el.offsetTop + (el.offsetHeight - DOT_SIZE) / 2,
      ready: true,
    })
  }

  function placeDot(id, animate) {
    activeId.current = id
    setActive(id)
    measureDot(id)

    if (!animate) return
    setHopping(false)
    requestAnimationFrame(() => {
      setHopping(true)
      clearTimeout(hopTimer.current)
      hopTimer.current = setTimeout(() => setHopping(false), DOT_HOP_MS)
    })
  }

  function lockTo(id) {
    lockedTarget.current = id
    clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => {
      lockedTarget.current = null
    }, 1600)
  }

  function goTo(id) {
    lockTo(id)
    placeDot(id, true)
    scrollToSection(id)
    setMenuOpen(false)
  }


  useEffect(() => {
    function isMobile() {
      return window.matchMedia('(max-width: 56rem)').matches
    }

    function positionNav() {
      const nav = navRef.current
      const lead = leadRef?.current
      const content = document.querySelector('.homeContent')
      if (!nav) return
      if (isMobile()) {
        nav.style.top = ''
        nav.style.left = ''
        nav.style.right = ''
        return
      }
      if (content) {
        const box = content.getBoundingClientRect()
        nav.style.right = 'auto'
        nav.style.left = `max(var(--space-sm), calc(${box.left}px - ${nav.offsetWidth}px - var(--space-nav-to-content)))`
      }
      if (!lead) return
      const leadBox = lead.getBoundingClientRect()
      const top = leadBox.top + leadBox.height / 2 - nav.offsetHeight / 2
      nav.style.top = `${Math.max(top, 16)}px`
    }

    function alignToLead() {
      positionNav()
      if (!isMobile()) placeDot(activeId.current, false)
    }

    function onResize() {
      if (isMobile()) setMenuOpen(false)
      alignToLead()
    }

    alignToLead()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', positionNav, { passive: true })
    const lead = leadRef?.current
    const content = document.querySelector('.homeContent')
    const ro = new ResizeObserver(alignToLead)
    if (lead) ro.observe(lead)
    if (content) ro.observe(content)
    document.fonts?.ready?.then(alignToLead)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const id = visible?.target?.id
        if (!id) return

        // Ignore sections we pass through during a click-to-scroll
        if (lockedTarget.current) {
          if (id === lockedTarget.current) {
            lockedTarget.current = null
            clearTimeout(lockTimer.current)
          }
          return
        }

        if (id !== activeId.current) placeDot(id, false)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] },
    )
    NAV_ITEMS.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', positionNav)
      ro?.disconnect()
      observer.disconnect()
      clearTimeout(hopTimer.current)
      clearTimeout(lockTimer.current)
    }
  }, [leadRef])

  return (
    <>
    <button
      type="button"
      className={menuOpen ? 'homeHamburger homeHamburger--open' : 'homeHamburger'}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
      aria-controls="home-site-nav"
      onClick={() => setMenuOpen((open) => !open)}
    >
      <span className="homeHamburgerBar" />
      <span className="homeHamburgerBar" />
      <span className="homeHamburgerBar" />
    </button>
    <nav
      ref={navRef}
      id="home-site-nav"
      className={menuOpen ? 'homeFixedNav homeFixedNav--open' : 'homeFixedNav'}
      aria-label="Site navigation"
    >
      <span
        className={
          hopping
            ? 'homeFixedNavDot homeFixedNavDot--ready homeFixedNavDot--hop'
            : `homeFixedNavDot${dot.ready ? ' homeFixedNavDot--ready' : ''}`
        }
        style={{ top: dot.top }}
        aria-hidden="true"
      />
      {NAV_ITEMS.map((item) => (
        <div
          key={item.id}
          className="homeFixedNavRow"
          ref={(node) => {
            itemRefs.current[item.id] = node
          }}
        >
          <button
            type="button"
            className={
              active === item.id
                ? 'homeFixedNavLink homeFixedNavLink--active'
                : 'homeFixedNavLink'
            }
            onClick={() => goTo(item.id)}
          >
            {item.label}
          </button>
        </div>
      ))}
    </nav>
    </>
  )
}

/** Reddit pinned first; remaining order from Sanity. */
function landingCaseStudies(caseStudies) {
  return [...caseStudies].sort((a, b) => {
    const aSlug = String(a.slug ?? '').toLowerCase()
    const bSlug = String(b.slug ?? '').toLowerCase()
    if (aSlug === 'reddit') return -1
    if (bSlug === 'reddit') return 1
    return 0
  })
}

export default function Home() {
  const { caseStudies, isLoading, error, retry } = useCaseStudies()
  const [emailCopied, setEmailCopied] = useState(false)
  const copyTimer = useRef(null)
  const leadRef = useRef(null)

  // Cycle through Handwritten3 → Handwritten2 → Handwritten5 every 300ms → wiggly effect
  const [fontIdx, setFontIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFontIdx((i) => (i + 1) % 3), 300)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    requestAnimationFrame(() => scrollToSection(hash))
  }, [])

  function handleCopyEmail() {
    navigator.clipboard.writeText('keilabraden@gmail.com').then(() => {
      setEmailCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setEmailCopied(false), 3000)
    })
  }

  return (
    <AppShell fullBleed noPadding mainClassName="appShellMain--landing" showNav={false} showFooter={false}>
      <div className="homeLanding">

        <HomeFixedNav leadRef={leadRef} />

        {/* ── Main scrollable content ───────────────────────── */}
        <div className="homeContent">

          {/* Bio — centered */}
          <section className="homeBio">
            <div className="homeBioTagline">
              <div className="homeHeroNameSlot">
                <h1 className={`homeHeroName homeHeroName--${fontIdx}`}>
                  keila braden, product designer
                </h1>
              </div>
              <p className="homeHeroLead" ref={leadRef}>
                I design and engineer human experiences that spark connection and belonging,
                grounded in equal parts craft and curiosity.
              </p>
            </div>

            <div className="homeBioLinks">
              <button
                type="button"
                className="homeSocialLink homeSocialLink--copy"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                <span className="homeCopyTooltip" aria-live="polite">
                  {emailCopied ? 'copied!' : 'email'}
                </span>
                <IconCopy />
              </button>
              <a className="homeSocialLink" href="/resume.pdf" target="_blank" rel="noreferrer noopener">
                resume<IconDownload />
              </a>
            </div>
          </section>

          <section id="work" className="homePageSection" aria-label="Work">
            <p className="homeSectionEyebrow">work</p>
            {isLoading ? (
              <div className="homeSkeletonGrid" aria-hidden="true">
                <div className="homeSkeletonCard" />
                <div className="homeSkeletonCard" />
              </div>
            ) : error && import.meta.env.PROD ? (
              <div className="homeSanityError">
                <h2 className="homeSanityErrorTitle">Couldn&apos;t load projects</h2>
                <p className="homeSanityErrorText">
                  The site can&apos;t reach Sanity from production. Check Vercel environment
                  variables (<code className="homeSanityErrorCode">VITE_SANITY_PROJECT_ID</code>,{' '}
                  <code className="homeSanityErrorCode">VITE_SANITY_DATASET</code>) and add this
                  URL under{' '}
                  <strong className="homeSanityErrorStrong">Sanity → API → CORS origins</strong>.
                </p>
                <p className="homeSanityErrorDetail">
                  {error instanceof Error ? error.message : String(error)}
                </p>
                <button type="button" className="homeSanityErrorRetry" onClick={retry}>
                  Try again
                </button>
              </div>
            ) : (
              <CaseStudyGrid
                caseStudies={landingCaseStudies(caseStudies)}
                layout="horizontal"
              />
            )}
          </section>

          <section id="play" className="homePageSection" aria-label="Play">
            <p className="homeSectionEyebrow">play</p>
            <div className="homePlayStack">
              <div className="homePlayPlaceholder" aria-hidden="true" />
              <div className="homePlayPlaceholder" aria-hidden="true" />
            </div>
          </section>

          <section id="about" className="homePageSection homeAboutSection" aria-label="About">
            <p className="homeSectionEyebrow">about</p>
            <AboutContent />
          </section>

          <section id="contact" className="homePageSection" aria-label="Contact">
            <p className="homeSectionEyebrow">contact</p>
            <Footer />
          </section>
        </div>

      </div>
    </AppShell>
  )
}
