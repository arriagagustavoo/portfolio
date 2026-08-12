import { useState } from 'react'
import useTypewriter from './useTypewriter'
import useScramble from './useScramble'
import './Hero.css'

const badges = ['Freelancer', 'Designer', 'Engineer', 'Builder']

const services = [
    'Full-stack Custom Software',
    'End-to-End Products',
    '3D Models & Prints'
]

const eyebrowText = "// Hey, I'm"
const nameText = 'Gustavo\nArriaga'

function prefersReducedMotion(){
    if (typeof window === 'undefined'){
        return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// desktop centres this on its own row, mobile sits it beside the eyebrow —
// different parents, so it renders twice and CSS hides one
const status = (
    <>
        <span className = "hero-status-dot" aria-hidden="true"></span>
        Available for Work
        <span className = "hero-status-dot" aria-hidden="true"></span>
    </>
)

// mobile puts this inline under the name, desktop stacks it in the right
// column — different parents, so it renders twice and CSS hides one
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
    // CSS can switch an animation off, but a JS-driven effect has to be told
    const [animating] = useState(() => !prefersReducedMotion())

    const eyebrow = useTypewriter(eyebrowText, 95, 250, animating)
    const name = useScramble(nameText, 85, 400, animating)

    const nameLines = name.display.split('\n')

    return(
        <div className = "hero" id = "hero">
            <div className = "hero-inner">

                <p className = "hero-status hero-status-solo">
                    {status}
                </p>

                <div className = "hero-intro">
                    <div className = "hero-eyebrow-row">
                        {/* the ghost holds the full width so the status badge
                            beside it doesn't get shoved along as this types */}
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

                    <p className = "intro-2" data-resolved = {name.done}>
                        {nameLines.map((line, index) => (
                            <span key = {index}>
                                {line}
                                {index < nameLines.length - 1 && <br />}
                            </span>
                        ))}
                    </p>

                    <p className = "hero-motto hero-motto-inline">
                        {motto}
                    </p>

                    <ul className = "hero-services">
                        {services.map((service, index) => (
                            <ServiceLine
                                key = {service}
                                text = {service}
                                delay = {700 + index * 160}
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
                    <a className = "hero-button hero-button-primary" href = "#projects">
                        Check out my work
                    </a>
                    <a className = "hero-button hero-button-secondary" href = "#contact">
                        Contact Me
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Hero
