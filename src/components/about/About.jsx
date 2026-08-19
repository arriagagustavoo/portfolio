import "./About.css"
import myPhoto from "../../assets/image0.jpeg"
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
import { useCopy } from "../../i18n/languageContext"

// icons only, in the order the labels are listed in the copy
const interestIcons = [CodeIcon, Weight, ThreeDModel, Hardware, GameController, Television]

function About(){

    const copy = useCopy();
    const leadEyebrow = copy.about.leadEyebrow;
    const interestsEyebrow = copy.about.interestsEyebrow;

    // one gate per eyebrow, never nested: two data-visible ancestors would tie on specificity
    const [leadRef, leadVisible] = useInView();
    const [interestsRef, interestsVisible] = useInView();

    const leadDelay = { "--intro-delay": eyebrowDuration(leadEyebrow) + "ms" };
    const interestsDelay = { "--intro-delay": eyebrowDuration(interestsEyebrow) + "ms" };

    const bioParagraphs = copy.about.bioLines.map((line, index) => {
        return (
            <p className = "about-bio-line reveal-sweep" key = {index}>
                {line}
            </p>
        );
    });

    const interestBadges = copy.about.interests.map((label, index) => {
        const Icon = interestIcons[index];

        return (
            <p className = "about-table-badge reveal-flip" key = {index}>
                <Icon className = "about-badge-icon"/>
                {label}
            </p>
        );
    });

    return(
        <>
        <section className = "about" id = "about" aria-labelledby = "about-heading">
            <h2 className = "visually-hidden" id = "about-heading">{copy.about.heading}</h2>

            <div className = "about-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {leadEyebrow} active = {leadVisible}/>

                <div className = "about-main">
                    <div className = "about-top">
                        {/* fade, not sweep: the curtain underneath already moves sideways */}
                        <div className = "about-photo-frame reveal-fade">
                            <img className = "about-photo" src = {myPhoto} alt = {copy.about.photoAlt} loading = "lazy" decoding = "async"/>
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
                        <p>{copy.about.location}</p>
                    </div>

                    <div className = "about-info-item reveal-sweep">
                        <img className = "about-info-logo" src = {uhLogo} alt = {copy.about.schoolLogoAlt} loading = "lazy" decoding = "async"/>
                        <p>{copy.about.school}</p>
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
