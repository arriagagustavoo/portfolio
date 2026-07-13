import "./Footer.css"

function Footer(){

    const year = new Date().getFullYear();

    return(
        <>
        <div className = "footer">
            <p className = "footer-text">
                © {year} Gustavo Arriaga
            </p>

            <p className = "footer-text">
                ALL RIGHTS RESERVED
            </p>
        </div>
        </>
    )
}

export default Footer
