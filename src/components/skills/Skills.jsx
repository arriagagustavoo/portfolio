import "./Skills.css"
import skillIcons from "../icons/skillIcons/skillIcons"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"
import { useCopy } from "../../i18n/languageContext"

// the names are exact-match keys into skillIcons, so only the category label is translated
const skillGroups = [
    {
        id: "languages",
        skills: ["Python", "C++", "C#", "Swift", "JavaScript", "TypeScript", "HTML", "CSS", "MATLAB", "R"],
    },
    {
        id: "web",
        skills: ["React", "Next.js", "Vite", "Express", "Node.js", "MongoDB", "PostgreSQL", "Supabase", "JWT", "Zod"],
    },
    {
        id: "creative",
        skills: ["Autodesk Fusion", "Figma", "Unity", "OpenGL", "Clip Studio Paint"],
    },
    {
        id: "tools",
        skills: ["Git", "GitHub", "Jenkins", "Ubuntu", "VS Code", "Claude", "npm", "OpenCV", "NumPy", "Playwright", "Puppeteer", "Vercel"],
    },
]

// no observer of its own: the whole section rides the eyebrow's gate, so the
// panels cannot land before the line has finished typing
function SkillGroup({ category, skills }){

    const skillBadges = skills.map((skill, index) => {
        // staggered here, the old per-position CSS rules stopped at 8 and the rest borrowed the panel's delay
        const stagger = { "--enter-delay": "calc(var(--intro-delay, 0ms) + 420ms + var(--group-delay, 0ms) + " + index * 40 + "ms)" };

        const Icon = skillIcons[skill];

        let icon;
        if(Icon === undefined){
            icon = null;
        }else{
            icon = <Icon className = "skill-badge-icon"/>;
        }

        return (
            <p className = "skill-badge reveal-flip" key = {skill} style = {stagger}>
                {icon}
                {skill}
            </p>
        );
    });

    return (
        /* the panel rises first, then its label and badges fill in */
        <div className = "skill-group reveal-rise">
            {/* flip, not sweep: sweep animates clip-path and would clobber the parallelogram */}
            <p className = "skill-group-label reveal-flip">
                {category}
            </p>

            <div className = "skill-group-badges">
                {skillBadges}
            </div>
        </div>
    );
}

function Skills({ ready = true }){

    const copy = useCopy();
    const skillsEyebrow = copy.skills.eyebrow;

    // ready lets a page hold this block back until the one above it has had its turn
    const [leadRef, inView] = useInView();
    const leadVisible = inView && ready;
    const leadDelay = { "--intro-delay": eyebrowDuration(skillsEyebrow) + "ms" };

    const groupPanels = skillGroups.map((group) => {
        return (
            <SkillGroup
                key = {group.id}
                category = {copy.skills.categories[group.id]}
                skills = {group.skills}
            />
        );
    });

    return(
        <>
        <section className = "skills" id = "skills" aria-labelledby = "skills-heading">
            <h2 className = "visually-hidden" id = "skills-heading">{copy.skills.heading}</h2>

            <div className = "skills-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {skillsEyebrow} active = {leadVisible}/>

                <div className = "skills-groups">
                    {groupPanels}
                </div>
            </div>
        </section>
        </>
    )
}

export default Skills
