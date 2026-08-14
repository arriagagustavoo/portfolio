import './App.css'
import './index.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import PageAtmosphere from './components/atmosphere/PageAtmosphere'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import About from "./components/about/About"
import Projects from "./components/projects/Projects"
import Skills from "./components/skills/Skills"
import Services from "./components/services/Services"
import Contact from "./components/contact/Contact"
import Footer from "./components/footer/Footer"
import useHashScroll from './hooks/useHashScroll'

function App() {

  useHashScroll();

  return (
    <>
        {/* sibling of the sections on purpose: contain:paint would trap a fixed child */}
        <PageAtmosphere/>
        <Header/>
        <main>
            <Hero/>
            <About/>
            <Projects/>
            <Skills/>
            <Services/>
            <Contact/>
        </main>
        <Footer/>
        <Analytics />
        <SpeedInsights />
    </>
  )
}

export default App
