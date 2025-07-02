import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const FilterModal = ({
  show,
  onHide,
  allFields,
  selectedFields,
  setSelectedFields,
  onClear,
}) => {
  const [localFields, setLocalFields] = useState([]);

  useEffect(() => {
    setLocalFields(selectedFields);
  }, [selectedFields]);

  const handleToggle = (field) => {
    setLocalFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  const handleSubmit = () => {
    if (localFields.length > 0) {
      setSelectedFields(localFields);
    } else {
      onClear(); 
    }
    onHide();
  };

  const handleClear = () => {
    setLocalFields([]);
    onClear();
    onHide();
  };

 
  const chunkFields = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const fieldChunks = chunkFields(allFields, 3);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Select Fields to Display</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fieldChunks.map((chunk, rowIndex) => (
            <Row key={rowIndex} className="mb-2">
              {chunk.map((field, colIndex) => (
                <Col md={4} sm={6} xs={12} key={colIndex}>
                  <Form.Check
                    type="checkbox"
                    label={field}
                    checked={localFields.includes(field)}
                    onChange={() => handleToggle(field)}
                  />
                </Col>
              ))}
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClear}>
           Reset to Default
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
