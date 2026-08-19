export default {

    app: {
        skipLink: "Skip to content",
    },

    header: {
        // id is the section anchor and never translates
        nav: [
            { id: "about", label: "About" },
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
            { id: "services", label: "Services" },
            { id: "process", label: "Process" },
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
        interestsEyebrow: "// Some interests of mine",
        photoAlt: "Gustavo Arriaga",
        // split so each line can stagger in on its own
        bioLines: [
            "Computer Science senior designing, building and shipping complete products to clients.",
            "Capstone in Software Design & already applying that in the real world.",
            "I handle everything from the first plan to the finished product & getting it found on Google.",
            "Digital or physical, I'll turn an idea into something real.",
            "Tell me what your business needs and I'll tell you how I'd build it.",
        ],
        location: "Houston, Texas",
        school: "University of Houston",
        schoolLogoAlt: "University of Houston logo",
        interests: ["Coding", "Fitness", "Modeling", "Hardware", "Gaming", "Anime"],
    },

    projects: {
        heading: "Web and software development projects",
        eyebrow: "// Some of my Work",
        viewGallery: "View Gallery",
        shots: (count) => count + " shots",
        galleryButtonLabel: (count, title) => "View " + count + " screenshots of " + title,
        githubLabel: (title) => "GitHub repository for " + title,
        // keyed by the project id in Projects.jsx, titles stay English as product names
        items: {
            queuesmart: {
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
        packagesNote: "OPTIONS NOT LIMITED TO THESE PACKAGES. Rough estimates only. Determine what you'd need.",
        packagesTerms: "Every package includes monthly maintenance from the day you launch: uptime, bug fixes and small tweaks. Your domain, hosting and accounts stay in your name throughout.",
        previousPackage: "Previous package",
        nextPackage: "Next package",
        cards: [
            {
                tag: "Freelance",
                title: "Software Products",
                description: "Custom Websites, Applications, Tools.",
            },
            {
                tag: "Get found",
                title: "Design & SEO",
                description: "Branding, graphics, and local SEO.",
            },
            {
                tag: "Made to order",
                title: "3D Modeling & Printing",
                description: "CAD designs, Prototype/Finished products, Custom prints.",
            },
            {
                tag: "Let's talk",
                title: "Open to Anything",
                description: "Reach out for any service listed or not listed.",
            },
        ],
        // plain language on purpose: the client has to see what the extra money buys
        packages: [
            {
                id: "basic",
                name: "Basic",
                price: "From $600",
                monthly: "$30/mo",
                summary: "A site that shows people who you are, what you do, and how to reach you.",
                includes: [
                    "Built to match your branding",
                    "Static public page: no admin pages",
                    "Contact form that lands straight in your inbox",
                    "Your site written so Google can read business details from the code",
                    "Mobile & Desktop responsiveness",
                ],
                note: "No database. Getting your business onto Google Maps with reviews is the SEO setup below.",
            },
            {
                id: "standard",
                name: "Standard",
                price: "From $1500",
                monthly: "$45/mo",
                summary: "Everything in Basic, and the site starts doing work instead of just sitting there.",
                includes: [
                    "Everything in Basic",
                    "Public & Private pages",
                    "Admin pages to log into and manage. ex: bookings, orders, messages, sign-ups",
                    "A backend, meaning the site has logic functions and stores data in its own database",
                    "Authentification & Secure access to private info",
                ],
                note: "This is the step where the site stops being a brochure and becomes part of the business.",
            },
            {
                id: "premium",
                name: "Premium",
                price: "From $2300",
                monthly: "$70/mo",
                summary: "Everything in Standard, designed from scratch, with the branding and your Google listing handled.",
                includes: [
                    "Everything in Standard",
                    "Custom branding across all products as files you'd own",
                    "The SEO setup below",
                    "Custom user accounts and logins",
                    "Connections to outside services",
                    "Priority fixes & communication",
                ],
                note: "One of a kind website design that reaches new users. Site talks to other tools rather than being fully independent",
            },
        ],
        // one price each, and a status line, because the single two-price card read as a word dump
        addons: [
            {
                id: "seo-setup",
                name: "SEO setup",
                price: "From $100",
                status: "Already included in Premium",
                summary: "A one-time job that gets your business onto Google Maps and into local results. I claim and fill in your Google Business Profile, make your info match across Google, Yelp, Facebook, and anywhere else you're listed. Allow customers to leave a review with one click.",
            },
            {
                id: "seo-care",
                name: "SEO care",
                price: "$15/mo",
                status: "Not in any package. Add it to any of them.",
                summary: "Recurring monthly. I keep your profile current, help you answer reviews, and send you a plain report of the calls, clicks and directions it brought in. No article writing and no link buying, and nobody can honestly promise you a position on Google.",
            },
        ],
    },

    process: {
        heading: "How working together goes, guarantees, payment terms and common questions",
        leadEyebrow: "// How this works",
        guaranteeEyebrow: "// What you're guaranteed",
        paymentEyebrow: "// Payment",
        faqEyebrow: "// Common questions",
        steps: [
            {
                number: "01",
                title: "Contact",
                body: "Tell me what your business needs, in plain words. I'll draft up a proposal.",
            },
            {
                number: "02",
                title: "Documents",
                body: "You get the scope, the price and the timeline in writing before anything starts. Sign a contract.",
            },
            {
                number: "03",
                title: "Build",
                body: "I build it and show you progress along the way. I maintain communication throughout.",
            },
            {
                number: "04",
                title: "Handoff",
                body: "Payment. Accounts go in your name, I walk you through it, and I stay reachable.",
            },
        ],
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
        paymentPoints: [
            "A deposit (%) when you sign, the remainder on delivery.",
            "Zelle, bank transfer, or check.",
            "Monthly maintenance is included with every package and starts at launch: uptime, bug fixes and small tweaks. New features are quoted separately.",
        ],
        faqs: [
            {
                question: "Do I need to know anything technical?",
                answer: "No. If you can describe what your business does and what you want people to be able to do on the site, that is enough. I handle the rest, and explain any part of it you want explained.",
            },
            {
                question: "How long does it take?",
                answer: "It depends on the package and on how quickly content comes back from you. You get a timeline in the proposal before any work begins, so you are never left guessing.",
            },
            {
                question: "What if I already have a domain?",
                answer: "Then we use it. If you do not have one yet, it gets registered in your name rather than mine.",
            },
            {
                question: "Do you only work with businesses in Houston?",
                answer: "No. Houston is where I am and local businesses are who I work with most, but the work itself is remote either way.",
            },
            {
                question: "What happens after it launches?",
                answer: "It keeps running, and I keep looking after it. The monthly covers uptime, bug fixes and small tweaks, and it starts the day you go live. You are not on your own with it, and you are not chasing me either.",
            },
            {
                question: "Do I have to pay monthly?",
                answer: "Yes. It is part of every package not an extra. A site nobody looks after breaks quietly: forms stop sending, details go stale, and security updates pile up until something gives. The monthly is what stops that happening. It is not a lock-in, though. Either of us can end it on 30 days' notice, and your domain, hosting and accounts are in your name the entire time, so you are never stuck with me to keep your own site.",
            },
            {
                question: "What does the SEO add-on actually do?",
                answer: "It gets you onto Google Maps and into local results. I claim and fill in your Google Business Profile, make sure your name, address and phone match everywhere they appear, and point your reviews at the right place. Month to month I keep it current and send you a plain report of the calls, clicks and directions it brought in. What it does not include is writing articles or buying links, and nobody can honestly promise you a particular position on Google.",
            },
            {
                question: "Can I add things later?",
                answer: "Yes. New features are quoted separately, so you decide whether one is worth it rather than finding it on an invoice.",
            },
            {
                question: "What do you need from me to start?",
                answer: "What your business does, any branding you already have, and the text and images you want on the site. If you do not have those, producing them is part of what the higher packages cover.",
            },
        ],
    },

    contact: {
        heading: "Contact Gustavo Arriaga",
        leadEyebrow: "// Let's work together",
        formEyebrow: "// Start a project",
        findEyebrow: "// Find me on",
        reachEyebrow: "// Contact me",
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
            { id: "Software Products", label: "Software Products" },
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
