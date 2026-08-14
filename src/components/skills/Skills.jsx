import "./Skills.css"
import skillIcons from "../icons/skillIcons/skillIcons"
import SectionEyebrow from "../sectionEyebrow/SectionEyebrow"
import { eyebrowDuration } from "../sectionEyebrow/eyebrowTiming"
import useInView from "../../hooks/useInView"

const skillsEyebrow = "// Skills"

const skillGroups = [
    {
        category: "Languages",
        skills: ["Python", "C++", "C#", "JavaScript", "HTML", "CSS", "MATLAB"],
    },
    {
        category: "Web Dev",
        skills: ["React", "Vite", "Express", "Node.js", "MongoDB", "PostgreSQL"],
    },
    {
        category: "Creative Work",
        skills: ["Autodesk Fusion", "Figma", "Unity", "OpenGL", "Clip Studio Paint"],
    },
    {
        category: "Tools & Libraries",
        skills: ["Git", "GitHub", "Jenkins", "Ubuntu", "VS Code", "npm", "OpenCV", "NumPy"],
    },
]

// no observer of its own: the whole section rides the eyebrow's gate, so the
// panels cannot land before the line has finished typing
function SkillGroup({ category, skills }){

    const skillBadges = skills.map((skill) => {
        const Icon = skillIcons[skill];

        let icon;
        if(Icon === undefined){
            icon = null;
        }else{
            icon = <Icon className = "skill-badge-icon"/>;
        }

        return (
            <p className = "skill-badge reveal-flip" key = {skill}>
                {icon}
                {skill}
            </p>
        );
    });

    return (
        /* the panel arrives the same way the marquee does, then fills itself in */
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

function Skills(){

    const [leadRef, leadVisible] = useInView();
    const leadDelay = { "--intro-delay": eyebrowDuration(skillsEyebrow) + "ms" };

    // combine all groups to 1 list
    const allSkills = skillGroups.flatMap((group) => group.skills);

    // duplicate list to prevent stopping loop
    const carouselSkills = allSkills.concat(allSkills);

    const carouselLogos = carouselSkills.map((skill, index) => {
        const Icon = skillIcons[skill];

        if(Icon === undefined){
            return null;
        }

        return (
            <Icon className = "carousel-logo" key = {skill + "-" + index}/>
        );
    });

    const groupPanels = skillGroups.map((group) => {
        return (
            <SkillGroup
                key = {group.category}
                category = {group.category}
                skills = {group.skills}
            />
        );
    });

    return(
        <>
        <section className = "skills" id = "skills">
            <div className = "skills-lead" ref = {leadRef} data-visible = {leadVisible} style = {leadDelay}>
                <SectionEyebrow text = {skillsEyebrow} active = {leadVisible}/>

                <div className = "skills-carousel reveal-rise" aria-hidden = "true">
                    {/* separate from the bordered box, or the mask would fade the border too */}
                    <div className = "carousel-window">
                        <div className = "carousel-track">
                            {carouselLogos}
                        </div>
                    </div>
                </div>

                <div className = "skills-groups">
                    {groupPanels}
                </div>
            </div>
        </section>
        </>
    )
}

export default Skills
