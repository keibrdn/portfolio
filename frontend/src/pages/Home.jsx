import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import CaseStudyGrid from '../components/CaseStudyGrid.jsx'
import { useCaseStudies } from '../hooks/useCaseStudies.js'
import { AboutContent } from './About.jsx'
import './About.css'
import './Fun.css'
import './Home.css'

const TABS = [
  { id: 'work', label: 'work' },
  { id: 'fun', label: 'fun' },
  { id: 'about', label: 'about' },
]

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

/** Home listing — Telefishin pinned first; remaining order from Sanity query. */
function landingCaseStudies(caseStudies) {
  return [...caseStudies].sort((a, b) => {
    const aSlug = String(a.slug ?? '').toLowerCase()
    const bSlug = String(b.slug ?? '').toLowerCase()
    if (aSlug === 'telefishin') return -1
    if (bSlug === 'telefishin') return 1
    return 0
  })
}

function FunContent() {
  return (
    <article className="funArticle">
      <h1 className="funTitle">Fun</h1>
      <p className="funLead">This page is still under construction! Check back soon.</p>
    </article>
  )
}

export default function Home() {
  const { caseStudies, isLoading, error, retry } = useCaseStudies()
  const [activeTab, setActiveTab] = useState('work')

  return (
    <AppShell fullBleed mainClassName="appShellMain--landing" showNav={false}>
      <div className="homeLanding">
        <div className="homeLandingRow">
          <aside className="homeSidebar" aria-label="Introduction">
            <div className="homeSidebarMiddle">
              <div className="homeHero">
                <h1 className="homeHeroName">hello! my name is keila</h1>
                <p className="homeHeroLead">
                  A product designer with engineering roots who always looks for the right
                  problem to solve
                </p>
              </div>
              <div className="homeSocial">
                <a className="homeSocialLink" href="mailto:keilabraden@gmail.com">
                  email<IconCopy />
                </a>
                <a
                  className="homeSocialLink"
                  href="https://www.linkedin.com/in/keila-braden/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  linkedin<IconLink />
                </a>
                <a
                  className="homeSocialLink"
                  href="https://github.com/keibrdn"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  github<IconLink />
                </a>
                <Link className="homeSocialLink" to="/resume">
                  resume<IconDownload />
                </Link>
              </div>
            </div>
          </aside>

          <div className="homeContent">
            <nav className="homeContentNav" aria-label="Content sections">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={
                    activeTab === id
                      ? 'homeContentNavTab homeContentNavTab--active'
                      : 'homeContentNavTab'
                  }
                  onClick={() => {
                    const scrollY = window.scrollY
                    setActiveTab(id)
                    requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: 'instant' }))
                  }}
                  aria-current={activeTab === id ? 'true' : undefined}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="homeContentPanel">
              {activeTab === 'work' && (
                <div className="homeCaseStudies">
                  {isLoading ? (
                    <div className="caseStudyGrid--landing homeSkeletonGrid" aria-hidden="true">
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
                      className="caseStudyGrid--landing"
                    />
                  )}
                </div>
              )}

              {activeTab === 'about' && <AboutContent />}

              {activeTab === 'fun' && <FunContent />}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
