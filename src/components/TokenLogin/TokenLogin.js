import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useAuth } from '../../hook/use-auth';
import queryString from 'query-string';

function TokenLogin(props) {
    const auth = useAuth();
    const [loading, setLoading] = useState(true);

    const login = useCallback(
        async (token) => {
            try {
                setLoading(true);
                await auth.tokenLogin(token);

                const queryParams = queryString.parse(props.location.search);
                if (queryParams.next) {
                    return navigate(queryParams.next);
                }
                return navigate('/');
            } catch (e) {
                return navigate('/login');
            } finally {
                setLoading(false);
            }
        },
        [auth]
    );

    useEffect(() => {
        login(props.token);
    }, []);

    return (
        loading && (
            <Container fluid className="h-100">
                <Row className="h-100 justify-content-center align-items-center">
                    <Spinner animation="border" />
                </Row>
            </Container>
        )
    );
}

TokenLogin.propTypes = {
    token: PropTypes.string,
    location: PropTypes.object,
};

export default TokenLogin;
