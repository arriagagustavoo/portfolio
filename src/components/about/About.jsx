import "./About.css"
import myPhoto from "../../assets/luffy.jpg"
import Pin from "../icons/Pin"
import Television from "../icons/Television"
import GameController from "../icons/GameController"
import Weight from "../icons/Weight"
import ThreeDModel from "../icons/ThreeDModel"
import Hardware from "../icons/Hardware"
import uhLogo from "../../assets/uh-logo.svg"
import CodeIcon from "../icons/CodeIcon"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"

const leadEyebrow = "// Get to know me"
const interestsEyebrow = "// Some interests of mine"

// split so each line can stagger in on its own
const bioLines = [
    "Computer Science senior designing, building and shipping complete products to clients.",
    "Capstone in Software Design & already applying that in the real world.",
    "I handle everything from the first plan to the finished product & getting it found on Google.",
    "Digital or physical, I'll turn an idea into something real.",
    "Tell me what your business needs and I'll tell you how I'd build it.",
]

const interests = [
    { label: "Coding", Icon: CodeIcon },
    { label: "Fitness", Icon: Weight },
    { label: "Modeling", Icon: ThreeDModel },
    { label: "Hardware", Icon: Hardware },
    { label: "Gaming", Icon: GameController },
    { label: "Anime", Icon: Television },
]

function About(){

    // one gate per eyebrow, never nested: two data-visible ancestors would tie on specificity
    const [leadRef, leadVisible] = useInView();
    const [interestsRef, interestsVisible] = useInView();

    const leadDelay = { "--intro-delay": eyebrowDuration(leadEyebrow) + "ms" };
    const interestsDelay = { "--intro-delay": eyebrowDuration(interestsEyebrow) + "ms" };

    const bioParagraphs = bioLines.map((line) => {
        return (
            <p className = "about-bio-line reveal-sweep" key = {line}>
                {line}
            </p>
        );
    });

    const interestBadges = interests.map((interest) => {
        const Icon = interest.Icon;

        return (
            <p className = "about-table-badge reveal-flip" key = {interest.label}>
                <Icon className = "about-badge-icon"/>
                {interest.label}
            </p>
        );
    });

    return(
        <>
        <section className = "about" id = "about" aria-labelledby = "about-heading">
            <h2 className = "visually-hidden" id = "about-heading">About Gustavo Arriaga</h2>

            <div className = "about-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {leadEyebrow} active = {leadVisible}/>

                <div className = "about-main">
                    <div className = "about-top">
                        {/* fade, not sweep: the curtain underneath already moves sideways */}
                        <div className = "about-photo-frame reveal-fade">
                            <img className = "about-photo" src = {myPhoto} alt = "Gustavo Arriaga" loading = "lazy" decoding = "async"/>
                            <span className = "about-photo-wipe" aria-hidden = "true"></span>
                        </div>
                    </div>

                    <div className = "about-text">
                        {bioParagraphs}
                    </div>
                </div>

                <div className = "about-info">
                    <div className = "about-info-item reveal-sweep">
                        <Pin className = "about-info-icon"/>
                        <p>Houston, Texas</p>
                    </div>

                    <div className = "about-info-item reveal-sweep">
                        <img className = "about-info-logo" src = {uhLogo} alt = "University of Houston logo" loading = "lazy" decoding = "async"/>
                        <p>University of Houston</p>
                    </div>
                </div>
            </div>

            <div className = "about-interests" ref = {interestsRef} data-visible = {interestsVisible} style = {interestsDelay}>
                <SectionEyebrow text = {interestsEyebrow} tag = {true} active = {interestsVisible}/>

                <div className = "about-showcase">
                    {interestBadges}
                </div>
            </div>

        </section>
        </>
    )
}

export default About;
