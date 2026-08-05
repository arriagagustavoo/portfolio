import ProjectCard from "./projectCards/ProjectCard";
import Lightbox from "./lightbox/Lightbox";
import { queueSmartImages, mazeGameImages } from "./projectImages";
import { useState } from "react";
import "./Projects.css"

//project card info data
const projects = [
    {
        title: "3D Interactive Maze Game",
        repoUrl: "https://github.com/arriagagustavoo/Interactive-Maze-Game",
        description: "Fully 3D interactive game built using python openGL. Custom algorithm used for randomly generated mazes.",
        skills: ["Python", "OpenGL"],
        images: mazeGameImages,
    },
    {
        title: "QueueSmart",
        repoUrl: "https://github.com/Fifer-code/Software-Design",
        description: "Fullstack website. Fully fleshed out functionality for both users and admins. Authentication, real-time interations and database storage.",
        skills: ["React", "Vite", "Express", "Node.js", "MongoDB", "npm"],
        images: queueSmartImages,
    },
    {
        title: "2D Unity Game",
        repoUrl: "",
        description: "Original characters and custom assets. Animations drawn frame-by-frame and put into Unity Game engine and uses keyboard controls.",
        skills: ["Unity", "Clip Studio Paint"],
        images: [],
    },
    {
        title: "MRI Scanner",
        repoUrl: "",
        description: "Matlab GUI to simulate a digital MRI through unique parameters and values",
        skills: ["MATLAB"],
        images: [],
    },
    {
        title: "RideShare",
        repoUrl: "https://github.com/arriagagustavoo/rideshare",
        description: "Fullstack GUI to simulate Relational SQL Database use through transactions and bookings",
        skills: ["PostgreSQL", "Express", "JavaScript", "HTML", "CSS"],
        images: [],
    },
    {
        title: "Freelance Document System",
        repoUrl: "",
        description: "Proposal, contract, and invoice templates that share one dataset. Client details and amounts are typed once and carry across all three, with autosave and print-ready PDF output.",
        skills: ["Figma", "JavaScript", "HTML", "CSS"],
        images: [],
    },
]


function Projects(){

    // null = closed. lives here so only one gallery can be open at a time
    const [openProject, setOpenProject] = useState(null);

    const handleOpenGallery = (project) => {
        setOpenProject(project);
    };

    const handleCloseGallery = () => {
        setOpenProject(null);
    };

    const projectCards = projects.map((project) => {
        return (
            <ProjectCard
                key = {project.title}
                title = {project.title}
                images = {project.images}
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
        <div className = "projects" id = "projects">
            <p className = "projects-intro">
                // Some of my Work
            </p>

            <div className = "projects-grid">
                {projectCards}
            </div>

        </div>

        {lightbox}

        </>
    )
}

export default Projects;
