import React, { useEffect, useMemo, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import animalList from './animal-list';
import Bets from '../Bets/Bets';
import useBets from '../../hook/use-bets';
import { useStore } from '../../hook/use-store';
import TicketModal from '../TicketModal/TicketModal';
import { isBeforeNow } from '../../util/time';
import { formatTime } from '../../util/format';
import animalsButtonImg from '../../img/animals-button.png';
import './Animals_styles.scss';
import { showError } from '../../util/alert';

function Animals() {
    const [lotteries, setLotteries] = useState([]);
    const {
        bets,
        draws,
        handleAddBets,
        handleDeleteBets,
        handleBuyTicket,
        handleSelectDraw,
    } = useBets();
    const [betAmount, setBetAmount] = useState('');
    const [playerAnimals, setPlayerAnimals] = useState(
        animalList.map((a) => ({ ...a, selected: false }))
    );
    const [ticket, setTicket] = useState('');
    const playerBet = useMemo(() => {
        return playerAnimals
            .filter((p) => p.selected)
            .map((p) => p.number)
            .join('.');
    }, [playerAnimals]);
    const { products } = useStore();
    const availableLotteries = useMemo(() => {
        return lotteries.map((lottery) => {
            return {
                ...lottery,
                sorteos: lottery.sorteos.filter((draw) =>
                    isBeforeNow(draw.horac)
                ),
            };
        });
    }, [lotteries]);

    useEffect(() => {
        setLotteries(products.animalitos || []);
    }, [products, setLotteries]);

    const handleSelectAnimal = (index) => {
        const a = [...playerAnimals];
        a[index].selected = !a[index].selected;
        setPlayerAnimals(a);
    };

    const getBetDisplayName = (number) => {
        return animalList.find((a) => a.number === number).name;
    };

    const handleSelectAnimalitosDraw = (lotteryIndex, drawIndex) => {
        handleSelectDraw('animalitos', lotteryIndex, drawIndex);
    };
    const resetPlayerAnimals = () => {
        setPlayerAnimals(animalList.map((a) => ({ ...a, selected: false })));
    };

    const handleBuyAnimalitos = async () => {
        try {
            const res = await handleBuyTicket(bets, {
                aniTipo: 0,
                tip: 'N',
                ani: true,
            });
            setTicket(res.ticket_string);
            resetPlayerAnimals();
            setBetAmount('');
        } catch (error) {
            if (error.response.data && error.response.data.message) {
                showError(error.response.data.message);
                return;
            }

            showError('Ha ocurrido un error');
        }
    };

    if (lotteries === null || lotteries.length === 0) {
        return null;
    }

    return (
        <Row className="h-100">
            <Col
                lg="3"
                md="3"
                className="animals-draws-wrapper d-flex flex-column"
            >
                <div className="animals-draws-list mx-auto px-2 overflow-auto">
                    {availableLotteries.map((l, lotteryIndex) => (
                        <div key={l.id}>
                            <p className="font-weight-bold text-uppercase mt-3">
                                {l.nombre}
                            </p>
                            {l.sorteos.length > 0 ? (
                                l.sorteos.map((draw, drawIndex) => (
                                    <Form.Check
                                        id={'draw' + drawIndex}
                                        type="checkbox"
                                        key={l.id + ' ' + draw.id}
                                        label={
                                            draw.nombre_largo +
                                            ' ' +
                                            formatTime(draw.horac)
                                        }
                                        className="mt-3"
                                        value={draw.id}
                                        checked={!!draws[draw.id]}
                                        disabled={!isBeforeNow(draw.horac)}
                                        onChange={() =>
                                            handleSelectAnimalitosDraw(
                                                lotteryIndex,
                                                drawIndex
                                            )
                                        }
                                    />
                                ))
                            ) : (
                                <p className="ml-2 text-muted">
                                    No hay sorteos disponibles
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </Col>
            <Col className="animals-options-wrapper d-flex justify-content-center align-content-start flex-wrap">
                {playerAnimals.map((animal, index) => (
                    <div
                        key={animal.number}
                        className="animals-option-button m-1"
                        onClick={() => handleSelectAnimal(index)}
                    >
                        <img
                            className={classnames('animals-logo w-100', {
                                'animals-logo-selected': animal.selected,
                            })}
                            src={animalsButtonImg}
                        />
                        <div
                            className={classnames(
                                'text-center text-uppercase font-weight-bold mt-1',
                                {
                                    'animals-logo-name-selected':
                                        animal.selected,
                                }
                            )}
                        >
                            {animal.name}
                        </div>
                    </div>
                ))}
            </Col>
            <Col lg="3" md="3">
                <Bets
                    className="mx-auto"
                    bets={bets}
                    betAmount={betAmount}
                    getBetDisplayName={getBetDisplayName}
                    setBetAmount={setBetAmount}
                    onAddBets={() => handleAddBets(betAmount, playerBet, draws)}
                    onDeleteBets={handleDeleteBets}
                    onBuyTicket={handleBuyAnimalitos}
                />
            </Col>
            <TicketModal
                show={ticket !== ''}
                ticket={ticket}
                onClose={() => setTicket('')}
            ></TicketModal>
        </Row>
    );
}

export default Animals;
