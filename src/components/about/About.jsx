import "./About.css"
import myPhoto from "../../assets/image0.jpeg"
import Pin from "../icons/Pin"
import GradCap from "../icons/GradCap"
import Briefcase from "../icons/Briefcase"
import Television from "../icons/Television"
import GameController from "../icons/GameController"
import Weight from "../icons/Weight"
import ThreeDModel from "../icons/ThreeDModel"
import Hardware from "../icons/Hardware"
import uhLogo from "../../assets/uh-logo.svg"
import CodeIcon from "../icons/CodeIcon"
import Palette from "../icons/Palette"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"
import { useCopy } from "../../i18n/languageContext"

// icons only, in the order the labels are listed in the copy
const interestIcons = [CodeIcon, Palette, Weight, ThreeDModel, Hardware, GameController, Television]

function About(){

    const copy = useCopy();
    const leadEyebrow = copy.about.leadEyebrow;
    const whyEyebrow = copy.about.whyEyebrow;
    const interestsEyebrow = copy.about.interestsEyebrow;

    // one gate per eyebrow, never nested: two data-visible ancestors would tie on specificity
    const [leadRef, leadVisible] = useInView();
    const [whyRef, whyVisible] = useInView();
    const [interestsRef, interestsVisible] = useInView();

    const leadDelay = { "--intro-delay": eyebrowDuration(leadEyebrow) + "ms" };
    const whyDelay = { "--intro-delay": eyebrowDuration(whyEyebrow) + "ms" };
    const interestsDelay = { "--intro-delay": eyebrowDuration(interestsEyebrow) + "ms" };

    const bioParagraphs = copy.about.bioLines.map((line, index) => {
        return (
            <p className = "about-bio-line reveal-sweep" key = {index}>
                {line}
            </p>
        );
    });

    const reasonCards = copy.about.reasons.map((reason) => {
        return (
            <div className = "about-reason reveal-rise" key = {reason.title}>
                <p className = "about-reason-title">{reason.title}</p>
                <p className = "about-reason-body">{reason.body}</p>
            </div>
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

                    <div className = "about-copy">
                        <div className = "about-info">
                            <div className = "about-info-item reveal-sweep">
                                <Briefcase className = "about-info-icon"/>
                                <p>{copy.about.freelancing}</p>
                            </div>

                            <div className = "about-info-item reveal-sweep">
                                <Pin className = "about-info-icon"/>
                                <p>{copy.about.location}</p>
                            </div>

                            <div className = "about-info-item reveal-sweep">
                                <img className = "about-info-logo" src = {uhLogo} alt = {copy.about.schoolLogoAlt} loading = "lazy" decoding = "async"/>
                                <p>{copy.about.school}</p>
                            </div>

                            <div className = "about-info-item reveal-sweep">
                                <GradCap className = "about-info-icon"/>
                                <p>{copy.about.degree}</p>
                            </div>
                        </div>

                        <div className = "about-text">
                            {bioParagraphs}
                        </div>

                        <figure className = "about-quote reveal-rise">
                            <blockquote className = "about-quote-text">{copy.about.quote.text}</blockquote>
                            <figcaption className = "about-quote-source">{copy.about.quote.source}</figcaption>
                        </figure>
                    </div>
                </div>
            </div>

            <div className = "about-why" ref = {whyRef} data-visible = {whyVisible} style = {whyDelay}>
                <SectionEyebrow text = {whyEyebrow} tag = {true} active = {whyVisible}/>

                <div className = "about-reasons">
                    {reasonCards}
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
