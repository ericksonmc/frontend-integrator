import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useStore } from '../../hook/use-store';
import { formatMoney, formatNumber } from '../../util/currency';
import Lotteries from '../Lotteries/Lotteries';
import BetBar from '../BetBar/BetBar';
import Bets from '../Bets/Bets';

const Board = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.primaryFontColor};
    padding: 20px;
`;

const showError = (text) => {
    Swal.fire({
        title: text,
        icon: 'error',
    });
};

export default function Home() {
    const { player, products, lotterySetup, setProducts } = useStore();
    const [bets, setBets] = useState({});
    const [playerBet, setPlayerBet] = useState('');
    const [draws, setDraws] = useState([]);
    const [betAmount, setBetAmount] = useState('');

    const onSelectDraw = (lotteryIndex, drawIndex) => {
        const p = [...products];
        const draw = p[lotteryIndex]['sorteos'][drawIndex];
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
    const onToggleDraws = (lotteryIndex) => {
        const p = [...products];
        const cDraws = { ...draws };

        p[lotteryIndex].sorteos.forEach((draw) => {
            draw.selected = !draw.selected;
            if (draw.selected) {
                cDraws[draw.id] = draw.nombre_largo;
            } else {
                delete cDraws[draw.id];
            }
        });

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
                    i: index,
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

    return (
        <Container>
            <Row>
                <Board>
                    <div className="mr-3">
                        <BetBar
                            className="mb-1"
                            playerBet={playerBet}
                            setPlayerBet={setPlayerBet}
                        />
                        <Lotteries
                            lotteries={products}
                            draws={draws}
                            onSelectDraw={onSelectDraw}
                            onToggleDraws={onToggleDraws}
                        />
                    </div>
                    <Bets
                        bets={bets}
                        betAmount={betAmount}
                        setBetAmount={setBetAmount}
                        onAddBets={onAddBets}
                        onDeleteBets={onDeleteBets}
                    />
                </Board>
            </Row>
        </Container>
    );
}
