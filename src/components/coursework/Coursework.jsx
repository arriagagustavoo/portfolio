import "./Coursework.css"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"
import { useCopy } from "../../i18n/languageContext"

// the class names and group labels both live in the copy, keyed by these ids
const groupIds = ["theory", "math", "systems", "graphics"]

function Coursework({ ready = true }){

    const copy = useCopy();
    const eyebrow = copy.coursework.eyebrow;

    // one gate for the whole section, so nothing lands before the eyebrow has finished typing
    const [leadRef, inView] = useInView();
    const leadVisible = inView && ready;
    const leadDelay = { "--intro-delay": eyebrowDuration(eyebrow) + "ms" };

    const panels = groupIds.map((id) => {
        const courses = copy.coursework.courses[id].map((course, index) => {
            // staggered here so the delay can never run out of rows
            const stagger = { "--enter-delay": "calc(var(--intro-delay, 0ms) + 200ms + var(--group-delay, 0ms) + " + index * 45 + "ms)" };

            return (
                <li className = "course reveal-fade" key = {course} style = {stagger}>{course}</li>
            );
        });

        return (
            <div className = "course-group reveal-rise" key = {id}>
                {/* flip, like the skills labels, since sweep would clobber the skewed shape */}
                <p className = "course-group-label reveal-flip">{copy.coursework.groups[id]}</p>

                <ul className = "course-list">
                    {courses}
                </ul>
            </div>
        );
    });

    return (
        <section className = "coursework" id = "coursework" aria-labelledby = "coursework-heading">
            <h2 className = "visually-hidden" id = "coursework-heading">{copy.coursework.heading}</h2>

            <div className = "coursework-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {eyebrow} active = {leadVisible}/>

                <div className = "course-groups">
                    {panels}
                </div>
            </div>
        </section>
    )
}

export default Coursework
