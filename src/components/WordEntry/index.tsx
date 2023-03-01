import {useRef, useState} from "react"
import styled from "styled-components";

interface WordEntryProps {
    onGuessEntered(guess: string): void
    onGuessComplete(): void
}

export const StyledWordEntry = styled.input`
  margin: 5px;
  border-radius: 10px;
  width: 250px;
  height: 30px;
  display: block;
  border:2px solid blue;
  &:focus {
    outline: none;
    box-shadow: 0 0 2px blue;
  }
`

export const StyledEvaluateButton = styled.button`
    width: 72px;
    height: 36px;
    background: #CC4433;
    color: white;
    border-radius: 5px;
    position: relative;
    top: 10px;
`

export const StyledEntryContainer = styled.div`
   display: flex;
    align-content: baseline;
`

export default function WordEntry({onGuessEntered, onGuessComplete}: WordEntryProps) {
    const [value, setValue] = useState('')
    const wordEntryRef = useRef<HTMLInputElement>(null)
    function getValidWordleString(rawString: string) {
        const validWordleString = rawString.replace(/[^a-z]/gi, '')
        return validWordleString?.toUpperCase()
    }

    function handleLetterEntry(e: React.ChangeEvent<HTMLInputElement>) {
        const validString: string = getValidWordleString(e.target.value)
        onGuessEntered(validString)
        setValue(validString)
    }

    const handleGuessComplete = () => {
        setValue('')
        wordEntryRef?.current?.focus()
        onGuessComplete()
    }

    return (
      <StyledEntryContainer>
          <StyledWordEntry autoFocus
                           placeholder='Enter your guess'
                           value={value}
                           maxLength={5}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLetterEntry(e)}
                           ref={wordEntryRef}
          />
          { value.length !== 5 ? '' :
          <StyledEvaluateButton onClick={handleGuessComplete}>
              Guess
          </StyledEvaluateButton>}
      </StyledEntryContainer>

    )
}