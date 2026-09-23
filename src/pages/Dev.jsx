import { useEffect } from "react"
import { Link } from "react-router-dom"
import "./Page.css"
import "./Dev.css"
import Skills from "../components/skills/Skills"
import Projects from "../components/projects/Projects"
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

    return (
        <>
        <section className = "dev-intro" id = "dev" aria-labelledby = "dev-heading"
        ref = {introRef} data-visible = {introVisible} style = {introDelay}>
            <SectionEyebrow text = {page.eyebrow} active = {introVisible}/>

            <h1 className = "dev-title reveal-sweep" id = "dev-heading">{page.title}</h1>
            <p className = "dev-lead reveal-rise">{page.lead}</p>
        </section>

        <Skills/>
        <Projects group = "dev"/>

        <section className = "dev-outro" ref = {outroRef} data-visible = {outroVisible}>
            <p className = "dev-outro-text reveal-rise">{page.outro}</p>
            <Link className = "page-back reveal-rise" to = {basePath + "/#services"}>{page.back}</Link>
        </section>
        </>
    )
}

export default Dev
