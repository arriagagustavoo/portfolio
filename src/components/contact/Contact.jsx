import "./Contact.css"
import { useState } from "react"
import { track } from "@vercel/analytics"
import GithubIcon from "../icons/GithubIcon"
import InstagramIcon from "../icons/InstagramIcon"
import LinkedinIcon from "../icons/LinkedinIcon"
import MailIcon from "../icons/MailIcon"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import ContactForm from "./ContactForm"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"
import useScramble from "../../hooks/useScramble"
import useReducedMotion from "../../hooks/useReducedMotion"

const leadEyebrow = "// Let's work together"
const formEyebrow = "// Start a project"
const findEyebrow = "// Find me on"
const reachEyebrow = "// Contact me"

// copy: true = copy button instead of a link
const emailAddress = "gus@arriagagustavoo.com"

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
    {
        label: "linkedin.com/in/arriagagustavoo",
        href: "https://www.linkedin.com/in/arriagagustavoo/",
        Icon: LinkedinIcon,
        copy: false,
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
    const [toastText, setToastText] = useState("");

    const reduceMotion = useReducedMotion();
    const [leadRef, leadVisible] = useInView();
    const [formRef, formVisible] = useInView();
    const [findRef, findVisible] = useInView();
    const [reachRef, reachVisible] = useInView();

    const leadPause = eyebrowDuration(leadEyebrow);
    const leadDelay = { "--intro-delay": leadPause + "ms" };
    const formDelay = { "--intro-delay": eyebrowDuration(formEyebrow) + "ms" };
    const findDelay = { "--intro-delay": eyebrowDuration(findEyebrow) + "ms" };
    const reachDelay = { "--intro-delay": eyebrowDuration(reachEyebrow) + "ms" };

    const scrambling = leadVisible && !reduceMotion;

    // two hooks, not one: the second line is a different colour and lands after the first
    // both wait out the eyebrow, same as every other section's content
    const firstLine = useScramble("LET'S", 70, leadPause + 120, scrambling);
    const secondLine = useScramble("BUILD.", 70, leadPause + 330, scrambling);

    const handleTop = () => {
        // no behavior key, so it inherits scroll-behavior from index.css
        window.scrollTo({ top: 0 });
    };

    const showToast = (message) => {
        setToastText(message);

        setTimeout(() => {
            setToastText("");
        }, 2400);
    };

    // absent entirely on an insecure origin, and writeText still rejects if permission is blocked
    const handleCopy = (value) => {
        if(!navigator.clipboard){
            showToast("Couldn't copy. It's " + value);
            return;
        }

        navigator.clipboard.writeText(value).then(() => {
            track("email_copied");
            showToast("Copied " + value);
        }).catch(() => {
            showToast("Couldn't copy. It's " + value);
        });
    };

    const findMe = buildLinks(findMeLinks, handleCopy);

    let toast;
    if(toastText){
        toast = (
            <div className = "contact-toast" role = "status">
                {toastText}
            </div>
        );
    }else{
        toast = null;
    }

    return(
        <>
        <section className = "contact-section" id = "contact" aria-labelledby = "contact-heading">
            <h2 className = "visually-hidden" id = "contact-heading">Contact Gustavo Arriaga</h2>

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
                <div className = "contact-column" ref = {reachRef} data-visible = {reachVisible} style = {reachDelay}>
                    <SectionEyebrow text = {reachEyebrow} tag = {true} active = {reachVisible}/>

                    <button className = "contact-email reveal-sweep" type = "button" onClick = {() => handleCopy(emailAddress)}>
                        <MailIcon className = "contact-email-icon"/>
                        {emailAddress}
                    </button>
                </div>

                <div className = "contact-column" ref = {findRef} data-visible = {findVisible} style = {findDelay}>
                    <SectionEyebrow text = {findEyebrow} tag = {true} active = {findVisible}/>

                    <div className = "contact-link-list contact-link-grid">
                        {findMe}
                    </div>
                </div>
            </div>

            <div className = "contact-form-block" id = "contact-form" ref = {formRef} data-visible = {formVisible} style = {formDelay}>
                <SectionEyebrow text = {formEyebrow} tag = {true} active = {formVisible}/>
                <ContactForm/>
            </div>

            <div className = "contact-top-wrap">
                <button className = "contact-top" type = "button" onClick = {handleTop} aria-label = "Back to top">
                    <span aria-hidden = "true">^</span>
                </button>
            </div>

            {toast}
        </section>
        </>
    )
}

export default Contact
