import React from 'react';
import { usePlayer } from '../../hook/use-player';

export default function Home() {
    const { player } = usePlayer();

    return (
        <>
            <h1>Home page</h1>
            <div>
                <h1>Player</h1>
                <pre>{JSON.stringify(player, null, 2)}</pre>
            </div>
        </>
    );
}
