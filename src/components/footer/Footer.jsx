import "./Footer.css"
import { Link } from "react-router-dom"
import GithubIcon from "../icons/GithubIcon"
import InstagramIcon from "../icons/InstagramIcon"
import LinkedinIcon from "../icons/LinkedinIcon"
import MailIcon from "../icons/MailIcon"
import { useLanguage } from "../../i18n/languageContext"

function Footer(){

    const { copy, basePath } = useLanguage();
    const year = new Date().getFullYear();

    // mail points at the contact section, not a mailto: nothing on this site sends visitors away
    const socials = [
        { label: copy.footer.emailMe, href: basePath + "/#contact", Icon: MailIcon, external: false },
        { label: "GitHub", href: "https://github.com/arriagagustavoo", Icon: GithubIcon, external: true },
        { label: "Instagram", href: "https://instagram.com/arriagagustavoo", Icon: InstagramIcon, external: true },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/arriagagustavoo/", Icon: LinkedinIcon, external: true },
    ];

    const socialLinks = socials.map((social, index) => {
        const Icon = social.Icon;

        if(social.external){
            return (
                <a className = "footer-social" key = {index} href = {social.href}
                target = "_blank" rel = "noopener noreferrer" aria-label = {social.label}>
                    <Icon className = "footer-social-icon"/>
                </a>
            );
        }

        return (
            <a className = "footer-social" key = {index} href = {social.href} aria-label = {social.label}>
                <Icon className = "footer-social-icon"/>
            </a>
        );
    });

    return(
        <footer className = "footer">
            <p className = "footer-text footer-copyright">
                © {year} Gustavo Arriaga
            </p>

            <p className = "footer-text footer-rights">
                {copy.footer.rights}
            </p>

            <div className = "footer-socials">
                {socialLinks}
            </div>

            <Link className = "footer-text footer-privacy" to = {basePath + "/privacy"}>
                {copy.footer.privacy}
            </Link>
        </footer>
    )
}

export default Footer
