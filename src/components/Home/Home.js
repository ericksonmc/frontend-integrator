import React, { useState } from 'react';
import { Link, Router } from '@reach/router';
import { Container, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { useStore } from '../../hook/use-store';
import { formatMoney } from '../../util/currency';
import Triples from '../Triples/Triples';
import Animals from '../Animals/Animals';
import './Home_styles.scss';

export default function Home() {
    const { products, playerBalance } = useStore();

    const getLinkProps = ({ isCurrent }) => {
        return {
            className: classnames('home-nav-button btn btn-light rounded-0 p-3', { active: isCurrent }),
        };
    };

    return (
        <Container fluid className="home-container p-1 overflow-hidden">
            <Row className="px-4">
                <Col className="d-flex align-items-center">
                    <Link
                        to="triples"
                        getProps={getLinkProps}
                    >
                        Triples
                    </Link>
                    <Link
                        to="animalitos"
                        getProps={getLinkProps}
                    >
                        Animalitos
                    </Link>
                </Col>
                <Col className="col-auto p-3">
                    Saldo: {formatMoney(playerBalance)}
                </Col>
            </Row>
            <Row className="h-100">
                <Col className="h-100">
                    <div className="home-board p-3">
                        <Router className="h-100">
                            <Triples
                                default
                                path="triples"
                                lotteries={products.triples}
                            />
                            <Animals
                                path="animalitos"
                                lotteries={products.animalitos}
                            />
                        </Router>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
