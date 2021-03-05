import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from '@reach/router';
import Alert from 'react-bootstrap/Alert';
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
        <Alert variant="info" className="w-50 m-auto text-center">
            Login user...
        </Alert>
    ) : (
        <Alert variant="success" className="w-50 m-auto text-center">
            Loged!
        </Alert>
    );
}

export default Login;
