import "./About.css"
import myPhoto from "../../assets/luffy.jpg"
import Pin from "../icons/Pin"
import Television from "../icons/Television"
import GameController from "../icons/GameController"
import Weight from "../icons/Weight"
import ThreeDModel from "../icons/ThreeDModel"
import Hardware from "../icons/Hardware"
import uhLogo from "../../assets/uh-logo.svg"

function About(){

    return(
        <>
        <div className = "about" id = "about">
            <p className = "about-intro">
                // Get to know me
            </p>

            <div className = "about-main">
                <div className = "about-top">
                    <img className = "about-photo" src = {myPhoto} alt = "Gustavo Arriaga"/>
                </div>

                <div className = "about-text">
                    <p>
                        I'm Gustavo Arriaga, currently studying Comp Sci @ UH with a Capstone in Software Design.<br></br>
                        Playing video games, building custom PCs, and modding those games ate up all my free time growing up.<br></br>
                        Studying Computer Science was the obvious next step.<br></br>
                        Diving into Software and getting hands-on learning experience only deepened that interest.<br></br>
                        Realizing I can turn creative ideas into digital or even physical products sparked a drive to learn any skill CS has to offer.<br></br>
                    </p>
                </div>
            </div>

            <div className = "about-info">
                <div className = "about-info-item">
                    <Pin className = "about-info-icon"/>
                    <p>Houston, Texas</p>
                </div>

                <div className = "about-info-item">
                    <img className = "about-info-logo" src = {uhLogo} alt = "University of Houston logo"/>
                    <p>University of Houston</p>
                </div>
            </div>

            <p className = "about-tag">
                // Some interest of mine
            </p>

            <div className = "about-showcase">
                <a className = "about-table-badge" href = "https://anilist.co/anime/21/ONE-PIECE" target = "_blank" rel = "noopener noreferrer">
                    <Television className = "about-badge-icon"/>
                    One Piece
                </a>
                <a className = "about-table-badge" href = "https://persona.atlus.com/series/portal/us/" target = "_blank" rel = "noopener noreferrer">
                    <GameController className = "about-badge-icon"/>
                    Persona
                </a>
                <a className = "about-table-badge" href = "https://www.square-enix-games.com/en_US/games/nier-automata" target = "_blank" rel = "noopener noreferrer">
                    <GameController className = "about-badge-icon"/>
                    Nier
                </a>
                <p className = "about-table-badge">
                    <Weight className = "about-badge-icon"/>
                    Fitness
                </p>
                <p className = "about-table-badge">
                    <ThreeDModel className = "about-badge-icon"/>
                    Modeling
                </p>
                <p className = "about-table-badge">
                    <Hardware className = "about-badge-icon"/>
                    Hardware
                </p>
            </div>

        </div>
        </>
    )
}

export default About;