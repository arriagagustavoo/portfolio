import { clientPortalImages, clientPortalCover, queueSmartImages, queueSmartCover, mazeGameImages, mazeGameCover, rideShareImages, rideShareCover, unityGameImages, unityGameCover, mriScannerImages, mriScannerCover, documentSystemImages, documentSystemCover } from "./projectImages";

// titles and skills stay english: they are product names and skillIcons lookup keys
const projects = [
    {
        id: "clientportal",
        group: "work",
        title: "Client Portal",
        repoUrl: "",
        skills: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "JWT", "Zod", "Puppeteer", "Playwright"],
        images: clientPortalImages,
        cover: clientPortalCover,
    },
    {
        id: "queuesmart",
        group: "work",
        title: "QueueSmart",
        repoUrl: "https://github.com/Fifer-code/Software-Design",
        skills: ["React", "Vite", "Express", "Node.js", "MongoDB", "npm"],
        images: queueSmartImages,
        cover: queueSmartCover,
    },
    {
        id: "documents",
        group: "work",
        title: "Freelance Document System",
        repoUrl: "",
        skills: ["Figma", "JavaScript", "HTML", "CSS"],
        images: documentSystemImages,
        cover: documentSystemCover,
    },
    {
        id: "rideshare",
        group: "dev",
        title: "RideShare",
        repoUrl: "https://github.com/arriagagustavoo/rideshare",
        skills: ["PostgreSQL", "Express", "JavaScript", "HTML", "CSS"],
        images: rideShareImages,
        cover: rideShareCover,
    },
    {
        id: "maze",
        group: "dev",
        title: "3D Interactive Maze Game",
        repoUrl: "https://github.com/arriagagustavoo/Interactive-Maze-Game",
        skills: ["Python", "OpenGL"],
        images: mazeGameImages,
        cover: mazeGameCover,
    },
    {
        id: "unity",
        group: "dev",
        title: "2D Unity Game",
        repoUrl: "",
        skills: ["Unity", "Clip Studio Paint"],
        images: unityGameImages,
        cover: unityGameCover,
    },
    {
        id: "mri",
        group: "dev",
        title: "MRI Scanner",
        repoUrl: "",
        skills: ["MATLAB"],
        images: mriScannerImages,
        cover: mriScannerCover,
    },
]

export const workProjects = projects.filter((project) => project.group === "work");
export const devProjects = projects.filter((project) => project.group === "dev");
