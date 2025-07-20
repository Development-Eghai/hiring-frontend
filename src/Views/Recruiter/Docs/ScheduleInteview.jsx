import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import RecruiterHeader from "../Recruiter_utils/Navbar";

const ScheduleInterview = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [guests, setGuests] = useState([]);
  const [interviewRounds, setInterviewRounds] = useState(1);
  const [scheduleSlots, setScheduleSlots] = useState([
    { date: "", time: "", guests: [] },
  ]);
  const [editData, setEditData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      reqId: "B0001",
      planningId: "P0001",
      candidateId: "C1234",
      candidateName: "Ankit",
      position: "Product Manager",
      timeInStage: "2 Days",
      resumeScore: "85%",
      scheduleDate: "06-06-2025 | 11:00 PM",
    },
    {
      id: 2,
      reqId: "B0001",
      planningId: "P0001",

      candidateId: "C1234",
      candidateName: "Ankit",
      position: "Product Manager",
      timeInStage: "2 Days",
      resumeScore: "85%",
      scheduleDate: "06-06-2025 | 11:00 PM",
    },
    {
      id: 3,
      reqId: "B0001",
      planningId: "P0001",

      candidateId: "C1234",
      candidateName: "Ankit",
      position: "Product Manager",
      timeInStage: "2 Days",
      resumeScore: "85%",
      scheduleDate: "06-06-2025 | 11:00 PM",
    },
  ]);

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const handleEdit = (row) => {
    setEditData(row);
    setGuests([{ name: "John", email: "john@example.com" }]);
    setInterviewRounds(1);
    setScheduleSlots([
      { date: "2025-06-06", time: "11:00 AM", guests: ["john@example.com"] },
    ]);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    setDeleteTarget(row);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setData(data.filter((item) => item.id !== deleteTarget.id));
    setShowConfirm(false);
    setDeleteTarget(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditData(null);
    setGuests([]);
    setInterviewRounds(1);
    setScheduleSlots([{ date: "", time: "", guests: [] }]);
  };

  const columns = [
    {
      name: "",
      cell: (row) => (
        <Form.Check
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRow(row.id)}
        />
      ),
      width: "60px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: "Req ID", selector: (row) => row.reqId, sortable: true },
    { name: "Planning ID", selector: (row) => row.planningId, sortable: true },

    {
      name: "Candidate ID",
      selector: (row) => row.candidateId,
      sortable: true,
    },
    {
      name: "Candidate Name",
      selector: (row) => row.candidateName,
      sortable: true,
    },
    {
      name: "Applied Position",
      selector: (row) => row.position,
      sortable: true,
    },
    {
      name: "Time in Stage",
      selector: (row) => row.timeInStage,
      sortable: true,
    },
    {
      name: "View Details",
      cell: (row) => <FaEye style={{ cursor: "pointer" }} />,
      width: "120px",
    },
    {
      name: "Resume Score",
      selector: (row) => row.resumeScore,
      sortable: true,
    },
    {
      name: "Interview Schedule Date",
      selector: (row) => row.scheduleDate,
      sortable: true,
    },
    {
      name: "Status",
      cell: () => (
        <Form.Select size="sm">
          <option>Select</option>
          <option>Scheduled</option>
          <option>Rejected</option>
        </Form.Select>
      ),
      width: "160px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button size="sm" variant="success" onClick={() => handleEdit(row)}>
            <FaEdit />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>
            <FaTrash />
          </Button>
        </div>
      ),
      width: "140px",
    },
  ];

  const handleAddGuest = () => {
    setGuests([...guests, { name: "", email: "" }]);
  };

  const handleGuestChange = (index, field, value) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
  };

  const removeGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const handleAddScheduleGuest = (index) => {
    const updated = [...scheduleSlots];
    updated[index].guests.push("");
    setScheduleSlots(updated);
  };

  const handleScheduleGuestChange = (slotIndex, guestIndex, value) => {
    const updated = [...scheduleSlots];
    updated[slotIndex].guests[guestIndex] = value;
    setScheduleSlots(updated);
  };

  const removeScheduleGuest = (slotIndex, guestIndex) => {
    const updated = [...scheduleSlots];
    updated[slotIndex].guests.splice(guestIndex, 1);
    setScheduleSlots(updated);
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...scheduleSlots];
    updated[index][field] = value;
    setScheduleSlots(updated);
  };

  const updateRounds = (num) => {
    setInterviewRounds(num);
    const newSlots = Array.from({ length: num }, () => ({
      date: "",
      time: "",
      guests: [],
    }));
    setScheduleSlots(newSlots);
  };

  return (
    <>
      <RecruiterHeader />

      <div className="mt-5">
        <div className="mb-3 gap-2 d-flex justify-content-between">
          <h4>Schedule Interview</h4>
          <Button onClick={() => setShowModal(true)}>
            Add Schedule Interview
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          persistTableHead
          responsive
        />

        <Modal show={showModal} onHide={handleModalClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>
              {editData ? "Edit Schedule" : "Add Schedule Interview"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form>
              <Row className="mb-3 gap-2">
                <Col>
                  <Form.Label>Req Id</Form.Label>
                  <Form.Select>
                    <option>Select</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Planning Id</Form.Label>
                  <Form.Select>
                    <option>Select</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Position Name</Form.Label>
                  <Form.Control placeholder="Select" />
                </Col>
              </Row>

              <Row className="mb-3 gap-2">
                <Col>
                  <Form.Label>Candidate Name</Form.Label>
                  <Form.Select>
                    <option>Select</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Interviewer Name</Form.Label>
                  <Form.Select>
                    <option>Select</option>
                  </Form.Select>
                </Col>
              </Row>

              <div className="mb-3 gap-2">
                <div className="d-flex justify-content-between align-items-center bg-light py-2 rounded px-2">
                  <Form.Label className="mb-0 text-primary">Guests</Form.Label>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={handleAddGuest}
                  >
                    Add Guest
                  </Button>
                </div>
                {guests.map((guest, index) => (
                  <Row key={index} className="align-items-center gap-2 mt-2">
                    <Col>
                      <Form.Control
                        value={guest.name}
                        placeholder="Name"
                        onChange={(e) =>
                          handleGuestChange(index, "name", e.target.value)
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        value={guest.email}
                        placeholder="Email"
                        onChange={(e) =>
                          handleGuestChange(index, "email", e.target.value)
                        }
                      />
                    </Col>
                    <Col>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeGuest(index)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </div>

              <Row className="mb-3 gap-2">
                <Col>
                  <Form.Label>Location</Form.Label>
                  <Form.Control placeholder="Enter" />
                </Col>
                <Col>
                  <Form.Label>Time Zone</Form.Label>
                  <Form.Control placeholder="Enter" />
                </Col>
              </Row>

              <Row className="mb-3 gap-2">
                <Col>
                  <Form.Label>Durations</Form.Label>
                  <Form.Control placeholder="Enter" />
                </Col>
                <Col>
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control placeholder="Enter" />
                </Col>
              </Row>

              <Row className="mb-3 gap-2">
                <Col>
                  <Form.Label>Mode</Form.Label>
                  <Form.Select>
                    <option>Face to face</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Rounds</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={interviewRounds}
                    onChange={(e) => updateRounds(Number(e.target.value))}
                  />
                </Col>
              </Row>

              <div className="mt-4">
                {scheduleSlots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="border rounded p-3 mt-3 bg-light"
                  >
                    <Row className="mb-2 gap-2 ">
                      <Form.Label>Schedule Date</Form.Label>

                      <Col>
                        <Form.Control
                          type="date"
                          value={slot.date}
                          onChange={(e) =>
                            handleScheduleChange(
                              slotIndex,
                              "date",
                              e.target.value
                            )
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          placeholder="Time"
                          value={slot.time}
                          onChange={(e) =>
                            handleScheduleChange(
                              slotIndex,
                              "time",
                              e.target.value
                            )
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleAddScheduleGuest(slotIndex)}
                        >
                          + Add Guest
                        </Button>
                      </Col>
                    </Row>

                    {slot.guests.map((guestEmail, guestIndex) => (
                      <Row key={guestIndex} className="mb-2 gap-2 ">
                        <Col>
                          <Form.Control
                            placeholder="Guest email"
                            value={guestEmail}
                            onChange={(e) =>
                              handleScheduleGuestChange(
                                slotIndex,
                                guestIndex,
                                e.target.value
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              removeScheduleGuest(slotIndex, guestIndex)
                            }
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    ))}
                  </div>
                ))}
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleModalClose}>
              Draft
            </Button>
            <Button variant="primary" onClick={handleModalClose}>
              {editData ? "Update" : "Schedule"}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this interview schedule?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ScheduleInterview;
