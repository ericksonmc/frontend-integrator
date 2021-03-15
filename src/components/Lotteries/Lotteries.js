import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Input from '../shared/Input/Input';
import './Lotteries_styles.scss';

function LotteryDetail({ lottery, onSelectDraw, onToggleDraws }) {
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
        <div className="d-flex justify-content-between mt-3">
            {lottery.sorteos.map((draw, index) => (
                <Button
                    key={draw.id}
                    variant={draw.selected ? 'primary' : 'light'}
                    active={draw.selected}
                    onClick={() => onSelectDraw(index)}
                >
                    <div>{draw.nombre}</div>
                    <div>{formatTime(draw.horac_ls)}</div>
                </Button>
            ))}
        </div>
    );
}

export default function Lotteries({
    lotteries = [],
    onSelectDraw,
    onToggleDraws,
    playerBet,
    setPlayerBet,
}) {
    const [lotteryIndex, setLotteryIndex] = useState(0);

    if (lotteries === null || lotteries[lotteryIndex] === null) {
        return null;
    }

    return (
        <div className="d-flex">
            <div>
                {lotteries.map((l, index) => (
                    <Button
                        block
                        key={index}
                        className="d-block"
                        variant={lotteryIndex === index ? 'primary' : 'light'}
                        onClick={() => setLotteryIndex(index)}
                    >
                        {l.nombre}
                    </Button>
                ))}
            </div>
            <div className="ml-3 flex-fill">
                <div className="d-flex align-items-center flex-wrap p-3">
                    <label htmlFor="bets" className="m-0">
                        Ingresa su jugada
                    </label>
                    <Input
                        id="bets"
                        className="ml-1 w-50"
                        placeholder="Separe las jugadas con punto ."
                        value={playerBet}
                        onChange={(e) => setPlayerBet(e.target.value)}
                    />
                </div>

                <LotteryDetail
                    lottery={lotteries[lotteryIndex]}
                    onSelectDraw={(drawIndex) =>
                        onSelectDraw(lotteryIndex, drawIndex)
                    }
                    onToggleDraws={() => onToggleDraws()}
                />
            </div>
        </div>
    );
}
