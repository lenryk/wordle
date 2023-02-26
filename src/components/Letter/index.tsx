import {AccuracyEnum} from "../../utils/accuracy.utils"
import styled from "styled-components"

interface LetterProps {
    position: number,
    value: string,
    accuracy: AccuracyEnum
}

export const accuracyColorMap = new Map<AccuracyEnum, string>(
    [
        [AccuracyEnum.correct, '#6CA965'],
        [AccuracyEnum.wrongPosition, '#C8B653'],
        [AccuracyEnum.none, 'black'],
        [AccuracyEnum.doesNotExist, '#787C7F']
    ]
)

export const StyledLetterButton = styled.button<{accuracy: AccuracyEnum}>`
    margin: 2px;
    width: 50px;
    height: 50px;
    border-radius: 2px;
    color: white;
    font-size: 30px;
    font-weight: bold;
    background: ${props => accuracyColorMap.get(props.accuracy)};
`


export default function Letter({position, value, accuracy}: LetterProps) {
    return (
            <StyledLetterButton accuracy={accuracy}>
                {value}
            </StyledLetterButton>
    )
}