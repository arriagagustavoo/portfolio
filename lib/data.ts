// Projects, skills and contact links. Words live in lib/content; this is structure.
const cp = (f: string) => `/images/projects/clientportal/${f}.webp`
const qs = (f: string) => `/images/projects/queuesmart/${f}.webp`
const dc = (f: string) => `/images/projects/documents/${f}.jpg`
const fa = (f: string) => `/images/projects/fadeaway/${f}.webp`

/** phone: the same screen on a phone, drawn in an iphone frame beside the window. group: a tab in the full gallery */
export type Shot = { src: string; w: number; h: number; phone?: string; group?: 'admin' | 'client' }
export type Project = {
  slug: string
  key: 'clientportal' | 'queuesmart' | 'documents' | 'fadeaway'
  title: string
  kind: 'software' | 'design' | 'websites'
  url: string
  doc?: boolean
  cardSkills: string[]
  skills: string[]
  repo?: string
  /** a tier's example site (not client work): on Work and behind its tier, not in Featured work */
  example?: boolean
  /** the live site, once it's deployed */
  live?: string
  shots: Shot[]
}

const W = (src: string): Shot => ({ src, w: 2560, h: 1240 })
// Fadeaway, shot at 1440x900 (1.5x) and on a 393-wide phone (3x)
const FA = (f: string, phone?: boolean): Shot => ({ src: fa(f), w: 2160, h: 1350, ...(phone ? { phone: fa(f + '-phone') } : {}) })
const D = (src: string): Shot => ({ src, w: 1275, h: 1650 })
// the portal, shot on portal-test with made-up businesses at Gus's 27" (2048x1024 at 1.25x); the client side also on a phone
const PA = (f: string): Shot => ({ src: cp('Admin-' + f), w: 2560, h: 1280, group: 'admin' })
const PC = (f: string): Shot => ({ src: cp('Client-' + f), w: 2560, h: 1280, phone: cp('Client-' + f + '-phone'), group: 'client' })

export const projects: Project[] = [
  {
    slug: 'client-portal', key: 'clientportal', title: 'Client Portal', kind: 'software', url: 'arriagagustavoo.com/work/client-portal',
    cardSkills: ['Next.js', 'TypeScript', 'React', 'Supabase'],
    skills: ['Next.js', 'TypeScript', 'React', 'Supabase', 'PostgreSQL', 'JWT', 'Zod', 'Puppeteer', 'Playwright'],
    // indexes matter: lead (0), the case study's LINKED (35, 36) and its gallery order
    shots: [
      ...['Dashboard', 'Search', 'Sidebar', 'Inbox', 'Activity', 'Calendar', 'Leads', 'Clients', 'Projects', 'NewProject', 'ContentList', 'Project', 'Details', 'Documents',
        'Editor-Proposal', 'Editor-Contract', 'Editor-Invoice', 'Content', 'Progress', 'Messages', 'Files', 'Finances', 'Launch', 'ProjectActivity', 'Sites', 'Books', 'Calculator', 'Audit', 'Settings'].map(PA),
      ...['Dashboard', 'Progress', 'Content', 'Messages', 'Files', 'Documents', 'Proposal', 'Contract', 'Invoice', 'Launch', 'Maintenance', 'Activity'].map(PC),
    ],
  },
  {
    slug: 'bracketed', key: 'documents', title: 'Bracketed', kind: 'design', url: 'arriagagustavoo.com/work/bracketed', doc: true,
    cardSkills: ['Figma', 'JavaScript', 'HTML', 'CSS'],
    skills: ['Figma', 'JavaScript', 'HTML', 'CSS', 'Git'],
    shots: ['Portal_page-0001', 'Portal_page-0002', 'Proposal_page-0001', 'Proposal_page-0002', 'Contract_page-0001', 'Contract_page-0002', 'Invoice_page-0001', 'Invoice_page-0002'].map(f => D(dc(f))),
  },
  {
    slug: 'queuesmart', key: 'queuesmart', title: 'QueueSmart', kind: 'software', url: 'arriagagustavoo.com/work/queuesmart', repo: 'https://github.com/Fifer-code/Software-Design',
    cardSkills: ['React', 'Express', 'Node.js', 'MongoDB'],
    skills: ['React', 'Vite', 'Express', 'Node.js', 'MongoDB', 'JWT', 'JavaScript', 'GitHub', 'npm'],
    shots: ['Login', 'Register', 'Unauthorized', 'User-Dashboard', 'User-Join', 'User-Status', 'User-History', 'User-Feedback', 'Admin-Dashboard', 'Admin-QueueManagement', 'Admin-QueueManagementEdit',
      'Admin-ServiceManagement', 'Admin-ServiceManagementCreate', 'Admin-ServiceManagementEdit', 'Admin-Reports', 'Admin-ReportsCSV', 'Admin-ReportsPDF', 'Admin-Feedback'].map(f => W(qs(f))),
  },
  {
    // live: the deployed demo (also served at fadeaway-starter.vercel.app)
    slug: 'fadeaway', key: 'fadeaway', title: 'Fadeaway', kind: 'websites', url: 'starter.arriagagustavoo.com', example: true, live: 'https://starter.arriagagustavoo.com',
    cardSkills: ['Figma', 'Next.js', 'TypeScript', 'React'],
    skills: ['Figma', 'Next.js', 'TypeScript', 'React', 'CSS', 'Playwright'],
    shots: [FA('hero', true), FA('tidy', true), FA('panel'), FA('hours', true), FA('barbers'), FA('picked', true), FA('reviews', true), FA('review-open'), FA('about'), FA('faq'), FA('contact', true)],
  },
]

/** the screenshot each project leads with (cards, the featured stack) */
export const lead: Record<Project['key'], number> = { clientportal: 0, documents: 2, queuesmart: 8, fadeaway: 0 }

// caps: which caption from legacy.json goes with each shot (-1 = the cover's caption, other numbers index the project's alts)
export const devProjects = [
  { key: 'rideshare', caps: [-1, 0, 1], cover: '/images/projects/rideshare/RideShare-cover.webp', shots: ['/images/projects/rideshare/RideShare-cover.webp', '/images/projects/rideshare/Page-empty.webp', '/images/projects/rideshare/Page-filled.webp'], skills: ['PostgreSQL', 'Express', 'JavaScript', 'HTML', 'CSS'], repo: 'https://github.com/arriagagustavoo/rideshare' },
  { key: 'maze', caps: [-1, 0, 1, 2, 4, 3], cover: '/images/projects/mazegame/Labyrinth-cover.webp', shots: ['/images/projects/mazegame/Labyrinth-cover.webp', '/images/projects/mazegame/maze-start.png', '/images/projects/mazegame/blue-power.gif', '/images/projects/mazegame/green-power.gif', '/images/projects/mazegame/pink-trap.gif', '/images/projects/mazegame/red-trap.gif'], skills: ['Python', 'OpenGL'], repo: 'https://github.com/arriagagustavoo/Interactive-Maze-Game' },
  { key: 'unity', caps: [-1, 1, 0, 2, 4, 3, 5, 7, 6], cover: '/images/projects/unitygame/Faceoff-cover.webp', shots: ['/images/projects/unitygame/Faceoff-cover.webp', '/images/projects/unitygame/ingame.gif', '/images/projects/unitygame/Scene.png', '/images/projects/unitygame/Arriaga_Gustavo_MC_I.gif', '/images/projects/unitygame/Arriaga_Gustavo_MC_A.gif', '/images/projects/unitygame/Arriaga_Gustavo_MC_M.gif', '/images/projects/unitygame/Arriaga_Gustavo_EC_I.gif', '/images/projects/unitygame/Arriaga_Gustavo_EC_A.gif', '/images/projects/unitygame/Arriaga_Gustavo_EC_M.gif'], skills: ['Unity', 'Clip Studio Paint'], repo: '' },
  { key: 'mri', caps: [-1, 0, 1, 2, 3], cover: '/images/projects/mriScanner/MRI-cover.webp', shots: ['/images/projects/mriScanner/MRI-cover.webp', '/images/projects/mriScanner/home-rectangle.png', '/images/projects/mriScanner/rectangle-cartesian.png', '/images/projects/mriScanner/home-circle.png', '/images/projects/mriScanner/circle-radial.png'], skills: ['MATLAB'], repo: '' },
]

export const skillGroups = [
  { id: 'languages', skills: ['Python', 'C++', 'C#', 'Swift', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'MATLAB', 'R'] },
  { id: 'web', skills: ['React', 'Next.js', 'Vite', 'Express', 'Node.js', 'MongoDB', 'PostgreSQL', 'Supabase', 'JWT', 'Zod'] },
  { id: 'creative', skills: ['Autodesk Fusion', 'Figma', 'Unity', 'OpenGL', 'Clip Studio Paint'] },
  { id: 'tools', skills: ['Git', 'GitHub', 'Jenkins', 'Ubuntu', 'VS Code', 'Claude', 'npm', 'OpenCV', 'NumPy', 'Playwright', 'Puppeteer', 'Vercel'] },
] as const

export const contact = {
  phone: '832-453-4158', tel: '+18324534158', email: 'gus@arriagagustavoo.com',
  instagram: { url: 'https://www.instagram.com/dev.arriagagustavoo/', handle: '@dev.arriagagustavoo' },
  facebook: { url: 'https://www.facebook.com/arriagagustavoo/', handle: 'arriagagustavoo' },
  linkedin: { url: 'https://www.linkedin.com/in/arriagagustavoo/', handle: 'in/arriagagustavoo' },
  github: { url: 'https://github.com/arriagagustavoo', handle: 'arriagagustavoo' },
}

// Web3Forms keys are public by design (the form posts from the browser); same key as the old site
export const WEB3FORMS_KEY = '0fc04ae8-b271-4e9f-a6a4-b89234a02aea'
