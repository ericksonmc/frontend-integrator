import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Spinner } from 'react-bootstrap';
import classnames from 'classnames';
import { useStore } from '../../hook/use-store';
import './GlobalLoader_styles.scss';

function GlobalLoader() {
    const { showGlobalLoader } = useStore();
    const bodyEl = document.querySelector('body');

    useEffect(() => {
        if (showGlobalLoader) {
            bodyEl.classList.add('global-loader-body');
        } else {
            bodyEl.classList.remove('global-loader-body');
        }
    }, [showGlobalLoader]);

    return ReactDOM.createPortal(
        <div
            className={classnames(
                'global-loader',
                {
                    'global-loader-active': showGlobalLoader,
                }
            )}
        >
            <Spinner animation="border" variant="success" />
        </div>,
        bodyEl
    );
}

export default GlobalLoader;
