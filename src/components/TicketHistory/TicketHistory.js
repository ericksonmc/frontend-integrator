import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useStore } from '../../hook/use-store';
import { listTickets } from '../../api/reports';
import { showError } from '../../util/alert';
import { formatMoney } from '../../util/currency';
import { formatDateTime } from '../../util/format';
import Input from '../shared/Input/Input';
import Button from '../shared/Button/Button';
import TicketModal from '../TicketModal/TicketModal';

function TicketHistory() {
    const [date, setDate] = useState('');
    const [tickets, setTickets] = useState([]);
    const [modalTicket, setModalTicket] = useState('');
    const { setShowGlobalLoader } = useStore();

    const handleSearch = async () => {
        if (date === '') {
            showError('Seleccione una fecha a consultar');
            return;
        }

        setShowGlobalLoader(true);
        try {
            const t = await listTickets(date);

            if (t.length === 0) {
                showError('No hay tickets en la fecha seleccionada');
            } else {
                setTickets(t);
            }
        } catch (error) {
            showError('Hubo un error al consultar los tickets');
        } finally {
            setShowGlobalLoader(false);
        }
    };

    return (
        <div className="h-100">
            <div className="d-flex mb-3">
                <div>
                    <label htmlFor="history-date" className="mr-3">
                        Seleccione fecha a consultar:
                    </label>
                    <Input
                        id="history-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <Button className="ml-3 align-self-end" onClick={handleSearch}>
                    consultar
                </Button>
            </div>
            <div className="h-100 overflow-auto">
                <Table variant="dark">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length > 0 ? (
                            tickets.map((ticket, index) => (
                                <tr key={index}>
                                    <td>{ticket.serial}</td>
                                    <td>{formatMoney(ticket.ticket_amount)}</td>
                                    <td>{formatDateTime(ticket.created_at)}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                setModalTicket(ticket.ticket)
                                            }
                                        >
                                            ver ticket
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>
                                    <p>No hay tickets para mostrar</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <TicketModal
                show={modalTicket !== ''}
                ticket={modalTicket}
                onClose={() => setModalTicket('')}
            ></TicketModal>
        </div>
    );
}

export default TicketHistory;
