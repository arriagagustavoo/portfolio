import ProjectCard from "./projectCards/ProjectCard";
import "./Projects.css"

//project card info data
const projects = [
    {
        title: "3D Interactive Maze Game",
        repoUrl: "https://github.com/arriagagustavoo/Interactive-Maze-Game",
        description: "Fully 3D interactive game built using python openGL. Custom algorithm used for randomly generated mazes.",
        skills: ["Python", "OpenGL"],
    },
    {
        title: "QueueSmart",
        repoUrl: "https://github.com/Fifer-code/Software-Design",
        description: "Fullstack website. Fully fleshed out functionality for both users and admins. Authentication, real-time interations and database storage.",
        skills: ["React", "Vite", "Express", "Node.js", "MongoDB", "npm"],
    },
    {
        title: "2D Unity Game",
        repoUrl: "",
        description: "Original characters and custom assets. Animations drawn frame-by-frame and put into Unity Game engine and uses keyboard controls.",
        skills: ["Unity", "Clip Studio Paint"],
    },
    {
        title: "MRI Scanner",
        repoUrl: "",
        description: "Matlab GUI to simulate a digital MRI through unique parameters and values",
        skills: ["MATLAB"],
    },
]


function Projects(){

    const projectCards = projects.map((project) => {
        return (
            <ProjectCard
                key = {project.title}
                title = {project.title}
                repoUrl = {project.repoUrl}
                description = {project.description}
                skills = {project.skills}
            />
        );
    });

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
        
        </>
    )
}

export default Projects;