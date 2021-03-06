import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from '@reach/router';
import { Alert, Container, Row, Spinner } from 'react-bootstrap';
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

        <Container>
            <Row className="justify-content-center align-items-center">
                <Spinner animation="border" />
            </Row>
        </Container>
    ) : (
        <Container>
            <Row className="justify-content-center align-items-center">
                <Alert variant="success" className="w-50 m-auto text-center">
                    Loged!
                </Alert>
            </Row>
        </Container>
        );
}

export default Login;
