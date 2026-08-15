import { useState, useEffect, useRef } from 'react'
import { track } from '@vercel/analytics'
import useTypewriter from '../../hooks/useTypewriter'
import useScramble from '../../hooks/useScramble'
import './Hero.css'

const badges = ['Freelancer', 'Designer', 'Engineer', 'Builder']

const services = [
    'Full-stack Custom Software',
    'Graphic Design & SEO ',
    '3D Models & Prints'
]

const eyebrowText = "// Hey, I'm"
const nameText = 'Gustavo\nArriaga'
const headingText = nameText.replace('\n', ' ') + ' — Websites, Software, Design & 3D Printing in Houston'

function prefersReducedMotion(){
    if (typeof window === 'undefined'){
        return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// rendered twice, CSS hides one: desktop and mobile need it in different parents
const status = (
    <>
        <span className = "hero-status-dot" aria-hidden="true"></span>
        Taking New Projects
        <span className = "hero-status-dot" aria-hidden="true"></span>
    </>
)

// same deal: inline under the name on mobile, stacked in the right column on desktop
const motto = (
    <>
        <span className = "motto-design">Design.</span>
        <span className = "motto-build">Build.</span>
        <span className = "motto-ship">Ship.</span>
    </>
)

// its own component because a hook can't be called from inside a map
function ServiceLine({ text, delay, typing }){
    const line = useTypewriter(text, 45, delay, typing)

    return (
        <li>{line.typed}</li>
    )
}

function Hero(){
    const [reduceMotion] = useState(prefersReducedMotion)
    // the hero is the first section, so a top-of-page load is already looking at it. waiting on the
    // observer costs a whole extra frame, and that frame sits behind the first full paint
    const [inView, setInView] = useState(() => {
        if (typeof window === 'undefined'){
            return false
        }

        return window.scrollY < window.innerHeight
    })
    const [fontsSettled, setFontsSettled] = useState(false)
    const heroRef = useRef(null)

    // the entrance runs on a clock, so starting it mid-load spends it behind a half-drawn page
    useEffect(() => {
        let cancelled = false
        let timer = null

        // the catch matters: a rejection here would win the race and strand the hero at opacity 0
        const faces = Promise.all([
            document.fonts.load('900 1em Geist'),
            document.fonts.load('400 1em "Geist Pixel"')
        ]).catch(() => null)

        // a stalled font can't hold the hero hostage forever
        const cap = new Promise((resolve) => {
            timer = setTimeout(resolve, 2000)
        })

        Promise.race([faces, cap]).then(() => {
            if (!cancelled){
                setFontsSettled(true)
            }
        })

        return () => {
            cancelled = true
            clearTimeout(timer)
        }
    }, [])

    // only for a refresh partway down the page, so the sequence isn't burnt before it's seen
    useEffect(() => {
        if (reduceMotion || inView){
            return
        }

        const node = heroRef.current

        if (!node){
            return
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting){
                    setInView(true)
                    observer.disconnect()
                }
            })
        }, { threshold: 0.25 })

        observer.observe(node)

        return () => observer.disconnect()
    }, [reduceMotion, inView])

    // ready gates the CSS, animating gates the JS-driven text effects
    const ready = (inView && fontsSettled) || reduceMotion
    const animating = inView && fontsSettled && !reduceMotion

    const eyebrow = useTypewriter(eyebrowText, 95, 250, animating)
    const name = useScramble(nameText, 85, 1800, animating)

    const nameLines = name.display.split('\n')

    return(
        <section className = "hero" id = "hero" ref = {heroRef} data-ready = {ready} aria-labelledby = "hero-heading">
            <div className = "hero-inner">

                <p className = "hero-status hero-status-solo">
                    {status}
                </p>

                <div className = "hero-intro">
                    <div className = "hero-eyebrow-row">
                        {/* ghost reserves the width so the badge doesn't walk while it types */}
                        <p className = "intro-1">
                            <span className = "intro-1-ghost" aria-hidden="true">{eyebrowText}</span>
                            <span className = "intro-1-live">
                                {eyebrow.typed}
                                <span className = "hero-caret"></span>
                            </span>
                        </p>

                        <p className = "hero-status hero-status-inline">
                            {status}
                        </p>
                    </div>

                    <h1 className = "intro-2" id = "hero-heading" data-resolved = {name.done}>
                        <span className = "visually-hidden">{headingText}</span>

                        {/* the visible copy spends 3s scrambled, so AT and crawlers read the hidden one */}
                        <span aria-hidden = "true">
                            {nameLines.map((line, index) => (
                                <span key = {index}>
                                    {line}
                                    {index < nameLines.length - 1 && <br />}
                                </span>
                            ))}
                        </span>
                    </h1>

                    <p className = "hero-motto hero-motto-inline">
                        {motto}
                    </p>

                    <ul className = "hero-services">
                        {services.map((service, index) => (
                            <ServiceLine
                                key = {service}
                                text = {service}
                                delay = {1800 + index * 160}
                                typing = {animating}
                            />
                        ))}
                    </ul>
                </div>

                <div className = "hero-badges">
                    <div className = "hero-badge-track">
                        {badges.map((badge) => (
                            <p className = "hero-badge" key = {badge}>{badge}</p>
                        ))}
                        {/* second set is what makes the loop seamless */}
                        {badges.map((badge) => (
                            <p className = "hero-badge" key = {`${badge}-loop`} aria-hidden="true">{badge}</p>
                        ))}
                    </div>
                </div>

                <p className = "hero-motto hero-motto-stack">
                    {motto}
                </p>

                <div className = "hero-buttons">
                    <a className = "hero-button hero-button-primary" href = "/#projects"
                    onClick = {() => track("cta_hero_work")}>
                        Check out my work
                    </a>
                    <a className = "hero-button hero-button-secondary" href = "/#contact"
                    onClick = {() => track("cta_hero_contact")}>
                        Contact Me
                    </a>
                </div>

            </div>
        </section>
    )
}

export default Hero
