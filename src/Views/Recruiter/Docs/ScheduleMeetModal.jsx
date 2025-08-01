import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "Services/axiosInstance"; // Your axios setup

const ScheduleMeetModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    candidate_email: "",
    recruiter_email: "",
    purpose: "",
    summary: "",
    durations: "",
    location: "",
    time_zone: "Asia/Kolkata",
    mode: "online",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = {
      candidate_email: formData.candidate_email,
      recruiter_email: formData.recruiter_email,
      purpose: formData.purpose,
      summary: formData.summary,
      durations: formData.durations,
      location: formData.location,
      time_zone: formData.time_zone,
      mode: formData.mode,
      schedule_slots: [
        {
          date: formData.date,
          time: formData.time,
        },
      ],
    };

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "https://api.pixeladvant.com/schedule-meet/",
        payload
      );
      toast.success("Meeting scheduled successfully!");
      handleClose();
      setFormData({
        candidate_email: "",
        recruiter_email: "",
        purpose: "",
        summary: "",
        durations: "",
        location: "",
        time_zone: "Asia/Kolkata",
        mode: "online",
        date: "",
        time: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to schedule meeting"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Schedule Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 gap-2">
            <Col>
              <Form.Group controlId="candidate_email">
                <Form.Label>Candidate Email</Form.Label>
                <Form.Control
                  type="email"
                  name="candidate_email"
                  value={formData.candidate_email}
                  onChange={handleChange}
                  required
                  placeholder="Enter candidate email"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid candidate email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 gap-2">
            <Col>
              <Form.Group controlId="recruiter_email">
                <Form.Label>Recruiter Email</Form.Label>
                <Form.Control
                  type="email"
                  name="recruiter_email"
                  value={formData.recruiter_email}
                  onChange={handleChange}
                  required
                  placeholder="Enter recruiter email"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid recruiter email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 gap-2">
            <Col>
              <Form.Group controlId="purpose">
                <Form.Label>Purpose</Form.Label>
                <Form.Control
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  placeholder="Enter meeting purpose"
                />
                <Form.Control.Feedback type="invalid">
                  Purpose is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 gap-2">
            <Col>
              <Form.Group controlId="summary">
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  type="text"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                  placeholder="Enter meeting summary"
                />
                <Form.Control.Feedback type="invalid">
                  Summary is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="durations">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  as="select"
                  name="durations"
                  value={formData.durations}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select duration</option>
                  <option value="15 mins">15 mins</option>
                  <option value="30 mins">30 mins</option>
                  <option value="45 mins">45 mins</option>
                  <option value="60 mins">60 mins</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select duration.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 gap-2">
            <Col>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Enter meeting location"
                />
                <Form.Control.Feedback type="invalid">
                  Location is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="mode">
                <Form.Label>Mode</Form.Label>
                <Form.Control
                  as="select"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  required
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 gap-2">
            <Col>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Please select a date.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="time">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please select a time.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Schedule"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ScheduleMeetModal;
