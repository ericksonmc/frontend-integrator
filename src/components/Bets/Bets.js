import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../shared/Input';

const Button = styled.button`
    color: ${(props) => props.theme.buttonFontColor};
`;
const Border = styled.div`
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
`;
const BetSection = styled(Border)`
    color: ${(props) => props.theme.buttonFontColor};
    background-color: #fff;
    padding: 5px 10px;
`;
const BetList = styled(Border)`
    
    height: 296px;
    overflow-y: auto;
    background-color: #dfdede;
}
`;

export default function Bets() {
    const [amount, setAmount] = useState('');

    return (
        <div>
            <div className="d-flex align-items-center">
                <label htmlFor="amount" className="mb-0 mr-4">
                    Monto
                </label>
                <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button className="btn btn-light btn-block mt-4">
                Agregar Jugadas
            </Button>

            <div className="mt-1">
                <BetSection>Jugadas</BetSection>
                <BetList></BetList>
                <BetSection>Jugadas</BetSection>
            </div>

            <div className="d-flex mt-4 justify-content-around">
                <Button className="btn btn-light btn-sm">
                    Borrar jugadas
                </Button>
                <Button className="btn btn-light btn-sm">
                    Comprar
                </Button>
            </div>
        </div>
    );
}
