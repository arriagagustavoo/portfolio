import { useState } from 'react'

// read once on mount, same as the hero does: a mid-session change isn't worth a listener
function useReducedMotion(){
    const [reduced] = useState(() => {
        if (typeof window === 'undefined'){
            return false
        }

        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    })

    return reduced
}

export default useReducedMotion
