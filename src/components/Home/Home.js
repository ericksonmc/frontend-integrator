import React from 'react';
import { useStore } from '../../hook/use-store';
import Lotteries from '../Lotteries/Lotteries';

export default function Home() {
    const { player, products, lotterySetup } = useStore();

    return (
        <>
            <h1>Home page</h1>
            <Lotteries lotteries={products} />
            <div>
                <h1>Player</h1>
                <pre>{JSON.stringify(player, null, 2)}</pre>
            </div>
            <div>
                <h1>Products</h1>
                <pre>{JSON.stringify(products, null, 2)}</pre>
            </div>
            <div>
                <h1>Lottery setup</h1>
                <pre>{JSON.stringify(lotterySetup, null, 2)}</pre>
            </div>
        </>
    );
}
