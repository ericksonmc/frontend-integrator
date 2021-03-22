import { useState } from 'react';
import { useStore } from '../hook/use-store';
import { formatMoney, formatNumber } from '../util/currency';
import { showError } from '../util/alert';
import Sales from '../api/sales';

function useBets() {
    const [draws, setDraws] = useState([]);
    const [bets, setBets] = useState({});
    const { lotterySetup, products } = useStore();
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

    const handleSelectDraw = (product, lotteryIndex, drawIndex) => {
        const draw = products[product][lotteryIndex]['sorteos'][drawIndex];
        const cDraws = { ...draws };

        if (!cDraws.hasOwnProperty(draw.id)) {
            cDraws[draw.id] = draw.nombre_largo;
        } else {
            delete cDraws[draw.id];
        }

        setDraws(cDraws);
    };
    const handleAddBets = (betAmount, playerBet, draws) => {
        const amount = Number(betAmount);
        if (Number.isNaN(amount) || amount < lotterySetup.monto_por_jugada) {
            showError(
                'El monto minimo por jugada es ' +
                    formatMoney(lotterySetup.monto_por_jugada)
            );
            return;
        }

        if (amount % lotterySetup.multiplo > 0) {
            showError(
                'La jugada debe ser multiplo de ' +
                    formatNumber(lotterySetup.multiplo)
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
        let i = 0;
        Object.keys(draws).forEach((drawId) => {
            if (!cBets[drawId]) {
                cBets[drawId] = { j: [], n: draws[drawId] };
            }
            betNumbers.forEach((number, index) => {
                cBets[drawId].j.push({
                    i: i++,
                    n: number,
                    m: amount,
                });
            });
        });

        setBets(cBets);
    };
    const handleDeleteBets = (drawId = null, numberIndex = null) => {
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
    const handleBuyTicket = async (bets) => {
        if (total.amount < lotterySetup.monto_minimo_ticket) {
            showError(
                'El monto minimo por ticket es ' +
                    formatMoney(lotterySetup.monto_minimo_ticket)
            );
            return;
        }

        if (total.quantity > lotterySetup.jugadas_por_tickets) {
            showError(
                'El maximo de jugadas por ticket es ' +
                    lotterySetup.jugadas_por_tickets
            );
            return;
        }

        try {
            const today = new Date();
            const res = await Sales.sales({
                date:
                    today.getDate().toString().padStart(2, '0') +
                    '/' +
                    (today.getMonth() + 1).toString().padStart(2, '0') +
                    '/' +
                    today.getFullYear(),
                bets: Object.keys(bets).map((drawId) => {
                    return { c: drawId, j: bets[drawId].j };
                }),
            });
            setBets({});

            return res;
        } catch (error) {}
    };

    return {
        bets,
        draws,
        setBets,
        handleAddBets,
        handleDeleteBets,
        handleBuyTicket,
        handleSelectDraw,
    };
}

export default useBets;
