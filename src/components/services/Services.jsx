import "./Services.css"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"

const servicesEyebrow = "// Services"

const services = [
    {
        tag: "Freelance",
        title: "Software Products",
        description: "Custom Websites, Applications, Tools.",

    },
    {
        tag: "Get found",
        title: "Design & Ads",
        description: "Branding, graphics, and online marketing.",
    },
    {
        tag: "Made to order",
        title: "3D Modeling & Printing",
        description: "CAD designs, Prototype/Finished products, Custom prints.",
    },
    {
        tag: "Let's talk",
        title: "Open to Anything",
        description: "Reach out for any service listed or not listed.",
    }
]

function Services(){

    const [leadRef, leadVisible] = useInView();
    const leadDelay = { "--intro-delay": eyebrowDuration(servicesEyebrow) + "ms" };

    const serviceCards = services.map((service) => {
        return (
            <div className = "service-card reveal-rise" key = {service.title}>
                <p className = "service-tag">
                    {service.tag}
                </p>

                <p className = "service-title">
                    {service.title}
                </p>

                <p className = "service-description">
                    {service.description}
                </p>
            </div>
        );
    });

    return(
        <>
        <div className = "services" id = "services">
            <div className = "services-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {servicesEyebrow} active = {leadVisible}/>

                <div className = "services-grid">
                    {serviceCards}
                </div>
            </div>
        </div>
        </>
    )
}

export default Services
