import AppShell from '../components/layout/AppShell.jsx'
import CaseStudyGrid from '../components/CaseStudyGrid.jsx'
import { useCaseStudies } from '../hooks/useCaseStudies.js'
import './Home.css'

export default function Home() {
  const { caseStudies, isLoading } = useCaseStudies()

  const mailto = import.meta.env.VITE_CONTACT_EMAIL
    ? `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`
    : null
  const linkedinUrl = import.meta.env.VITE_SOCIAL_LINKEDIN || ''
  const xUrl = import.meta.env.VITE_SOCIAL_X || ''

  return (
    <AppShell fullBleed fullBleedViewportLock mainClassName="appShellMain--landing">
      <div className="homeLanding">
        <div className="homeLandingRow">
          <aside className="homeSidebar" aria-label="Introduction">
            <div className="homeSidebarMiddle">
              <div className="homeHero">
                <p className="homeHeroName">hello! my name is keila</p>
                <div className="homeHeroLead">
                  <p className="homeHeroLeadPrimary">
                    Master of Human-Computer Interaction + design @ UW
                  </p>
                  <p className="homeHeroLeadSecondary">
                    A product designer with engineering roots who always looks for the right
                    problem to solve
                  </p>
                </div>
              </div>
              <div className="homeSocial">
                {mailto ? (
                  <a className="homeSocialLink" href={mailto}>
                    email
                  </a>
                ) : (
                  <span className="homeSocialLink homeSocialLink--inactive">email</span>
                )}
                {linkedinUrl ? (
                  <a
                    className="homeSocialLink"
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    linkedin
                  </a>
                ) : (
                  <span className="homeSocialLink homeSocialLink--inactive">linkedin</span>
                )}
                {xUrl ? (
                  <a
                    className="homeSocialLink"
                    href={xUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    X
                  </a>
                ) : (
                  <span className="homeSocialLink homeSocialLink--inactive">X</span>
                )}
              </div>
            </div>
            <div className="homeFlower" aria-hidden="true">
              <img
                className="homeFlowerImg"
                src="/landing-flower.svg"
                alt=""
                width={474}
                height={325}
              />
            </div>
          </aside>

          <div className="homeContent">
            <div className="homeCaseStudies">
              {isLoading ? (
                <p className="homeLoading">Loading projects…</p>
              ) : (
                <CaseStudyGrid caseStudies={caseStudies} className="caseStudyGrid--landing" />
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
