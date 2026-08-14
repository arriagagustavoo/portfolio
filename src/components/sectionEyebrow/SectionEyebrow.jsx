import useTypewriter from '../../hooks/useTypewriter'
import useReducedMotion from '../../hooks/useReducedMotion'
import useInView from '../../hooks/useInView'
import { eyebrowStartDelay, eyebrowCharSpeed } from './eyebrowTiming'
import './SectionEyebrow.css'

// pass `active` to hand timing to a parent gate, or leave it off to watch itself
function SectionEyebrow({ text, tag, active }){
    const reduceMotion = useReducedMotion()
    const [eyebrowRef, seen] = useInView()

    const controlled = active !== undefined

    let visible;
    if (controlled){
        visible = active;
    }else{
        visible = seen;
    }

    const typing = visible && !reduceMotion
    const line = useTypewriter(text, eyebrowCharSpeed, eyebrowStartDelay, typing)

    let className = 'section-eyebrow'
    if (tag){
        className = className + ' section-eyebrow-small'
    }

    // controlled copies ride the parent's data-visible, so a second one here would
    // tie on specificity and let source order decide
    if (controlled){
        className = className + ' reveal-sweep'

        return (
            <p className = {className}>
                <span className = "section-eyebrow-ghost" aria-hidden = "true">{text}</span>
                <span className = "section-eyebrow-live">
                    {line.typed}
                    <span className = "section-eyebrow-caret" aria-hidden = "true"></span>
                </span>
            </p>
        )
    }

    return (
        <p className = {className} ref = {eyebrowRef} data-visible = {visible}>
            {/* ghost holds the box so nothing below shifts while the live copy types */}
            <span className = "section-eyebrow-ghost" aria-hidden = "true">{text}</span>
            <span className = "section-eyebrow-live">
                {line.typed}
                <span className = "section-eyebrow-caret" aria-hidden = "true"></span>
            </span>
        </p>
    )
}

export default SectionEyebrow
