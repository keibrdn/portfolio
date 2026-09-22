import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import CaseStudyGrid from '../components/CaseStudyGrid.jsx'
import Footer from '../components/layout/Footer.jsx'
import { useCaseStudies } from '../hooks/useCaseStudies.js'
import './Home.css'

/* ── Icons (same SVG paths as before) ─────────────────────── */
function IconLink() {
  return (
    <svg className="homeSocialIcon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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

/* ── Nav active-class helper ──────────────────────────────── */
function navClass({ isActive }) {
  return isActive ? 'homeFixedNavLink homeFixedNavLink--active' : 'homeFixedNavLink'
}

/** Telefishin pinned first; remaining order from Sanity. */
function landingCaseStudies(caseStudies) {
  return [...caseStudies].sort((a, b) => {
    const aSlug = String(a.slug ?? '').toLowerCase()
    const bSlug = String(b.slug ?? '').toLowerCase()
    if (aSlug === 'telefishin') return -1
    if (bSlug === 'telefishin') return 1
    return 0
  })
}

export default function Home() {
  const { caseStudies, isLoading, error, retry } = useCaseStudies()
  const [emailCopied, setEmailCopied] = useState(false)
  const copyTimer = useRef(null)

  // Cycle through Handwritten3 → Handwritten2 → Handwritten5 every 300ms → wiggly effect
  const [fontIdx, setFontIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFontIdx((i) => (i + 1) % 3), 300)
    return () => clearInterval(id)
  }, [])

  function handleCopyEmail() {
    navigator.clipboard.writeText('keilabraden@gmail.com').then(() => {
      setEmailCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setEmailCopied(false), 1000)
    })
  }

  return (
    <AppShell fullBleed noPadding mainClassName="appShellMain--landing" showNav={false} showFooter={false}>
      <div className="homeLanding">

        {/* ── Fixed left vertical nav ───────────────────────── */}
        <nav className="homeFixedNav" aria-label="Site navigation">
          <span className="homeFixedNavDot" aria-hidden="true" />
          <NavLink className={navClass} to="/" end>work</NavLink>
          <NavLink className={navClass} to="/fun">play</NavLink>
          <NavLink className={navClass} to="/about">about</NavLink>
          <a className="homeFixedNavLink" href="mailto:keilabraden@gmail.com">contact</a>
        </nav>

        {/* ── Main scrollable content ───────────────────────── */}
        <div className="homeContent">

          {/* Bio — centered */}
          <section className="homeBio">
            <div className="homeBioTagline">
              <h1 className={`homeHeroName homeHeroName--${fontIdx}`}>
                keila braden, product designer
              </h1>
              <p className="homeHeroLead">
                I craft human experiences that spark connection and belonging,
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
              <a className="homeSocialLink" href="https://www.linkedin.com/in/keilabraden" target="_blank" rel="noreferrer noopener">
                linkedin<IconLink />
              </a>
            </div>
          </section>

          {/* Case studies */}
          <section className="homeCaseStudies" aria-label="Work">
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

          <Footer />
        </div>

      </div>
    </AppShell>
  )
}
