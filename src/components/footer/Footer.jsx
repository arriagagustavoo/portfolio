import "./Footer.css"

function Footer(){

    const year = new Date().getFullYear();

    return(
        <>
        <footer className = "footer">
            <p className = "footer-text">
                © {year} Gustavo Arriaga
            </p>

            <p className = "footer-text">
                ALL RIGHTS RESERVED
            </p>
        </footer>
        </>
    )
}

export default Footer
