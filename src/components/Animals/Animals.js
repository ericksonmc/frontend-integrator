import React, { useMemo, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import animalList from './animal-list';
import Bets from '../Bets/Bets';
import useBets from '../../hook/use-bets';
import TicketModal from '../TicketModal/TicketModal';
import { isBeforeNow } from '../../util/time';
import { formatTime } from '../../util/format';
import './Animals_styles.scss';

export default function Animals({ lotteries }) {
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

    const handleBuyAnimalitos = async () => {
        try {
            const res = await handleBuyTicket(bets, {
                aniTipo: 0,
                tip: 'N',
                ani: true,
            });
            setTicket(res.ticket_string);
        } catch (error) {}
    };

    if (lotteries === null) {
        return null;
    }

    return (
        <Row>
            <Col className="col-auto">
                <div className="animals-draws-list pr-5">
                    {lotteries.map((l, lotteryIndex) => (
                        <div key={l.id}>
                            <p className="font-weight-bold text-uppercase mt-3">
                                {l.nombre}
                            </p>
                            {l.sorteos.map((draw, drawIndex) => (
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
                                    checked={!!draws[draw.id]}
                                    disabled={!isBeforeNow(draw.horac)}
                                    onChange={() =>
                                        handleSelectAnimalitosDraw(
                                            lotteryIndex,
                                            drawIndex
                                        )
                                    }
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </Col>
            <Col>
                <div className="d-flex justify-content-center flex-wrap">
                    {playerAnimals.map((animal, index) => (
                        <Button
                            className="animals-option-button p-3 rounded-0 m-1"
                            key={animal.number}
                            variant={animal.selected ? 'primary' : 'light'}
                            onClick={() => handleSelectAnimal(index)}
                        >
                            {animal.name}
                        </Button>
                    ))}
                </div>
            </Col>
            <Col lg="3">
                <Bets
                    className="p-3"
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
