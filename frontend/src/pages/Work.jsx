import AppShell from '../components/layout/AppShell.jsx'
import CaseStudyGrid from '../components/CaseStudyGrid.jsx'
import { useCaseStudies } from '../hooks/useCaseStudies.js'
import './Work.css'

export default function Work() {
  const { caseStudies, isLoading } = useCaseStudies()

  return (
    <AppShell>
      <header className="workHeader">
        <h1 className="workTitle">Work</h1>
        <p className="workLead">
          Case studies across product, research, and craft — documented end to end.
        </p>
      </header>
      {isLoading ? (
        <p className="workLoading">Loading projects…</p>
      ) : (
        <CaseStudyGrid caseStudies={caseStudies} className="caseStudyGrid--landing" />
      )}
    </AppShell>
  )
}
