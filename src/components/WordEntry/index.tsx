import {useState} from "react"
import styled from "styled-components";

interface WordEntryProps {
    onGuessEntered: (guess: string) => void
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

export default function WordEntry({onGuessEntered}: WordEntryProps) {
    const [value, setValue] = useState('')
    function getValidWordleString(rawString: string) {
        const validWordleString = rawString.replace(/[^a-z]/gi, '')
        return validWordleString?.toUpperCase()
    }

    function handleLetterEntry(e: React.ChangeEvent<HTMLInputElement>) {
        const validString: string = getValidWordleString(e.target.value)
        onGuessEntered(validString)
        setValue(validString)
    }

    return (
        <StyledWordEntry autoFocus
         placeholder='Enter your guess'
         value={value}
         maxLength={5}
         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLetterEntry(e)}
         />
    )
}