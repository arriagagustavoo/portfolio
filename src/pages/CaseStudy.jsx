import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./Page.css"
import "./CaseStudy.css"
import NotFound from "./NotFound"
import Lightbox from "../components/projects/lightbox/Lightbox"
import StickyContact from "../components/stickyContact/StickyContact"
import SectionEyebrow from "../components/sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../components/sectionEyebrow/eyebrowTiming"
import skillIcons from "../components/icons/skillIcons/skillIcons"
import useInView from "../hooks/useInView"
import useDocumentMeta from "../hooks/useDocumentMeta"
import { findProjectBySlug, workProjects } from "../components/projects/projectsData"
import { useCopy, useLanguage } from "../i18n/languageContext"
import { track } from "@vercel/analytics"

function pickAlt(list, index, fallback){
    if(list && list[index]){
        return list[index];
    }else{
        return fallback;
    }
}

function CaseStudyPage({ project, page }){

    const copy = useCopy();
    const { basePath } = useLanguage();
    const shell = copy.caseStudy;
    const projectText = copy.projects.items[project.id];

    useDocumentMeta(page.meta, "/work/" + project.slug);

    // null = closed, otherwise { start } where start is a shot index or null for the grid
    const [gallery, setGallery] = useState(null);

    // one gate per block, never nested. the lower blocks reveal as they scroll into view
    const [leadRef, leadVisible] = useInView();
    const [sectionsRef, sectionsVisible] = useInView();
    const [linkedRef, linkedVisible] = useInView();
    const [nextRef, nextVisible] = useInView();
    const leadDelay = { "--intro-delay": eyebrowDuration(shell.eyebrow) + "ms" };

    // the top block's last reveal (the gallery) starts 320ms after the eyebrow and runs 560ms
    const topDuration = eyebrowDuration(shell.eyebrow) + 880;
    const [topDone, setTopDone] = useState(false);

    // a big screen has the cards in view at load, and they must wait their turn behind the top block
    useEffect(() => {
        const timer = setTimeout(() => setTopDone(true), topDuration);

        return () => clearTimeout(timer);
    }, [topDuration]);

    const sectionsReady = sectionsVisible && topDone;
    const linkedReady = linkedVisible && topDone;
    const nextReady = nextVisible && topDone;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const images = project.images.map((image, index) => {
        return { src: image.src, alt: pickAlt(projectText.alts, index, image.alt) };
    });

    let cover;
    if(project.cover){
        cover = { src: project.cover.src, alt: pickAlt([projectText.coverAlt], 0, project.cover.alt) };
    }else{
        cover = images[0];
    }

    const handleOpenGallery = (start) => {
        track("gallery_open", { project: project.id });
        setGallery({ start: start });
    };

    let shotClass = "case-shot-img";
    let shotStyle;
    if(project.linkedCrop){
        shotClass = "case-shot-img case-shot-img-crop";
        shotStyle = { aspectRatio: project.linkedCrop };
    }

    let linkedStrip;
    if(project.linked && page.linked){
        const shots = project.linked.map((imageIndex, position) => {
            const shot = images[imageIndex];

            return (
                <figure className = "case-shot reveal-rise" key = {imageIndex}>
                    <button className = "case-shot-button" type = "button" onClick = {() => handleOpenGallery(imageIndex)}
                    aria-label = {copy.lightbox.expandLabel(shot.alt)}>
                        <img className = {shotClass} style = {shotStyle} src = {shot.src} alt = {shot.alt} loading = "lazy"/>
                    </button>
                    <figcaption className = "case-shot-label">{page.linked.labels[position]}</figcaption>
                </figure>
            );
        });

        linkedStrip = (
            <div className = "case-linked" style = {{ "--shots": project.linked.length }} ref = {linkedRef} data-visible = {linkedReady}>
                <section className = "case-section case-linked-copy reveal-rise">
                    <h2 className = "case-heading">{page.linked.heading}</h2>
                    <p className = "case-body">{page.linked.body}</p>
                </section>

                {shots}
            </div>
        );
    }else{
        linkedStrip = null;
    }

    const stackBadges = project.skills.map((skill) => {
        const Icon = skillIcons[skill];

        let icon;
        if(Icon){
            icon = <Icon className = "case-stack-icon"/>;
        }else{
            icon = null;
        }

        return (
            <p className = "case-stack-badge" key = {skill}>
                {icon}
                {skill}
            </p>
        );
    });

    const summaryParagraphs = page.summary.map((paragraph, index) => {
        return <p key = {index}>{paragraph}</p>;
    });

    const sections = page.sections.map((section) => {
        let points;
        if(section.points){
            const items = section.points.map((point, index) => {
                return <li key = {index}>{point}</li>;
            });

            points = <ul className = "case-points">{items}</ul>;
        }else{
            points = null;
        }

        return (
            <section className = "case-section reveal-rise" key = {section.heading}>
                <h2 className = "case-heading">{section.heading}</h2>
                <p className = "case-body">{section.body}</p>
                {points}
            </section>
        );
    });

    // wraps round to the first, and shows nothing until there is a second page to go to
    const writtenProjects = workProjects.filter((candidate) => candidate.slug);
    let nextLink;
    if(writtenProjects.length > 1){
        const position = writtenProjects.findIndex((candidate) => candidate.id === project.id);
        const nextProject = writtenProjects[(position + 1) % writtenProjects.length];

        nextLink = (
            <div className = "case-next-gate" ref = {nextRef} data-visible = {nextReady}>
                <Link className = "case-next reveal-rise" to = {basePath + "/work/" + nextProject.slug}>
                    <span className = "case-next-label">{shell.next}</span>
                    <span className = "case-next-title">{nextProject.title}</span>
                </Link>
            </div>
        );
    }else{
        nextLink = null;
    }

    let lightbox;
    if(gallery){
        lightbox = (
            <Lightbox
                title = {project.title}
                images = {images}
                startIndex = {gallery.start}
                onClose = {() => setGallery(null)}
            />
        );
    }else{
        lightbox = null;
    }

    return (
        <>
        <article className = "case">
            <Link className = "case-back" to = {basePath + "/#projects"}>{shell.back}</Link>

            <div className = "case-top" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <div className = "case-lead">
                    <SectionEyebrow text = {shell.eyebrow} active = {leadVisible}/>

                    <h1 className = "case-title reveal-sweep">{project.title}</h1>

                    <div className = "case-summary reveal-rise">
                        {summaryParagraphs}
                    </div>

                    <div className = "case-stack reveal-rise">
                        <p className = "case-stack-heading">{shell.stackHeading}</p>
                        <div className = "case-stack-badges">
                            {stackBadges}
                        </div>
                    </div>
                </div>

                <div className = "case-gallery reveal-rise">
                    <div className = "case-cta">
                        <p className = "case-cta-text">{shell.ctaText}</p>
                        <Link className = "case-cta-button" to = {basePath + "/#contact"}>{shell.ctaLabel}</Link>
                    </div>

                    <button className = "case-cover" type = "button" onClick = {() => handleOpenGallery(null)}
                    aria-label = {copy.projects.galleryButtonLabel(images.length, project.title)}>
                        <img className = "case-cover-img" src = {cover.src} alt = {cover.alt}/>
                        <span className = "case-cover-tag">{shell.galleryCta(images.length)}</span>
                    </button>

                    <p className = "case-gallery-note">{shell.galleryNote}</p>
                </div>
            </div>

            <div className = "case-sections" ref = {sectionsRef} data-visible = {sectionsReady}>
                {sections}
            </div>

            {linkedStrip}

            {nextLink}
        </article>

        {lightbox}

        {/* sibling of the article, never inside it, so nothing traps a fixed child */}
        <StickyContact rideFooter = {true}/>
        </>
    )
}

function CaseStudy(){

    const copy = useCopy();
    const { slug } = useParams();

    const project = findProjectBySlug(slug);
    let page;
    if(project){
        page = copy.caseStudy.items[project.id];
    }else{
        page = null;
    }

    // an unwritten slug is a real 404, not an empty page
    if(!project || !page){
        return <NotFound/>;
    }

    return <CaseStudyPage project = {project} page = {page} key = {project.id}/>;
}

export default CaseStudy
