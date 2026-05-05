import AppShell from '../components/layout/AppShell.jsx'
import './Resume.css'

export default function Resume() {
  return (
    <AppShell>
      <article className="resumeArticle">
        <h1 className="resumeTitle">Resume</h1>
        <p className="resumeLead">
          Add a PDF to <code className="resumeCode">public/resume.pdf</code> and link it here, or
          replace this page with your own content.
        </p>
      </article>
    </AppShell>
  )
}
