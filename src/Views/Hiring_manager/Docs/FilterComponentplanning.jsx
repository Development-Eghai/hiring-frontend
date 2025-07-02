import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Icons from 'Utils/Icons';

const FilterComponentPlanning = ({ allFields, selectedFields, onFieldChange, onReset }) => {
    const [show, setShow] = useState(false);
    const [tempFields, setTempFields] = useState(selectedFields);

    const toggleField = (field) => {
        setTempFields(prev =>
            prev.includes(field)
                ? prev.filter(f => f !== field)
                : [...prev, field]
        );
    };

    const handleApply = () => {
        onFieldChange(tempFields);
        setShow(false);
    };

    const handleReset = () => {
        const defaultFields = [
            "job_position", "Tech", "JD", "Experience", "Designation", "Target"
        ];
        onReset(); // notify parent to reset
        setTempFields(defaultFields); // update local checkbox UI
        setShow(false);
    };


    return (
        <>
            <Button variant="outline-secondary" onClick={() => {
                setTempFields(selectedFields);
                setShow(true);
            }}>
                {Icons.Filter} Filter
            </Button>

            <Modal show={show} onHide={() => setShow(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Choose Fields to Display</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div className="row">
                        {allFields.map((field, index) => (
                            <div key={index} className="col-6 mb-2">
                                <Form.Check
                                    type="checkbox"
                                    id={`field-${index}`}
                                    label={field}
                                    checked={tempFields.includes(field)}
                                    onChange={() => toggleField(field)}
                                />
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleApply}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FilterComponentPlanning;
