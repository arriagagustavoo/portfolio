import { useState, useEffect, useRef } from 'react'
import { track } from '@vercel/analytics'
import useTypewriter from '../../hooks/useTypewriter'
import useScramble from '../../hooks/useScramble'
import { useLanguage } from '../../i18n/languageContext'
import './Hero.css'

const nameText = 'Gustavo\nArriaga'

// each word owns a class the colour cycle keys off, so the copy has to stay three words
const mottoClasses = ['motto-design', 'motto-build', 'motto-ship']

function prefersReducedMotion(){
    if (typeof window === 'undefined'){
        return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// its own component because a hook can't be called from inside a map
function ServiceLine({ text, delay, typing }){
    const line = useTypewriter(text, 45, delay, typing)

    return (
        <li>{line.typed}</li>
    )
}

function Hero(){
    const { copy, basePath } = useLanguage()
    const eyebrowText = copy.hero.eyebrow
    const headingText = nameText.replace('\n', ' ') + copy.hero.headingSuffix

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

    // rendered twice, CSS hides one: desktop and mobile need it in different parents
    const status = (
        <>
            <span className = "hero-status-dot" aria-hidden="true"></span>
            {copy.hero.status}
            <span className = "hero-status-dot" aria-hidden="true"></span>
        </>
    )

    // same deal: inline under the name on mobile, stacked in the right column on desktop
    const motto = (
        <>
            {copy.hero.motto.map((word, index) => (
                <span className = {mottoClasses[index]} key = {index}>{word}</span>
            ))}
        </>
    )

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
                        {copy.hero.services.map((service, index) => (
                            <ServiceLine
                                key = {index}
                                text = {service}
                                delay = {1800 + index * 160}
                                typing = {animating}
                            />
                        ))}
                    </ul>
                </div>

                <div className = "hero-badges">
                    <div className = "hero-badge-track">
                        {copy.hero.badges.map((badge, index) => (
                            <p className = "hero-badge" key = {index}>{badge}</p>
                        ))}
                        {/* second set is what makes the loop seamless */}
                        {copy.hero.badges.map((badge, index) => (
                            <p className = "hero-badge" key = {`loop-${index}`} aria-hidden="true">{badge}</p>
                        ))}
                    </div>
                </div>

                <p className = "hero-motto hero-motto-stack">
                    {motto}
                </p>

                <div className = "hero-buttons">
                    <a className = "hero-button hero-button-primary" href = {basePath + "/#projects"}
                    onClick = {() => track("cta_hero_work")}>
                        {copy.hero.primaryCta}
                    </a>
                    <a className = "hero-button hero-button-secondary" href = {basePath + "/#contact"}
                    onClick = {() => track("cta_hero_contact")}>
                        {copy.hero.secondaryCta}
                    </a>
                </div>

            </div>
        </section>
    )
}

export default Hero
