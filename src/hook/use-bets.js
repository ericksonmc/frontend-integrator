import { useState } from 'react';
import { useStore } from '../hook/use-store';
import { formatMoney, formatNumber } from '../util/currency';
import { showError } from '../util/alert';
import Sales from '../api/sales';
import { isBeforeNow } from '../util/time';

function useBets() {
    const [draws, setDraws] = useState({});
    const [bets, setBets] = useState({});
    const [betAmount, setBetAmount] = useState('');
    const { lotterySetup, setPlayerBalance } = useStore();
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
    const { setShowGlobalLoader } = useStore();

    const handleSelectDraw = (draw) => {
        const cDraws = { ...draws };

        if (!cDraws[draw.id]) {
            cDraws[draw.id] = {
                name: draw.nombre_largo,
                comodin: draw.comodin,
                hour: draw.horac,
            };
        } else {
            delete cDraws[draw.id];
        }
        setDraws(cDraws);
    };
    const handleAddBets = (play, onAdd, signs = []) => {
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

        if (play === '') {
            showError('Ingresa tu jugada');
            return;
        }

        if (Object.keys(draws).length === 0) {
            showError('Selecciona al menos un sorteo');
            return;
        }

        const betNumbers = play.split('.');
        const cBets = { ...bets };
        let i = 0;
        Object.keys(draws)
            .filter((drawId) => isBeforeNow(draws[drawId].hour))
            .forEach((drawId) => {
                if (!cBets[drawId]) {
                    cBets[drawId] = { j: [], n: draws[drawId].name };
                }
                betNumbers.forEach((number) => {
                    if (draws[drawId].comodin && signs.length > 0) {
                        signs.forEach((s) => {
                            cBets[drawId].j.push({
                                i: i++,
                                n: number,
                                m: amount,
                                s: s,
                            });
                        });
                    } else {
                        cBets[drawId].j.push({
                            i: i++,
                            n: number,
                            m: amount,
                            s: 0,
                        });
                    }
                });
            });

        setBets(cBets);

        // clear ui elements
        setDraws({});
        setBetAmount('');

        if (onAdd) {
            onAdd();
        }
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
    const handleBuyTicket = async (bets, saleParams = {}) => {
        if (total.quantity === 0) {
            throw new Error('No hay jugadas agregadas');
        }

        if (total.amount < lotterySetup.monto_minimo_ticket) {
            throw new Error(
                'El monto minimo por ticket es ' +
                    formatMoney(lotterySetup.monto_minimo_ticket)
            );
        }

        if (total.quantity > lotterySetup.jugadas_por_tickets) {
            throw new Error(
                'El maximo de jugadas por ticket es ' +
                    lotterySetup.jugadas_por_tickets
            );
        }

        setShowGlobalLoader(true);
        const today = new Date();
        try {
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
                ...saleParams,
            });
            setBets({});
            setDraws({});
            setBetAmount('');
            setPlayerBalance(res.saldo_actual);
            return res;
        } catch (error) {
            setShowGlobalLoader(false);
            throw error;
        } finally {
            setShowGlobalLoader(false);
        }
    };

    return {
        bets,
        draws,
        setBets,
        betAmount,
        handleAddBets,
        handleDeleteBets,
        handleBuyTicket,
        handleSelectDraw,
        setBetAmount,
    };
}

export default useBets;
