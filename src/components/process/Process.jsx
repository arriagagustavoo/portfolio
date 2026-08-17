import "./Process.css"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"
import { useCopy } from "../../i18n/languageContext"

function Process(){

    const copy = useCopy();
    const leadEyebrow = copy.process.leadEyebrow;
    const guaranteeEyebrow = copy.process.guaranteeEyebrow;
    const paymentEyebrow = copy.process.paymentEyebrow;
    const faqEyebrow = copy.process.faqEyebrow;

    // one gate per eyebrow, never nested: two data-visible ancestors would tie on specificity
    const [leadRef, leadVisible] = useInView();
    const [stepsRef, stepsVisible] = useInView();
    const [guaranteeRef, guaranteeVisible] = useInView();
    const [paymentRef, paymentVisible] = useInView();
    const [faqRef, faqVisible] = useInView();

    const guaranteeDelay = { "--intro-delay": eyebrowDuration(guaranteeEyebrow) + "ms" };
    const paymentDelay = { "--intro-delay": eyebrowDuration(paymentEyebrow) + "ms" };
    const faqDelay = { "--intro-delay": eyebrowDuration(faqEyebrow) + "ms" };

    const stepCards = copy.process.steps.map((step) => {
        return (
            <div className = "process-step reveal-rise" key = {step.number}>
                <p className = "process-step-number">{step.number}</p>
                <p className = "process-step-title">{step.title}</p>
                <p className = "process-step-body">{step.body}</p>
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

    const paymentList = copy.process.paymentPoints.map((point, index) => {
        return (
            <li key = {index}>{point}</li>
        );
    });

    // details/summary, so it opens without JS and is keyboard operable for free
    const faqItems = copy.process.faqs.map((item, index) => {
        return (
            <details className = "process-faq reveal-sweep" key = {index}>
                <summary className = "process-faq-question">{item.question}</summary>
                <p className = "process-faq-answer">{item.answer}</p>
            </details>
        );
    });

    return(
        <section className = "process" id = "process" aria-labelledby = "process-heading">
            <h2 className = "visually-hidden" id = "process-heading">{copy.process.heading}</h2>

            <div className = "process-lead" ref = {leadRef} data-visible = {leadVisible}>
                <SectionEyebrow text = {leadEyebrow} active = {leadVisible}/>
            </div>

            <div className = "process-block" ref = {stepsRef} data-visible = {stepsVisible}>
                <div className = "process-steps">
                    {stepCards}
                </div>
            </div>

            <div className = "process-block" ref = {guaranteeRef} data-visible = {guaranteeVisible} style = {guaranteeDelay}>
                <SectionEyebrow text = {guaranteeEyebrow} tag = {true} active = {guaranteeVisible}/>

                <div className = "process-guarantees">
                    {guaranteeCards}
                </div>
            </div>

            <div className = "process-block" ref = {paymentRef} data-visible = {paymentVisible} style = {paymentDelay}>
                <SectionEyebrow text = {paymentEyebrow} tag = {true} active = {paymentVisible}/>

                <ul className = "process-payment reveal-sweep">
                    {paymentList}
                </ul>
            </div>

            <div className = "process-block" ref = {faqRef} data-visible = {faqVisible} style = {faqDelay}>
                <SectionEyebrow text = {faqEyebrow} tag = {true} active = {faqVisible}/>

                <div className = "process-faqs">
                    {faqItems}
                </div>
            </div>
        </section>
    )
}

export default Process
