import evaluateWordScore from "./evaluateWordScore"
import {AccuracyEnum} from "./accuracy.utils";

test('success on matching word', () => {
  const result = evaluateWordScore('react', 'react')
  expect(result[0]).toBe(AccuracyEnum.correct)
  expect(result[1]).toBe(AccuracyEnum.correct)
  expect(result[2]).toBe(AccuracyEnum.correct)
  expect(result[3]).toBe(AccuracyEnum.correct)
  expect(result[4]).toBe(AccuracyEnum.correct)
})

test('fail on incorrect word', () => {
  const result = evaluateWordScore('react', 'mound')
  expect(result[0]).toBe(AccuracyEnum.doesNotExist)
  expect(result[1]).toBe(AccuracyEnum.doesNotExist)
  expect(result[2]).toBe(AccuracyEnum.doesNotExist)
  expect(result[3]).toBe(AccuracyEnum.doesNotExist)
  expect(result[4]).toBe(AccuracyEnum.doesNotExist)
})

test('wrong position on incorrect word', () => {
  const result = evaluateWordScore('react', 'house')
  expect(result[0]).toBe(AccuracyEnum.doesNotExist)
  expect(result[1]).toBe(AccuracyEnum.wrongPosition)
  expect(result[2]).toBe(AccuracyEnum.doesNotExist)
  expect(result[3]).toBe(AccuracyEnum.doesNotExist)
  expect(result[4]).toBe(AccuracyEnum.doesNotExist)
})

test('one letter correct, one incorrect', () => {
  const result = evaluateWordScore('oboes', 'moons')
  expect(result[0]).toBe(AccuracyEnum.wrongPosition)
  expect(result[1]).toBe(AccuracyEnum.doesNotExist)
  expect(result[2]).toBe(AccuracyEnum.correct)
  expect(result[3]).toBe(AccuracyEnum.doesNotExist)
  expect(result[4]).toBe(AccuracyEnum.correct)
})

test('one letter correct, one incorrect, two of same letter', () => {
  const result = evaluateWordScore('roomy', 'tombs')
  expect(result[0]).toBe(AccuracyEnum.doesNotExist)
  expect(result[1]).toBe(AccuracyEnum.correct)
  expect(result[2]).toBe(AccuracyEnum.doesNotExist)
  expect(result[3]).toBe(AccuracyEnum.wrongPosition)
  expect(result[4]).toBe(AccuracyEnum.doesNotExist)
})

test('one letter correct place', () => {
  const result = evaluateWordScore('taste', 'papal')
  expect(result[0]).toBe(AccuracyEnum.doesNotExist)
  expect(result[1]).toBe(AccuracyEnum.correct)
  expect(result[2]).toBe(AccuracyEnum.doesNotExist)
  expect(result[3]).toBe(AccuracyEnum.doesNotExist)
  expect(result[4]).toBe(AccuracyEnum.doesNotExist)
})