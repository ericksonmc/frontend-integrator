import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 2px solid;
    color: #656464;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 600;
    padding: 5px;
    text-align: center;
    padding: 6px;
    border-image: linear-gradient(
            90deg,
            #dfa54d,
            #472714 14%,
            #8d5924 25%,
            #eabe69 36%,
            #f9f290 46%,
            #ae7936 65%,
            #6a4421 81%,
            #a77c2f 92%,
            #674220
        )
        100% 1;
    border-image-slice: 1;
`;

export default function OptionButton(props) {
    return (
        <Button {...props} className={props.className}>
            <div>{props.children}</div>
        </Button>
    );
}
