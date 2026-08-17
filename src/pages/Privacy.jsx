import { useEffect } from "react"
import { Link } from "react-router-dom"
import "./Page.css"
import useDocumentMeta from "../hooks/useDocumentMeta"
import { useCopy, useLanguage } from "../i18n/languageContext"

function Privacy(){

    const copy = useCopy();
    const { basePath } = useLanguage();
    const page = copy.privacy;

    useDocumentMeta(copy.meta.privacy, "/privacy");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const formFields = page.formFields.map((field, index) => {
        return (
            <li key = {index}>{field}</li>
        );
    });

    // only the translated policy carries this line
    let governingNote = null;
    if(page.governing){
        governingNote = (
            <p className = "page-text">{page.governing}</p>
        );
    }

    return (
        <section className = "page" aria-labelledby = "privacy-heading">
            <h1 className = "page-title" id = "privacy-heading">{page.title}</h1>
            <p className = "page-updated">{page.updated}</p>

            <div className = "page-body">
                <p className = "page-text">{page.intro}</p>

                <h2 className = "page-heading">{page.formHeading}</h2>
                <p className = "page-text">{page.formIntro}</p>
                <ul className = "page-list">
                    {formFields}
                </ul>
                <p className = "page-text">{page.formUse}</p>

                <h2 className = "page-heading">{page.processorsHeading}</h2>
                <p className = "page-text">{page.processors}</p>

                <h2 className = "page-heading">{page.analyticsHeading}</h2>
                <p className = "page-text">{page.analytics}</p>
                <p className = "page-text">{page.storage}</p>

                <h2 className = "page-heading">{page.retentionHeading}</h2>
                <p className = "page-text">{page.retention}</p>

                <h2 className = "page-heading">{page.questionsHeading}</h2>
                <p className = "page-text">{page.questions}</p>

                {governingNote}
            </div>

            <Link className = "page-back" to = {basePath + "/"}>{page.back}</Link>
        </section>
    )
}

export default Privacy
