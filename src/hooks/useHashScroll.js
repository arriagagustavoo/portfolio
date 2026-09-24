import { useEffect } from 'react'

// React mounts the sections after the browser has given up on the URL fragment,
// and content-visibility then resolves their real heights, so the target keeps
// moving for a few frames. re-aiming on each one is what makes a shared link land.
const settleFrames = 14

function useHashScroll(){
    useEffect(() => {
        let released = false
        let frame = null
        let timers = []

        const targetFor = (id) => document.getElementById(id)

        // instant, or html's scroll-behavior would animate every correction
        const burst = (id) => {
            let frames = 0

            const aim = () => {
                if (released){
                    return
                }

                const node = targetFor(id)

                if (node){
                    node.scrollIntoView({ behavior: 'instant', block: 'start' })
                }

                frames = frames + 1

                if (frames < settleFrames){
                    frame = requestAnimationFrame(aim)
                }
            }

            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(aim)
        }

        // a click on an in-page link: let the smooth scroll finish, then close any gap
        // left by sections that rendered on the way there
        const correct = (id) => {
            let last = -1
            let stable = 0
            let polls = 0
            let rounds = 0

            const poll = () => {
                if (released){
                    return
                }

                polls = polls + 1

                if (window.scrollY === last){
                    stable = stable + 1
                }else{
                    stable = 0
                    last = window.scrollY
                }

                if (stable < 3 && polls < 40){
                    timers.push(setTimeout(poll, 100))
                    return
                }

                const node = targetFor(id)

                if (!node){
                    return
                }

                const offset = parseFloat(getComputedStyle(node).scrollMarginTop) || 0
                const gap = node.getBoundingClientRect().top - offset

                if (Math.abs(gap) > 2 && rounds < 2){
                    rounds = rounds + 1
                    stable = 0
                    polls = 0
                    last = -1
                    window.scrollBy({ top: gap })
                    timers.push(setTimeout(poll, 120))
                }
            }

            timers.push(setTimeout(poll, 120))
        }

        const clearTimers = () => {
            timers.forEach(clearTimeout)
            timers = []
        }

        const start = () => {
            const id = window.location.hash.slice(1)

            if (id.length < 1){
                return
            }

            released = false
            clearTimers()
            burst(id)
        }

        // a real scroll means the visitor took over, so stop correcting
        const release = () => {
            released = true
        }

        const handleHashChange = () => {
            const id = window.location.hash.slice(1)

            if (id.length < 1){
                return
            }

            released = false
            clearTimers()
            correct(id)
        }

        window.addEventListener('wheel', release, { passive: true })
        window.addEventListener('touchstart', release, { passive: true })
        window.addEventListener('keydown', release)
        window.addEventListener('hashchange', handleHashChange)

        start()

        // fonts change every section's height when they land, so aim again then and once more after
        // usePrimeSections has rendered everything
        document.fonts.ready.then(() => {
            if (!released){
                timers.push(setTimeout(start, 350))
                timers.push(setTimeout(start, 1400))
            }
        })

        return () => {
            released = true
            clearTimers()
            cancelAnimationFrame(frame)
            window.removeEventListener('wheel', release)
            window.removeEventListener('touchstart', release)
            window.removeEventListener('keydown', release)
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [])
}

export default useHashScroll
