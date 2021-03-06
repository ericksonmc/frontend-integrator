import React, { useState } from 'react';
import styled from 'styled-components';
import OptionButton from '../shared/OptionButton';
import Input from '../shared/Input';

const BetButton = styled(OptionButton)`
    color: ${(props) => props.theme.buttonFontColor};
    width: 80px;
    height: 45px;
    text-transform: uppercase;

    & + & {
        margin-left: 2px;
    }
`;

const Bar = styled.div`
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    color: ${(props) => props.theme.primaryFontColor};
    display: flex;
    align-items: center;
    padding: 10px;
    min-height: 70px;
    border-width: 2px;
    border-style: solid;
    border-image: linear-gradient(
            90deg,
            #dfa54d,
            #472714 14%,
            #8d5924 25%,
            #eabe69 36%,
            #f9f290 46%,
            #ae7936 65%,
            #6a4421 81%,
            #a77c2f 92%,
            #674220
        )
        100% 1;
    border-image-slice: 1;
    flex-wrap: wrap;
`;

export default function BetBar(props) {
    const betOptions = [
        { name: 'permuta' },
        { name: 'serie' },
        { name: 'corrida' },
        { name: 'terminal' },
    ];

    const [bets, setBets] = useState('');

    return (
        <Bar className={props.className}>
            <div className="d-flex align-items-center flex-fill flex-wrap">
                <label htmlFor="bets" className="m-0">
                    Ingresa tu jugada
                </label>
                <Input
                    id="bets"
                    className="ml-1 flex-fill"
                    placeholder="Separe las jugadas con punto ."
                    value={bets}
                    onChange={(e) => setBets(e.target.value)}
                />
            </div>
            <div className="d-flex flex-fill ml-5">
                {betOptions.map((option) => (
                    <BetButton key={option.name}>{option.name}</BetButton>
                ))}
            </div>
        </Bar>
    );
}
