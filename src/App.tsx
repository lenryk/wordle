import {useState} from 'react';
import Word from "./components/Word";
import WordEntry from "./components/WordEntry";
import retrieveAnswer from "./utils/retrieveAnswer";

function App() {
  const [wordGuess, setWordGuess] = useState('')
  const [winning, setWinning] = useState<boolean | null>(null)
  const handleGuessCompletion = (guess: string): void => {
    if (wordGuess === retrieveAnswer().toUpperCase()) {
      setWinning(true)
      return
    }
  }

  return (
    <>
      <WordEntry onGuessEntered={(guess) => setWordGuess(guess)}
                 onGuessComplete={() => handleGuessCompletion(wordGuess)} />
      <Word isWordEvaluated={false} guessWordValue={wordGuess} />
    </>
  );
}

export default App;
