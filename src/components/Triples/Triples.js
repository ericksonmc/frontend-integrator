import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import Input from '../shared/Input/Input';
import Bets from '../Bets/Bets';
import useBets from '../../hook/use-bets';
import { useStore } from '../../hook/use-store';
import { isBeforeNow } from '../../util/time';
import { formatTime } from '../../util/format';
import {
    getPermutePlays,
    getSeriePlays,
    getRangePlays,
} from '../../util/special-plays';
import TicketModal from '../TicketModal/TicketModal';
import ZodiacSignsModal from '../ZodiacSignsModal/ZodiacSignsModal';
import './Triples_styles.scss';
import { showError } from '../../util/alert';

function Triples() {
    const [lotteries, setLotteries] = useState([]);
    const [playerBet, setPlayerBet] = useState('');
    const [selectedPlayerBet, setSelectedPlayerBet] = useState('');
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
    const [availableDraws, setAvailableDraws] = useState([]);
    const { products } = useStore();

    useEffect(() => {
        setLotteries(products.triples || []);

        if (lotteries !== null && lotteries.length > 0) {
            handleChangeLottery(0);
        }
    }, [products, setLotteries]);

    const specialPlays = [
        { name: 'permuta', fn: getPermutePlays },
        { name: 'serie', fn: getSeriePlays },
        { name: 'corrida', fn: getRangePlays },
    ];

    const handleSpecialPlay = (fn) => {
        handleAddTriplesBets(fn(playerBet.split('.')).join('.'));
    };
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
    const handleAddTriplesBets = (play) => {
        const hasComodin = lotteries.some((l) => {
            return l.sorteos.some((s) => {
                if (draws[s.id]) {
                    return s.comodin;
                }

                return false;
            });
        });

        if (hasComodin) {
            setSelectedPlayerBet(play);
            return setShowZodialModal(true);
        }

        handleAddBets(betAmount, play, draws);
    };
    const handleSelectZodiacSigns = (signs) => {
        setShowZodialModal(false);
        handleAddBets(betAmount, selectedPlayerBet, draws, signs);
    };
    const handleChangeLottery = (index) => {
        setLotteryIndex(index);
        setAvailableDraws(
            lotteries[index].sorteos.filter((draw) => isBeforeNow(draw.horac))
        );
    };

    const getTripleImage = (name) => {
        return `/triples/${name.toLowerCase().replace(' ', '-')}.png`;
    };

    if (lotteries === null || lotteries.length === 0) {
        return null;
    }

    return (
        <Row>
            <Col className="d-flex justify-content-center" lg="3" md="3">
                <div className="triples-lotteries-list">
                    {lotteries.map((l, index) => (
                        <div
                            key={index}
                            className={classnames(
                                'd-block triples-lottery-img',
                                {
                                    'triples-lottery-img-selected':
                                        lotteryIndex === index,
                                }
                            )}
                            onClick={() => handleChangeLottery(index)}
                        >
                            <img
                                className="w-100 h-100"
                                src={getTripleImage(l.nombre)}
                            />
                        </div>
                    ))}
                </div>
            </Col>
            <Col className="triples-draws-list">
                <div className="d-flex align-items-center flex-wrap">
                    <Input
                        id="bets"
                        className="ml-1 flex-fill"
                        placeholder="Separe las jugadas con punto ."
                        value={playerBet}
                        onChange={(e) => setPlayerBet(e.target.value)}
                    />
                    {specialPlays.map((play, index) => (
                        <button
                            key={index}
                            className="triples-special-play-button"
                            onClick={() => handleSpecialPlay(play.fn)}
                        >
                            {play.name}
                        </button>
                    ))}
                </div>

                <div className="d-flex flex-wrap justify-content-center mt-3">
                    {availableDraws.length > 0 ? (
                        availableDraws.map((draw, index) => (
                            <button
                                className={classnames(
                                    'triples-draw-button p-3 rounded-0 m-1',
                                    {
                                        'triples-draw-button-selected':
                                            draws[draw.id],
                                    }
                                )}
                                key={draw.id}
                                disabled={!isBeforeNow(draw.horac)}
                                onClick={() =>
                                    handleSelectTriplesDraw(lotteryIndex, index)
                                }
                            >
                                <div>{draw.nombre}</div>
                                <div>{formatTime(draw.horac)}</div>
                            </button>
                        ))
                    ) : (
                        <p className="mt-3">No hay sorteos disponibles</p>
                    )}
                </div>
            </Col>
            <Col lg="3" md="3">
                <Bets
                    className="mx-auto"
                    bets={bets}
                    betAmount={betAmount}
                    getBetDisplayName={(n) => n}
                    setBetAmount={setBetAmount}
                    onAddBets={() => handleAddTriplesBets(playerBet)}
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

export default Triples;
