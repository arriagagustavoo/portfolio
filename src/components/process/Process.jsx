import "./Process.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"
import { useCopy, useLanguage } from "../../i18n/languageContext"

// which case study a step's optional link opens, kept out of the copy so a translation can't break it
const stepTargets = { 1: "client-portal" }
const contractTarget = "bracketed"

function Process(){

    const copy = useCopy();
    const { basePath, sectionHref } = useLanguage();
    const contactHref = sectionHref("contact");
    const leadEyebrow = copy.process.leadEyebrow;
    const guaranteeEyebrow = copy.process.guaranteeEyebrow;
    const faqEyebrow = copy.process.faqEyebrow;

    // one gate per eyebrow, never nested: two data-visible ancestors would tie on specificity
    const [leadRef, leadVisible] = useInView();
    const [stepsRef, stepsVisible] = useInView();
    const [guaranteeRef, guaranteeVisible] = useInView();
    const [faqRef, faqVisible] = useInView();

    // watches the section only, it carries no data-visible so it is not a second gate
    const [sectionRef, sectionVisible] = useInView();
    const [stage, setStage] = useState(0);

    // a big screen has every block in view at once, so each waits for the eyebrow above it to finish
    const guaranteeStart = eyebrowDuration(leadEyebrow);
    const faqStart = guaranteeStart + eyebrowDuration(guaranteeEyebrow);

    useEffect(() => {
        if (!sectionVisible){
            return;
        }

        const timers = [
            setTimeout(() => setStage(1), guaranteeStart),
            setTimeout(() => setStage(2), faqStart),
        ];

        return () => timers.forEach(clearTimeout);
    }, [sectionVisible, guaranteeStart, faqStart]);

    const guaranteeReady = guaranteeVisible && stage >= 1;
    const faqReady = faqVisible && stage >= 2;

    // the steps have no eyebrow of their own, so they wait out the lead's
    const stepsDelay = { "--intro-delay": eyebrowDuration(leadEyebrow) + "ms" };
    const guaranteeDelay = { "--intro-delay": eyebrowDuration(guaranteeEyebrow) + "ms" };
    const faqDelay = { "--intro-delay": eyebrowDuration(faqEyebrow) + "ms" };

    const stepCards = copy.process.steps.map((step, index) => {
        let stepLink = null;
        const target = stepTargets[index];

        if (target && step.link){
            stepLink = <Link className = "service-link" to = {basePath + "/work/" + target}>{step.link}</Link>;
        }

        return (
            <div className = "process-step reveal-rise" key = {index}>
                <p className = "process-step-title">{step.title}</p>
                <p className = "process-step-body">{step.body}</p>
                {stepLink}
            </div>
        );
    });

    const guaranteeCards = copy.process.guarantees.map((item, index) => {
        return (
            <div className = "process-guarantee reveal-sweep" key = {index}>
                <p className = "process-guarantee-title">{item.title}</p>
                <p className = "process-guarantee-body">{item.body}</p>
            </div>
        );
    });

    // details/summary, so it opens without JS and is keyboard operable for free
    const faqItems = copy.process.faqs.map((item, index) => {
        // staggered here, not in CSS, so the delay can never run out of cards
        const stagger = { "--enter-delay": "calc(var(--intro-delay, 0ms) + " + index * 70 + "ms)" };

        return (
            <details className = "process-faq reveal-sweep" key = {index} style = {stagger}>
                <summary className = "process-faq-question">{item.question}</summary>
                <p className = "process-faq-answer">{item.answer}</p>
            </details>
        );
    });

    return(
        <section className = "process" id = "process" aria-labelledby = "process-heading" ref = {sectionRef}>
            <h2 className = "visually-hidden" id = "process-heading">{copy.process.heading}</h2>

            <div className = "process-lead" ref = {leadRef} data-visible = {leadVisible}>
                <SectionEyebrow text = {leadEyebrow} active = {leadVisible}/>
            </div>

            <div className = "process-block" ref = {stepsRef} data-visible = {stepsVisible} style = {stepsDelay}>
                <div className = "process-steps">
                    {stepCards}
                </div>
            </div>

            <div className = "process-block" ref = {guaranteeRef} data-visible = {guaranteeReady} style = {guaranteeDelay}>
                <div className = "process-block-head">
                    <SectionEyebrow text = {guaranteeEyebrow} tag = {true} active = {guaranteeReady}/>

                    <p className = "process-note reveal-fade">
                        <span className = "process-closing-text">{copy.process.guaranteeNote.text}</span>
                        <Link className = "service-link" to = {basePath + "/work/" + contractTarget}>{copy.process.guaranteeNote.link}</Link>
                    </p>
                </div>

                <div className = "process-guarantees">
                    {guaranteeCards}
                </div>
            </div>

            <div className = "process-block" ref = {faqRef} data-visible = {faqReady} style = {faqDelay}>
                <SectionEyebrow text = {faqEyebrow} tag = {true} active = {faqReady}/>

                <div className = "process-faqs">
                    {faqItems}
                </div>

                <p className = "process-closing reveal-fade">
                    <span className = "process-closing-text">{copy.process.closing.text}</span>
                    <a className = "service-link" href = {contactHref}>{copy.process.closing.link}</a>
                </p>
            </div>
        </section>
    )
}

export default Process
