import './Header.css'
import MenuIcon from '../icons/MenuIcon'
import MoonIcon from '../icons/MoonIcon'
import SunIcon from '../icons/SunIcon'
import TranslateIcon from '../icons/TranslateIcon'
import darkLogoLarge from '../../assets/dark-logo-large.svg'
import darkLogoSmall from '../../assets/dark-logo-small.svg'
import lightLogoLarge from '../../assets/light-logo-large.svg'
import lightLogoSmall from '../../assets/light-logo-small.svg'
import {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/languageContext'

const sectionIds = ["hero", "about", "projects", "skills", "services", "process", "contact"]

function Header(){

    const { copy, basePath, otherBasePath, neutralPath } = useLanguage();
    const navLinks = copy.header.nav;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const headerRef = useRef(null);
    const progressRef = useRef(null);

    // the inline script in index.html already resolved this before first paint, so read that back
    const [theme, setTheme] = useState(() => {
        const appliedTheme = document.documentElement.getAttribute("data-theme");
        if(appliedTheme){
            return appliedTheme;
        }else{
            return "dark"
        }
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme)

        // index.html hardcodes this pre-paint, before any stylesheet has loaded the token
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if(themeColor){
            const styles = getComputedStyle(document.documentElement);
            const background = styles.getPropertyValue('--main-background').trim();
            themeColor.setAttribute("content", background);
        }
    }, [theme]);

    // the hero sizes itself off the header, and which child is tallest
    // changes across breakpoints, so publish the real height instead of guessing
    useEffect(() => {
        const header = headerRef.current;
        if(!header){
            return;
        }

        const observer = new ResizeObserver(() => {
            const height = header.getBoundingClientRect().height;
            document.documentElement.style.setProperty('--header-height', `${height}px`);
        });

        observer.observe(header);

        return () => observer.disconnect();
    }, []);

    // drives both the progress bar and the active nav link
    useEffect(() => {
        const bar = progressRef.current;
        const nodes = sectionIds
            .map((id) => document.getElementById(id))
            .filter((node) => node !== null);

        let frame = null;
        let tops = [];
        let maxScroll = 0;
        let lastActive = null;

        // every layout read lives here, never in the scroll path. doing 7 of them per
        // frame cost ~90 janked frames on a 6x-throttled phone
        const measure = () => {
            maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            tops = nodes.map((node) => node.getBoundingClientRect().top + window.scrollY);
        };

        const apply = () => {
            frame = null;

            const y = window.scrollY;
            const probe = y + window.innerHeight * 0.4;

            let ratio = 0;
            if(maxScroll > 0){
                ratio = y / maxScroll;
            }

            // sections tile the page, so the active one is the last to pass the probe line
            let current = "";
            tops.forEach((top, index) => {
                if(top <= probe){
                    current = nodes[index].id;
                }
            });

            // contact is too short to ever reach the probe, so the page bottom hands it over
            if(ratio > 0.995){
                current = sectionIds[sectionIds.length - 1];
            }

            if(bar){
                bar.style.setProperty('--scroll-progress', ratio);
            }

            // React bails on an equal value, but it still schedules the attempt every frame
            if(current !== lastActive){
                lastActive = current;
                setActiveSection(current);
            }
        };

        const onScroll = () => {
            if(frame === null){
                frame = requestAnimationFrame(apply);
            }
        };

        // content-visibility swaps each section's estimated height for its real one,
        // which moves every section below it, so the cache can't be measured just once
        const observer = new ResizeObserver(() => {
            measure();
            onScroll();
        });

        observer.observe(document.body);

        measure();
        apply();

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);

            if(frame !== null){
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    // determine burger menu icon class (active/inactive)
    let navClassName = "nav";
    if(isMenuOpen){
        navClassName = "nav nav-open";
    }

    let logoLarge;
    let logoSmall;
    if(theme === "dark"){
        logoLarge = darkLogoLarge;
        logoSmall = darkLogoSmall;
    }else{
        logoLarge = lightLogoLarge;
        logoSmall = lightLogoSmall;
    }

    // determine what theme icon to show
    let modeIcon;
    if(theme === "light"){      //if light, show moon icon
        modeIcon = <MoonIcon/>;
    }else {
        modeIcon = <SunIcon/>;
    }

    const toggleTheme = () =>{
        if(theme == "light"){       // if light, set to dark
            setTheme("dark");
        }else{
            setTheme("light");
        }
    }   ;

    // close mobile menu links when clicking one
    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    const headerLinks = navLinks.map((link) => {
        let className = "header-link";
        if(link.id === "contact"){
            className = "header-link contact";
        }

        return (
            <a className = {className} key = {link.id} href = {basePath + "/#" + link.id}
            data-active = {activeSection === link.id} onClick = {closeMenu}>
                {link.label}
            </a>
        );
    });

    // off the home page there is no section to hold, so the twin page is the whole target
    let languageTarget = otherBasePath + neutralPath;
    if(neutralPath === ''){
        let anchor = activeSection;
        if(!anchor){
            anchor = "hero";
        }

        languageTarget = otherBasePath + "/#" + anchor;
    }

    return(
        <>
        <header className = "header" ref = {headerRef}>
            <div className = "left-header">
                <a className = "header-logo-link" href = {basePath + "/#hero"}>
                    <picture key = {theme}>
                        <source media = "(min-width: 1000px)" srcSet = {logoLarge}/>
                        <img className = "header-logo" src = {logoSmall} alt = {copy.header.logoAlt}/>
                    </picture>
                </a>
            </div>

            <div className = "right-header">
                <nav className = {navClassName}>
                    {headerLinks}
                </nav>
            </div>

            <div className = "header-buttons">
                <button className = "menu-toggle" onClick = {() => setIsMenuOpen(!isMenuOpen)}
                aria-label={copy.header.menuLabel} aria-expanded={isMenuOpen}>
                    <MenuIcon/>
                </button>

                <button className = "mode-toggle" onClick = {toggleTheme}
                aria-label = {copy.header.themeLabel}>
                    {modeIcon}
                </button>

                {/* a link, not a button, so the other language is a real url a crawler can follow */}
                <Link className = "language-toggle" to = {languageTarget}
                aria-label = {copy.header.languageLabel} onClick = {closeMenu}>
                    <TranslateIcon/>
                    <span className = "language-code">{copy.header.languageCode}</span>
                </Link>
            </div>

            <div className = "header-progress" ref = {progressRef} aria-hidden = "true"></div>
        </header>
        </>
    )
}

export default Header