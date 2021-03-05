import React, { useState, useContext, createContext } from 'react';

export const PlayerContext = createContext();

export function ProvidePlayer({ children }) {
    const player = useProvidePlayer();

    return <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => {
    return useContext(PlayerContext);
};

function useProvidePlayer() {
    const [player, setPlayer] = useState(null);

    return {
        player,
        setPlayer,
    };
}
