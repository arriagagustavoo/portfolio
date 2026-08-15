import { useEffect, useState } from "react"
import ContactIcon from "../icons/ContactIcon"
import "./StickyContact.css"

function StickyContact(){

    const [footerShowing, setFooterShowing] = useState(false);

    // the button is fixed, so nothing but hiding it stops it sitting on top of the footer
    useEffect(() => {
        const footer = document.querySelector(".footer");

        if(!footer){
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setFooterShowing(entry.isIntersecting);
            });
        });

        observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    const handleClick = () => {
        const form = document.getElementById("contact-form");

        if(!form){
            return;
        }

        // no behavior key, so it inherits scroll-behavior from index.css instead of forcing smooth
        form.scrollIntoView({ block: "center" });
    };

    return (
        <button
            className = "sticky-contact"
            type = "button"
            onClick = {handleClick}
            data-showing = {!footerShowing}
            aria-label = "Go to the contact form"
        >
            <ContactIcon className = "sticky-contact-icon" aria-hidden = "true"/>
        </button>
    )
}

export default StickyContact
