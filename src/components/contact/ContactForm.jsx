import { useState } from "react"
import { track } from "@vercel/analytics"
import "./ContactForm.css"

// public by design: it ships in the bundle and is restricted by domain in the Web3Forms dashboard
const accessKey = "0fc04ae8-b271-4e9f-a6a4-b89234a02aea"

const projectTypes = [
    "Software Products",
    "Design & Ads",
    "3D Modeling & Printing",
    "Something else",
]

const emptyForm = {
    name: "",
    email: "",
    phone: "",
    projectType: projectTypes[0],
    message: "",
}

function validate(values){
    const found = {};

    if(!values.name.trim()){
        found.name = "Tell me what to call you.";
    }

    if(!values.email.trim()){
        found.email = "I need an email to reply to.";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())){
        found.email = "That doesn't look like an email address.";
    }

    if(!values.message.trim()){
        found.message = "Tell me a bit about the project.";
    }else if(values.message.trim().length < 10){
        found.message = "A few more words helps me give you a real answer.";
    }

    return found;
}

function ContactForm(){

    const [values, setValues] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    // idle | sending | sent | failed
    const [status, setStatus] = useState("idle");
    const [failMessage, setFailMessage] = useState("");
    const [botField, setBotField] = useState("");

    const handleChange = (event) => {
        const field = event.target.name;
        const next = { ...values, [field]: event.target.value };

        setValues(next);

        // only re-check a field the user has already left, or it complains while they're still typing
        if(touched[field]){
            setErrors(validate(next));
        }
    };

    const handleBlur = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
        setErrors(validate(values));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const found = validate(values);

        setErrors(found);
        setTouched({ name: true, email: true, message: true });

        if(Object.keys(found).length > 0){
            return;
        }

        // a filled honeypot is a bot, so show the normal success and send nothing
        if(botField){
            setStatus("sent");
            return;
        }

        setStatus("sending");
        setFailMessage("");

        const payload = {
            access_key: accessKey,
            subject: "Portfolio inquiry from " + values.name.trim(),
            from_name: "arriagagustavoo.com",
            name: values.name.trim(),
            email: values.email.trim(),
            phone: values.phone.trim(),
            project_type: values.projectType,
            message: values.message.trim(),
        };

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.success){
                track("contact_form_sent", { projectType: values.projectType });
                setStatus("sent");
            }else{
                track("contact_form_failed");
                setStatus("failed");
                setFailMessage("That didn't go through. You can reach me at gus@arriagagustavoo.com instead.");
            }
        }).catch(() => {
            setStatus("failed");
            setFailMessage("That didn't send. Check your connection, or email gus@arriagagustavoo.com.");
        });
    };

    const errorFor = (field) => {
        if(!touched[field]){
            return null;
        }

        if(!errors[field]){
            return null;
        }

        return (
            <p className = "contact-form-error" id = {"contact-" + field + "-error"}>
                {errors[field]}
            </p>
        );
    };

    const isInvalid = (field) => {
        if(touched[field] && errors[field]){
            return true;
        }

        return false;
    };

    const describedBy = (field) => {
        if(touched[field] && errors[field]){
            return "contact-" + field + "-error";
        }

        return undefined;
    };

    if(status === "sent"){
        const firstName = values.name.trim().split(" ")[0];

        return (
            <div className = "contact-form-success reveal-rise" role = "status">
                <p className = "contact-form-success-title">Message sent.</p>
                <p className = "contact-form-success-line">
                    Thanks {firstName}. I reply within 24 hours.
                </p>
            </div>
        );
    }

    let submitLabel = "Send it";
    if(status === "sending"){
        submitLabel = "Sending...";
    }

    let failNote = null;
    if(status === "failed"){
        failNote = (
            <p className = "contact-form-fail" role = "alert">
                {failMessage}
            </p>
        );
    }

    const typeOptions = projectTypes.map((type) => {
        return (
            <option value = {type} key = {type}>{type}</option>
        );
    });

    return (
        <form className = "contact-form" onSubmit = {handleSubmit} noValidate>

            <div className = "contact-form-row contact-form-row-a reveal-sweep">
                <div className = "contact-form-field">
                    <label className = "contact-form-label" htmlFor = "contact-name">Name</label>
                    <input
                        className = "contact-form-input"
                        id = "contact-name"
                        name = "name"
                        type = "text"
                        autoComplete = "name"
                        value = {values.name}
                        onChange = {handleChange}
                        onBlur = {handleBlur}
                        aria-invalid = {isInvalid("name")}
                        aria-describedby = {describedBy("name")}
                    />
                    {errorFor("name")}
                </div>

                <div className = "contact-form-field">
                    <label className = "contact-form-label" htmlFor = "contact-email">Email</label>
                    <input
                        className = "contact-form-input"
                        id = "contact-email"
                        name = "email"
                        type = "email"
                        autoComplete = "email"
                        value = {values.email}
                        onChange = {handleChange}
                        onBlur = {handleBlur}
                        aria-invalid = {isInvalid("email")}
                        aria-describedby = {describedBy("email")}
                    />
                    {errorFor("email")}
                </div>
            </div>

            <div className = "contact-form-row contact-form-row-b reveal-sweep">
                <div className = "contact-form-field">
                    <label className = "contact-form-label" htmlFor = "contact-phone">
                        Phone <span className = "contact-form-optional">optional</span>
                    </label>
                    <input
                        className = "contact-form-input"
                        id = "contact-phone"
                        name = "phone"
                        type = "tel"
                        autoComplete = "tel"
                        value = {values.phone}
                        onChange = {handleChange}
                        onBlur = {handleBlur}
                    />
                </div>

                <div className = "contact-form-field">
                    <label className = "contact-form-label" htmlFor = "contact-type">Project type</label>
                    <select
                        className = "contact-form-input contact-form-select"
                        id = "contact-type"
                        name = "projectType"
                        value = {values.projectType}
                        onChange = {handleChange}
                    >
                        {typeOptions}
                    </select>
                </div>
            </div>

            <div className = "contact-form-field contact-form-message reveal-sweep">
                <label className = "contact-form-label" htmlFor = "contact-message">Message</label>
                <textarea
                    className = "contact-form-input contact-form-textarea"
                    id = "contact-message"
                    name = "message"
                    rows = "5"
                    value = {values.message}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    aria-invalid = {isInvalid("message")}
                    aria-describedby = {describedBy("message")}
                />
                {errorFor("message")}
            </div>

            {/* honeypot: off-screen and untabbable, so only a bot fills it */}
            <input
                className = "contact-form-bot"
                type = "text"
                name = "botcheck"
                tabIndex = {-1}
                autoComplete = "off"
                value = {botField}
                onChange = {(event) => setBotField(event.target.value)}
                aria-hidden = "true"
            />

            {/* rise, not sweep: reveal-sweep animates clip-path and would flatten the slant */}
            <button className = "contact-form-submit reveal-rise" type = "submit" disabled = {status === "sending"}>
                {submitLabel}
            </button>

            <p className = "contact-form-promise reveal-sweep">I reply within 24 hours.</p>

            {failNote}
        </form>
    )
}

export default ContactForm
