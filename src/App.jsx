import './App.css'
import './index.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import About from "./components/about/About"
import Projects from "./components/projects/Projects"
import Skills from "./components/skills/Skills"
import Services from "./components/services/Services"
import Contact from "./components/contact/Contact"
import Footer from "./components/footer/Footer"

function App() {

  return (
    <>
        <Header/>
        <Hero/>
        <About/>
        <Projects/>
        <Skills/>
        <Services/>
        <Contact/>
        <Footer/>
        <Analytics />
        <SpeedInsights />
    </>
  )
}

export default App
