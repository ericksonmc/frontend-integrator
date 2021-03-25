import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '../../hook/use-auth';

function PrivateRoute(props) {
    const { isLoggedIn, isLoadingFromPersisted } = useAuth();

    if (!isLoggedIn && !isLoadingFromPersisted) {
        return <Redirect noThrow to="/login" />;
    }

    return isLoadingFromPersisted ? (
        <Alert variant="info" className="w-50 m-auto text-center">
            Loading user from persisted token
        </Alert>
    ) : (
        props.children
    );
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;
