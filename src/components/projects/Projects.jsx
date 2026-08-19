import ProjectCard from "./projectCards/ProjectCard";
import Lightbox from "./lightbox/Lightbox";
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow";
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming";
import useInView from "../../hooks/useInView";
import { useCopy } from "../../i18n/languageContext";
import { queueSmartImages, queueSmartCover, mazeGameImages, mazeGameCover, rideShareImages, rideShareCover, unityGameImages, unityGameCover, mriScannerImages, mriScannerCover, documentSystemImages, documentSystemCover } from "./projectImages";
import { useState } from "react";
import { track } from "@vercel/analytics";
import "./Projects.css"

// titles and skills stay english: they are product names and skillIcons lookup keys
const projects = [
    {
        id: "queuesmart",
        title: "QueueSmart",
        repoUrl: "https://github.com/Fifer-code/Software-Design",
        skills: ["React", "Vite", "Express", "Node.js", "MongoDB", "npm"],
        images: queueSmartImages,
        cover: queueSmartCover,
    },
    {
        id: "documents",
        title: "Freelance Document System",
        repoUrl: "",
        skills: ["Figma", "JavaScript", "HTML", "CSS"],
        images: documentSystemImages,
        cover: documentSystemCover,
    },
    {
        id: "rideshare",
        title: "RideShare",
        repoUrl: "https://github.com/arriagagustavoo/rideshare",
        skills: ["PostgreSQL", "Express", "JavaScript", "HTML", "CSS"],
        images: rideShareImages,
        cover: rideShareCover,
    },
    {
        id: "maze",
        title: "3D Interactive Maze Game",
        repoUrl: "https://github.com/arriagagustavoo/Interactive-Maze-Game",
        skills: ["Python", "OpenGL"],
        images: mazeGameImages,
        cover: mazeGameCover,
    },
    {
        id: "unity",
        title: "2D Unity Game",
        repoUrl: "",
        skills: ["Unity", "Clip Studio Paint"],
        images: unityGameImages,
        cover: unityGameCover,
    },
    {
        id: "mri",
        title: "MRI Scanner",
        repoUrl: "",
        skills: ["MATLAB"],
        images: mriScannerImages,
        cover: mriScannerCover,
    },
]

// falls back to the english alt if a translated list is short or missing
function pickAlt(list, index, fallback){
    if(list && list[index]){
        return list[index];
    }else{
        return fallback;
    }
}

function Projects(){

    const copy = useCopy();
    const projectsEyebrow = copy.projects.eyebrow;

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
    const localizedProjects = projects.map((project) => {
        const text = copy.projects.items[project.id];

        const images = project.images.map((image, index) => {
            return { src: image.src, alt: pickAlt(text.alts, index, image.alt) };
        });

        const cover = { src: project.cover.src, alt: pickAlt([text.coverAlt], 0, project.cover.alt) };

        return { ...project, description: text.description, images: images, cover: cover };
    });

    const projectCards = localizedProjects.map((project) => {
        return (
            <ProjectCard
                key = {project.id}
                title = {project.title}
                images = {project.images}
                cover = {project.cover}
                repoUrl = {project.repoUrl}
                description = {project.description}
                skills = {project.skills}
                onOpenGallery = {() => handleOpenGallery(project)}
            />
        );
    });

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
        <section className = "projects" id = "projects" aria-labelledby = "projects-heading">
            <h2 className = "visually-hidden" id = "projects-heading">{copy.projects.heading}</h2>

            <div className = "projects-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {projectsEyebrow} active = {leadVisible}/>

                {/* fade only: the cards inside own their own scroll-driven motion */}
                <div className = "projects-grid reveal-fade">
                    {projectCards}
                </div>
            </div>

        </section>

        {lightbox}

        </>
    )
}

export default Projects;
