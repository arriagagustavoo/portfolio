import "./Services.css"
import { useEffect, useRef, useState } from "react"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"

const servicesEyebrow = "// Services"
const packagesEyebrow = "// Website packages"

// plain language on purpose: a client who does not write software has to be able to
// tell what the extra money buys without asking what a backend is
const packages = [
    {
        name: "Basic",
        price: "$...",
        summary: "A website that shows people who you are, what you do, and how to reach you.",
        includes: [
            "Built to match your branding, on phones and desktop",
            "A contact form that lands straight in your inbox",
            "Set up so you turn up on Google",
        ],
        note: "No database and no advertising. Best when you mainly need to look real and be findable.",
        featured: false,
    },
    {
        name: "Standard",
        price: "$...",
        summary: "Everything in Basic, and the site starts doing work instead of just sitting there.",
        includes: [
            "Everything in Basic",
            "A backend, meaning the site stores what comes in instead of only showing pages",
            "Your own admin page to log into and read it: bookings, orders, messages, sign-ups",
            "Customer accounts and logins, if you need them",
        ],
        note: "This is the step where the site stops being a brochure and starts running part of the business.",
        featured: true,
    },
    {
        name: "Premium",
        price: "$...",
        summary: "Everything in Standard, designed from scratch, with the branding and advertising to match.",
        includes: [
            "Everything in Standard",
            "Fully custom design, not a template",
            "Branding: logo, colours and fonts, plus the files to reuse them anywhere",
            "Google and Facebook ad campaigns set up and running",
        ],
        note: "For when the site has to look like nobody else's and bring in new people, not just serve the ones you have.",
        featured: false,
    },
]

const addon = {
    name: "Add ads & marketing to any package",
    price: "$...",
    summary: "Google and Facebook ads, so you show up when someone nearby searches for what you sell. Includes writing the ads, setting up the account, and the tracking that shows what each one did.",
}

const services = [
    {
        tag: "Freelance",
        title: "Software Products",
        description: "Custom Websites, Applications, Tools.",

    },
    {
        tag: "Get found",
        title: "Design & Ads",
        description: "Branding, graphics, and online marketing.",
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
                <p className = "package-price">{pack.price}</p>
                <p className = "package-summary">{pack.summary}</p>

                <ul className = "package-list">
                    {points}
                </ul>

                <p className = "package-note">{pack.note}</p>
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
                <SectionEyebrow text = {packagesEyebrow} tag = {true} active = {packagesVisible}/>

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

                <div className = "package-card package-addon reveal-rise">
                    <div className = "package-addon-head">
                        <p className = "package-name">{addon.name}</p>
                        <p className = "package-price">{addon.price}</p>
                    </div>

                    <p className = "package-summary">{addon.summary}</p>
                </div>
            </div>
        </section>
        </>
    )
}

export default Services
