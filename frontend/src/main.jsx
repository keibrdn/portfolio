import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { bind, play } from 'cuelume'
import './styles/tokens.css'
import './index.css'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import Resume from './pages/Resume.jsx'
import DesignSystem from './pages/DesignSystem.jsx'
import BackToTop from './components/BackToTop.jsx'
import ScrollRevealProvider from './components/ScrollRevealProvider.jsx'

function AppLayout() {
  return (
    <div className="rootStretch">
      <div className="rootStretchRouter">
        <ScrollRevealProvider />
        <Outlet />
        <BackToTop />
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/work', element: <Work /> },
      { path: '/work/:slug', element: <CaseStudy /> },
      { path: '/about', element: <Navigate to="/#about" replace /> },
      { path: '/resume', element: <Resume /> },
      { path: '/fun', element: <Navigate to="/#play" replace /> },
      { path: '/design', element: <DesignSystem /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

bind()

function unlockCuelume() {
  if (navigator.userActivation?.hasBeenActive === false) return
  play('tick', { volume: 0.001 })
  window.removeEventListener('pointerdown', unlockCuelume, true)
  window.removeEventListener('keydown', unlockCuelume, true)
}

window.addEventListener('pointerdown', unlockCuelume, true)
window.addEventListener('keydown', unlockCuelume, true)
