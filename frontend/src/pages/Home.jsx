import AppShell from '../components/layout/AppShell.jsx'
import CaseStudyGrid from '../components/CaseStudyGrid.jsx'
import { useCaseStudies } from '../hooks/useCaseStudies.js'
import './Home.css'

export default function Home() {
  const { caseStudies, isLoading } = useCaseStudies()

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
