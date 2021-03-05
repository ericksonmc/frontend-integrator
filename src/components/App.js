import React from 'react';
import { Router } from '@reach/router';
import { ProvideAuth } from '../hook/use-auth';
import { ProvidePlayer } from '../hook/use-player';
import Login from './Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Home from './Home/Home';

function NotFound() {
    return <h1>Not found</h1>;
}

function App() {
    return (
        <ProvidePlayer>
            <ProvideAuth>
                <Router>
                    <NotFound default />
                    <Login path="/login/:token"></Login>
                    <PrivateRoute path="/">
                        <Home path="/"></Home>
                    </PrivateRoute>
                </Router>
            </ProvideAuth>
        </ProvidePlayer>
    );
}

export default App;
