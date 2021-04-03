import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fontawesome';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn:
            'https://8236ef69586147a68c8939296d0ba096@o423517.ingest.sentry.io/5704318',
    });
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
