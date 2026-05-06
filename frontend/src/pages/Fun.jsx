import AppShell from '../components/layout/AppShell.jsx'
import './Fun.css'

export default function Fun() {
  return (
    <AppShell fullBleed mainClassName="appShellMain--fullBleedSimple">
      <article className="funArticle">
        <h1 className="funTitle">Fun</h1>
        <p className="funLead">Play, experiments, and side quests — add your own content here.</p>
      </article>
    </AppShell>
  )
}
