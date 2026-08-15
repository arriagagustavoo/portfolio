import "./Services.css"
import { useEffect, useRef, useState } from "react"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"

const servicesEyebrow = "// Services"
const packagesEyebrow = "// Website packages"

// plain language on purpose: the client has to see what the extra money buys
const packages = [
    {
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
        featured: false,
    },
    {
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
        featured: true,
    },
    {
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
            "Priority fixes & communication"
        ],
        note: "One of a kind website design that reaches new users. Site talks to other tools rather than being fully independent",
        featured: false,
    },
]

const packagesNote = "OPTIONS NOT LIMITED TO THESE PACKAGES. Rough estimates only. Determine what you'd need."

const packagesTerms = "Every package includes monthly maintenance from the day you launch: uptime, bug fixes and small tweaks. Your domain, hosting and accounts stay in your name throughout."

// one price each, and a status line, because the single two-price card read as a word dump
const addons = [
    {
        name: "SEO setup",
        price: "From $150",
        status: "Already included in Premium",
        summary: "A one-time job that gets your business onto Google Maps and into local results. I claim and fill in your Google Business Profile, make your info match across Google, Yelp, Facebook, and anywhere else you're listed. Allow customers to leave a review with one click.",
    },
    {
        name: "SEO care",
        price: "$20/mo",
        status: "Not in any package. Add it to any of them.",
        summary: "Recurring monthly. I keep your profile current, help you answer reviews, and send you a plain report of the calls, clicks and directions it brought in. No article writing and no link buying, and nobody can honestly promise you a position on Google.",
    },
]

const services = [
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
    }
]

function Services(){

    const [leadRef, leadVisible] = useInView();
    const [packagesRef, packagesVisible] = useInView();
    const trackRef = useRef(null);
    const [activePackage, setActivePackage] = useState("Standard");

    useEffect(() => {
        const track = trackRef.current;

        if(!track){
            return;
        }

        // opens on Standard rather than Basic. only the track scrolls, never the page
        const featured = track.querySelector(".package-featured");

        if(featured){
            track.scrollLeft = featured.offsetLeft - (track.clientWidth - featured.clientWidth) / 2;
        }

        // negative inline margins shrink the root to a centre strip, so the only card that
        // ever intersects is the one sitting in the middle of the track
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    setActivePackage(entry.target.dataset.package);
                }
            });
        }, { root: track, rootMargin: "0px -45% 0px -45%" });

        track.querySelectorAll(".package-card").forEach((card) => {
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    const scrollByCard = (direction) => {
        const track = trackRef.current;

        if(!track){
            return;
        }

        const card = track.querySelector(".package-card");

        if(!card){
            return;
        }

        const step = card.getBoundingClientRect().width + 16;
        track.scrollBy({ left: direction * step });
    };
    const leadDelay = { "--intro-delay": eyebrowDuration(servicesEyebrow) + "ms" };
    const packagesDelay = { "--intro-delay": eyebrowDuration(packagesEyebrow) + "ms" };

    const packageCards = packages.map((pack) => {
        let className = "package-card reveal-rise";
        if(pack.featured){
            className = "package-card package-featured reveal-rise";
        }

        const points = pack.includes.map((point) => {
            return (
                <li key = {point}>{point}</li>
            );
        });

        return (
            <div className = {className} key = {pack.name} data-package = {pack.name} data-active = {activePackage === pack.name}>
                <p className = "package-name">{pack.name}</p>

                <div className = "package-prices">
                    <p className = "package-price">{pack.price}</p>
                    <p className = "package-price package-monthly">{pack.monthly}</p>
                </div>

                <p className = "package-summary">{pack.summary}</p>

                <ul className = "package-list">
                    {points}
                </ul>

                <p className = "package-note">{pack.note}</p>
            </div>
        );
    });

    const addonCards = addons.map((item) => {
        return (
            <div className = "package-card package-addon reveal-rise" key = {item.name}>
                <div className = "package-addon-head">
                    <p className = "package-name">{item.name}</p>
                    <p className = "package-price">{item.price}</p>
                </div>

                <p className = "package-addon-status">{item.status}</p>

                <p className = "package-summary">{item.summary}</p>
            </div>
        );
    });

    const serviceCards = services.map((service) => {
        return (
            <div className = "service-card reveal-rise" key = {service.title}>
                <p className = "service-tag">
                    {service.tag}
                </p>

                <p className = "service-title">
                    {service.title}
                </p>

                <p className = "service-description">
                    {service.description}
                </p>
            </div>
        );
    });

    return(
        <>
        <section className = "services" id = "services" aria-labelledby = "services-heading">
            <h2 className = "visually-hidden" id = "services-heading">Freelance web development, design, and 3D printing services</h2>

            <div className = "services-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {servicesEyebrow} active = {leadVisible}/>

                <div className = "services-grid">
                    {serviceCards}
                </div>
            </div>

            <div className = "packages-lead" ref = {packagesRef} data-visible = {packagesVisible} style = {packagesDelay}>
                <div className = "packages-intro">
                    <div className = "packages-head">
                        <SectionEyebrow text = {packagesEyebrow} tag = {true} active = {packagesVisible}/>
                        <p className = "packages-note-flag reveal-rise">Starting from</p>
                    </div>

                    <p className = "packages-note reveal-sweep">{packagesNote}</p>
                </div>

                <div className = "packages-carousel">
                    <div className = "packages-track" ref = {trackRef}>
                        {packageCards}
                    </div>

                    <button className = "packages-arrow packages-arrow-prev" type = "button"
                    onClick = {() => scrollByCard(-1)} aria-label = "Previous package">
                        <span aria-hidden = "true">{"<"}</span>
                    </button>

                    <button className = "packages-arrow packages-arrow-next" type = "button"
                    onClick = {() => scrollByCard(1)} aria-label = "Next package">
                        <span aria-hidden = "true">{">"}</span>
                    </button>
                </div>

                <p className = "packages-terms reveal-sweep">{packagesTerms}</p>

                <div className = "packages-addons">
                    {addonCards}
                </div>
            </div>
        </section>
        </>
    )
}

export default Services
