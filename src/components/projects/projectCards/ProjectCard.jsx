import "./ProjectCard.css"
import GithubIcon from "../../icons/GithubIcon";
import skillIcons from "../../icons/skillIcons/skillIcons"

function ProjectCard({title, repoUrl, description, skills}){

    // no repo = no github badge
    let githubBadge;
    if(repoUrl){
        githubBadge = (
            <a className = "card-github" href = {repoUrl} target = "_blank" rel = "noopener noreferrer" aria-label = {"GitHub repository for " + title}>
                <GithubIcon className = "card-github-icon"/>
            </a>
        );
    }else{
        githubBadge = null;
    }

    //skills from map
    const skillBadges = skills.map((skill) => {
        const Icon = skillIcons[skill];

        let icon;
        if(Icon){
            icon = <Icon className = "card-skill-icon"/>;
        }else{
            icon = null;
        }

        return(
            <p className = "card-skill-badge" key = {skill}>
                {icon}
                {skill}
            </p>
        );
    });


    return(
        <>
        <div className = "project-card">
            <div className = "card-top">
                <p className = "card-title">
                    {title}
                </p>
                {githubBadge}
            </div>

            <div className = "card-photo"> 

            </div>

            <div className = "card-description">
                <p>
                    {description}
                </p>
            </div>

            <div className = "card-skills">
                {skillBadges}
            </div>
        </div>
        </>
    )
}

export default ProjectCard;