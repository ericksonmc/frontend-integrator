import React, { useState, useContext, createContext } from 'react';

export const StoreContext = createContext();

export function ProvideStore({ children }) {
    const store = useProvideStore();

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
    return useContext(StoreContext);
};

function useProvideStore() {
    const [player, setPlayer] = useState(null);
    const [products, setProducts] = useState(null);
    const [lotterySetup, setLotterySetup] = useState(null);

    return {
        player,
        products,
        lotterySetup,
        setPlayer,
        setProducts,
        setLotterySetup,
    };
}
