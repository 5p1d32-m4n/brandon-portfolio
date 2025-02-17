import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, Link } from 'react-router'
import Navbar from './components/Navbar'
import './App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen overflow-hidden flex flex-col">
    <Navbar/>
    <main className="flex-1 overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/contact" element={<Contact />}/>
      </Routes>
    </main>
    </div>
  )
}

export default App
