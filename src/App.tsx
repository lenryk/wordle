import {useState} from 'react';
import Word from "./components/Word";
import WordEntry from "./components/WordEntry";

function App() {
  const [wordGuess, setWordGuess] = useState('')

  return (
    <>
      <WordEntry onGuessEntered={(guess) => setWordGuess(guess)} />
      <Word isWordEvaluated={false} guessWordValue={wordGuess} />
    </>
  );
}

export default App;
