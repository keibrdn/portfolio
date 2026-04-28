import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DesignSystem from './pages/DesignSystem.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/design" element={<DesignSystem />} />
    </Routes>
  )
}

export default App
