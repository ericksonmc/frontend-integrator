import React from 'react';
import { Link } from '@reach/router';
import { Container, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { useStore } from '../../hook/use-store';
import { formatMoney } from '../../util/currency';
import './Home_styles.scss';

export default function Home(props) {
    const { playerBalance } = useStore();

    const getLinkProps = ({ isCurrent }) => {
        return {
            className: classnames('home-nav-button btn btn-light rounded-0 p-3', { active: isCurrent }),
        };
    };

    return (
        <Container fluid className="home-container h-100 d-flex flex-column">
            <Row className="px-4 py-2">
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
            <Row className="flex-fill overflow-hidden">
                <div className="home-board h-100 p-3">
                    {props.children}
                </div>
            </Row>
        </Container>
    );
}
