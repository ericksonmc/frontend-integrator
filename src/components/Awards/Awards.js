import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useStore } from '../../hook/use-store';
import { listAwards } from '../../api/reports';
import { showError } from '../../util/alert';
import Input from '../shared/Input/Input';
import Button from '../shared/Button/Button';

function Awards() {
    const [date, setDate] = useState('');
    const [type, setType] = useState('TRIPLES');
    const [awards, setAwards] = useState([]);
    const { setShowGlobalLoader } = useStore();

    const handleSearch = async () => {
        if (date === '') {
            showError('Seleccione una fecha a consultar');
            return;
        }

        setShowGlobalLoader(true);
        try {
            const res = await listAwards(date);

            setAwards(
                Object.values(
                    res
                        .filter(
                            (l) =>
                                l.type === type &&
                                l.results &&
                                l.results.length > 0
                        )
                        .reduce((m, c) => {
                            const { product, ...rest } = c;
                            m[product.id] = m[product.id] || product;

                            m[product.id].draws = m.draws || [];

                            m[product.id].draws.push(rest);

                            return m;
                        }, {})
                )
            );
        } catch (error) {
            showError('Hubo un error al consultar los resultados');
        } finally {
            setShowGlobalLoader(false);
        }
    };

    return (
        <div className="h-100 overflow-auto">
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
                <div className="ml-3">
                    <label htmlFor="product" className="mr-3">
                        Producto
                    </label>
                    <select
                        id="product"
                        className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="TRIPLES">Triples</option>
                        <option value="ANIMALES">Animalitos</option>
                    </select>
                </div>
                <Button className="ml-3 align-self-end" onClick={handleSearch}>
                    consultar
                </Button>
            </div>
            {awards.length > 0 ? (
                awards.map((award, index) => (
                    <div key={index}>
                        <h1>{award.name}</h1>
                        <Table variant="dark">
                            <thead>
                                <tr>
                                    <th>Sorteo</th>
                                    <th>Numero</th>
                                </tr>
                            </thead>
                            <tbody>
                                {award.draws.length > 0 ? (
                                    award.draws.map((draw) =>
                                        draw.results.map((result, index) => (
                                            <tr key={index}>
                                                <td>{draw.name}</td>
                                                <td>
                                                    {type === 'ANIMALES'
                                                        ? result.number.name
                                                        : result.number.value}
                                                </td>
                                            </tr>
                                        ))
                                    )
                                ) : (
                                    <tr>
                                        <td>
                                            <p>
                                                No hay resultados para mostrar
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                ))
            ) : (
                <p>No hay resultados para mostrar</p>
            )}
        </div>
    );
}

export default Awards;
