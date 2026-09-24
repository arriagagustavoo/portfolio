import "./Services.css"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { track } from "@vercel/analytics"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"
import { useCopy, useLanguage } from "../../i18n/languageContext"

// which tier gets the highlight, kept out of the copy so a translation can't break it
const featuredPackage = "standard"

// where each service card leads, and the project type it selects. the ids are what the form emails
const serviceLinks = [
    { kind: "work", slug: "client-portal", projectType: "Website or software" },
    { kind: "contact", projectType: "Design & SEO" },
    { kind: "contact", projectType: "3D Modeling & Printing" },
]

// what each tier lists, as indexes into copy.services.packageRows. a tier lists only what it adds
// to the one below it, and a tag ("optional") marks a row it only half includes
const tierRows = {
    basic:    [{ row: 0 }, { row: 1 }, { row: 2 }, { row: 3 }],
    standard: [{ row: 4 }, { row: 5 }, { row: 6, tag: "optional" }],
    premium:  [{ row: 6 }, { row: 7 }, { row: 8 }, { row: 9 }, { row: 10 }],
}

// the contact form listens for this, so a button here can set it up before the page scrolls to it
function prefillContact(detail){
    window.dispatchEvent(new CustomEvent("contact-prefill", { detail: detail }));
}

function Services(){

    const copy = useCopy();
    const { basePath, sectionHref } = useLanguage();
    const servicesEyebrow = copy.services.eyebrow;
    const packagesEyebrow = copy.services.packagesEyebrow;
    const packages = copy.services.packages;
    const addons = copy.services.addons;
    const services = copy.services.cards;
    const contactHref = sectionHref("contact");

    const [leadRef, leadVisible] = useInView();
    const [packagesRef, packagesVisible] = useInView();
    const [portalRef, portalVisible] = useInView();
    const [portalGo, setPortalGo] = useState(false);
    const trackRef = useRef(null);
    const [activePackage, setActivePackage] = useState(featuredPackage);

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

    const portal = copy.services.portal;
    const portalDelay = { "--intro-delay": eyebrowDuration(portal.eyebrow) + "ms" };

    // a big screen has both blocks in view at once, so the portal waits for the packages to finish landing
    const portalStart = eyebrowDuration(packagesEyebrow) + 900;

    useEffect(() => {
        if(!packagesVisible){
            return;
        }

        const timer = setTimeout(() => setPortalGo(true), portalStart);

        return () => clearTimeout(timer);
    }, [packagesVisible, portalStart]);

    const portalReady = portalVisible && portalGo;

    const handleStart = (pack) => {
        track("cta_package", { package: pack.id });
        prefillContact({ projectType: "Website or software", message: copy.services.startMessage(pack.name) });
    };

    const handleCustom = () => {
        track("cta_package", { package: "custom" });
        prefillContact({ projectType: "Something else" });
    };

    const handlePortal = () => {
        track("cta_package", { package: "portal" });
        prefillContact({ projectType: "Website or software", message: portal.message });
    };

    const handleAddon = (item) => {
        track("cta_package", { package: item.id });
        prefillContact({ projectType: "Design & SEO", message: copy.services.addonMessage(item.name) });
    };

    const packageCards = packages.map((pack) => {
        let className = "package-card reveal-rise";
        if(pack.id === featuredPackage){
            className = "package-card package-featured reveal-rise";
        }

        // the tier below it, named first, then only what this one adds
        let inherits = null;
        if(pack.inherits){
            inherits = <li className = "package-row package-row-inherit" key = "inherits">{pack.inherits}</li>;
        }

        const rows = tierRows[pack.id].map((item) => {
            const label = copy.services.packageRows[item.row];

            if(item.tag){
                return (
                    <li className = "package-row package-row-tag" key = {item.row}>
                        <span>{label}</span>
                        <span className = "package-row-tagtext">{copy.services[item.tag]}</span>
                    </li>
                );
            }

            return <li className = "package-row" key = {item.row}>{label}</li>;
        });

        let tab = null;
        if(pack.id === featuredPackage){
            tab = <p className = "package-tab">{copy.services.recommended}</p>;
        }

        return (
            <div className = {className} key = {pack.id} data-package = {pack.id} data-active = {activePackage === pack.id}>
                {tab}

                <div className = "package-head">
                    <p className = "package-name">{pack.name}</p>

                    <div className = "package-cost">
                        <p className = "package-price">{pack.price}</p>
                        <p className = "package-monthly">{pack.monthly}</p>
                    </div>
                </div>

                <p className = "package-goodfor">
                    <span className = "package-goodfor-label">{copy.services.goodFor}</span> {pack.goodFor}
                </p>

                <p className = "package-summary">{pack.summary}</p>

                <ul className = "package-rows">
                    {inherits}
                    {rows}
                </ul>

                <a className = "package-cta" href = {contactHref} onClick = {() => handleStart(pack)}>{pack.cta}</a>
            </div>
        );
    });

    const portalPoints = portal.points.map((point, index) => {
        return <li className = "package-row" key = {index}>{point}</li>;
    });

    const addonCards = addons.map((item) => {
        const points = item.points.map((point, index) => {
            return <li className = "package-row" key = {index}>{point}</li>;
        });

        let caveat = null;
        if(item.caveat){
            caveat = <p className = "addon-caveat">{item.caveat}</p>;
        }

        return (
            <div className = "package-card package-addon reveal-rise" key = {item.id}>
                <div className = "addon-main">
                    <div className = "package-head">
                        <p className = "package-name">{item.name}</p>
                        <p className = "package-price">{item.price}</p>
                    </div>

                    <p className = "addon-tagline">{item.tagline}</p>
                    <p className = "package-addon-status">{item.status}</p>

                    <a className = "service-link" href = {contactHref} onClick = {() => handleAddon(item)}>{item.cta}</a>
                </div>

                <div className = "addon-detail">
                    <ul className = "package-rows addon-rows">
                        {points}
                    </ul>

                    {caveat}
                </div>
            </div>
        );
    });

    const serviceCards = services.map((service, index) => {
        const target = serviceLinks[index];

        let link;
        if(target.kind === "work"){
            link = <Link className = "service-link" to = {basePath + "/work/" + target.slug}>{service.link}</Link>;
        }else{
            link = <a className = "service-link" href = {contactHref} onClick = {() => prefillContact({ projectType: target.projectType })}>{service.link}</a>;
        }

        return (
            <div className = "service-card reveal-rise" key = {index}>
                <p className = "service-title">
                    {service.title}
                </p>

                <p className = "service-description">
                    {service.description}
                </p>

                {link}
            </div>
        );
    });

    return(
        <>
        <section className = "services" id = "services" aria-labelledby = "services-heading">
            <h2 className = "visually-hidden" id = "services-heading">{copy.services.heading}</h2>

            <div className = "services-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {servicesEyebrow} active = {leadVisible}/>

                <div className = "services-grid">
                    {serviceCards}
                </div>

                <p className = "services-closing reveal-fade">
                    <span className = "services-closing-text">{copy.services.closing.text}</span>
                    <a className = "service-link" href = {contactHref} onClick = {() => prefillContact({ projectType: "Something else" })}>{copy.services.closing.link}</a>
                </p>
            </div>

            <div className = "packages-lead" ref = {packagesRef} data-visible = {packagesVisible} style = {packagesDelay}>
                <div className = "packages-intro">
                    <div className = "packages-head">
                        <SectionEyebrow text = {packagesEyebrow} tag = {true} active = {packagesVisible}/>
                        <p className = "packages-note-flag reveal-rise">{copy.services.startingFrom}</p>

                        <a className = "service-link packages-cta reveal-fade" href = {contactHref} onClick = {handleCustom}>{copy.services.packagesCta}</a>
                    </div>

                    <p className = "packages-note reveal-sweep">{copy.services.packagesNote}</p>
                </div>

                <div className = "packages-carousel">
                    <div className = "packages-track" ref = {trackRef}>
                        {packageCards}
                    </div>

                    <button className = "packages-arrow packages-arrow-prev" type = "button"
                    onClick = {() => scrollByCard(-1)} aria-label = {copy.services.previousPackage}>
                        <span aria-hidden = "true">{"<"}</span>
                    </button>

                    <button className = "packages-arrow packages-arrow-next" type = "button"
                    onClick = {() => scrollByCard(1)} aria-label = {copy.services.nextPackage}>
                        <span aria-hidden = "true">{">"}</span>
                    </button>
                </div>

                <p className = "packages-terms reveal-sweep">{copy.services.packagesTerms}</p>

                <div className = "packages-addons">
                    {addonCards}
                </div>
            </div>

            <div className = "portal-lead" ref = {portalRef} data-visible = {portalReady} style = {portalDelay}>
                <SectionEyebrow text = {portal.eyebrow} tag = {true} active = {portalReady}/>

                <div className = "package-card package-addon package-portal reveal-rise">
                    <div className = "addon-main">
                        <div className = "package-head">
                            <p className = "package-name">{portal.name}</p>

                            <div className = "package-cost">
                                <p className = "package-price">{portal.price}</p>
                                <p className = "package-monthly">{portal.monthly}</p>
                            </div>
                        </div>

                        <p className = "addon-tagline">{portal.tagline}</p>
                        <p className = "package-addon-status">{portal.status}</p>

                        <div className = "portal-links">
                            <a className = "service-link" href = {contactHref} onClick = {handlePortal}>{portal.cta}</a>
                            <Link className = "service-link" to = {basePath + "/work/client-portal"}>{portal.seeLink}</Link>
                        </div>
                    </div>

                    <div className = "addon-detail">
                        <ul className = "package-rows addon-rows">
                            {portalPoints}
                        </ul>

                        <p className = "addon-caveat">{portal.caveat}</p>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Services
