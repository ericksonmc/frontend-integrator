import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Container, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { useStore } from '../../hook/use-store';
import { formatMoney } from '../../util/currency';
import './Home_styles.scss';

function Home(props) {
    const { playerBalance } = useStore();

    const getLinkProps = ({ isCurrent }) => {
        return {
            className: classnames(
                'home-nav-button btn btn-light rounded-0 p-3',
                { active: isCurrent }
            ),
        };
    };

    return (
        <Container fluid className="home-container h-100 d-flex flex-column">
            <Row className="px-4 py-2">
                <Col className="d-flex align-items-center">
                    <Link to="triples" getProps={getLinkProps}>
                        Triples
                    </Link>
                    <Link to="animalitos" getProps={getLinkProps}>
                        Animalitos
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
