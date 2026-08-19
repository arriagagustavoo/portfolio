import "./Lightbox.css"
import { useCallback, useEffect, useState } from "react"
import { useCopy } from "../../../i18n/languageContext"

function Lightbox({ title, images, onClose }){

    const copy = useCopy();

    // null = grid only, nothing expanded
    const [zoomedIndex, setZoomedIndex] = useState(null);

    const handleZoomOpen = (index) => {
        setZoomedIndex(index);
    };

    const handleZoomClose = () => {
        setZoomedIndex(null);
    };

    // both wrap around. useCallback so the key listener isn't re-attached every render
    const showPrevious = useCallback(() => {
        setZoomedIndex((current) => {
            if(current === 0){
                return images.length - 1;
            }else{
                return current - 1;
            }
        });
    }, [images.length]);

    const showNext = useCallback(() => {
        setZoomedIndex((current) => {
            if(current === images.length - 1){
                return 0;
            }else{
                return current + 1;
            }
        });
    }, [images.length]);

    // escape closes the zoom first, the gallery second
    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.key === "Escape"){
                if(zoomedIndex !== null){
                    setZoomedIndex(null);
                }else{
                    onClose();
                }
            }

            if(zoomedIndex !== null){
                if(event.key === "ArrowRight"){
                    showNext();
                }

                if(event.key === "ArrowLeft"){
                    showPrevious();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, zoomedIndex, showNext, showPrevious]);

    // stops the page behind from scrolling
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    // ignore clicks that bubbled up from the panel
    const handleBackdropClick = (event) => {
        if(event.target === event.currentTarget){
            onClose();
        }
    };

    const handleZoomBackdropClick = (event) => {
        if(event.target === event.currentTarget){
            handleZoomClose();
        }
    };

    const imageCards = images.map((image, index) => {
        return (
            <figure className = "lightbox-figure" key = {image.src}>
                <button className = "lightbox-thumb" type = "button" onClick = {() => handleZoomOpen(index)} aria-label = {copy.lightbox.expandLabel(image.alt)}>
                    <img className = "lightbox-image" src = {image.src} alt = {image.alt} loading = "lazy"/>
                </button>
                <figcaption className = "lightbox-caption">
                    {image.alt}
                </figcaption>
            </figure>
        );
    });

    // expanded view, layered over the grid
    let zoomView;
    if(zoomedIndex !== null){
        const zoomed = images[zoomedIndex];

        zoomView = (
            <div className = "lightbox-zoom" onClick = {handleZoomBackdropClick} role = "dialog" aria-modal = "true" aria-label = {zoomed.alt}>

                <div className = "lightbox-zoom-bar">
                    <button className = "lightbox-close" type = "button" onClick = {handleZoomClose} aria-label = {copy.lightbox.closeExpanded}>
                        ✕
                    </button>
                </div>

                <div className = "lightbox-zoom-stage">
                    <img className = "lightbox-zoom-image" src = {zoomed.src} alt = {zoomed.alt}/>

                    <div className = "lightbox-zoom-footer">
                        <p className = "lightbox-zoom-caption">
                            {zoomed.alt}
                        </p>

                        <div className = "lightbox-zoom-nav">
                            <button className = "lightbox-nav" type = "button" onClick = {showPrevious} aria-label = {copy.lightbox.previous}>
                                {copy.lightbox.previousLabel}
                            </button>

                            <p className = "lightbox-zoom-count">
                                {zoomedIndex + 1} / {images.length}
                            </p>

                            <button className = "lightbox-nav" type = "button" onClick = {showNext} aria-label = {copy.lightbox.next}>
                                {copy.lightbox.nextLabel}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }else{
        zoomView = null;
    }

    return(
        <>
        <div className = "lightbox-backdrop" onClick = {handleBackdropClick} role = "dialog" aria-modal = "true" aria-label = {copy.lightbox.galleryLabel(title)}>
            <div className = "lightbox-panel">

                <div className = "lightbox-header">
                    <p className = "lightbox-title">
                        {title}
                    </p>

                    <p className = "lightbox-count">
                        {copy.lightbox.shots(images.length)}
                    </p>

                    <button className = "lightbox-close" type = "button" onClick = {onClose} aria-label = {copy.lightbox.closeGallery}>
                        ✕
                    </button>
                </div>

                <div className = "lightbox-grid">
                    {imageCards}
                </div>

            </div>
        </div>

        {zoomView}
        </>
    )
}

export default Lightbox
