import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import './styles/tokens.css'
import './index.css'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import Resume from './pages/Resume.jsx'
import DesignSystem from './pages/DesignSystem.jsx'
import BackToTop from './components/BackToTop.jsx'
import SiteMark from './components/layout/SiteMark.jsx'
import ScrollRevealProvider from './components/ScrollRevealProvider.jsx'
import { usePersistWindowScroll } from './hooks/usePersistWindowScroll.js'

if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

function AppLayout() {
  usePersistWindowScroll(true)
  return (
    <div className="rootStretch">
      <div className="rootStretchRouter">
        <ScrollRevealProvider />
        <SiteMark />
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
