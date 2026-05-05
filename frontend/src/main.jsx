import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/tokens.css'
import './index.css'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import About from './pages/About.jsx'
import Resume from './pages/Resume.jsx'
import Fun from './pages/Fun.jsx'
import DesignSystem from './pages/DesignSystem.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="rootStretch">
      <BrowserRouter>
        <div className="rootStretchRouter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/fun" element={<Fun />} />
            <Route path="/design" element={<DesignSystem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  </StrictMode>,
)
