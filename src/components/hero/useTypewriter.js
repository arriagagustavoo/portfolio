import { useState, useEffect } from 'react'

// reveals text one character at a time. enabled=false returns the finished
// string outright, which is what reduced-motion and a replayed session get.
// that case is derived rather than pushed into state — setting state from an
// effect body triggers a second render pass for no reason
function useTypewriter(text, speed, startDelay, enabled){
    const [typed, setTyped] = useState('')

    useEffect(() => {
        if (!enabled){
            return
        }

        let index = 0
        let interval = null

        const startTimer = setTimeout(() => {
            interval = setInterval(() => {
                index = index + 1
                setTyped(text.slice(0, index))

                if (index >= text.length){
                    clearInterval(interval)
                }
            }, speed)
        }, startDelay)

        return () => {
            clearTimeout(startTimer)

            if (interval){
                clearInterval(interval)
            }
        }
    }, [text, speed, startDelay, enabled])

    if (!enabled){
        return { typed: text, done: true }
    }

    const done = typed.length >= text.length

    return { typed, done }
}

export default useTypewriter
