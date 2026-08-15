import { useEffect } from "react"
import { Link } from "react-router-dom"
import "./Page.css"

const updated = "August 14, 2026"

function Privacy(){

    useEffect(() => {
        document.title = "Privacy Policy — Gustavo Arriaga"
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className = "page" aria-labelledby = "privacy-heading">
            <h1 className = "page-title" id = "privacy-heading">Privacy Policy</h1>
            <p className = "page-updated">Last updated {updated}</p>

            <div className = "page-body">
                <p className = "page-text">
                    This site is a personal portfolio run by Gustavo Arriaga in Houston, Texas.
                    It collects as little as possible, and nothing at all unless you choose to send it.
                </p>

                <h2 className = "page-heading">What the contact form collects</h2>
                <p className = "page-text">
                    If you submit the contact form, it sends whatever you typed into these fields:
                </p>
                <ul className = "page-list">
                    <li>Your name</li>
                    <li>Your email address</li>
                    <li>Your phone number, only if you choose to fill it in</li>
                    <li>The project type you selected</li>
                    <li>Your message</li>
                </ul>
                <p className = "page-text">
                    That goes to my inbox so I can reply. I use it to answer you and to discuss
                    the work you asked about. I do not sell it, rent it, or add it to any mailing
                    list, and there is no newsletter to be signed up for.
                </p>

                <h2 className = "page-heading">Who else handles it</h2>
                <p className = "page-text">
                    The form is delivered by Web3Forms, which processes the submission and
                    forwards it to me by email. The site itself is hosted by Vercel, and the
                    domain runs through Cloudflare. Each of those handles the data in transit
                    under its own privacy terms.
                </p>

                <h2 className = "page-heading">Analytics and cookies</h2>
                <p className = "page-text">
                    This site uses Vercel Analytics and Vercel Speed Insights to count page views
                    and measure loading performance. Both are cookieless and do not build a profile
                    of you or follow you to other sites. There is no Google Analytics, no advertising
                    pixel, and no tracking cookie, which is why you were never asked to accept one.
                </p>
                <p className = "page-text">
                    The only thing stored in your browser is your light or dark theme choice, kept
                    in local storage so the site remembers it on your next visit. It never leaves
                    your device. Clearing your browser data removes it.
                </p>

                <h2 className = "page-heading">How long it is kept</h2>
                <p className = "page-text">
                    Form submissions stay in my email until they are no longer useful. If you want
                    yours deleted, ask and I will remove it.
                </p>

                <h2 className = "page-heading">Questions</h2>
                <p className = "page-text">
                    Email gus@arriagagustavoo.com and I will answer.
                </p>
            </div>

            <Link className = "page-back" to = "/">Back to the site</Link>
        </section>
    )
}

export default Privacy
