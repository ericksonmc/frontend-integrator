import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../hook/use-store';
import Lotteries from '../Lotteries/Lotteries';
import BetBar from '../BetBar/BetBar';
import Bets from '../Bets/Bets';

const Board = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.primaryFontColor};
    padding: 20px;
`;

export default function Home() {
    const { player, products, lotterySetup } = useStore();

    return (
        <Board>
            <div className="mr-3">
                <BetBar className="mb-1" />
                <Lotteries lotteries={products} />
            </div>
            <Bets />
        </Board>
    );
}
