import React from 'react';
import './Input_styles.scss';
import classnames from 'classnames';

export default function Input(props) {
    return (
        <input {...props} className={classnames(props.className, 'input overflow-hidden')} />
    );
}
