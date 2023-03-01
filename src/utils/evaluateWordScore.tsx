import {AccuracyEnum} from "./accuracy.utils";

export default function evaluateWordScore(guess: string, answer:string) {
  const result = [AccuracyEnum.doesNotExist,
                AccuracyEnum.doesNotExist,
                AccuracyEnum.doesNotExist,
                AccuracyEnum.doesNotExist,
                AccuracyEnum.doesNotExist]
  const markedCorrect: number[] = []
  let mask = answer

  guess.split('').forEach((guessLetter, index) => {
    if (guessLetter === mask[index]) {
      result[index] = AccuracyEnum.correct
      mask = replaceAt(mask, index, '_')
      markedCorrect.push(index)
    }
  })

  guess.split('').forEach((guessLetter, index) => {
    if(!markedCorrect.includes(index) && mask.split('').includes(guessLetter)) {
      result[index] = AccuracyEnum.wrongPosition
      const firstPositionInAnswer = mask.indexOf(guessLetter)
      mask = replaceAt(mask, firstPositionInAnswer, '_')
    }
  })

  return result
}

function replaceAt(source: string, index: number, replacement: string): string {
  if(index >= source.length) {
    return source.valueOf()
  }

  return source.substring(0,index) + replacement + source.substring(index+1)
}