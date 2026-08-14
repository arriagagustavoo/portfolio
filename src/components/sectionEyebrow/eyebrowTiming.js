export const eyebrowStartDelay = 200
export const eyebrowCharSpeed = 40

// sections offset their content by this so it lands as the eyebrow finishes typing
export function eyebrowDuration(text){
    return eyebrowStartDelay + text.length * eyebrowCharSpeed
}
