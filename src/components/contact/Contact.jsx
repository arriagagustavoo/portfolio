import "./Contact.css"
import { useState } from "react"
import GithubIcon from "../icons/GithubIcon"
import InstagramIcon from "../icons/InstagramIcon"
import LinkedinIcon from "../icons/LinkedinIcon"
import MailIcon from "../icons/MailIcon"
import PhoneIcon from "../icons/PhoneIcon"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"
import useScramble from "../../hooks/useScramble"
import useReducedMotion from "../../hooks/useReducedMotion"

const leadEyebrow = "// Let's work together"
const findEyebrow = "// Find me on"
const reachEyebrow = "// Contact me"

// copy: true = copy button instead of a link
const findMeLinks = [
    {
        label: "github.com/arriagagustavoo",
        href: "https://github.com/arriagagustavoo",
        Icon: GithubIcon,
        copy: false,
    },
    {
        label: "@arriagagustavoo",
        href: "https://instagram.com/arriagagustavoo",
        Icon: InstagramIcon,
        copy: false,
    },
]

const contactMeLinks = [
    {
        label: "arriagagustavo42@gmail.com",
        href: "",
        Icon: MailIcon,
        copy: true,
    },
    {
        label: "linkedin.com/in/arriagagustavoo",
        href: "https://www.linkedin.com/in/arriagagustavoo/",
        Icon: LinkedinIcon,
        copy: false,
    },
    {
        label: "832-453-4158",
        href: "",
        Icon: PhoneIcon,
        copy: true,
    },
]

// builds either column
function buildLinks(links, onCopy){
    return links.map((link) => {
        const Icon = link.Icon;

        if(link.copy){
            return (
                <button className = "contact-link reveal-sweep" key = {link.label} type = "button" onClick = {() => onCopy(link.label)}>
                    <Icon className = "contact-icon"/>
                    {link.label}
                </button>
            );
        }else{
            return (
                <a className = "contact-link reveal-sweep" key = {link.label} href = {link.href} target = "_blank" rel = "noopener noreferrer">
                    <Icon className = "contact-icon"/>
                    {link.label}
                </a>
            );
        }
    });
}

function Contact(){

    // empty = no toast
    const [copiedText, setCopiedText] = useState("");

    const reduceMotion = useReducedMotion();
    const [leadRef, leadVisible] = useInView();
    const [findRef, findVisible] = useInView();
    const [reachRef, reachVisible] = useInView();

    const leadPause = eyebrowDuration(leadEyebrow);
    const leadDelay = { "--intro-delay": leadPause + "ms" };
    const findDelay = { "--intro-delay": eyebrowDuration(findEyebrow) + "ms" };
    const reachDelay = { "--intro-delay": eyebrowDuration(reachEyebrow) + "ms" };

    const scrambling = leadVisible && !reduceMotion;

    // two hooks, not one: the second line is a different colour and lands after the first
    // both wait out the eyebrow, same as every other section's content
    const firstLine = useScramble("LET'S", 70, leadPause + 120, scrambling);
    const secondLine = useScramble("BUILD.", 70, leadPause + 330, scrambling);

    const handleCopy = (value) => {
        navigator.clipboard.writeText(value);
        setCopiedText(value);

        setTimeout(() => {
            setCopiedText("");
        }, 2000);
    };

    const findMe = buildLinks(findMeLinks, handleCopy);
    const contactMe = buildLinks(contactMeLinks, handleCopy);

    let toast;
    if(copiedText){
        toast = (
            <div className = "contact-toast" role = "status">
                Copied {copiedText}
            </div>
        );
    }else{
        toast = null;
    }

    return(
        <>
        <section className = "contact-section" id = "contact">
            <div className = "contact-headline-block" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {leadEyebrow} active = {leadVisible}/>

                <p className = "contact-headline reveal-rise">
                    {/* ghost holds the box: scrambled caps are not the width of the real ones */}
                    <span className = "contact-headline-ghost" aria-hidden = "true">
                        LET'S <br></br> BUILD.
                    </span>
                    <span className = "contact-headline-live">
                        {firstLine.display} <br></br>
                        <span className = "contact-headline-accent">{secondLine.display}</span>
                    </span>
                </p>
            </div>

            <div className = "contact-columns">
                <div className = "contact-column" ref = {findRef} data-visible = {findVisible} style = {findDelay}>
                    <SectionEyebrow text = {findEyebrow} tag = {true} active = {findVisible}/>

                    <div className = "contact-link-list">
                        {findMe}
                    </div>
                </div>

                <div className = "contact-column" ref = {reachRef} data-visible = {reachVisible} style = {reachDelay}>
                    <SectionEyebrow text = {reachEyebrow} tag = {true} active = {reachVisible}/>

                    <div className = "contact-link-list">
                        {contactMe}
                    </div>
                </div>
            </div>

            {toast}
        </section>
        </>
    )
}

export default Contact
