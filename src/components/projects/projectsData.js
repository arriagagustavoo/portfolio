import { clientPortalImages, clientPortalCover, queueSmartImages, queueSmartCover, mazeGameImages, mazeGameCover, rideShareImages, rideShareCover, unityGameImages, unityGameCover, mriScannerImages, mriScannerCover, documentSystemImages, documentSystemCover } from "./projectImages";

// titles and skills stay english: they are product names and skillIcons lookup keys
const projects = [
    {
        id: "clientportal",
        group: "work",
        // a slug means the card links to a case study page instead of opening the gallery
        slug: "client-portal",
        // gallery positions of the proposal and the contract, which show the same figures
        linked: [2, 3],
        // width over height. these are dark screenshots with a small sheet in the middle, so they get cropped in
        linkedCrop: 1.5,
        title: "Client Portal",
        repoUrl: "",
        // the homepage card shows these; the case study page shows all of skills
        cardSkills: ["Next.js", "TypeScript", "React", "Supabase"],
        skills: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "JWT", "Zod", "Puppeteer", "Playwright"],
        images: clientPortalImages,
        cover: clientPortalCover,
    },
    {
        id: "queuesmart",
        group: "work",
        slug: "queuesmart",
        // gallery positions of the admin dashboard and the queue management table
        linked: [8, 9],
        title: "QueueSmart",
        repoUrl: "https://github.com/Fifer-code/Software-Design",
        cardSkills: ["React", "Express", "Node.js", "MongoDB"],
        skills: ["React", "Vite", "Express", "Node.js", "MongoDB", "JWT", "JavaScript", "GitHub", "npm"],
        images: queueSmartImages,
        cover: queueSmartCover,
    },
    {
        id: "documents",
        group: "work",
        slug: "bracketed",
        // first page of the proposal, the contract and the invoice
        linked: [2, 4, 6],
        // tall portrait pages, cropped to a square from the top
        linkedCrop: 1,
        title: "Bracketed",
        repoUrl: "",
        cardSkills: ["Figma", "JavaScript", "HTML", "CSS"],
        skills: ["Figma", "JavaScript", "HTML", "CSS", "Git"],
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

export function findProjectBySlug(slug){
    return projects.find((project) => project.slug === slug);
}
