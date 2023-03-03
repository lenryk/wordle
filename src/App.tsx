import {useState, useEffect} from 'react';
import WordEntry from "./components/WordEntry";
import WordBoard from "./components/WordBoard";
import retrieveAnswer from "./utils/retrieveAnswer";
import {Guess} from "./utils/Models/guess.model"
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  const [wordGuess, setWordGuess] = useState('')
  const [winning, setWinning] = useState<boolean | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [nextGuessPosition, setNextGuessPosition] = useState(0)
  const [gameOverText, setGameOverText] = useState('')
  const [wordGuesses, setWordGuesses] = useState<Guess[]>([])

  const handleGuessCompletion = (guess: string): void => {
    if (wordGuess === retrieveAnswer().toUpperCase()) {
      setWinning(true)
      return
    }
    setNextGuessPosition(nextGuessPosition + 1)
  }

  const handleWordGuesses = (guesses: Guess[]) =>  {
    setWordGuesses(guesses)
  }

  useEffect(() => {
    if (winning != null){
      setNextGuessPosition(0) // force it to evaluate the current word
      setGameOver(true)
    }

    if (winning) {
      setGameOverText('You Won!!')
    }
    else if (winning === false) {
      setGameOverText(`The word was: ${retrieveAnswer().toUpperCase()}`) // game over text
    }
  }, [winning])

  useEffect (() => {
    if (nextGuessPosition === 6) {
      setWinning(false)
      return
    }

    if (gameOver) return
    setWordGuess('')
  }, [nextGuessPosition])
  return (
    <StyledWrapper>
      { gameOver ? <h1>{gameOverText}</h1> :
      <WordEntry onGuessEntered={(guess) => setWordGuess(guess)} onGuessComplete={() => handleGuessCompletion(wordGuess)} />
      }
      <WordBoard guess={wordGuess} currentPosition={nextGuessPosition} wordGuessesCallback={handleWordGuesses}/>
    </StyledWrapper>
  );
}

export default App;
