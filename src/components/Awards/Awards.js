import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useStore } from '../../hook/use-store';
import { listAwards } from '../../api/reports';
import { showError } from '../../util/alert';
import Input from '../shared/Input/Input';
import Button from '../shared/Button/Button';

const signs = {
    1: 'Aries',
    2: 'Tauro',
    3: 'Geminis',
    4: 'Cancer',
    5: 'Leo',
    6: 'Virgo',
    7: 'Libra',
    8: 'Escorpio',
    9: 'Sagitario',
    10: 'Capricornio',
    11: 'Acuario',
    12: 'Piscis',
};

function Awards() {
    const [date, setDate] = useState('');
    const [type, setType] = useState('0');
    const [awards, setAwards] = useState([]);
    const { setShowGlobalLoader } = useStore();

    const handleSearch = async () => {
        if (date === '') {
            showError('Seleccione una fecha a consultar');
            return;
        }

        setShowGlobalLoader(true);
        try {
            const res = await listAwards(date, type);
            setAwards(res);
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
                        <option value="0">Triples</option>
                        <option value="1">Animalitos</option>
                    </select>
                </div>
                <Button className="ml-3 align-self-end" onClick={handleSearch}>
                    consultar
                </Button>
            </div>
            {awards.length > 0 ? (
                awards.map((award, index) => (
                    <div key={index}>
                        <h1>{award.nombre}</h1>
                        <Table variant="dark">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Numero</th>
                                    <th>Signo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {award.sorteos.length > 0 ? (
                                    award.sorteos.map((draw, index) => (
                                        <tr key={index}>
                                            <td>{draw.nombre}</td>
                                            <td>{draw.numero}</td>
                                            <td>
                                                {draw.signo !== 0
                                                    ? signs[draw.signo]
                                                    : '-'}
                                            </td>
                                        </tr>
                                    ))
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
