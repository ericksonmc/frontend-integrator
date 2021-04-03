import React from 'react';
import { Router, Redirect } from '@reach/router';
import Alert from 'react-bootstrap/Alert';
import { ErrorBoundary } from '@sentry/react';
import { ProvideAuth } from '../hook/use-auth';
import { ProvideStore } from '../hook/use-store';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Home from './Home/Home';
import Triples from './Triples/Triples';
import Animals from './Animals/Animals';
import TicketHistory from './TicketHistory/TicketHistory';
import Awards from './Awards/Awards';
import Login from './Login/Login';
import TokenLogin from './TokenLogin/TokenLogin';

function NotFound() {
    return (
        <Alert variant="danger" className="m-auto text-center w-50">
            Not found
        </Alert>
    );
}

function App() {
    return (
        <ErrorBoundary fallback={'An error has occurred'}>
            <ProvideStore>
                <ProvideAuth>
                    <Router id="router">
                        <Login path="/login" />
                        <TokenLogin path="/login/:token" />
                        <PrivateRoute path="/">
                            <Home path="/">
                                <Redirect
                                    default
                                    noThrow
                                    from="/"
                                    to="triples"
                                />
                                <Triples path="triples" />
                                <Animals path="animalitos" />
                                <TicketHistory path="history" />
                                <Awards path="awards" />
                            </Home>
                            <NotFound default />
                        </PrivateRoute>
                    </Router>
                </ProvideAuth>
            </ProvideStore>
        </ErrorBoundary>
    );
}

export default App;
