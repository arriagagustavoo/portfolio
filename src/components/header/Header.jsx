import './Header.css'
import MenuIcon from '../icons/MenuIcon'
import MoonIcon from '../icons/MoonIcon'
import SunIcon from '../icons/SunIcon'
import darkLogoLarge from '../../assets/dark-logo-large.svg'
import darkLogoSmall from '../../assets/dark-logo-small.svg'
import lightLogoLarge from '../../assets/light-logo-large.svg'
import lightLogoSmall from '../../assets/light-logo-small.svg'
import {useState, useEffect, useRef} from 'react'

function Header(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);

    // should save theme to local storage
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if(savedTheme){
            return savedTheme;
        }else{
            return "dark"
        }
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme)
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

    return(
        <>
        <div className = "header" ref = {headerRef}>
            <div className = "left-header">
                <a className = "header-logo-link" href = "#hero">
                    <picture key = {theme}>
                        <source media = "(min-width: 1000px)" srcSet = {logoLarge}/>
                        <img className = "header-logo" src = {logoSmall} alt = "Gustavo Arriaga"/>
                    </picture>
                </a>
            </div>

            <div className = "right-header">
                <nav className = {navClassName}>
                    <a className="header-link" href="#about" onClick = {closeMenu}>About</a>
                    <a className="header-link" href="#projects" onClick = {closeMenu}>Projects</a>
                    <a className="header-link" href="#skills" onClick = {closeMenu}>Skills</a>
                    <a className="header-link" href="#services" onClick = {closeMenu}>Services</a>
                    <a className="header-link contact" href="#contact" onClick = {closeMenu}>Contact</a>
                </nav>
            </div>

            <div className = "header-buttons">
                <button className = "menu-toggle" onClick = {() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"aria-expanded={isMenuOpen}>
                    <MenuIcon/>
                </button>
                
                <button className = "mode-toggle" onClick = {toggleTheme}
                aria-label = "Toggle mode">
                    {modeIcon}
                </button>
            </div>
        </div>
        </>
    )
}

export default Header