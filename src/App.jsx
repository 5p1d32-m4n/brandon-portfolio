import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import ProjectDetail from './pages/ProjectDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
