import { StrictMode, useState } from 'react'
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
import BackToTop from './components/BackToTop.jsx'
import ScrollRevealProvider from './components/ScrollRevealProvider.jsx'
import AsciiGradientBackground, { DEFAULT_SETTINGS } from './components/AsciiGradientBackground.jsx'
import AsciiGradientControls from './components/AsciiGradientControls.jsx'

function App() {
  const [bgSettings, setBgSettings] = useState(DEFAULT_SETTINGS)

  return (
    <div className="rootStretch">
      <BrowserRouter>
        <AsciiGradientBackground settings={bgSettings} />

        {import.meta.env.DEV && (
          <AsciiGradientControls settings={bgSettings} onChange={setBgSettings} />
        )}

        <div className="rootStretchRouter">
          <ScrollRevealProvider />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/fun" element={<Fun />} />
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
