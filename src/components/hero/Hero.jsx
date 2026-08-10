import './Hero.css'

const badges = ['Freelancer', 'Designer', 'Engineer', 'Builder']

const services = [
    'Full-stack Custom Software',
    'End-to-End Products',
    '3D Models & Prints'
]

function Hero(){

    return(
        <div className = "hero" id = "hero">
            <div className = "hero-inner">

                <p className = "hero-status">
                    <span className = "hero-status-dot" aria-hidden="true"></span>
                    Available for Work
                    <span className = "hero-status-dot" aria-hidden="true"></span>
                </p>

                <div className = "hero-intro">
                    <p className = "intro-1">
                        // Hey, I&apos;m
                    </p>

                    <p className = "intro-2">
                        Gustavo <br></br>Arriaga
                    </p>

                    <ul className = "hero-services">
                        {services.map((service) => (
                            <li key = {service}>{service}</li>
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

                <p className = "hero-motto">
                    <span className = "motto-design">Design.</span>
                    <span className = "motto-build">Build.</span>
                    <span className = "motto-ship">Ship.</span>
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
