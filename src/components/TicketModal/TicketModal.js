import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Table } from 'react-bootstrap';
import { formatMoney } from '../../util/currency';
import './TicketModal_styles.scss';

function TicketModal({ bets, lotteries, show, onClose }) {
    const getLotteryName = (id) => {
        const lottery = lotteries.find((l) => l.id === id);

        return lottery ? lottery.name : '-';
    };

    return (
        <Modal show={show} onHide={onClose} backdrop="static">
            <Modal.Header className="ticket-modal-header">
                <div className="mx-auto text-center">
                    <h4>Listo gracias por tu compra</h4>
                    <p>Puedes visualizar a continuacion tu recibo</p>
                </div>
            </Modal.Header>
            <Modal.Body className="ticket-modal-body">
                <Table variant="dark">
                    <thead>
                        <tr>
                            <th>Lotería</th>
                            <th>Número</th>
                            <th>Monto</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bets.map((b, index) => (
                            <tr key={index}>
                                <td>{getLotteryName(b.lotery_id)}</td>
                                <td>{b.number}</td>
                                <td>{formatMoney(b.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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
    bets: PropTypes.array.isRequired,
    lotteries: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TicketModal;
