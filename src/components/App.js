import React from 'react';
import { Router } from '@reach/router';
import Alert from 'react-bootstrap/Alert';
import { ProvideAuth } from '../hook/use-auth';
import { ProvideStore } from '../hook/use-store';
import Login from './Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Home from './Home/Home';

function NotFound() {
    return (
        <Alert variant="danger" className="m-auto text-center w-50">
            Not found
        </Alert>
    );
}

function App() {
    return (
        <ProvideStore>
            <ProvideAuth>
                <Router>
                    <Login path="/login/:token"></Login>
                    <PrivateRoute path="/">
                        <NotFound default />
                        <Home path="/*"></Home>
                    </PrivateRoute>
                </Router>
            </ProvideAuth>
        </ProvideStore>
    );
}

export default App;
