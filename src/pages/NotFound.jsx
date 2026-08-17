import { Link } from "react-router-dom"
import "./Page.css"
import useDocumentMeta from "../hooks/useDocumentMeta"
import { useCopy, useLanguage } from "../i18n/languageContext"

function NotFound(){

    const copy = useCopy();
    const { basePath } = useLanguage();

    // null: a 404 has no canonical url and no twin to translate to
    useDocumentMeta(copy.meta.notFound, null);

    return (
        <section className = "page" aria-labelledby = "notfound-heading">
            <p className = "page-code" aria-hidden = "true">404</p>
            <h1 className = "page-title" id = "notfound-heading">{copy.notFound.title}</h1>

            <div className = "page-body">
                <p className = "page-text">
                    {copy.notFound.body}
                </p>
            </div>

            <Link className = "page-back" to = {basePath + "/"}>{copy.notFound.back}</Link>
        </section>
    )
}

export default NotFound
