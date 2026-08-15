import Hero from "../components/hero/Hero"
import About from "../components/about/About"
import Projects from "../components/projects/Projects"
import Skills from "../components/skills/Skills"
import Services from "../components/services/Services"
import Contact from "../components/contact/Contact"
import StickyContact from "../components/stickyContact/StickyContact"
import useHashScroll from "../hooks/useHashScroll"
import { useEffect } from "react"

// matches index.html, so coming back from /privacy restores the tab title
const homeTitle = "Gustavo Arriaga — Web Developer & Designer in Houston"

function Home(){

    useHashScroll();

    useEffect(() => {
        document.title = homeTitle
    }, []);

    return (
        <>
            <Hero/>
            <About/>
            <Projects/>
            <Skills/>
            <Services/>
            <Contact/>

            {/* sibling of the sections, never inside one: content-visibility traps a fixed child */}
            <StickyContact/>
        </>
    )
}

export default Home
