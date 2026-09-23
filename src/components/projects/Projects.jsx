import ProjectCard from "./projectCards/ProjectCard";
import WorkShowcase from "./WorkShowcase";
import Lightbox from "./lightbox/Lightbox";
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow";
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming";
import useInView from "../../hooks/useInView";
import { useCopy, useLanguage } from "../../i18n/languageContext";
import { Link } from "react-router-dom";
import { workProjects, devProjects } from "./projectsData";
import { useState } from "react";
import { track } from "@vercel/analytics";
import "./Projects.css"

// ids never translate, so which section is which lives here and not in the dictionaries
const sections = {
    work: { id: "projects", projects: workProjects },
    dev: { id: "dev-projects", projects: devProjects },
}

// falls back to the english alt if a translated list is short or missing
function pickAlt(list, index, fallback){
    if(list && list[index]){
        return list[index];
    }else{
        return fallback;
    }
}

function Projects({ group }){

    const copy = useCopy();
    const { basePath } = useLanguage();
    const section = sections[group];
    const sectionCopy = copy.projects[group];
    const projectsEyebrow = sectionCopy.eyebrow;
    const headingId = section.id + "-heading";

    // null = closed. lives here so only one gallery can be open at a time
    const [openProject, setOpenProject] = useState(null);

    const [leadRef, leadVisible] = useInView();
    const leadDelay = { "--intro-delay": eyebrowDuration(projectsEyebrow) + "ms" };

    const handleOpenGallery = (project) => {
        track("gallery_open", { project: project.id });
        setOpenProject(project);
    };

    const handleCloseGallery = () => {
        setOpenProject(null);
    };

    // the captions are translated, so the image list is rebuilt against the active language
    const localizedProjects = section.projects.map((project) => {
        const text = copy.projects.items[project.id];

        const images = project.images.map((image, index) => {
            return { src: image.src, alt: pickAlt(text.alts, index, image.alt) };
        });

        // no cover = the card falls back to the first screenshot
        let cover;
        if(project.cover){
            cover = { src: project.cover.src, alt: pickAlt([text.coverAlt], 0, project.cover.alt) };
        }else{
            cover = null;
        }

        return { ...project, description: text.description, pitch: text.pitch, points: text.points, images: images, cover: cover };
    });

    const projectCards = localizedProjects.map((project) => {
        // no slug = no case study written yet, so the card keeps its own gallery
        let caseStudyUrl;
        if(project.slug){
            caseStudyUrl = basePath + "/work/" + project.slug;
        }else{
            caseStudyUrl = null;
        }

        return (
            <ProjectCard
                key = {project.id}
                title = {project.title}
                images = {project.images}
                cover = {project.cover}
                repoUrl = {project.repoUrl}
                description = {project.description}
                skills = {project.skills}
                caseStudyUrl = {caseStudyUrl}
                onOpenGallery = {() => handleOpenGallery(project)}
            />
        );
    });

    // the homepage set leads with one featured project, the dev page keeps the plain grid
    let content;
    let moreLink;
    if(group === "work"){
        content = <WorkShowcase projects = {localizedProjects} basePath = {basePath}/>;
        moreLink = <Link className = "projects-more reveal-fade" to = {basePath + "/dev"}>{copy.projects.moreWork}</Link>;
    }else{
        moreLink = null;
        content = (
            <div className = "projects-grid reveal-fade">
                {projectCards}
            </div>
        );
    }

    let lightbox;
    if(openProject){
        lightbox = (
            <Lightbox
                title = {openProject.title}
                images = {openProject.images}
                onClose = {handleCloseGallery}
            />
        );
    }else{
        lightbox = null;
    }

    return(
        <>
        <section className = "projects" id = {section.id} data-group = {group} aria-labelledby = {headingId}>
            <h2 className = "visually-hidden" id = {headingId}>{sectionCopy.heading}</h2>

            <div className = "projects-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                {/* the link shares the eyebrow's row, so it adds no height */}
                <div className = "projects-head">
                    <SectionEyebrow text = {projectsEyebrow} active = {leadVisible}/>

                    {moreLink}
                </div>

                {content}
            </div>

        </section>

        {lightbox}

        </>
    )
}

export default Projects;
