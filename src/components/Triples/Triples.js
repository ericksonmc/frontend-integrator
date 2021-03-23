import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Input from '../shared/Input/Input';
import Bets from '../Bets/Bets';
import useBets from '../../hook/use-bets';
import TicketModal from '../TicketModal/TicketModal';
import ZodiacSignsModal from '../ZodiacSignsModal/ZodiacSignsModal';

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
    const [ticket, setTicket] = useState('');
    const [showZodiacModal, setShowZodialModal] = useState(false);

    const handleSelectTriplesDraw = (lotteryIndex, drawIndex) => {
        handleSelectDraw('triples', lotteryIndex, drawIndex);
    };

    const handleBuyTriples = async () => {
        try {
            const res = await handleBuyTicket(bets, {
                aniTipo: 5,
                tip: 'T',
                ani: false,
            });
            setTicket(res.ticket_string);
        } catch (error) {}
    };

    const handleAddTriplesBets = () => {
        const hasComodin = lotteries.some((l) => {
            return l.sorteos.some((s) => {
                if (draws[s.id]) {
                    return s.comodin;
                }

                return false;
            });
        });

        if (hasComodin) {
            return setShowZodialModal(true);
        }

        handleAddBets(betAmount, playerBet, draws);
    };
    const handleSelectZodiacSigns = (signs) => {
        setShowZodialModal(false);
        handleAddBets(betAmount, playerBet, draws, signs);
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
                    onAddBets={handleAddTriplesBets}
                    onDeleteBets={handleDeleteBets}
                    onBuyTicket={handleBuyTriples}
                />
            </Col>
            <TicketModal
                show={ticket !== ''}
                ticket={ticket}
                onClose={() => setTicket('')}
            ></TicketModal>
            {showZodiacModal && (
                <ZodiacSignsModal
                    show={showZodiacModal}
                    onClose={handleSelectZodiacSigns}
                    onCancel={() => setShowZodialModal(false)}
                ></ZodiacSignsModal>
            )}
        </Row>
    );
}
