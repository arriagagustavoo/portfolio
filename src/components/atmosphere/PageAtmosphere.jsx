import { useEffect, useRef } from 'react'
import './PageAtmosphere.css'

function PageAtmosphere(){
    const glowRef = useRef(null)
    const textureRef = useRef(null)

    useEffect(() => {
        const node = textureRef.current

        if (!node){
            return
        }

        let frame = null

        const apply = () => {
            frame = null
            const shift = (window.scrollY * 0.12) % 22.63
            node.style.setProperty('--scroll-shift', `${shift}px`)
        }

        const onScroll = () => {
            if (frame === null){
                frame = requestAnimationFrame(apply)
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        apply()

        return () => {
            window.removeEventListener('scroll', onScroll)

            if (frame !== null){
                cancelAnimationFrame(frame)
            }
        }
    }, [])

    // straight to CSS vars, not state. a setState per pointermove would re-render constantly
    useEffect(() => {
        const node = glowRef.current

        if (!node){
            return
        }

        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches){
            return
        }

        let frame = null
        let pointerX = 0
        let pointerY = 0

        // the layer is the viewport, so client coords need no rect read
        const apply = () => {
            frame = null
            node.style.setProperty('--glow-x', `${pointerX}px`)
            node.style.setProperty('--glow-y', `${pointerY}px`)
        }

        const move = (event) => {
            pointerX = event.clientX
            pointerY = event.clientY

            if (frame === null){
                frame = requestAnimationFrame(apply)
            }
        }

        window.addEventListener('pointermove', move)

        return () => {
            window.removeEventListener('pointermove', move)

            if (frame !== null){
                cancelAnimationFrame(frame)
            }
        }
    }, [])

    return (
        <div className = "atmosphere" aria-hidden = "true">
            <div className = "atmosphere-texture" ref = {textureRef}>
                <div className = "atmosphere-texture-drift"></div>
            </div>
            <div className = "atmosphere-streak atmosphere-streak-wide"></div>
            <div className = "atmosphere-streak atmosphere-streak-thin"></div>
            <div className = "atmosphere-glow" ref = {glowRef}></div>
        </div>
    )
}

export default PageAtmosphere
