import { useEffect } from 'react'

// class on <html> that lifts content-visibility for a moment, see index.css
const primeClass = 'priming-sections'

// content-visibility: auto remembers a section's real height only after it has rendered once.
// until then anchor jumps aim at a fixed hint that is wrong at most widths, so render every
// section once, after fonts and layout have settled, and let them skip again
function usePrimeSections(){
    useEffect(() => {
        const root = document.documentElement
        let timer = null
        let cancelled = false
        let lastWidth = window.innerWidth

        const prime = () => {
            root.classList.add(primeClass)

            // two frames, so a layout has run with every section rendered
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    root.classList.remove(primeClass)
                })
            })
        }

        const schedule = () => {
            clearTimeout(timer)

            timer = setTimeout(() => {
                if (cancelled){
                    return
                }

                if ('requestIdleCallback' in window){
                    requestIdleCallback(prime, { timeout: 1500 })
                }else{
                    prime()
                }
            }, 250)
        }

        // width only: iOS fires resize on every URL bar move, and that must not re-lay-out the whole page
        const handleResize = () => {
            if (window.innerWidth !== lastWidth){
                lastWidth = window.innerWidth
                schedule()
            }
        }

        document.fonts.ready.then(() => {
            if (!cancelled){
                schedule()
            }
        })

        window.addEventListener('resize', handleResize)

        return () => {
            cancelled = true
            clearTimeout(timer)
            window.removeEventListener('resize', handleResize)
            root.classList.remove(primeClass)
        }
    }, [])
}

export default usePrimeSections
