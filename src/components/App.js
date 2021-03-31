import React from 'react';
import { Router, Redirect } from '@reach/router';
import Alert from 'react-bootstrap/Alert';
import { ProvideAuth } from '../hook/use-auth';
import { ProvideStore } from '../hook/use-store';
import Login from './Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Home from './Home/Home';
import Triples from './Triples/Triples';
import Animals from './Animals/Animals';
import TicketHistory from './TicketHistory/TicketHistory';
import Awards from './Awards/Awards';

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
                <Router id="router">
                    <Login path="/login/:token"></Login>
                    <PrivateRoute path="/">
                        <Home path="/">
                            <Redirect default noThrow from="/" to="triples" />
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
    );
}

export default App;
