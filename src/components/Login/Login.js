import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from '@reach/router';
import { useAuth } from '../../hook/use-auth';

function Login(props) {
    const auth = useAuth();
    const [loading, setLoading] = useState(true);

    const login = useCallback(async () => {
        try {
            setLoading(true);
            await auth.tokenLogin(props.token);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, [props.token, auth]);

    useEffect(() => {
        login();
    }, [login]);

    if (auth.isLoggedIn) {
        return <Redirect noThrow from="/login/:token" to="/" />;
    }

    return loading ? (
        <h1>Loading... {props.token}</h1>
    ) : (
        <>
            <h1>Loged!</h1>{' '}
        </>
    );
}

export default Login;
