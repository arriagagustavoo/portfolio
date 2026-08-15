import './App.css'
import './index.css'

import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import PageAtmosphere from './components/atmosphere/PageAtmosphere'
import Header from './components/header/Header'
import Footer from "./components/footer/Footer"
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
        <a className = "skip-link" href = "#main">Skip to content</a>

        {/* sibling of the sections on purpose: contain:paint would trap a fixed child */}
        <PageAtmosphere/>
        <Header/>
        <main id = "main" tabIndex = {-1}>
            <Routes>
                <Route path = "/" element = {<Home/>}/>
                <Route path = "/privacy" element = {<Privacy/>}/>
                <Route path = "*" element = {<NotFound/>}/>
            </Routes>
        </main>
        <Footer/>
        <Analytics />
        <SpeedInsights />
    </>
  )
}

export default App
