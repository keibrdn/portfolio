import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import './styles/tokens.css'
import './index.css'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import Resume from './pages/Resume.jsx'
import DesignSystem from './pages/DesignSystem.jsx'
import BackToTop from './components/BackToTop.jsx'
import ScrollRevealProvider from './components/ScrollRevealProvider.jsx'

function App() {
  return (
    <div className="rootStretch">
      <BrowserRouter>
        <div className="rootStretchRouter">
          <ScrollRevealProvider />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/fun" element={<Navigate to="/#play" replace />} />
            <Route path="/design" element={<DesignSystem />} />
          </Routes>
          <BackToTop />
        </div>
      </BrowserRouter>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
