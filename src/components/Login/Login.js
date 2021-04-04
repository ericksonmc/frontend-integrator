import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, navigate } from '@reach/router';
import { Alert, Container, Row } from 'react-bootstrap';
import { useAuth } from '../../hook/use-auth';

function Login(props) {
    const auth = useAuth();
    const [invalidToken, setInvalidToken] = useState(false);

    useEffect(() => {
        const token = auth.getPersistedToken();

        if (token) {
            return navigate('/login/' + token + props.location.search);
        }

        setInvalidToken(true);
    }, []);

    if (auth.isLoggedIn) {
        return <Redirect noThrow from="/login" to="/" />;
    }

    return (
        invalidToken && (
            <Container fluid className="h-100">
                <Row className="h-100 justify-content-center align-items-center">
                    <Alert variant="danger" className="w-50 m-auto text-center">
                        Debe proveer una token válida de inicio de sesión
                    </Alert>
                </Row>
            </Container>
        )
    );
}

Login.propTypes = {
    location: PropTypes.object,
};

export default Login;
