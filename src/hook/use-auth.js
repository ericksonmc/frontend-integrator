import React, { useState, useEffect, useCallback, useContext, createContext } from 'react';
import Auth from '../api/auth';
import { setAuthToken, deleteAuthToken } from '../util/request';
import { usePlayer } from './use-player';

export const AuthContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProvideAuth() {
    const authTK = getPersistedToken();
    const { setPlayer } = usePlayer();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoadingFromPersisted, setIsLoadingFromPersisted] = useState(!!authTK);

    if (authTK != null) {
        setAuthToken(authTK);
    }

    const tokenLogin = useCallback(async (token) => {
        try {
            const data = await Auth.tokenLogin(token);
            persistToken(token);
            setAuthToken(token);
            setIsLoggedIn(true);
            setIsLoadingFromPersisted(false);
            return setPlayer(data.player);
        } catch (e) {
            throw e;
        }
    }, [setPlayer]);

    const logout = async () => {
        await Auth.logout();
        persistToken(null);
        deleteAuthToken();
        setPlayer(null);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        if (authTK != null) {
            tokenLogin(authTK);
        }

        return () => setPlayer(null);
    }, [authTK, setPlayer, tokenLogin]);

    return {
        isLoggedIn,
        isLoadingFromPersisted,
        tokenLogin,
        logout,
    };
}

function persistToken(token) {
    if (token) {
        return window.localStorage.setItem('authTK', token);
    }

    window.localStorage.removeItem('authTK');
}

function getPersistedToken() {
    return window.localStorage.getItem('authTK');
}