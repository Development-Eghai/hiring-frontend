import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Icons from "Utils/Icons";

const Creatmodel = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    jobDate: "",
    jobTemplate: "",
    openings: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        {Icons.CreateNew} Create New
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName="modal-390"
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage Job Requisition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Date of new job Requisition
                <span className="text-danger">*</span>
              </Form.Label>
              <div className="d-flex align-items-center position-relative">
                <Form.Control
                  type="date"
                  name="jobDate"
                  value={formData.jobDate}
                  onChange={handleChange}
                />
                <FaCalendarAlt className="position-absolute end-0 me-3 text-muted" />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Job Requisition Template<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="jobTemplate"
                value={formData.jobTemplate}
                onChange={handleChange}
              >
                <option value="">Select Template</option>
                <option value="template1">Template 1</option>
                <option value="template2">Template 2</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of Openings</Form.Label>
              <Form.Control
                type="number"
                name="openings"
                value={formData.openings}
                onChange={handleChange}
                placeholder="Enter number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Link
            to="/hiring_manager/job_requisition"
            className="w-100 px-5 py-2 text-white bg-primary text-center decoration-none  rounded"
            onClick={handleSubmit}
          >
            Create
          </Link>
        </Modal.Footer>
      </Modal>

      <style>{`
        .modal-390 .modal-dialog {
          max-width: 390px;
        }
      `}</style>
    </>
  );
};

export default Creatmodel;
