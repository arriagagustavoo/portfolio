import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { track } from "@vercel/analytics"
import ContactIcon from "../icons/ContactIcon"
import "./StickyContact.css"
import { useCopy, useLanguage } from "../../i18n/languageContext"

function StickyContact({ rideFooter = false }){

    const copy = useCopy();
    const { basePath } = useLanguage();
    const navigate = useNavigate();
    const buttonRef = useRef(null);
    const [footerShowing, setFooterShowing] = useState(false);

    // the button is fixed, so it either hides or rides up above the footer to stay off it
    useEffect(() => {
        const footer = document.querySelector(".footer");
        const button = buttonRef.current;

        if(!footer || !button){
            return;
        }

        // short pages show the footer after a small scroll, so hiding there reads as a bug
        if(rideFooter){
            // one rect read per scroll, and no rAF so the button never trails the footer by a frame
            const lift = () => {
                const overlap = window.innerHeight - footer.getBoundingClientRect().top;
                button.style.setProperty("--sticky-lift", Math.max(0, overlap) + "px");
            };

            lift();
            window.addEventListener("scroll", lift, { passive: true });
            window.addEventListener("resize", lift);

            return () => {
                window.removeEventListener("scroll", lift);
                window.removeEventListener("resize", lift);
            };
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setFooterShowing(entry.isIntersecting);
            });
        });

        observer.observe(footer);

        return () => observer.disconnect();
    }, [rideFooter]);

    const handleClick = () => {
        track("cta_sticky_contact");

        const form = document.getElementById("contact-form");

        // off the home page there is no form to scroll to, so go to it
        if(!form){
            navigate(basePath + "/#contact");
            return;
        }

        // no behavior key, so it inherits scroll-behavior from index.css instead of forcing smooth
        form.scrollIntoView({ block: "center" });
    };

    return (
        <button
            ref = {buttonRef}
            className = "sticky-contact"
            type = "button"
            onClick = {handleClick}
            data-showing = {!footerShowing}
            aria-label = {copy.stickyContact.label}
        >
            <ContactIcon className = "sticky-contact-icon" aria-hidden = "true"/>
        </button>
    )
}

export default StickyContact
