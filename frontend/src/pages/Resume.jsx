import AppShell from '../components/layout/AppShell.jsx'
import './Resume.css'

export default function Resume() {
  return (
    <AppShell fullBleed mainClassName="appShellMain--fullBleedSimple">
      <article className="resumeArticle">
        <h1 className="resumeTitle">Resume</h1>
        <p className="resumeLead">
          This page is still under construction! Check back soon.
        </p>
      </article>
    </AppShell>
  )
}
