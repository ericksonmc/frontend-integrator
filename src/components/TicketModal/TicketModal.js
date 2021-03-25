import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import './TicketModal_styles.scss';

function TicketModal({ show, ticket, onClose }) {
    return (
        <Modal show={show} onHide={onClose} backdrop="static">
            <Modal.Header className="ticket-modal-header">
                <div className="mx-auto text-center">
                    <h4>Listo gracias por tu compra</h4>
                    <p>Puedes visualizar a continuacion tu recibo</p>
                </div>
            </Modal.Header>
            <Modal.Body className="ticket-modal-body">
                <div
                    className="ticket-modal-print"
                    dangerouslySetInnerHTML={{
                        __html: ticket.replace(/\n|\r/g, '<br />'),
                    }}
                />
            </Modal.Body>
            <Modal.Footer className="ticket-modal-footer">
                <Button variant="light" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

TicketModal.propTypes = {
    show: PropTypes.bool.isRequired,
    ticket: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TicketModal;
