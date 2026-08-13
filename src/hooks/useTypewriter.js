import { useState, useEffect } from 'react'

// disabled returns the finished string, derived not set: setState in an effect body costs a render
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
