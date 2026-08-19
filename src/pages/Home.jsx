import Hero from "../components/hero/Hero"
import About from "../components/about/About"
import Projects from "../components/projects/Projects"
import Skills from "../components/skills/Skills"
import Services from "../components/services/Services"
import Process from "../components/process/Process"
import Contact from "../components/contact/Contact"
import StickyContact from "../components/stickyContact/StickyContact"
import useHashScroll from "../hooks/useHashScroll"
import useDocumentMeta from "../hooks/useDocumentMeta"
import { useCopy } from "../i18n/languageContext"

function Home(){

    const copy = useCopy();

    useHashScroll();
    useDocumentMeta(copy.meta.home, "");

    return (
        <>
            <Hero/>
            <About/>
            <Projects/>
            <Skills/>
            <Services/>
            <Process/>
            <Contact/>

            {/* sibling of the sections, never inside one: content-visibility traps a fixed child */}
            <StickyContact/>
        </>
    )
}

export default Home
