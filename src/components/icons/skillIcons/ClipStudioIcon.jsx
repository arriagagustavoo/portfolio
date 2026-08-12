import clipStudioLogo from "../../../assets/clip-studio-paint.png"

function ClipStudioIcon(props){
    return(
        <img loading="lazy" decoding="async" {...props} src={clipStudioLogo} alt="Clip Studio Paint"/>
    )
}

export default ClipStudioIcon
