import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Input from '../shared/Input/Input';
import Bets from '../Bets/Bets';
import useBets from '../../hook/use-bets';
import './Triples_styles.scss';

function LotteryDetail({ lottery, draws, onSelectDraw }) {
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
    const isEnabled = (t) => {
        if (!t) {
            return false;
        }

        const d = new Date(`1995-12-17T${t}:00`);
        const now = new Date();

        return (
            d.getHours() > now.getHours() ||
            (d.getHours() === now.getHours() &&
                d.getMinutes() >= now.getMinutes())
        );
    };

    return (
        <div className="d-flex flex-wrap justify-content-center mt-3">
            {lottery.sorteos.map((draw, index) => (
                <Button
                    className="triples-draw-button p-3 rounded-0 m-1"
                    key={draw.id}
                    variant={!!draws[draw.id] ? 'primary' : 'light'}
                    disabled={!isEnabled(draw.horac)}
                    onClick={() => onSelectDraw(index)}
                >
                    <div>{draw.nombre}</div>
                    <div>{formatTime(draw.horac)}</div>
                </Button>
            ))}
        </div>
    );
}

export default function Triples({ lotteries = [] }) {
    const [playerBet, setPlayerBet] = useState('');
    const [lotteryIndex, setLotteryIndex] = useState(0);
    const {
        bets,
        draws,
        handleAddBets,
        handleDeleteBets,
        handleBuyTicket,
        handleSelectDraw,
    } = useBets();
    const [betAmount, setBetAmount] = useState('');

    const handleSelectTriplesDraw = (lotteryIndex, drawIndex) => {
        handleSelectDraw('triples', lotteryIndex, drawIndex);
    };

    if (lotteries === null || lotteries[lotteryIndex] === null) {
        return null;
    }

    return (
        <Row>
            <Col lg="2">
                {lotteries.map((l, index) => (
                    <Button
                        block
                        key={index}
                        className="d-block rounded-0 p-3"
                        variant={lotteryIndex === index ? 'primary' : 'light'}
                        onClick={() => setLotteryIndex(index)}
                    >
                        {l.nombre}
                    </Button>
                ))}
            </Col>
            <Col lg="7">
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
                    draws={draws}
                    lottery={lotteries[lotteryIndex]}
                    onSelectDraw={(drawIndex) =>
                        handleSelectTriplesDraw(lotteryIndex, drawIndex)
                    }
                />
            </Col>
            <Col lg="3">
                <Bets
                    className="p-3"
                    bets={bets}
                    betAmount={betAmount}
                    getBetDisplayName={(n) => n}
                    setBetAmount={setBetAmount}
                    onAddBets={() => handleAddBets(betAmount, playerBet, draws)}
                    onDeleteBets={handleDeleteBets}
                    onBuyTicket={handleBuyTicket}
                />
            </Col>
        </Row>
    );
}
