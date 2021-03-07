import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';
import { useStore } from '../../hook/use-store';
import Lotteries from '../Lotteries/Lotteries';
import BetBar from '../BetBar/BetBar';
import Bets from '../Bets/Bets';

const MINIMUM_BET = 10000;

const Board = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.primaryFontColor};
    padding: 20px;
`;

export default function Home() {
    const { player, products, lotterySetup, setProducts } = useStore();
    const [bets, setBets] = useState([]);
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
        if (Number.isNaN(amount) || amount < MINIMUM_BET) {
            console.log('minimum bet is ', MINIMUM_BET);
        }

        if (playerBet === '') {
            console.log('you need to make a bet');
        }

        if (Object.keys(draws).length === 0) {
            console.log('select a draw');
        }

        const betNumbers = playerBet.split('.');
        const cBets = [...bets];
        Object.keys(draws).forEach((drawId) => {
            const j = [];
            betNumbers.forEach((number, index) => {
                j.push({
                    i: index,
                    n: number,
                    m: betAmount,
                });
            });
            cBets.push({
                j,
                c: drawId,
                n: draws[drawId],
            });
        });

        setBets(cBets);
    };

    const onDeleteBets = (drawIndex = null, numberIndex = null) => {
        let cBets = [...bets];
        if (numberIndex != null && drawIndex != null) {
            cBets[drawIndex].j.splice(numberIndex, 1);

            if (cBets[drawIndex].j.length === 0) {
                cBets.splice(drawIndex, 1);
            }
        } else if (drawIndex != null) {
            cBets.splice(drawIndex, 1);
        } else {
            cBets = [];
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
