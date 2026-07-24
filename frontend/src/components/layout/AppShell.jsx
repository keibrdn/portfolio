import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import PageWrapper from './PageWrapper.jsx'
import './AppShell.css'

export default function AppShell({
  children,
  fullBleed = false,
  fullBleedViewportLock = false,
  mainClassName = '',
  showNav = true,
}) {
  return (
    <PageWrapper fullBleed={fullBleed} fullBleedViewportLock={fullBleedViewportLock}>
      {showNav && <Nav fullBleed={fullBleed} />}
      <main className={['appShellMain', mainClassName].filter(Boolean).join(' ')}>{children}</main>
      <Footer />
    </PageWrapper>
  )
}
