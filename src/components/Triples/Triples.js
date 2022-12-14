import React, { useEffect, useState } from 'react';
import { Alert, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import Input from '../shared/Input/Input';
import Button from '../shared/Button/Button';
import Bets from '../Bets/Bets';
import useBets from '../../hook/use-bets';
import { useStore } from '../../hook/use-store';
import { isBeforeNow } from '../../util/time';
import {
    getPermutePlays,
    getSeriePlays,
    getRangePlays,
} from '../../util/special-plays';
import TicketModal from '../TicketModal/TicketModal';
import ZodiacSignsModal from '../ZodiacSignsModal/ZodiacSignsModal';
import './Triples_styles.scss';
import { showError } from '../../util/alert';

const betRegexp = /^(?:[0-9]{2,3})(?:\.(?:[0-9]{2,3}))*$/;
const partialBetRegexp = /^(?:[0-9]{0,3})(?:\.(?:[0-9]{0,3}))*$/;

const terminalBetRegexp = /^(?:[0-9]{2,2})(?:\.(?:[0-9]{2,2}))*$/;
const partialTerminalBetRegexp = /^(?:[0-9]{0,2})(?:\.(?:[0-9]{0,2}))*$/;

const validateBet = (lotteryType, bet) => {
    const regexp = lotteryType === 'TRIPLES' ? betRegexp : terminalBetRegexp;
    return regexp.test(bet);
};

const validatePartialBet = (lotteryType, bet) => {
    const regexp =
        lotteryType === 'TRIPLES' ? partialBetRegexp : partialTerminalBetRegexp;
    return regexp.test(bet);
};

function Triples() {
    const [lotteries, setLotteries] = useState([]);
    const [playerBet, setPlayerBet] = useState('');
    const [inputPlayerBet, setInputPlayerBet] = useState('');
    const [lotteryIndex, setLotteryIndex] = useState(0);
    const {
        bets,
        draws,
        betAmount,
        handleAddBets,
        handleDeleteBets,
        handleBuyTicket,
        handleSelectDraw,
        handleSelectMultipleDraws,
        setBetAmount,
    } = useBets();
    const [ticket, setTicket] = useState('');
    const [showZodiacModal, setShowZodialModal] = useState(false);
    const [availableDraws, setAvailableDraws] = useState([]);
    const { products } = useStore();

    useEffect(() => {
        setLotteries(products.triples || []);
    }, [products, setLotteries]);

    useEffect(() => {
        if (lotteries.length > 0) {
            handleChangeLottery(0);
        }
    }, [lotteries]);

    const specialPlays = [
        { name: 'permuta', fn: getPermutePlays },
        { name: 'serie', fn: getSeriePlays },
        { name: 'corrida', fn: getRangePlays },
    ];

    const resetUI = () => {
        setInputPlayerBet('');
    };

    const handleSpecialPlay = (fn) => {
        const play = fn(inputPlayerBet.split('.')).join('.');
        handleAddTriplesBets(play);
    };
    const handleBuyTriples = async () => {
        try {
            const res = await handleBuyTicket(bets);
            setTicket(res.ticket_string);
            resetUI();
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                let description = '';
                if (error.response.data.data && error.response.data.data.msj) {
                    description = error.response.data.data.msj;
                }
                showError(error.response.data.message, description);
                return;
            } else if (error.message) {
                showError(error.message);
                return;
            }

            showError('Ha ocurrido un error');
        }
    };
    const handleAddTriplesBets = (play) => {
        // remove empty numbers
        play = play
            .split('.')
            .filter((v) => v !== '')
            .join('.');

        if (!validateBet(lotteries[lotteryIndex].type, play)) {
            const message =
                lotteries[lotteryIndex].type === 'TRIPLES'
                    ? 'Ingresa una jugada v??lida, solo se aceptan terminales o triples.'
                    : 'Ingresa una jugada v??lida, solo se aceptan terminales.';
            showError(message);
            return;
        }

        const hasComodin = lotteries.some((l) => {
            return l.sorteos.some((s) => {
                if (draws[s.id]) {
                    return s.comodin;
                }

                return false;
            });
        });

        if (hasComodin) {
            setPlayerBet(play);
            return setShowZodialModal(true);
        }

        handleAddBets(play, resetUI);
    };
    const handleSelectZodiacSigns = (signs) => {
        setShowZodialModal(false);
        handleAddBets(playerBet, resetUI, signs);
    };
    const handleChangeLottery = (index) => {
        setLotteryIndex(index);
        setAvailableDraws(
            lotteries[index].sorteos.filter((draw) => isBeforeNow(draw.horac))
        );
    };
    const handleInputPlayerBetChange = (e) => {
        if (validatePartialBet(lotteries[lotteryIndex].type, e.target.value)) {
            setInputPlayerBet(e.target.value);
        }
    };

    const getTripleImage = (name) => {
        return `/triples/${name.toLowerCase().replaceAll(' ', '-')}.png`;
    };

    if (lotteries === null || lotteries.length === 0) {
        return (
            <div className="align-items-center d-flex h-100 justify-content-center">
                <Alert variant="info" className="m-auto text-center w-50">
                    No hay loter??as activas en este momento.
                </Alert>
            </div>
        );
    }

    return (
        <Row className="h-100">
            <Col className="d-flex justify-content-center triples-draws-wrapper" lg="3" md="3">
                <div className="triples-lotteries-list py-2">
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
                    <div className="ml-1 flex-fill">
                        <Input
                            id="bets"
                            placeholder="Separe las jugadas con punto ."
                            value={inputPlayerBet}
                            onChange={handleInputPlayerBetChange}
                        />
                    </div>
                    {specialPlays.map((play, index) => (
                        <Button
                            variant="success"
                            key={index}
                            className="ml-2 text-uppercase"
                            onClick={() => handleSpecialPlay(play.fn)}
                        >
                            {play.name}
                        </Button>
                    ))}
                </div>

                <div className="d-flex flex-wrap justify-content-center mt-3">
                    {availableDraws.length > 0 ? (
                        <>
                            <Button
                                className="triples-draw-button p-3 m-1"
                                variant="light"
                                onClick={() =>
                                    handleSelectMultipleDraws(availableDraws)
                                }
                            >
                                TODOS
                            </Button>
                            {availableDraws.map((draw) => (
                                <Button
                                    key={draw.id}
                                    className="triples-draw-button p-3 m-1"
                                    variant={
                                        draws[draw.id] ? 'success' : 'light'
                                    }
                                    onClick={() => handleSelectDraw(draw)}
                                >
                                    <div>{draw.nombre}</div>
                                </Button>
                            ))}
                        </>
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
                    onAddBets={() => handleAddTriplesBets(inputPlayerBet)}
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
