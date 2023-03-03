import { useEffect, useState } from "react"
import { Guess } from "../../utils/Models/guess.model"
import Word from "../Word"
import styled from "styled-components";

interface WordBoardProps {
  guess : string
  currentPosition: number,
  wordGuessesCallback(guesses: Guess[]) : void
}

export const StyledWordBoard = styled.div`
   display: flex;
   width: 500px;
   flex-wrap: wrap;
   flex-direction: row;
   justify-content: center;
`


export default function WordBoard({guess, currentPosition, wordGuessesCallback}:WordBoardProps) {

  const initialGuessState : Guess[] = [
    { guessedWord: '', evaluated: false },
    { guessedWord: '', evaluated: false },
    { guessedWord: '', evaluated: false },
    { guessedWord: '', evaluated: false },
    { guessedWord: '', evaluated: false },
    { guessedWord: '', evaluated: false }
  ]
  const [wordGuesses, setWordGuesses] = useState<Guess[]>(initialGuessState)

  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    if (currentWordIndex > 5) return
    const currentGuess: Guess = {guessedWord: guess, evaluated: false}
    const updatedGuesses: Guess[] =  [...wordGuesses.slice(0, currentWordIndex), currentGuess, ...wordGuesses.slice(currentWordIndex + 1)]
    setWordGuesses(updatedGuesses)
  }, [guess])

  useEffect(() =>
    {
      if (currentWordIndex > 5) return  // too many guesses
      if (guess.length < 5) return  // guess is not finished

      const currentGuess: Guess = {guessedWord: guess, evaluated: true}
      const updatedGuesses: Guess[] =  [...wordGuesses.slice(0, currentWordIndex), currentGuess, ...wordGuesses.slice(currentWordIndex + 1)]
      console.log('updating guesses...')
      setWordGuesses(updatedGuesses)
      setCurrentWordIndex(currentPosition)
      wordGuessesCallback(updatedGuesses.filter(guess => guess.evaluated))
    }
    , [currentPosition])

  return (
    <StyledWordBoard>
      {
        wordGuesses.map((wordGuess: Guess, index: number) => {
          return <Word key={`guesses_${index}`} isWordEvaluated={wordGuess.evaluated} guessWordValue={wordGuess.guessedWord}  />
        })

      }
    </StyledWordBoard>
  )

}