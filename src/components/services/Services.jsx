import "./Services.css"
import { useEffect, useRef, useState } from "react"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"
import { useCopy } from "../../i18n/languageContext"

// which tier gets the highlight, kept out of the copy so a translation can't break it
const featuredPackage = "standard"

function Services(){

    const copy = useCopy();
    const servicesEyebrow = copy.services.eyebrow;
    const packagesEyebrow = copy.services.packagesEyebrow;
    const packages = copy.services.packages;
    const addons = copy.services.addons;
    const services = copy.services.cards;

    const [leadRef, leadVisible] = useInView();
    const [packagesRef, packagesVisible] = useInView();
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

    const packageCards = packages.map((pack) => {
        let className = "package-card reveal-rise";
        if(pack.id === featuredPackage){
            className = "package-card package-featured reveal-rise";
        }

        const points = pack.includes.map((point, index) => {
            return (
                <li key = {index}>{point}</li>
            );
        });

        return (
            <div className = {className} key = {pack.id} data-package = {pack.id} data-active = {activePackage === pack.id}>
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
            <div className = "package-card package-addon reveal-rise" key = {item.id}>
                <div className = "package-addon-head">
                    <p className = "package-name">{item.name}</p>
                    <p className = "package-price">{item.price}</p>
                </div>

                <p className = "package-addon-status">{item.status}</p>

                <p className = "package-summary">{item.summary}</p>
            </div>
        );
    });

    const serviceCards = services.map((service, index) => {
        return (
            <div className = "service-card reveal-rise" key = {index}>
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
            <h2 className = "visually-hidden" id = "services-heading">{copy.services.heading}</h2>

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
                        <p className = "packages-note-flag reveal-rise">{copy.services.startingFrom}</p>
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
        </section>
        </>
    )
}

export default Services
