import { useState, useEffect } from 'react'

// caps and digits only: Geist is proportional, so a narrow glyph makes the line wobble
const scrambleChars = 'ABCDEFGHKMNOPQRSUVWXYZ0234689'

function randomChar(){
    const pick = Math.floor(Math.random() * scrambleChars.length)

    return scrambleChars[pick]
}

// spaces and newlines hold their place so the line breaks never move
function scrambleChar(char){
    if (char === ' ' || char === '\n'){
        return char
    }

    return randomChar()
}

function scrambleAll(text){
    return text.split('').map(scrambleChar).join('')
}

// locks in left to right while the rest churns. first frame is lazy initial state, not an effect
function useScramble(text, speed, startDelay, enabled){
    const [display, setDisplay] = useState(() => scrambleAll(text))

    useEffect(() => {
        if (!enabled){
            return
        }

        const letters = text.split('')
        let resolved = 0
        let interval = null

        const startTimer = setTimeout(() => {
            interval = setInterval(() => {
                resolved = resolved + 1

                const next = letters.map((char, index) => {
                    if (index < resolved){
                        return char
                    }

                    return scrambleChar(char)
                })

                setDisplay(next.join(''))

                if (resolved >= letters.length){
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
        return { display: text, done: false }
    }

    const done = display === text

    return { display, done }
}

export default useScramble
