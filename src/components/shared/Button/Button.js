import React from 'react';
import { Button as Btn } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './Button_styles.scss';

function Button(props) {
    return (
        <Btn
            {...props}
            className={classnames(props.className, 'button', {
                ['button-' + props.variant]: props.variant,
            })}
        >
            {props.children}
        </Btn>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    primary: PropTypes.bool,
    children: PropTypes.node,
    variant: PropTypes.string,
};

export default Button;
