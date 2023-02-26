import {AccuracyEnum} from "../../utils/accuracy.utils"
import {useEffect, useState} from "react"
import Letter from "../Letter";

interface WordProps {
    isWordEvaluated: boolean
    guessWordValue: string
}

export default function Word({isWordEvaluated, guessWordValue}: WordProps) {
    const [isEvaluated, setIsEvaluated] = useState(false)
    const [guessValue, setGuessValue] = useState('')

    useEffect(() => {
        setGuessValue(guessWordValue)
    }, [guessWordValue])

    useEffect(() => {
        setIsEvaluated(isWordEvaluated)
    }, [isWordEvaluated])

    return (
        <>
            {guessValue.toUpperCase().split("").map((nextLetter: string, letterIndex: number) => {
                return <Letter key={'letter_' + letterIndex} position={letterIndex} value={nextLetter} accuracy={AccuracyEnum.none} />
            })}
        </>
    )
}