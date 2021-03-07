import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Input from '../shared/Input';

const Button = styled.button`
    color: ${(props) => props.theme.buttonFontColor};
`;
const Border = styled.div`
    border-width: 2px;
    border-style: solid;
    border-image: linear-gradient(
            90deg,
            #dfa54d,
            #472714 14%,
            #8d5924 25%,
            #eabe69 36%,
            #f9f290 46%,
            #ae7936 65%,
            #6a4421 81%,
            #a77c2f 92%,
            #674220
        )
        100% 1;
    border-image-slice: 1;
`;
const BetSection = styled(Border)`
    color: ${(props) => props.theme.buttonFontColor};
    background-color: #fff;
    padding: 5px 10px;
`;
const BetList = styled(Border)`
    color: #000;
    height: 296px;
    overflow-y: auto;
    background-color: #dfdede;
    font-size: 12px;
    font-weight: 600;
}
`;
const BetDraw = styled.div`
    display: flex;
    color: #b71103;
    margin: 0 5px;
    padding-top: 8px;
`;
const BetPlay = styled.div`
    display: flex;
    color: #06639e;
    padding: 8px 10px;
    margin-top: 1px;
    background-color: #fff;
`;

const TrashIcon = styled(FontAwesomeIcon)`
    color: #b71103;
    cursor: pointer;
`;

export default function Bets({
    bets,
    betAmount,
    setBetAmount,
    onAddBets,
    onDeleteBets,
}) {
    const formatMoney = (number) => {
        return `Bs. ${new Intl.NumberFormat('es-VE').format(number)}`;
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                <label htmlFor="amount" className="mb-0 mr-4">
                    Monto
                </label>
                <Input
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                />
            </div>
            <Button
                className="btn btn-light btn-block mt-4"
                onClick={onAddBets}
            >
                Agregar Jugadas
            </Button>

            <div className="mt-1">
                <BetSection>Jugadas</BetSection>
                <BetList>
                    {bets.map((bet, bi) => (
                        <div key={bi}>
                            <BetDraw>
                                {bet.n}{' '}
                                <TrashIcon
                                    icon="trash-alt"
                                    className="ml-auto"
                                    onClick={() => onDeleteBets(bi)}
                                />
                            </BetDraw>
                            {bet.j.map((j, bj) => (
                                <BetPlay key={bj}>
                                    <div>{j.n}</div>
                                    <div className="flex-fill text-right ml-2">
                                        {formatMoney(j.m)}
                                    </div>
                                    <TrashIcon
                                        icon="trash-alt"
                                        className="ml-2"
                                        onClick={() => onDeleteBets(bi, bj)}
                                    />
                                </BetPlay>
                            ))}
                        </div>
                    ))}
                </BetList>
                <BetSection>Jugadas</BetSection>
            </div>

            <div className="d-flex mt-4 justify-content-around">
                <Button className="btn btn-light btn-sm" onClick={() => onDeleteBets()}>
                    Borrar jugadas
                </Button>
                <Button className="btn btn-light btn-sm">Comprar</Button>
            </div>
        </div>
    );
}
