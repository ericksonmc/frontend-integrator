import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    createContext,
} from 'react';
import PropTypes from 'prop-types';
import Auth from '../api/auth';
import { setAuthToken, deleteAuthToken } from '../util/request';
import { useStore } from './use-store';

export const AuthContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
ProvideAuth.propTypes = {
    children: PropTypes.element.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProvideAuth() {
    const {
        setPlayer,
        setLotterySetup,
        setProducts,
        setPlayerBalance,
    } = useStore();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const tokenLogin = useCallback(
        async (token) => {
            try {
                setAuthToken(token);
                const data = await Auth.tokenLogin();
                persistToken(token);
                setIsLoggedIn(true);
                setPlayer(data.player);
                setProducts({
                    triples: data.triples,
                    animalitos: data.animalitos,
                });
                setLotterySetup(data.lottery_setup);
                setPlayerBalance(data.saldo_actual);
            } catch (error) {
                persistToken(null);
                throw error;
            }
        },
        [setPlayer, setLotterySetup, setProducts, setPlayerBalance]
    );

    const logout = async () => {
        await Auth.logout();
        persistToken(null);
        deleteAuthToken();
        setPlayer(null);
        setIsLoggedIn(false);
    };

    const getPersistedToken = () => {
        return window.localStorage.getItem('authTK');
    };

    const persistToken = (token) => {
        if (token) {
            return window.localStorage.setItem('authTK', token);
        }

        window.localStorage.removeItem('authTK');
    };

    useEffect(() => {
        return () => setPlayer(null);
    }, []);

    return {
        isLoggedIn,
        tokenLogin,
        logout,
        getPersistedToken,
    };
}
