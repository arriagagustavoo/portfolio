import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Page.css"
import "./Dev.css"
import Skills from "../components/skills/Skills"
import Projects from "../components/projects/Projects"
import Coursework from "../components/coursework/Coursework"
import StickyContact from "../components/stickyContact/StickyContact"
import SectionEyebrow from "../components/sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../components/sectionEyebrow/eyebrowTiming"
import useInView from "../hooks/useInView"
import useDocumentMeta from "../hooks/useDocumentMeta"
import { useCopy, useLanguage } from "../i18n/languageContext"

function Dev(){

    const copy = useCopy();
    const { basePath } = useLanguage();
    const page = copy.dev;

    useDocumentMeta(copy.meta.dev, "/dev");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const [introRef, introVisible] = useInView();
    const introDelay = { "--intro-delay": eyebrowDuration(page.eyebrow) + "ms" };

    const [outroRef, outroVisible] = useInView();

    // watches the layout only, it carries no data-visible so it is not a second gate
    const [layoutRef, layoutVisible] = useInView();
    const [skillsGo, setSkillsGo] = useState(false);
    const [courseGo, setCourseGo] = useState(false);

    // a big screen has all four blocks in view at once, so each waits for the eyebrow above it to finish
    const skillsStart = eyebrowDuration(page.eyebrow);
    const courseStart = eyebrowDuration(copy.projects.dev.eyebrow);

    useEffect(() => {
        if(!layoutVisible){
            return;
        }

        const timers = [
            setTimeout(() => setSkillsGo(true), skillsStart),
            setTimeout(() => setCourseGo(true), courseStart),
        ];

        return () => timers.forEach(clearTimeout);
    }, [layoutVisible, skillsStart, courseStart]);

    const bioParagraphs = page.bio.map((paragraph, index) => {
        const stagger = { "--enter-delay": "calc(var(--intro-delay, 0ms) + " + (140 + index * 100) + "ms)" };

        return <p className = "dev-bio reveal-rise" key = {index} style = {stagger}>{paragraph}</p>;
    });

    // the same three facts About opens with, so the two pages can't disagree
    const facts = [copy.about.degree, copy.about.school, copy.about.location].map((fact, index) => {
        const stagger = { "--enter-delay": "calc(var(--intro-delay, 0ms) + " + (340 + index * 70) + "ms)" };

        return <li className = "dev-fact reveal-fade" key = {fact} style = {stagger}>{fact}</li>;
    });

    return (
        <>
        <div className = "dev-layout" ref = {layoutRef}>
            <Link className = "dev-back" to = {basePath + "/"}>{page.crumb}</Link>

            {/* the columns only exist from 1400px, below that their children join the one-column grid */}
            <div className = "dev-col">
                <section className = "dev-intro" id = "dev" aria-labelledby = "dev-heading"
                ref = {introRef} data-visible = {introVisible} style = {introDelay}>
                    <SectionEyebrow text = {page.eyebrow} active = {introVisible}/>

                    <h1 className = "dev-title reveal-sweep" id = "dev-heading">{page.title}</h1>

                    {bioParagraphs}

                    <ul className = "dev-facts">
                        {facts}
                    </ul>
                </section>

                <Skills ready = {skillsGo}/>
            </div>

            <div className = "dev-col">
                <Projects group = "dev"/>
                <Coursework ready = {courseGo}/>
            </div>
        </div>

        <section className = "dev-outro" ref = {outroRef} data-visible = {outroVisible}>
            <p className = "dev-outro-text reveal-rise">{page.outro}</p>
            <Link className = "page-back reveal-rise" to = {basePath + "/#services"}>{page.back}</Link>
        </section>

        <StickyContact rideFooter = {true}/>
        </>
    )
}

export default Dev
