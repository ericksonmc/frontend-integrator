import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ZodiacSignsModal_styles.scss';

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

export default function ZodiacSignsModal({ show, onClose, onCancel }) {
    const [selectedSigns, setSelectedSigns] = useState({});

    const handleSelectSign = (key) => {
        setSelectedSigns({ ...selectedSigns, [key]: !selectedSigns[key] });
    };
    const handleSelectAll = () => {
        const s = { ...selectedSigns };
        for (const key of Object.keys(signs)) {
            s[key] = !s[key];
        }
        setSelectedSigns(s);
    };
    const handleClose = () => {
        const signs = Object.keys(selectedSigns).filter(
            (s) => selectedSigns[s]
        );

        return onClose(signs);
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header className="zodial-signs-modal-header">
                <div className="mx-auto text-center">
                    <h4>Seleccione los signos</h4>
                </div>
            </Modal.Header>
            <Modal.Body className="zodial-signs-modal-body">
                <div className="d-flex flex-wrap justify-content-between">
                    {Object.keys(signs).map((key) => (
                        <Button
                            className="zodial-signs-modal-button mt-2"
                            key={key}
                            variant={selectedSigns[key] ? 'primary' : 'light'}
                            onClick={() => handleSelectSign(key)}
                        >
                            {signs[key]}
                        </Button>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer className="zodial-signs-modal-footer justify-content-center">
                <Button variant="light" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="light" onClick={handleSelectAll}>
                    Seleccionar todos
                </Button>
                <Button variant="light" onClick={handleClose}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
