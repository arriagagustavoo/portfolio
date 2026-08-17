import "./ProjectCard.css"
import GithubIcon from "../../icons/GithubIcon";
import skillIcons from "../../icons/skillIcons/skillIcons"
import { useCopy } from "../../../i18n/languageContext"

function ProjectCard({title, images, cover, repoUrl, description, skills, onOpenGallery}){

    const copy = useCopy();

    // no screenshots = plain placeholder, nothing to open
    let photo;
    if(images.length > 0){
        // the gallery's first shot is rarely the best thumbnail
        let coverImage;
        if(cover){
            coverImage = cover;
        }else{
            coverImage = images[0];
        }

        photo = (
            <button className = "card-photo card-photo-button" type = "button" onClick = {onOpenGallery} aria-label = {copy.projects.galleryButtonLabel(images.length, title)}>
                <img className = "card-photo-img" src = {coverImage.src} alt = {coverImage.alt} loading = "lazy"/>

                <span className = "card-photo-tag">
                    {copy.projects.shots(images.length)}
                </span>

                <span className = "card-photo-wipe">
                    <span className = "card-photo-wipe-label">
                        {copy.projects.viewGallery}
                    </span>
                </span>
            </button>
        );
    }else{
        photo = <div className = "card-photo"></div>;
    }

    // no repo = no github badge
    let githubBadge;
    if(repoUrl){
        githubBadge = (
            <a className = "card-github" href = {repoUrl} target = "_blank" rel = "noopener noreferrer" aria-label = {copy.projects.githubLabel(title)}>
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

            {photo}

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