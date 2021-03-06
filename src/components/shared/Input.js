import styled from 'styled-components';

const Input = styled.input`
    border-width: 2px;
    border-style: solid;
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

    &:focus {
        outline: none;
    }
`;

export default Input;
