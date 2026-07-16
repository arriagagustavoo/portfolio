import "./Services.css"

const services = [
    {
        tag: "Freelance",
        title: "Software Products",
        description: "Custom Websites, Graphic Design, Applications, Tools.",
        
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

    const serviceCards = services.map((service) => {
        return (
            <div className = "service-card" key = {service.title}>
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
            <p className = "services-intro">
                // Services
            </p>

            <div className = "services-grid">
                {serviceCards}
            </div>
        </div>
        </>
    )
}

export default Services
