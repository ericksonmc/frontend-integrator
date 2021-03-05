import React from 'react';
import { Router } from '@reach/router';
import { ProvideAuth } from '../hook/use-auth';
import { ProvideStore } from '../hook/use-store';
import Login from './Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Home from './Home/Home';

function NotFound() {
    return <h1>Not found</h1>;
}

function App() {
    return (
        <ProvideStore>
            <ProvideAuth>
                <Router>
                    <Login path="/login/:token"></Login>
                    <PrivateRoute path="/">
                        <NotFound default />
                        <Home path="/"></Home>
                    </PrivateRoute>
                </Router>
            </ProvideAuth>
        </ProvideStore>
    );
}

export default App;
