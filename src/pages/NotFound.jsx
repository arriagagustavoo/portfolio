import { useEffect } from "react"
import { Link } from "react-router-dom"
import "./Page.css"

function NotFound(){

    useEffect(() => {
        document.title = "Page not found — Gustavo Arriaga"
    }, []);

    return (
        <section className = "page" aria-labelledby = "notfound-heading">
            <p className = "page-code" aria-hidden = "true">404</p>
            <h1 className = "page-title" id = "notfound-heading">This page doesn't exist.</h1>

            <div className = "page-body">
                <p className = "page-text">
                    The link is either wrong or something that used to be here has moved.
                    Nothing on the site links to this address, so it was most likely mistyped.
                </p>
            </div>

            <Link className = "page-back" to = "/">Back to the site</Link>
        </section>
    )
}

export default NotFound
