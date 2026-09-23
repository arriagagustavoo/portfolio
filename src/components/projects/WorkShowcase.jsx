import { Link } from "react-router-dom"
import "./projectCards/ProjectCard.css"
import "./WorkShowcase.css"
import GithubIcon from "../icons/GithubIcon"
import skillIcons from "../icons/skillIcons/skillIcons"
import { useCopy } from "../../i18n/languageContext"

function SkillRow({ project }){

    const copy = useCopy();

    const badges = project.cardSkills.map((skill) => {
        const Icon = skillIcons[skill];

        let icon;
        if(Icon){
            icon = <Icon className = "showcase-badge-icon"/>;
        }else{
            icon = null;
        }

        return (
            <p className = "showcase-badge" key = {skill}>
                {icon}
                {skill}
            </p>
        );
    });

    const hiddenCount = project.skills.length - project.cardSkills.length;

    let more;
    if(hiddenCount > 0){
        more = <p className = "showcase-more">{copy.projects.moreSkills(hiddenCount)}</p>;
    }else{
        more = null;
    }

    return (
        <div className = "showcase-skills">
            {badges}
            {more}
        </div>
    );
}

function Media({ project, url, wide }){

    const copy = useCopy();

    // no cover = fall back to the first screenshot
    let image = project.cover;
    if(!image){
        image = project.images[0];
    }

    let className = "showcase-media card-photo card-photo-button";
    if(wide){
        className = className + " showcase-media-wide";
    }

    return (
        <Link className = {className} to = {url} aria-label = {copy.projects.caseStudyLabel(project.title)}>
            <img className = "card-photo-img" src = {image.src} alt = {image.alt} loading = "lazy"/>

            <span className = "card-photo-wipe">
                <span className = "card-photo-wipe-label">
                    {copy.projects.readCaseStudy}
                </span>
            </span>
        </Link>
    );
}

function WorkShowcase({ projects, basePath }){

    const copy = useCopy();

    const urlFor = (project) => {
        return basePath + "/work/" + project.slug;
    };

    const featured = projects[0];
    const others = projects.slice(1);

    let featuredPoints;
    if(featured.points){
        const items = featured.points.map((point, index) => {
            return <li key = {index}>{point}</li>;
        });

        featuredPoints = <ul className = "feature-points">{items}</ul>;
    }else{
        featuredPoints = null;
    }

    const supporting = others.map((project) => {
        let repo;
        if(project.repoUrl){
            repo = (
                <a className = "showcase-repo" href = {project.repoUrl} target = "_blank" rel = "noopener noreferrer" aria-label = {copy.projects.githubLabel(project.title)}>
                    <GithubIcon className = "showcase-repo-icon"/>
                </a>
            );
        }else{
            repo = null;
        }

        return (
            <article className = "support reveal-rise" key = {project.id}>
                <Media project = {project} url = {urlFor(project)}/>

                <div className = "support-copy">
                    <div className = "support-head">
                        <h3 className = "support-title">{project.title}</h3>
                        {repo}
                    </div>

                    <p className = "showcase-pitch">{project.pitch}</p>

                    <SkillRow project = {project}/>

                    <Link className = "showcase-link" to = {urlFor(project)}>{copy.projects.caseStudyButton}</Link>
                </div>
            </article>
        );
    });

    return (
        <div className = "showcase">
            <article className = "feature reveal-rise">
                <Media project = {featured} url = {urlFor(featured)} wide = {true}/>

                <div className = "feature-copy">
                    <p className = "feature-tag">{copy.projects.featured}</p>

                    <h3 className = "feature-title">{featured.title}</h3>
                    <p className = "showcase-pitch showcase-pitch-lead">{featured.pitch}</p>

                    <SkillRow project = {featured}/>
                </div>

                {/* its own column on a wide screen, under the copy otherwise */}
                <div className = "feature-side">
                    {featuredPoints}

                    <Link className = "showcase-button" to = {urlFor(featured)}>{copy.projects.caseStudyButton}</Link>
                </div>
            </article>

            <div className = "supports">
                {supporting}
            </div>
        </div>
    );
}

export default WorkShowcase
