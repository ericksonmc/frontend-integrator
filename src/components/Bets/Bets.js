import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import classnames from 'classnames';
import { formatMoney } from '../../util/currency';
import Input from '../shared/Input/Input';
import Button from '../shared/Button/Button';
import './Bets_styles.scss';

const signs = {
    1: 'Aries',
    2: 'Tauro',
    3: 'Geminis',
    4: 'Cancer',
    5: 'Leo',
    6: 'Virgo',
    7: 'Libra',
    8: 'Escorpio',
    9: 'Sagitario',
    10: 'Capricornio',
    11: 'Acuario',
    12: 'Piscis',
};

function Bets({
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
        <div className={classnames(props.className, 'bets')}>
            <div className="bets-wrapper">
                <div className="d-flex align-items-center">
                    <label
                        htmlFor="amount"
                        className="mb-0 mr-4 text-uppercase font-weight-bold"
                    >
                        Monto
                    </label>

                    <NumberFormat
                        isNumericString
                        className="flex-fill"
                        thousandSeparator="."
                        decimalSeparator=","
                        value={betAmount}
                        onValueChange={(e) => setBetAmount(e.value)}
                        onKeyDown={handleKeyDown}
                        customInput={Input}
                    />
                </div>
                <Button
                    block
                    variant="outline-success"
                    className="mt-4"
                    onClick={onAddBets}
                >
                    Agregar Jugada
                </Button>

                <div className="mt-3">
                    <div className="bets-list-header py-2 px-1">Jugadas</div>
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
                                        <div
                                            className="bets-play d-flex justify-content-between"
                                            key={bj}
                                        >
                                            <div>{getBetDisplayName(j.n)}</div>
                                            {j.s !== 0 && (
                                                <div className="ml-5">
                                                    {signs[j.s]}
                                                </div>
                                            )}
                                            <div className="flex-fill text-right ml-auto">
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
                    <div className="d-flex bets-list-footer p-1">
                        <div>Jugadas: {total.quantity}</div>
                        <div className="flex-fill text-right">
                            Total: {formatMoney(total.amount)}
                        </div>
                    </div>
                </div>
                <Row className="mt-2">
                    <Col lg="6">
                        <Button
                            block
                            variant="light"
                            className="mt-2"
                            onClick={() => onDeleteBets()}
                        >
                            Borrar jugada
                        </Button>
                    </Col>
                    <Col lg="6">
                        <Button
                            block
                            variant="success"
                            className="mt-2"
                            onClick={onBuyTicket}
                        >
                            Comprar
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

Bets.propTypes = {
    className: PropTypes.string,
    bets: PropTypes.object.isRequired,
    betAmount: PropTypes.string.isRequired,
    setBetAmount: PropTypes.func.isRequired,
    getBetDisplayName: PropTypes.func.isRequired,
    onAddBets: PropTypes.func.isRequired,
    onDeleteBets: PropTypes.func.isRequired,
    onBuyTicket: PropTypes.func.isRequired,
};

export default Bets;
