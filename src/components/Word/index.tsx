import {AccuracyEnum} from "../../utils/accuracy.utils"
import {useEffect, useState} from "react"
import Letter from "../Letter";
import evaluateWordScore from "../../utils/evaluateWordScore";
import retrieveAnswer from "../../utils/retrieveAnswer";

interface WordProps {
    isWordEvaluated: boolean
    guessWordValue: string
}

export default function Word({isWordEvaluated, guessWordValue}: WordProps) {
    const [isEvaluated, setIsEvaluated] = useState(false)
    const [guessValue, setGuessValue] = useState('')

    const initialAccuracyArray = [AccuracyEnum.none,
                                    AccuracyEnum.none,
                                    AccuracyEnum.none,
                                    AccuracyEnum.none,
                                    AccuracyEnum.none,]
    const [evaluatedResults, setEvaluatedResults] = useState<AccuracyEnum[]>(initialAccuracyArray)

    useEffect(() => {
        setGuessValue(guessWordValue.padEnd(5,'_'))
    }, [guessWordValue])

    useEffect(() => {
        const results = evaluateWordScore(guessValue, retrieveAnswer().toUpperCase())
        setEvaluatedResults(results)
        setIsEvaluated(isWordEvaluated)
    }, [isWordEvaluated, guessValue])

    return (
        <>
            <div style={{ marginLeft: '15px' }}>
                {guessValue.toUpperCase().split('').map( (nextLetter, letterIndex) => {

                return <Letter
                    key = {'letter_' + letterIndex}
                    value = {nextLetter}
                    accuracy={isEvaluated ? evaluatedResults[letterIndex] : AccuracyEnum.none}
                    position={letterIndex} />
                })}
                </div>
        </>
    )
}