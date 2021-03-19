import React, { useState, useContext, createContext } from 'react';

export const StoreContext = createContext();

export function ProvideStore({ children }) {
    const store = useProvideStore();

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}

export const useStore = () => {
    return useContext(StoreContext);
};

function useProvideStore() {
    const [player, setPlayer] = useState(null);
    const [products, setProducts] = useState({
        triples: null,
        animalitos: null,
    });
    const [lotterySetup, setLotterySetup] = useState(null);
    const [playerBalance, setPlayerBalance] = useState(0);

    return {
        player,
        products,
        lotterySetup,
        playerBalance,
        setPlayer,
        setProducts,
        setLotterySetup,
        setPlayerBalance,
    };
}
