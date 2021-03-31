import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Container, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { useStore } from '../../hook/use-store';
import { formatMoney } from '../../util/currency';
import animalLogo from '../../img/animal.png';
import triplesLogo from '../../img/triples.png';
import './Home_styles.scss';

function Home(props) {
    const { playerBalance } = useStore();

    const getLinkProps = ({ isCurrent }) => {
        return {
            className: classnames('home-nav-button d-flex', {
                active: isCurrent,
            }),
        };
    };

    return (
        <Container fluid className="home-container h-100 d-flex flex-column">
            <Row className="px-4 py-2">
                <Col className="d-flex align-items-center">
                    <Link to="triples" getProps={getLinkProps}>
                        <img src={triplesLogo} />
                        <span className="align-self-end ml-2 text-uppercase font-weight-bold">
                            Triples
                        </span>
                    </Link>
                    <Link to="animalitos" getProps={getLinkProps}>
                        <img src={animalLogo} />
                        <span className="align-self-end ml-2 text-uppercase font-weight-bold">
                            Animalitos
                        </span>
                    </Link>
                    <Link to="history" getProps={getLinkProps}>
                        <img src={triplesLogo} />
                        <span className="align-self-end ml-2 text-uppercase font-weight-bold">
                            Historial
                        </span>
                    </Link>
                    <Link to="awards" getProps={getLinkProps}>
                        <img src={triplesLogo} />
                        <span className="align-self-end ml-2 text-uppercase font-weight-bold">
                            Resultados
                        </span>
                    </Link>
                </Col>
                <Col className="col-auto p-3">
                    Saldo: {formatMoney(playerBalance)}
                </Col>
            </Row>
            <Row className="home-content flex-fill">
                <div className="home-board h-100 p-3">{props.children}</div>
            </Row>
        </Container>
    );
}

Home.propTypes = {
    children: PropTypes.node,
};

export default Home;
