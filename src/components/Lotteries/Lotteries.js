import React from 'react';
import styled from 'styled-components';
import OptionButton from '../shared/OptionButton';

const LotteryButton = styled(OptionButton)`
    color: ${(props) => props.theme.buttonFontColor};
    min-width: 130px;
    text-transform: uppercase;
    flex-shrink: 0;
`;
const DrawButton = styled(OptionButton)`
    min-width: 68px;
    flex-shrink: 0
`;

function LotteryDetail({ lottery }) {
    const formatTime = (t) => {
        if (!t) {
            return '-';
        }

        const d = new Date(`1995-12-17T${t}:00`);
        return Intl.DateTimeFormat('en', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }).format(d);
    };

    return (
        <div className="d-flex flex-wrap">
            <LotteryButton className="mr-2">{lottery.nombre}</LotteryButton>
            {lottery.sorteos.map((draw) => (
                <DrawButton className="ml-1" key={draw.id}>
                    <div>{draw.nombre}</div>
                    <div>{formatTime(draw.horac_ls)}</div>
                </DrawButton>
            ))}
        </div>
    );
}

export default function Lotteries({ lotteries = [] }) {
    if (lotteries == null) {
        return null;
    }

    return (
        <div className="d-flex flex-column">
            {lotteries.map((l) => (
                <LotteryDetail key={l.id} lottery={l} />
            ))}
        </div>
    );
}
