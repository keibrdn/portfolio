import AppShell from '../components/layout/AppShell.jsx'
import CaseStudyGrid from '../components/CaseStudyGrid.jsx'
import { useCaseStudies } from '../hooks/useCaseStudies.js'
import './Home.css'

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

export default function Home() {
  const { caseStudies, isLoading, error, retry } = useCaseStudies()

  return (
    <AppShell fullBleed mainClassName="appShellMain--landing">
      <div className="homeLanding">
        <div className="homeLandingRow">
          <aside className="homeSidebar" aria-label="Introduction">
            <div className="homeSidebarMiddle">
              <div className="homeHero">
                <p className="homeHeroName">hello! my name is keila</p>
                <p className="homeHeroLead">
                  A product designer with engineering roots who always looks for the right
                  problem to solve
                </p>
              </div>
              <div className="homeSocial">
                <a className="homeSocialLink" href="mailto:keilabraden@gmail.com">
                  email
                </a>
                <a
                  className="homeSocialLink"
                  href="https://www.linkedin.com/in/keila-braden/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  linkedin
                </a>
                <a
                  className="homeSocialLink"
                  href="https://github.com/keibrdn"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  github
                </a>
              </div>
            </div>
          </aside>

          <div className="homeContent">
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
          </div>
        </div>
      </div>
    </AppShell>
  )
}
