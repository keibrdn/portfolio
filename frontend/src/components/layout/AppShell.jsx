import Nav from './Nav.jsx'
import PageWrapper from './PageWrapper.jsx'
import './AppShell.css'

export default function AppShell({
  children,
  fullBleed = false,
  fullBleedViewportLock = false,
  noPadding = false,
  mainClassName = '',
  showNav = true,
}) {
  return (
    <PageWrapper fullBleed={fullBleed} fullBleedViewportLock={fullBleedViewportLock} noPadding={noPadding}>
      {showNav && <Nav fullBleed={fullBleed} />}
      <main className={['appShellMain', mainClassName].filter(Boolean).join(' ')}>{children}</main>
    </PageWrapper>
  )
}
