import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Modal } from 'react-bootstrap';
import './RulesModal_styles.scss';
import { listRegulations } from '../../api/reports';

function RulesModal({ show, onClose }) {
    const [rules, setRules] = useState([]);
    const [loadError, setLoadError] = useState(false);

    useEffect(async () => {
        try {
            setRules(await listRegulations());
        } catch (error) {
            setLoadError(true);
        }
    }, []);

    return (
        <Modal show={show} onHide={onClose} backdrop="static">
            <Modal.Header className="rules-modal-header">
                <div className="mx-auto text-center">
                    <h4>Reglamento</h4>
                </div>
            </Modal.Header>
            <Modal.Body className="rules-modal-body">
                {loadError && (
                    <Alert variant="danger">Error al cargar los datos.</Alert>
                )}

                {!loadError && (
                    <>
                        {' '}
                        <h4>Triples</h4>
                        {rules
                            .filter(
                                ({ type_product, rules, url }) =>
                                    type_product === 'animalitos' &&
                                    (rules || url)
                            )
                            .map((r) => (
                                <div key={r.id}>
                                    <p className="mt-3 mb-0">{r.name}</p>
                                    <a
                                        href={r.rules}
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        Descargue aquí el reglamento del juego
                                    </a>
                                </div>
                            ))}
                        <h4 className="mt-3">Animalitos</h4>
                        {rules
                            .filter(
                                ({ type_product, rules, url }) =>
                                    type_product === 'animalitos' &&
                                    (rules || url)
                            )
                            .map((r) => (
                                <div key={r.id}>
                                    <p className="mt-3 mb-0">{r.name}</p>
                                    <a
                                        href={r.rules || r.url}
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        Descargue aquí el reglamento del juego
                                    </a>
                                </div>
                            ))}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer className="rules-modal-footer">
                <Button variant="light" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

RulesModal.propTypes = {
    products: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default RulesModal;
