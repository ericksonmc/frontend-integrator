import React, { useState } from 'react';
import { Link, Router } from '@reach/router';
import { Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useStore } from '../../hook/use-store';
import { formatMoney, formatNumber } from '../../util/currency';
import Triples from '../Triples/Triples';
import Animals from '../Animals/Animals';
import Bets from '../Bets/Bets';
import Sales from '../../api/sales';
import './Home_styles.scss';

const showError = (text) => {
    Swal.fire({
        title: text,
        icon: 'error',
    });
};

export default function Home() {
    const {
        player,
        products,
        lotterySetup,
        playerBalance,
        setProducts,
    } = useStore();
    const [bets, setBets] = useState({});
    const [playerBet, setPlayerBet] = useState('');
    const [draws, setDraws] = useState([]);
    const [betAmount, setBetAmount] = useState('');
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

    const onSelectDraw = (product, lotteryIndex, drawIndex) => {
        const p = { ...products };
        const draw = p[product][lotteryIndex]['sorteos'][drawIndex];
        draw.selected = !draw.selected;

        const cDraws = { ...draws };
        if (draw.selected) {
            cDraws[draw.id] = draw.nombre_largo;
        } else {
            delete cDraws[draw.id];
        }
        setDraws(cDraws);

        setProducts(p);
    };

    const onAddBets = () => {
        const amount = Number(betAmount);
        if (Number.isNaN(amount) || amount < lotterySetup.mpj) {
            showError(
                'El monto minimo por jugada es ' + formatMoney(lotterySetup.mpj)
            );
            return;
        }

        if (amount % lotterySetup.mt > 0) {
            showError(
                'La jugada debe ser multiplo de ' +
                    formatNumber(lotterySetup.mt)
            );
            return;
        }

        if (playerBet === '') {
            showError('Ingresa tu jugada');
            return;
        }

        if (Object.keys(draws).length === 0) {
            showError('Selecciona al menos un sorteo');
            return;
        }

        const betNumbers = playerBet.split('.');
        const cBets = { ...bets };
        Object.keys(draws).forEach((drawId) => {
            if (!cBets[drawId]) {
                cBets[drawId] = { j: [], n: draws[drawId] };
            }
            betNumbers.forEach((number, index) => {
                cBets[drawId].j.push({
                    i: index + 1,
                    n: number,
                    m: amount,
                });
            });
        });

        setBets(cBets);
    };
    const onDeleteBets = (drawId = null, numberIndex = null) => {
        let cBets = { ...bets };
        if (numberIndex != null && drawId != null) {
            cBets[drawId].j.splice(numberIndex, 1);

            if (cBets[drawId].j.length === 0) {
                delete cBets[drawId];
            }
        } else if (drawId != null) {
            delete cBets[drawId];
        } else {
            cBets = {};
        }
        setBets(cBets);
    };

    const onBuyTicket = async () => {
        if (total.amount < lotterySetup.mmt) {
            showError(
                'El monto minimo por ticket es ' + formatMoney(lotterySetup.mmt)
            );
            return;
        }

        if (total.quantity > lotterySetup.jpt) {
            showError('El maximo de jugadas por ticket es ' + lotterySetup.jpt);
            return;
        }

        const result = await Swal.fire({
            title: 'Confirmar compra',
            showCancelButton: true,
            confirmButtonText: 'Comprar',
            preConfirm: async () => {
                const today = new Date();
                return await Sales.sales({
                    amount: total.amount,
                    date:
                        today.getDate().toString().padStart(2, '0') +
                        '/' +
                        (today.getMonth() + 1).toString().padStart(2, '0') +
                        '/' +
                        today.getFullYear(),
                    ced: player.cedula,
                    email: player.email,
                    bets: Object.keys(bets).map((drawId) => {
                        return { c: drawId, j: bets[drawId].j };
                    }),
                });
            },
        });

        if (result.isConfirmed) {
            setBets({});
            setBetAmount('');
            setPlayerBet('');
        }
    };

    const handleSelectTriplesDraw = (lotteryIndex, drawIndex) => {
        onSelectDraw('triples', lotteryIndex, drawIndex);
    };
    const handleSelectAnimalitosDraw = (lotteryIndex, drawIndex) => {
        onSelectDraw('animalitos', lotteryIndex, drawIndex);
    };

    return (
        <Container fluid className="home-container p-1 overflow-hidden">
            <Row className="px-4">
                <Col className="d-flex align-items-center">
                    <Link to="triples" className="btn btn-light">
                        Triples
                    </Link>
                    <Link to="animalitos" className="btn btn-light ml-3">
                        Animalitos
                    </Link>
                </Col>
                <Col className="col-auto p-3">
                    Saldo: {formatMoney(playerBalance)}
                </Col>
            </Row>
            <Row className="h-100">
                <Col className="h-100">
                    <div className="home-board p-3">
                        <Router className="h-100">
                            <Triples
                                default
                                path="triples"
                                lotteries={products.triples}
                                draws={draws}
                                onSelectDraw={handleSelectTriplesDraw}
                                playerBet={playerBet}
                                setPlayerBet={setPlayerBet}
                            />
                            <Animals
                                path="animalitos"
                                lotteries={products.animalitos}
                                onSelectDraw={handleSelectAnimalitosDraw}
                            ></Animals>
                        </Router>
                    </div>
                </Col>
                <Col className="col-auto">
                    <Bets
                        className="p-3"
                        bets={bets}
                        betAmount={betAmount}
                        setBetAmount={setBetAmount}
                        onAddBets={onAddBets}
                        onDeleteBets={onDeleteBets}
                        onBuyTicket={onBuyTicket}
                    />
                </Col>
            </Row>
        </Container>
    );
}
