import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { formatMoney } from '../../util/currency';
import Input from '../shared/Input/Input';
import './Bets_styles.scss';

export default function Bets({
    bets,
    betAmount,
    setBetAmount,
    getBetDisplayName,
    onAddBets,
    onDeleteBets,
    onBuyTicket,
    ...props
}) {
    const total = Object.values(bets).reduce(
        (memo, curr) => {
            memo.quantity += curr.j.length;
            memo.amount += curr.j.reduce(
                (total, amount) => total + amount.m,
                0
            );
            return memo;
        },
        { quantity: 0, amount: 0 }
    );
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onAddBets();
        }
    };

    return (
        <div className={props.className}>
            <div className="d-flex align-items-center">
                <label htmlFor="amount" className="mb-0 mr-4">
                    Monto
                </label>
                <Input
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <Button block className="mt-4" variant="light" onClick={onAddBets}>
                Agregar Jugadas
            </Button>

            <div className="mt-1">
                <div className="bg-light text-dark p-1">Jugadas</div>
                <div className="bets-list">
                    {total.quantity > 0 ? (
                        Object.keys(bets).map((drawId) => (
                            <div key={drawId}>
                                <div className="bets-draw">
                                    {bets[drawId].n}
                                    <FontAwesomeIcon
                                        icon="trash-alt"
                                        className="bets-trash-icon ml-auto"
                                        onClick={() => onDeleteBets(drawId)}
                                    />
                                </div>
                                {bets[drawId].j.map((j, bj) => (
                                    <div className="bets-play" key={bj}>
                                        <div>{getBetDisplayName(j.n)}</div>
                                        <div className="flex-fill text-right ml-2">
                                            {formatMoney(j.m)}
                                        </div>
                                        <FontAwesomeIcon
                                            icon="trash-alt"
                                            className="bets-trash-icon ml-2"
                                            onClick={() =>
                                                onDeleteBets(drawId, bj)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-2 font-weight-normal">
                            No has agregado ninguna jugada.
                        </p>
                    )}
                </div>
                <div className="d-flex bg-light text-dark p-1">
                    <div>Jugadas: {total.quantity}</div>
                    <div className="flex-fill text-right">
                        Total: {formatMoney(total.amount)}
                    </div>
                </div>
            </div>

            <div className="d-flex mt-4 justify-content-around">
                <Button
                    variant="light"className="btn btn-light btn-sm"
                    size="sm"
                    onClick={() => onDeleteBets()}
                >
                    Borrar jugadas
                </Button>
                <Button variant="light" size="sm" onClick={onBuyTicket}>
                    Comprar
                </Button>
            </div>
        </div>
    );
}
