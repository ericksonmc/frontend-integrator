import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '../../hook/use-auth';
import queryString from 'query-string';

function PrivateRoute(props) {
    const { isLoggedIn, isLoadingFromPersisted } = useAuth();

    if (!isLoggedIn && !isLoadingFromPersisted) {
        const queryParams = queryString.stringify(
            {
                next: props.location.pathname,
            },
            { skipEmptyString: true }
        );
        return <Redirect noThrow to={'/login?' + queryParams} />;
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
    location: PropTypes.object,
};

export default PrivateRoute;
