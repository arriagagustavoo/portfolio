import './Header.css'
import MenuIcon from '../icons/MenuIcon'
import {useState} from 'react'

function Header(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <>
        <div className = "header">
            <div className = "left-header">
                Gustavo Arriaga
            </div>

            <div className = "right-header">
                <nav className = {`nav ${isMenuOpen ? "nav-open" : ""}`}>
                    <a className="header-link" href="#about">About</a>
                    <a className="header-link" href="#projects">Projects</a>
                    <a className="header-link" href="#skills">Skills</a>
                    <a className="header-link" href="#services">Services</a>
                    <a className="header-link contact-link" href="#contact">Contact</a>
                </nav>
            </div>

            <button className = "menu-toggle" onClick = {() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"aria-expanded={isMenuOpen}>
                <MenuIcon/>
            </button>

        </div>
        </>
    )
}

export default Header