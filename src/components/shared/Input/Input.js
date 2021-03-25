import React from 'react';
import PropTypes from 'prop-types';
import './Input_styles.scss';
import classnames from 'classnames';

function Input(props) {
    return (
        <input
            {...props}
            className={classnames(props.className, 'input overflow-hidden')}
        />
    );
}

Input.propTypes = {
    className: PropTypes.string,
};

export default Input;
