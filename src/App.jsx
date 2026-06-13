import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import NationalHeatmap from './pages/NationalHeatmap'
import StatePage from './pages/StatePage'
import DistrictPage from './pages/DistrictPage'
import About from './pages/About'

export default function App() {
  return (
    <div className="min-h-screen bg-[#070b0a] text-white font-['Inter',sans-serif]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<NationalHeatmap />} />
        <Route path="/state/:stateId" element={<StatePage />} />
        <Route path="/district/:districtId" element={<DistrictPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}
