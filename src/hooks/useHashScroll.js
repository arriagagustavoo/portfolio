import { useEffect } from 'react'

// React mounts the sections after the browser has given up on the URL fragment,
// and content-visibility then resolves their real heights, so the target keeps
// moving for a few frames. re-aiming on each one is what makes a shared link land.
const settleFrames = 14

function useHashScroll(){
    useEffect(() => {
        const hash = window.location.hash

        if (hash.length < 2){
            return
        }

        const id = hash.slice(1)
        let frames = 0
        let frame = null

        const aim = () => {
            const node = document.getElementById(id)

            if (node){
                // instant, or html's scroll-behavior would animate every correction
                node.scrollIntoView({ behavior: 'instant', block: 'start' })
            }

            frames = frames + 1

            if (frames < settleFrames){
                frame = requestAnimationFrame(aim)
            }
        }

        // a real scroll means the visitor took over, so stop correcting
        const release = () => {
            frames = settleFrames
        }

        window.addEventListener('wheel', release, { passive: true, once: true })
        window.addEventListener('touchstart', release, { passive: true, once: true })

        frame = requestAnimationFrame(aim)

        return () => {
            window.removeEventListener('wheel', release)
            window.removeEventListener('touchstart', release)

            if (frame !== null){
                cancelAnimationFrame(frame)
            }
        }
    }, [])
}

export default useHashScroll
