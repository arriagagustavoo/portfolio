import './Hero.css'

function Hero(){

    return(
        <>
        <div className = "hero">
            <div className = "hero-stripes" aria-hidden="true"></div>

            <div className = "left-hero-text">
                <p className = "intro-1">
                    // Hey, I'm
                </p>
                <p className = "intro-2">
                    Gustavo <br></br>Arriaga
                </p>
                <p className = "intro-3">
                    -Undergraduate Computer Science Student @ University of Houston <br/>
                    -Learning and working with every aspect Computer Science has to offer<br/>
                    -Open to any freelance work; always willing to refine my skills & services
                </p>
            </div>

            <div className = "left-hero-badges">
                <div className = "hero-badge-row">
                    <p className = "hero-badge">
                        Computer Scientist
                    </p>
                    <p className = "hero-badge">
                        Freelancer
                    </p>
                </div>
                <div className = "hero-badge-row">
                    <p className = "hero-badge">
                        Designer
                    </p>
                    <p className = "hero-badge">
                        Engineer
                    </p>
                    <p className = "hero-badge">
                        Builder
                    </p>
                </div>
            </div>

            <div className = "left-hero-buttons">
                <a className = "hero-button" href = "#projects">
                    Check out my work
                </a>
                <a className = "hero-button" href = "#contact">
                    Contact me
                </a>
            </div>
        </div>
        </>
    )
}

export default Hero