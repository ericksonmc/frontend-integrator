import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import animalList from './animal-list';
import './Animals_styles.scss';

export default function Animals({ lotteries, onSelectDraw }) {
    if (lotteries === null) {
        return null;
    }

    return (
        <Row className="h-100">
            <Col className="h-100" lg="auto">
                <div className="h-100 overflow-auto pr-5">
                    {lotteries.map((l, lotteryIndex) =>
                        l.sorteos.map((draw, drawIndex) => (
                            <Form.Check
                                id={'draw' + drawIndex}
                                type="checkbox"
                                key={draw.id}
                                label={draw.nombre}
                                className="mt-3"
                                value={draw.selected}
                                checked={draw.selected === true}
                                onChange={() =>
                                    onSelectDraw(lotteryIndex, drawIndex)
                                }
                            />
                        ))
                    )}
                </div>
            </Col>
            <Col>
                <div className="d-flex justify-content-center flex-wrap">
                    {animalList.map((animal) => (
                        <Button
                            className="animals-option-button p-3 rounded-0 m-1"
                            key={animal.number}
                            variant="light"
                        >
                            {animal.name}
                        </Button>
                    ))}
                </div>
            </Col>
        </Row>
    );
}
