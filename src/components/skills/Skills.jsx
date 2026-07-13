import "./Skills.css"
import skillIcons from "../icons/skillIcons/skillIcons"

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

function Skills(){

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

        const skillBadges = group.skills.map((skill) => {
            const Icon = skillIcons[skill];

            let icon;
            if(Icon === undefined){
                icon = null;
            }else{
                icon = <Icon className = "skill-badge-icon"/>;
            }

            return (
                <p className = "skill-badge" key = {skill}>
                    {icon}
                    {skill}
                </p>
            );
        });

        return (
            <div className = "skill-group" key = {group.category}>
                <p className = "skill-group-label">
                    {group.category}
                </p>

                <div className = "skill-group-badges">
                    {skillBadges}
                </div>
            </div>
        );
    });

    return(
        <>
        <div className = "skills" id = "skills">
            <div className = "skills-intro">
                // Skills
            </div>

            <div className = "skills-carousel" aria-hidden = "true">
                <div className = "carousel-track">
                    {carouselLogos}
                </div>
            </div>

            <div className = "skills-groups">
                {groupPanels}
            </div>
        </div>
        </>
    )
}

export default Skills
