import './Header.css'
import MenuIcon from '../icons/MenuIcon'
import MoonIcon from '../icons/MoonIcon'
import SunIcon from '../icons/SunIcon'
import {useState, useEffect} from 'react'

function Header(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    // determine burger menu icon class (active/inactive)
    let navClassName = "nav";
    if(isMenuOpen){
        navClassName = "nav nav-open";
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
        <div className = "header">
            <div className = "left-header">
                <a className = "header-link" href = "#hero">Gustavo Arriaga</a>
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