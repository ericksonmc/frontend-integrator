import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { listTickets } from '../../api/reports';
import { showError } from '../../util/alert';
import { formatMoney } from '../../util/currency';
import { formatDateTime } from '../../util/format';
import Input from '../shared/Input/Input';
import TicketModal from '../TicketModal/TicketModal';

function TicketHistory() {
    const [date, setDate] = useState('');
    const [tickets, setTickets] = useState([]);
    const [modalTicket, setModalTicket] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (date === '') {
            showError('Seleccione una fecha a consultar');
            return;
        }

        setIsLoading(true);
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
            setIsLoading(false);
        }
    };

    return (
        <>
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
                <button disabled={isLoading} onClick={handleSearch}>
                    consultar
                </button>
            </div>
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
                        tickets.map((ticket) => (
                            <tr key={ticket.id}>
                                <td>{ticket.serial}</td>
                                <td>{formatMoney(ticket.ticket_amount)}</td>
                                <td>{formatDateTime(ticket.created_at)}</td>
                                <td>
                                    <button
                                        disabled={isLoading}
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
            <TicketModal
                show={modalTicket !== ''}
                ticket={modalTicket}
                onClose={() => setModalTicket('')}
            ></TicketModal>
        </>
    );
}

export default TicketHistory;
