import "./Contact.css"
import { useState } from "react"
import GithubIcon from "../icons/GithubIcon"
import InstagramIcon from "../icons/InstagramIcon"
import LinkedinIcon from "../icons/LinkedinIcon"
import MailIcon from "../icons/MailIcon"
import PhoneIcon from "../icons/PhoneIcon"

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
        label: "linkedin.com/in",
        href: "https://linkedin.com/",
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
                <button className = "contact-link" key = {link.label} type = "button" onClick = {() => onCopy(link.label)}>
                    <Icon className = "contact-icon"/>
                    {link.label}
                </button>
            );
        }else{
            return (
                <a className = "contact-link" key = {link.label} href = {link.href} target = "_blank" rel = "noopener noreferrer">
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
        <div className = "contact-section" id = "contact">
            <p className = "contact-headline">
                LET'S <br></br>
                <span className = "contact-headline-accent">BUILD.</span>
            </p>

            <div className = "contact-columns">
                <div className = "contact-column">
                    <p className = "contact-column-title">
                        // Find me on
                    </p>
                    {findMe}
                </div>

                <div className = "contact-column">
                    <p className = "contact-column-title">
                        // Contact me
                    </p>
                    {contactMe}
                </div>
            </div>

            {toast}
        </div>
        </>
    )
}

export default Contact
