import React from 'react';
import { Redirect } from '@reach/router';
import { useAuth } from '../../hook/use-auth';

export default function PrivateRoute(props) {
    const { isLoggedIn, isLoadingFromPersisted } = useAuth();

    if (!isLoggedIn && !isLoadingFromPersisted) {
        return <Redirect noThrow to="/login" />;
    }

    return isLoadingFromPersisted ? (
        <h1>Loading user from persisted token</h1>
    ) : (
        props.children
    );
}
