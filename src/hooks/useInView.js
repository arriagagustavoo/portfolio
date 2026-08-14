import { useEffect, useRef, useState } from 'react'

// fires once the section top clears the bottom 12% of the viewport
const defaultMargin = '0px 0px -12% 0px'

function useInView(options){
    const ref = useRef(null)
    const [inView, setInView] = useState(false)

    let once = true
    if (options && options.once === false){
        once = false
    }

    let rootMargin = defaultMargin
    if (options && options.rootMargin){
        rootMargin = options.rootMargin
    }

    useEffect(() => {
        const node = ref.current

        if (!node){
            return
        }

        // has to be the section root: while content-visibility skips a subtree its
        // descendants have no layout box, so an observer on one never fires
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting){
                    setInView(true)

                    if (once){
                        observer.disconnect()
                    }
                }else if (!once){
                    setInView(false)
                }
            })
        }, { rootMargin: rootMargin })

        observer.observe(node)

        return () => observer.disconnect()
    }, [once, rootMargin])

    return [ref, inView]
}

export default useInView
