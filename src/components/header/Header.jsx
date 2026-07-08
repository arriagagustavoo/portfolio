import './Header.css'

function Header(){

    return(
        <>
        <div className = "header">
            <div className = "left-header">
                Gustavo Arriaga
            </div>
            <div className = "right-header">
                <nav>
                    <a>About</a>
                    <a>Projects</a>
                    <a>Skills</a>
                    <a>Services</a>
                    <a>Contact</a>
                </nav>
            </div>
        </div>
        </>
    )
}

export default Header