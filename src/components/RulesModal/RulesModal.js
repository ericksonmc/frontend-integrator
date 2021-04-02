import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import './RulesModal_styles.scss';

function RulesModal({ products, show, onClose }) {
    return (
        <Modal show={show} onHide={onClose} backdrop="static">
            <Modal.Header className="rules-modal-header">
                <div className="mx-auto text-center">
                    <h4>Reglamento</h4>
                </div>
            </Modal.Header>
            <Modal.Body className="rules-modal-body">
                {products.triples && products.animalitos && (
                    <>
                        <h4>Triples</h4>
                        {products.triples.map((p) => (
                            <div key={p.id}>
                                <p className="mt-3 mb-0">{p.nombre}</p>
                                <a href="/reglamento" target="_blank">
                                    Descargue aquí el reglamento del juego
                                </a>
                            </div>
                        ))}

                        <h4 className="mt-3">Animalitos</h4>
                        {products.animalitos.map((p) => (
                            <div key={p.id}>
                                <p className="mt-3 mb-0">{p.nombre}</p>
                                <a href="/reglamento" target="_blank">
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
