import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Input from '../shared/Input/Input';
import Bets from '../Bets/Bets';
import useBets from '../../hook/use-bets';
import { useStore } from '../../hook/use-store';
import { isBeforeNow } from '../../util/time';
import { formatTime } from '../../util/format';
import TicketModal from '../TicketModal/TicketModal';
import ZodiacSignsModal from '../ZodiacSignsModal/ZodiacSignsModal';
import './Triples_styles.scss';
import { showError } from '../../util/alert';

export default function Triples() {
    const [lotteries, setLotteries] = useState([]);
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
    const { products } = useStore();

    useEffect(() => {
        setLotteries(products.triples);
    }, [products, setLotteries]);

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
            setPlayerBet('');
            setBetAmount('');
        } catch (error) {
            if (error.response.data && error.response.data.message) {
                showError(error.response.data.message);
                return;
            }

            showError('Ha ocurrido un error');
        }
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

    if (lotteries ===null || lotteries.length === 0) {
        return null;
    }

    return (
        <Row>
            <Col lg="2" md="2">
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
            <Col>
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

                <div className="d-flex flex-wrap justify-content-center mt-3">
                    {lotteries[lotteryIndex].sorteos.map((draw, index) => (
                        <Button
                            className="triples-draw-button p-3 rounded-0 m-1"
                            key={draw.id}
                            variant={!!draws[draw.id] ? 'primary' : 'light'}
                            disabled={!isBeforeNow(draw.horac)}
                            onClick={() =>
                                handleSelectTriplesDraw(lotteryIndex, index)
                            }
                        >
                            <div>{draw.nombre}</div>
                            <div>{formatTime(draw.horac)}</div>
                        </Button>
                    ))}
                </div>
            </Col>
            <Col lg="3" md="3">
                <Bets
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
