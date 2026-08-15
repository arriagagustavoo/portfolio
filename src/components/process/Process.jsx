import "./Process.css"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"

const leadEyebrow = "// How this works"
const stepsEyebrow = "// The process"
const guaranteeEyebrow = "// What you're guaranteed"
const paymentEyebrow = "// Payment"
const faqEyebrow = "// Common questions"

const steps = [
    {
        number: "01",
        title: "Contact",
        body: "Tell me what your business needs, in plain words.",
    },
    {
        number: "02",
        title: "Proposal",
        body: "You get the scope, the price and the timeline in writing before anything starts.",
    },
    {
        number: "03",
        title: "Build",
        body: "I build it and show you progress along the way, so the end is never a surprise.",
    },
    {
        number: "04",
        title: "Handoff",
        body: "Accounts go in your name, I walk you through it, and I stay reachable.",
    },
]

// every line here comes from the signed contract, not from marketing copy
const guarantees = [
    {
        title: "The domain and hosting are yours",
        body: "Registered in your name, on your payment method. I hold admin access to do the work, but the accounts belong to you.",
    },
    {
        title: "No surprise charges",
        body: "Anything outside what we agreed is quoted in writing first, and no work on it starts until you approve.",
    },
    {
        title: "You can leave with everything",
        body: "Either of us can end it with 30 days' notice. Your accounts, data exports and records get handed over.",
    },
    {
        title: "Your data stays yours",
        body: "The information your site collects and the documents it generates belong to you.",
    },
]

const paymentPoints = [
    "A deposit (...%) when you sign, the remainder on delivery.",
    "Zelle, bank transfer, or check.",
    "Monthly maintenance is optional and starts at launch: uptime, bug fixes and small tweaks. New features are quoted separately.",
]

const faqs = [
    {
        question: "Do I need to know anything technical?",
        answer: "No. If you can describe what your business does and what you want people to be able to do on the site, that is enough. I handle the rest, and explain any part of it you want explained.",
    },
    {
        question: "How long does it take?",
        answer: "It depends on the package and on how quickly content comes back from you. You get a timeline in the proposal before any work begins, so you are never left guessing.",
    },
    {
        question: "What if I already have a domain?",
        answer: "Then we use it. If you do not have one yet, it gets registered in your name rather than mine.",
    },
    {
        question: "Do you only work with businesses in Houston?",
        answer: "No. Houston is where I am and local businesses are who I work with most, but the work itself is remote either way.",
    },
    {
        question: "What happens after it launches?",
        answer: "The site keeps running. Monthly maintenance is optional and covers uptime, bug fixes and small tweaks. Without it nothing breaks, you just pay per change instead.",
    },
    {
        question: "Can I add things later?",
        answer: "Yes. New features are quoted separately, so you decide whether one is worth it rather than finding it on an invoice.",
    },
    {
        question: "What do you need from me to start?",
        answer: "What your business does, any branding you already have, and the text and images you want on the site. If you do not have those, producing them is part of what the higher packages cover.",
    },
]

function Process(){

    // one gate per eyebrow, never nested: two data-visible ancestors would tie on specificity
    const [leadRef, leadVisible] = useInView();
    const [stepsRef, stepsVisible] = useInView();
    const [guaranteeRef, guaranteeVisible] = useInView();
    const [paymentRef, paymentVisible] = useInView();
    const [faqRef, faqVisible] = useInView();

    const stepsDelay = { "--intro-delay": eyebrowDuration(stepsEyebrow) + "ms" };
    const guaranteeDelay = { "--intro-delay": eyebrowDuration(guaranteeEyebrow) + "ms" };
    const paymentDelay = { "--intro-delay": eyebrowDuration(paymentEyebrow) + "ms" };
    const faqDelay = { "--intro-delay": eyebrowDuration(faqEyebrow) + "ms" };

    const stepCards = steps.map((step) => {
        return (
            <div className = "process-step reveal-rise" key = {step.number}>
                <p className = "process-step-number">{step.number}</p>
                <p className = "process-step-title">{step.title}</p>
                <p className = "process-step-body">{step.body}</p>
            </div>
        );
    });

    const guaranteeCards = guarantees.map((item) => {
        return (
            <div className = "process-guarantee reveal-sweep" key = {item.title}>
                <p className = "process-guarantee-title">{item.title}</p>
                <p className = "process-guarantee-body">{item.body}</p>
            </div>
        );
    });

    const paymentList = paymentPoints.map((point) => {
        return (
            <li key = {point}>{point}</li>
        );
    });

    // details/summary, so it opens without JS and is keyboard operable for free
    const faqItems = faqs.map((item) => {
        return (
            <details className = "process-faq reveal-sweep" key = {item.question}>
                <summary className = "process-faq-question">{item.question}</summary>
                <p className = "process-faq-answer">{item.answer}</p>
            </details>
        );
    });

    return(
        <section className = "process" id = "process" aria-labelledby = "process-heading">
            <h2 className = "visually-hidden" id = "process-heading">How working together goes, guarantees, payment terms and common questions</h2>

            <div className = "process-lead" ref = {leadRef} data-visible = {leadVisible}>
                <SectionEyebrow text = {leadEyebrow} active = {leadVisible}/>
            </div>

            <div className = "process-block" ref = {stepsRef} data-visible = {stepsVisible} style = {stepsDelay}>
                <SectionEyebrow text = {stepsEyebrow} tag = {true} active = {stepsVisible}/>

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
