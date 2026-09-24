export default {

    app: {
        skipLink: "Skip to content",
    },

    header: {
        // id is the section anchor and never translates. `to` makes it a route instead
        nav: [
            { id: "about", label: "About" },
            { id: "projects", label: "Work" },
            { id: "services", label: "Services" },
            { id: "process", label: "Process" },
            { id: "dev", label: "Dev", to: "/dev" },
            { id: "contact", label: "Contact" },
        ],
        logoAlt: "Gustavo Arriaga",
        menuLabel: "Toggle menu",
        themeLabel: "Toggle mode",
        // written in the language it switches to, which is how language pickers are meant to read
        languageLabel: "Ver en español",
        languageCode: "ES",
    },

    meta: {
        home: {
            title: "Gustavo Arriaga — Web Developer & Designer in Houston",
            description: "Houston freelance web developer and designer. Websites, custom software, branding and local SEO, and 3D modeling and printing for small businesses.",
        },
        dev: {
            title: "Dev — Gustavo Arriaga",
            description: "The engineering side: the full stack I build with, plus the coursework and personal projects behind the client work.",
        },
        privacy: {
            title: "Privacy Policy — Gustavo Arriaga",
            description: "What this site collects, who handles it, and how long it is kept.",
        },
        notFound: {
            title: "Page not found — Gustavo Arriaga",
            description: "This page doesn't exist.",
        },
    },

    hero: {
        eyebrow: "// Hey, I'm",
        status: "Taking New Projects",
        // the h1's real text, since the visible copy scrambles and is aria-hidden
        headingSuffix: " — Websites, Software, Design & 3D Printing in Houston",
        services: [
            "Full-stack Custom Software",
            "Graphic Design & SEO ",
            "3D Models & Prints",
        ],
        badges: ["Freelancer", "Designer", "Engineer", "Builder"],
        // exactly three words: each one owns a class the colour cycle keys off
        motto: ["Design.", "Build.", "Ship."],
        primaryCta: "Check out my work",
        secondaryCta: "Contact Me",
    },

    about: {
        heading: "About Gustavo Arriaga",
        leadEyebrow: "// Get to know me",
        whyEyebrow: "// Why work with me",
        interestsEyebrow: "// Some interests of mine",
        photoAlt: "Gustavo Arriaga",
        // split so each line can stagger in on its own
        bioLines: [
            "I build custom websites & software for businesses based in the Houston area.",
            "I work with clients anywhere. I take pride in being able to provide my work in English and Spanish, remotely.",
            "Throughout university I enjoyed hands-on projects that mirrored how things are done in the real world, but I never liked that I was only chasing a grade and the work never got used.",
            "So I started building things people would actually use, and built my own client portal, contracts and invoicing to run it properly.",
            "What I care about is that it works, and that you're not paying someone else to fix it later.",
            "Whether it's digital or physical, tell me what your business needs and I'll tell you how I'd build it.",
        ],
        freelancing: "Freelancing since 2026",
        location: "Houston, Texas",
        school: "University of Houston",
        degree: "B.S. Computer Science, Software Design",
        schoolLogoAlt: "University of Houston logo",
        quote: {
            text: "As long as I'm alive, I have infinite chances.",
            source: "— Monkey D. Luffy, One Piece",
        },
        reasons: [
            {
                title: "One person, start to finish",
                body: "The work stays between you and me. No need to worry about other parties.",
            },
            {
                title: "I use my own software",
                body: "Built my own secure client portal and custom documents to use with my business.",
            },
            {
                title: "Fully custom work",
                body: "Tailored work for your business. Built from scratch to meet your needs.",
            },
            {
                title: "Bilingual",
                body: "I understand the audience and can tailor to both English and Spanish users.",
            },
        ],
        interests: ["Coding", "Designing", "Fitness", "Modeling", "Hardware", "Gaming", "Anime"],
    },

    projects: {
        work: {
            heading: "Web and software development projects",
            eyebrow: "// Some of my Work",
        },
        dev: {
            heading: "Personal and coursework software projects",
            eyebrow: "// Outside of client work",
        },
        viewGallery: "View Gallery",
        readCaseStudy: "Read Case Study",
        featured: "Featured",
        moreWork: "Check out more of my work",
        caseStudyButton: "Read case study",
        moreSkills: (count) => "+" + count + " more",
        shots: (count) => count + " shots",
        galleryButtonLabel: (count, title) => "View " + count + " screenshots of " + title,
        caseStudyLabel: (title) => "Read the " + title + " case study",
        githubLabel: (title) => "GitHub repository for " + title,
        // keyed by the project id in Projects.jsx, titles stay English as product names
        items: {
            clientportal: {
                pitch: "Proposals, contracts, invoices and progress in one place, with every document drawn from a single project brief.",
                points: [
                    "Clients approve proposals and sign contracts with a typed name",
                    "Progress updates with photos, files and messages in one place",
                    "An admin side for projects, payments and the books",
                    "The client side reads in English or Spanish",
                ],
                description: "A portal my freelance clients sign into. They approve proposals, sign contracts, pay invoices, watch the build and send files in one place, and the admin side behind it runs the projects, documents, payments and books.",
                coverAlt: "Client Portal title card reading 'Makes running a business easy.'",
                alts: [
                    "Client sign in screen asking for the email the project was shared with",
                    "Client dashboard with the project stage, amounts paid and due, documents, progress and messages",
                    "Proposal as the client reads it, with the approve and request changes controls",
                    "Signed service agreement showing both parties and the approval record",
                    "Invoice as the client sees it, with the amount due and how to pay",
                    "Progress feed of build screenshots, each with a reaction and a comment box",
                    "Message thread between the client and me",
                    "Files the client has sent, against the checklist items they answer",
                    "Launch checklist showing what is done and what is still waiting",
                    "Maintenance page with the monthly plan and its invoice history",
                    "Admin dashboard of every active project, recent activity and what needs a reply",
                    "Admin overview of a single project",
                    "Every document on a project with its status and version",
                    "Proposal editor beside a live preview of the document it renders",
                    "Contract editor beside its live preview",
                    "Posting a progress update with several photos attached",
                    "Admin side of the message thread",
                    "Files the client uploaded, from the admin side",
                    "Payments, invoices, expenses and recurring costs on one project",
                    "Launch checklist and handover preparation on the admin side",
                    "Books across every project, with money in and money out",
                    "Audit log of every action taken on every project",
                    "The form that creates a new project and its client access",
                ],
            },
            queuesmart: {
                pitch: "A queue management web app built by a team of four. I built the admin side: the dashboard, queues and services.",
                description: "Fullstack website. Fully fleshed out functionality for both users and admins. Authentication, real-time interations and database storage.",
                coverAlt: "QueueSmart title card reading 'smarter way to wait in line'",
                alts: [
                    "Login screen with email and password fields",
                    "Account registration form",
                    "Unauthorized access screen for a blocked route",
                    "User dashboard showing current queue, notifications, and active services",
                    "Joining a queue from the list of available services",
                    "Live queue status with position and estimated wait",
                    "User history of past queue visits",
                    "User feedback form with a star rating",
                    "Admin dashboard overview of queue activity",
                    "Queue management table with people waiting, estimated wait, and priority",
                    "Editing a queue entry from the management table",
                    "Service management list of all bookable services",
                    "Creating a new service",
                    "Editing an existing service",
                    "Reports view of queue activity",
                    "Report exported to CSV and opened in a spreadsheet",
                    "Report exported as a PDF document",
                    "Admin feedback view with all submissions and average rating",
                ],
            },
            documents: {
                pitch: "The proposal, contract and invoice I send clients, as fill-in-the-blank pages that print to clean PDFs.",
                description: "Proposal, contract, and invoice templates that share one dataset. Client details and amounts are typed once and carry across all three, with autosave and print-ready PDF output.",
                coverAlt: "Bracketed title card reading 'Fill the brackets. Skip the paperwork.'",
                alts: [
                    "Document portal home menu, page 1",
                    "Document portal home menu, page 2",
                    "Project proposal, page 1",
                    "Project proposal, page 2",
                    "Client contract, page 1",
                    "Client contract, page 2",
                    "Invoice, page 1",
                    "Invoice, page 2",
                ],
            },
            rideshare: {
                description: "Fullstack GUI to simulate Relational SQL Database use through transactions and bookings",
                coverAlt: "RideShare title card reading 'Reliable booking. Safe travels.'",
                alts: [
                    "Booking page before any rides have been entered",
                    "Booking page populated with ride and transaction data",
                ],
            },
            maze: {
                description: "Fully 3D interactive game built using python openGL. Custom algorithm used for randomly generated mazes.",
                coverAlt: "Labyrinth title card reading 'Lost in space. Try and escape the labyrinth.'",
                alts: [
                    "Starting view of a randomly generated 3D maze",
                    "Blue speed boost power-up increasing player movement",
                    "Green high jump power-up giving a birds-eye view of the maze",
                    "Red slow trap reducing player movement",
                    "Pink spin trap rotating the camera to disorient the player",
                ],
            },
            unity: {
                description: "Original characters and custom assets. Animations drawn frame-by-frame and put into Unity Game engine and uses keyboard controls.",
                coverAlt: "Faceoff title card reading 'frame-by-frame', with the two characters facing off",
                alts: [
                    "Level scene laid out in the Unity editor",
                    "In-game footage of the player moving through the level",
                    "Main character idle animation, drawn frame by frame",
                    "Main character walk cycle",
                    "Main character attack animation",
                    "Enemy character idle animation",
                    "Enemy character movement animation",
                    "Enemy character attack animation",
                ],
            },
            mri: {
                description: "Matlab GUI to simulate a digital MRI through unique parameters and values",
                coverAlt: "MRI Scanner title card reading 'Matlab GUI. Custom data. Accurate results.'",
                alts: [
                    "Scanner GUI with the rectangle phantom and Cartesian acquisition set up",
                    "Rectangle phantom, Cartesian reconstruction, and difference map with signal profiles",
                    "Scanner GUI with the circle phantom and radial acquisition set up",
                    "Circle phantom, radial reconstruction, and difference map with signal profiles",
                ],
            },
        },
    },

    lightbox: {
        shots: (count) => count + " shots",
        galleryLabel: (title) => title + " screenshots",
        expandLabel: (alt) => "Expand: " + alt,
        closeGallery: "Close gallery",
        closeExpanded: "Close expanded image",
        previous: "Previous screenshot",
        next: "Next screenshot",
        previousLabel: "‹ Prev",
        nextLabel: "Next ›",
    },

    caseStudy: {
        eyebrow: "// Case study",
        back: "Back to work",
        next: "Next case study",
        stackHeading: "Built with",
        galleryCta: (count) => "See all " + count + " screenshots",
        // the shots are seeded with invented businesses, and saying so keeps the page honest
        galleryNote: "Screenshots use fictional demo businesses, not real client data.",
        ctaText: "Interested in something like this?",
        ctaLabel: "Start a project",
        items: {
            documents: {
                meta: {
                    title: "Bracketed — Case study — Gustavo Arriaga",
                    description: "Bracketed is the proposal, contract and invoice I send clients: fill-in-the-blank templates in plain HTML that print to clean PDFs.",
                },
                linked: {
                    heading: "Fill the brackets",
                    body: "The proposal, contract and invoice as they start out. Every [ bracket ] is a field you click and type over. The ones that mean the same thing on all three, like the client's name and the price, are tagged so they fill in from a saved file.",
                    labels: ["Proposal", "Contract", "Invoice"],
                },
                summary: [
                    "Bracketed is the proposal, contract and invoice I send to clients. Each one is a fill-in-the-blank page: click a [ bracket ] and type over it, add or remove line items, then print to a letter size PDF. I designed it in Figma and built it to match.",
                    "It's also where the idea behind my client portal started. The three documents share fields, so the client's details and the price get typed once, saved to a file and loaded into the next document. The portal later made that automatic. I built this on my own, it's for my own use, and it isn't hosted anywhere.",
                ],
                sections: [
                    {
                        heading: "Why I built it",
                        body: "Every client needs the same three documents. I wanted them to look like my work, take minutes to fill in, and come out as a clean PDF every time.",
                    },
                    {
                        heading: "How it's used",
                        body: "There's nothing to install. It opens in a browser.",
                        points: [
                            "Open a document and click any [ bracket ] to type over it",
                            "Add or remove line items with the on-screen buttons",
                            "Save the client's details, then load them into the next document",
                            "Print to PDF and send it to the client",
                        ],
                    },
                    {
                        heading: "What's inside",
                        body: "Three documents and a home menu that links to them, plus a few things that make it practical.",
                        points: [
                            "Autosave, so a refresh doesn't wipe the form",
                            "Fixed wording, like contract terms and bank details, editable in place and saved back to the file",
                            "Letter pages or one long page when printing",
                        ],
                    },
                    {
                        heading: "What it means for you",
                        body: "Your paperwork looks the same every time and arrives as a clean PDF. The numbers on your proposal and your invoice match, because they came from the same place.",
                    },
                    {
                        heading: "How it's built",
                        body: "Plain HTML, CSS and JavaScript. No framework, no build step, no install. One shared script of about 800 lines handles the editing, saving and printing. Sizes are in points so the layout matches the Figma design one to one. The print layout is built on a table so the header and footer repeat on every page and never cover text.",
                    },
                ],
            },
            queuesmart: {
                meta: {
                    title: "QueueSmart — Case study — Gustavo Arriaga",
                    description: "A queue management web app built by a team of four for a Software Design course. I built the admin side: the dashboard, queue management and service management.",
                },
                linked: {
                    heading: "The admin side",
                    body: "The dashboard and the queue management table, which are the parts I built. From here an admin can open, pause or close a queue, serve the next person, or manage someone who's already waiting.",
                    labels: ["Dashboard", "Queue management"],
                },
                summary: [
                    "A queue management web app from my Software Design course at the University of Houston, built by a team of four. People join a queue for a service, see their position and estimated wait, and get notified. Admins run the queues behind it.",
                    "I built the admin side: the dashboard, queue management and service management, the API behind them, the demo data, and most of the tests for the queue and service routes. My teammates built the accounts, the user side, the wait time estimate and most of the styling. It's coursework, not client work, and it isn't deployed.",
                ],
                sections: [
                    {
                        heading: "The assignment",
                        body: "We were given a queue app to build and told to make it fully functional with real technologies, not a mockup. So it has real accounts, a real database, a real API and a test suite behind it.",
                    },
                    {
                        heading: "What users do",
                        body: "Anyone can register and sign in, then use the queue like a customer would.",
                        points: [
                            "Join a queue for any available service",
                            "See their position and estimated wait, refreshed every 5 seconds",
                            "Get notifications from the admin",
                            "Leave the queue if they need to",
                            "Rate their visit afterward, and look back at their history",
                        ],
                    },
                    {
                        heading: "What admins do",
                        body: "This is the side I worked on.",
                        points: [
                            "Watch every queue from one dashboard",
                            "Serve the next person, move someone up or down, or remove them",
                            "Open, pause or close a queue",
                            "Create, edit and delete the services people can queue for",
                        ],
                    },
                    {
                        heading: "Why it's on this page",
                        body: "It isn't client work and I won't pretend it is. It does show what most small business tools need: accounts, an admin who can change live data safely, and tests so a change doesn't break what already works.",
                    },
                    {
                        heading: "How it's built",
                        body: "React and Vite on the front end. Node and Express with MongoDB behind it. Accounts use JWT and bcrypt, and the API checks a user's role before every route, so admin actions are admin only. Jest and Supertest run 63 tests against an in-memory database.",
                    },
                ],
            },
            clientportal: {
                meta: {
                    title: "Client Portal — Case study — Gustavo Arriaga",
                    description: "A client portal built to run my own freelance practice: proposals, contracts, invoices, progress and files in one place, on Next.js and Supabase.",
                },
                linked: {
                    heading: "One brief, every document",
                    body: "A demo project, shown on two documents. The client, the $2,800 build price, the $1,200 deposit and the $150 monthly plan were entered once, on the project. The proposal and the contract both pulled them in.",
                    labels: ["Proposal", "Contract"],
                },
                summary: [
                    "The software I built to run my freelance business. Clients sign in to approve proposals and contracts, follow their project and see what's been paid. The admin side handles the projects, documents, payments and books.",
                    "The important part is that everything is connected. Each project has one brief, and the proposal, contract, invoice and handover document all pull from it. Type a price, a date or the client's details once and it fills in everywhere. Change it on one document and every unsent draft updates to match. Once a document is sent it's saved as a version, so nothing the client has already seen changes behind their back.",
                ],
                sections: [
                    {
                        heading: "Why I built it",
                        body: "Running a business means paperwork. Proposals, contracts, invoices, files, updates. Handling all of that over email gets messy fast, and the client is left guessing where their project is. Typing the same price into three different documents is also how mistakes happen. I wanted one place for all of it, so I built one.",
                    },
                    {
                        heading: "What a client sees",
                        body: "They sign in with an email code, so there's no password to remember, and everything for their project is on one dashboard.",
                        points: [
                            "A step by step project track, and what's paid against what's due",
                            "Proposals and contracts to approve with a typed name, or send back with changes",
                            "Invoices, and a signed PDF of everything they approve",
                            "Progress updates with photos, and a place to upload files",
                            "Messages kept with the project",
                            "The whole portal in English or Spanish, their choice",
                        ],
                    },
                    {
                        heading: "What it means for you",
                        body: "You always know where your project is, and you're not digging through email for a contract or an invoice. Your details are entered once, so the numbers on your proposal, contract and invoice always match. It's also the clearest proof I can show of what I can build.",
                    },
                    {
                        heading: "How it's built",
                        body: "Next.js and TypeScript on Supabase and Postgres. JWT sessions, Zod validation on every input, signed PDFs generated with Puppeteer, and 43 end to end Playwright tests over both sides. About forty routes between the client side and the admin side.",
                    },
                ],
            },
        },
    },

    dev: {
        eyebrow: "// The dev side",
        title: "Full-stack software developer",
        bio: [
            "I'm a computer science senior at the University of Houston, focused on full-stack web development. I build web applications with React, Next.js and Node, backed by PostgreSQL, MongoDB or Supabase. Outside the web I have written Python, C++, C# and Swift.",
            "Below are my coursework and personal projects, the tools I use, and the classes behind them, from algorithms and operating systems to graphics and medical imaging.",
        ],
        crumb: "Back to homepage",
        outro: "Have a project in mind?",
        back: "See my services",
    },

    coursework: {
        heading: "Education in computer science and mathematics",
        eyebrow: "// Education",
        groups: {
            theory: "Theory",
            math: "Math",
            systems: "Systems and software",
            graphics: "Graphics and imaging",
        },
        // class names, keyed like the groups above. these are translated, unlike the skill names
        courses: {
            theory: [
                "Algorithms and Data Structures",
                "Automata and Computability",
                "Programming Languages and Paradigms",
            ],
            math: [
                "Discrete Mathematics",
                "Linear Algebra",
                "Statistics",
            ],
            systems: [
                "Operating Systems",
                "Database Systems",
                "Computer Organization and Architecture",
                "Software Engineering",
                "Software Design",
                "Ubiquitous Computing (iOS App Development)",
            ],
            graphics: [
                "Interactive Computer Graphics",
                "Digital Image Processing",
                "Medical Imaging",
                "Gaming Art and Animation",
            ],
        },
    },

    skills: {
        heading: "Skills and technologies",
        eyebrow: "// Skills",
        // the skill names themselves are exact-match keys into skillIcons and never translate
        categories: {
            languages: "Languages",
            web: "Web Dev",
            creative: "Creative Work",
            tools: "Tools & Libraries",
        },
    },

    services: {
        heading: "Freelance web development, design, and 3D printing services",
        eyebrow: "// Services",
        packagesEyebrow: "// Website packages",
        startingFrom: "Starting from",
        // on the packages eyebrow row, for the visitor the three tiers did not settle
        packagesCta: "Got specific needs? Let's talk",
        packagesNote: "These prices are starting points. Every project gets a written quote first, so you know the cost before we start.",
        packagesTerms: "Every package includes monthly maintenance from the day you launch: uptime, bug fixes and small tweaks. Your domain, hosting and accounts stay in your name throughout.",
        previousPackage: "Previous package",
        nextPackage: "Next package",
        goodFor: "Good for:",
        optional: "Optional",
        recommended: "Recommended",
        // the keys the contact form's project type select submits, so they stay english
        cards: [
            {
                title: "Website or tool built for your business",
                description: "A site that shows your business off, or software that takes over the manual work: bookings, orders, client records, paperwork.",
                link: "See an example",
            },
            {
                title: "Get noticed, and get found",
                description: "A logo and brand that look like you, plus your Google listing and reviews set up, so people nearby can find you.",
                link: "Ask about this",
            },
            {
                title: "Made to order in 3D",
                description: "Modeled in CAD and printed to order: prototypes, parts, and finished custom pieces.",
                link: "Ask about this",
            },
        ],
        closing: {
            text: "Need something that isn't listed?",
            link: "Tell me what you need",
        },
        // one label per row of the tier comparison. which tier has which is in Services.jsx
        packageRows: [
            "Built around your branding",
            "Works on phones and computers",
            "Contact form that goes straight to your inbox",
            "Set up so Google can read your business details",
            "Private pages only you can sign into, for bookings, orders and messages",
            "Your own database, so the site stores what comes in",
            "Accounts and logins for your customers",
            "Connections to your other tools and services",
            "A one-of-a-kind design, with branding files you own",
            "Google Business Profile setup",
            "Priority fixes and replies",
        ],
        packages: [
            {
                id: "basic",
                name: "Basic",
                price: "From $750",
                monthly: "$45/mo",
                goodFor: "A business that needs to be found online.",
                summary: "A site that shows people who you are, what you do, and how to reach you.",
                cta: "Start with Basic",
            },
            {
                id: "standard",
                name: "Standard",
                price: "From $2200",
                monthly: "$65/mo",
                goodFor: "A business that takes bookings, orders or messages through its site.",
                inherits: "Everything in Basic",
                summary: "The site starts doing work instead of just sitting there.",
                cta: "Start with Standard",
            },
            {
                id: "premium",
                name: "Premium",
                price: "From $3800",
                monthly: "$95/mo",
                goodFor: "A business that wants a one-of-a-kind site connected to its other tools.",
                inherits: "Everything in Standard",
                summary: "Designed from scratch, with your branding and Google listing handled.",
                cta: "Start with Premium",
            },
        ],
        // one price each, and a status line, because the single two-price card read as a word dump
        addons: [
            {
                id: "seo-setup",
                name: "SEO setup",
                price: "From $250",
                status: "Already included in Premium",
                tagline: "A one-time job to get onto Google Maps",
                points: [
                    "I claim and fill in your Google Business Profile",
                    "Your name, address and phone match everywhere you're listed",
                    "A one-click way for customers to leave a review",
                ],
                cta: "Ask about SEO setup",
            },
            {
                id: "seo-care",
                name: "SEO care",
                price: "$75/mo",
                status: "Not in any package. Add it to any of them.",
                tagline: "Monthly care for your Google listing",
                points: [
                    "Your profile kept up to date",
                    "Help replying to reviews",
                    "A monthly report of the calls, clicks and directions it brought in",
                ],
                caveat: "No article writing, no link buying, and nobody can honestly promise a Google ranking.",
                cta: "Ask about SEO care",
            },
        ],
        // one card, sold as a custom build: a single starting price and a monthly, like the tiers
        portal: {
            eyebrow: "// Client portal",
            name: "Custom portal",
            price: "From $3500",
            monthly: "$120/mo",
            tagline: "A private login where your own clients see everything about their project",
            status: "The same portal I run my own business on",
            points: [
                "Clients see proposals, contracts and invoices in one place, and approve or sign with a typed name",
                "Progress updates with photos, files and messages, so nothing lives in an email thread",
                "An admin side for you: projects, documents, payments and the books",
                "Your clients can read it in English or Spanish",
            ],
            caveat: "The monthly covers uptime, fixes and small tweaks. Card payments, integrations and new features are quoted separately.",
            cta: "Ask about a portal",
            seeLink: "See the portal",
            message: "I'd like a custom client portal for my business.",
        },
        startMessage: (name) => "I'd like to start with the " + name + " package.",
        addonMessage: (name) => "I'd like to add " + name + ".",
    },


    process: {
        heading: "How working together goes, guarantees, payment terms and common questions",
        leadEyebrow: "// How this works",
        guaranteeEyebrow: "// What you're guaranteed",
        faqEyebrow: "// Common questions",
        steps: [
            {
                title: "Contact",
                body: "Tell me what your business needs, in plain words. I reply within 24 hours and put a proposal together.",
            },
            {
                title: "Onboarding",
                body: "I set you up in my client portal. You review the scope, price and timeline in writing, sign the contract and pay a deposit. Then we kick things off.",
                link: "See the portal",
            },
            {
                title: "Build",
                body: "I build it and show you progress along the way. Most sites are ready about two weeks after I have your content.",
            },
            {
                title: "Handoff",
                body: "You pay the rest. Accounts go in your name, I walk you through it, and I stay reachable.",
            },
        ],
        guaranteeNote: {
            text: "Each of these is a clause in my contract.",
            link: "See the contract",
        },
        // every line here comes from the signed contract, not from marketing copy
        guarantees: [
            {
                title: "The domain and hosting are yours",
                body: "Registered in your name, on your payment method. I hold admin access to do the work, but the accounts belong to you.",
            },
            {
                title: "No surprise charges",
                body: "Anything outside what we agreed is quoted in writing first, and no work on it starts until you approve.",
            },
            {
                title: "You can leave with everything",
                body: "Either of us can end it with 30 days' notice. Your accounts, data exports and records get handed over.",
            },
            {
                title: "Your data stays yours",
                body: "The information your site collects and the documents it generates belong to you.",
            },
        ],
        faqs: [
            {
                question: "Do I need to know anything technical?",
                answer: "No. If you can describe what your business does and what you want people to be able to do on the site, that is enough. I handle the rest, and explain any part of it you want explained.",
            },
            {
                question: "What do you need from me to start?",
                answer: "What your business does, any branding you already have, and the text and images you want on the site. If you do not have those, producing them is part of what the higher packages cover.",
            },
            {
                question: "How long does it take?",
                answer: "Most sites launch about two weeks after I have your content, so the sooner it reaches me, the sooner you are live. Bigger builds take longer. Either way the proposal gives you a timeline in writing before any work begins, so you are never left guessing.",
            },
            {
                question: "What if I don't like how it looks?",
                answer: "You see it as it is built, not only at the end, so we can change direction while that is still easy. Changes within what we agreed are part of the job. Anything beyond that scope is quoted in writing first, so you decide whether it is worth it.",
            },
            {
                question: "Can I see how it is going?",
                answer: "Yes. You get a login to my client portal, where progress updates with screenshots, your proposal, contract, invoices and messages all live. You never have to dig through an email thread to find where things stand.",
            },
            {
                question: "How do payments work?",
                answer: "In two parts: a deposit when you sign and the remainder on delivery, by Zelle, bank transfer or check. Monthly maintenance is billed from the day you launch. If two parts doesn't work for your budget, tell me and we'll work something out.",
            },
            {
                question: "Do I have to pay monthly?",
                answer: "Yes. Maintenance is part of every package, not an extra, and it starts the day you go live: uptime, bug fixes and small tweaks. New features are quoted separately. A site nobody looks after breaks quietly: forms stop sending, details go stale, and security updates pile up until something gives. It is not a lock-in, though. Either of us can end it on 30 days' notice, and your domain, hosting and accounts are in your name the entire time, so you are never stuck with me to keep your own site.",
            },
            {
                question: "What if you disappear?",
                answer: "Nothing about your site depends on me being around. Your domain, hosting and accounts are in your name, and either of us can end things on 30 days' notice, at which point I hand over your accounts, data exports and records.",
            },
            {
                question: "What if I already have a domain?",
                answer: "Then we use it. If you do not have one yet, it gets registered in your name rather than mine.",
            },
        ],
        closing: {
            text: "Ready for step one?",
            link: "Tell me about your business",
        },
    },

    contact: {
        heading: "Contact Gustavo Arriaga",
        leadEyebrow: "// Let's work together",
        formEyebrow: "// Start a project",
        findEyebrow: "// Find me on",
        reachEyebrow: "// Contact me",
        copyHint: "Click to copy",
        // two lines, scrambled separately, and a literal ghost copy holds the box width
        headlineFirst: "LET'S",
        headlineSecond: "BUILD.",
        backToTop: "Back to top",
        copied: (value) => "Copied " + value,
        copyFailed: (value) => "Couldn't copy. It's " + value,
    },

    contactForm: {
        nameLabel: "Name",
        emailLabel: "Email",
        phoneLabel: "Phone",
        phoneOptional: "optional",
        typeLabel: "Project type",
        messageLabel: "Message",
        // id is what gets emailed, so the inbox stays english whatever the visitor reads
        projectTypes: [
            { id: "Website or software", label: "Website or software" },
            { id: "Design & SEO", label: "Design & SEO" },
            { id: "3D Modeling & Printing", label: "3D Modeling & Printing" },
            { id: "Something else", label: "Something else" },
        ],
        submit: "Send it",
        sending: "Sending...",
        promise: "I reply within 24 hours.",
        successTitle: "Message sent.",
        successLine: (firstName) => "Thanks " + firstName + ". I reply within 24 hours.",
        failSend: "That didn't go through. You can reach me at gus@arriagagustavoo.com instead.",
        failNetwork: "That didn't send. Check your connection, or email gus@arriagagustavoo.com.",
        errors: {
            nameEmpty: "Tell me what to call you.",
            emailEmpty: "I need an email to reply to.",
            emailInvalid: "That doesn't look like an email address.",
            messageEmpty: "Tell me a bit about the project.",
            messageShort: "A few more words helps me give you a real answer.",
        },
    },

    footer: {
        emailMe: "Email me",
        rights: "ALL RIGHTS RESERVED",
        privacy: "Privacy Policy",
    },

    stickyContact: {
        label: "Go to the contact form",
    },

    privacy: {
        title: "Privacy Policy",
        updated: "Last updated August 14, 2026",
        intro: "This site is a personal portfolio run by Gustavo Arriaga in Houston, Texas. It collects as little as possible, and nothing at all unless you choose to send it.",
        formHeading: "What the contact form collects",
        formIntro: "If you submit the contact form, it sends whatever you typed into these fields:",
        formFields: [
            "Your name",
            "Your email address",
            "Your phone number, only if you choose to fill it in",
            "The project type you selected",
            "Your message",
        ],
        formUse: "That goes to my inbox so I can reply. I use it to answer you and to discuss the work you asked about. I do not sell it, rent it, or add it to any mailing list, and there is no newsletter to be signed up for.",
        processorsHeading: "Who else handles it",
        processors: "The form is delivered by Web3Forms, which processes the submission and forwards it to me by email. The site itself is hosted by Vercel, and the domain runs through Cloudflare. Each of those handles the data in transit under its own privacy terms.",
        analyticsHeading: "Analytics and cookies",
        analytics: "This site uses Vercel Analytics and Vercel Speed Insights to count page views and measure loading performance. Both are cookieless and do not build a profile of you or follow you to other sites. There is no Google Analytics, no advertising pixel, and no tracking cookie, which is why you were never asked to accept one.",
        storage: "The only thing stored in your browser is your light or dark theme choice, kept in local storage so the site remembers it on your next visit. It never leaves your device. Clearing your browser data removes it.",
        retentionHeading: "How long it is kept",
        retention: "Form submissions stay in my email until they are no longer useful. If you want yours deleted, ask and I will remove it.",
        questionsHeading: "Questions",
        questions: "Email gus@arriagagustavoo.com and I will answer.",
        // only the translated policy carries a governing-language note
        governing: "",
        back: "Back to the site",
    },

    notFound: {
        title: "This page doesn't exist.",
        body: "The link is either wrong or something that used to be here has moved. Nothing on the site links to this address, so it was most likely mistyped.",
        back: "Back to the site",
    },

}
