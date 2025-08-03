import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const InitiateBG = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeState = location.state;

  const [summeryModal, setSummeryModal] = useState(false);
  const dummyBGVData = [
    {
      req_id: "REQ123",
      candidate_id: "CAND001",
      first_name: "John",
      last_name: "Doe",
      email_id: "john.doe@example.com",
      location: "Bangalore",
      vendor_name: "First Advantage",
      vendor_package: "Standard",
      add_on_check: "Criminal, Education",
      status: "In Progress",
      decision: "Pending",
    },
    {
      req_id: "REQ124",
      candidate_id: "CAND002",
      first_name: "Jane",
      last_name: "Smith",
      email_id: "jane.smith@example.com",
      location: "Mumbai",
      vendor_name: "IDfy",
      vendor_package: "Premium",
      add_on_check: "Address, Drug Test",
      status: "Completed",
      decision: "Approved",
    },
  ];

  const verificationData = [
    {
      verification: "Aadhaar Verification",
      created_date: "08 Jun, 2022",
      sufficiency_date: "08 Jun, 2022",
      updated_date: "08 Jun, 2022",
      status: "Success",
    },
    {
      verification: "PAN Card Verification",
      created_date: "22 Dec, 2022",
      sufficiency_date: "22 Dec, 2022",
      updated_date: "22 Dec, 2022",
      status: "Success",
    },
    {
      verification: "Court Record Verification",
      created_date: "08 Jun, 2022",
      sufficiency_date: "09 Jun, 2022",
      updated_date: "09 Jun, 2022",
      status: "Success",
    },
    {
      verification: "Police Verification via Law Firm",
      created_date: "15 Jun, 2022",
      sufficiency_date: "15 Jun, 2022",
      updated_date: "20 Jun, 2022",
      status: "Success",
    },
    {
      verification: "Permanent Address Verification (Postal)",
      created_date: "22 Dec, 2022",
      sufficiency_date: "22 Dec, 2022",
      updated_date: "28 Dec, 2022",
      status: "Success",
    },
  ];

  const handleCloseInitiateModal = () => {
    navigate(routeState?.comesFrom);
  };

  const handleRowClick = (a) => {
    setSummeryModal(true);
  };
  return (
    <>
      <Container fluid className="py-4 px-md-5 bg-light min-vh-100">
        <Card className="shadow-sm p-4">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0 text-start">Initate BG Dashboard</h5>
            </div>

            {/* <CandidateApprovalStatus /> */}
          </div>
          <div className="table-responsive">
            <Table
              striped
              bordered
              hover
              size="sm"
              className="text-center align-middle"
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-1">Req ID</th>
                  <th>Candidate ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email ID</th>
                  <th>Location</th>
                  <th>Vendor Name</th>
                  <th>VendorPackage</th>
                  <th>Add on Check</th>
                  <th>Status</th>
                  <th>Decision</th>
                </tr>
              </thead>
              <tbody>
                {dummyBGVData.map((a, i) => (
                  <tr
                    key={i}
                    onClick={() => handleRowClick(a)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="p-3">{a.req_id}</td>
                    <td>{a.candidate_id}</td>
                    <td>{a.first_name}</td>
                    <td>{a.last_name}</td>
                    <td>{a.email_id}</td>
                    <td>{a.location}</td>
                    <td>{a.vendor_name}</td>
                    <td>{a.vendor_package}</td>
                    <td>{a.add_on_check}</td>
                    <td>{a.status}</td>
                    <td>{a.decision}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>

      {/* initiate Modal */}
      <Modal
        show={routeState?.showInitiateModal}
        onHide={handleCloseInitiateModal}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Initiate BG</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="mb-3 d-flex gap-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Req ID</Form.Label>
                <Form.Control
                  name="req_id"
                  value={routeState?.selectedRadioRow?.req_id || ""}
                  // onChange={handleMainChange}
                  readOnly
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Candidate ID</Form.Label>
                <Form.Control
                  name="candidate_id"
                  value={routeState?.selectedRadioRow?.candidate_id || ""}
                  readOnly
                  // onChange={handleMainChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  name="first_name"
                  value={routeState?.selectedRadioRow?.first_name || ""}
                  // onChange={handleMainChange}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  value={routeState?.selectedRadioRow?.last_name || ""}
                  name="last_name"
                  readOnly
                  // onChange={handleMainChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={routeState?.selectedRadioRow?.email_id || ""}
                  readOnly
                  // onChange={handleMainChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  // value={formState.req_id}
                  // onChange={handleMainChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Vendor Name</Form.Label>
                <Form.Select
                  name="vendor_name"
                  // value={formState.planning_id}
                  // onChange={handleMainChange}
                >
                  <option value="">-- Select Vendor name --</option>
                  {/* {dropdownOptions.plan_id.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))} */}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Vendor Package</Form.Label>
                <Form.Select
                  name="vendor_package"
                  // value={formState.planning_id}
                  // onChange={handleMainChange}
                >
                  <option value="">-- Select package --</option>
                  {/* {dropdownOptions.plan_id.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))} */}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Add on-check</Form.Label>
                <Form.Select
                  name="add_on_check"
                  // value={formState.planning_id}
                  // onChange={handleMainChange}
                >
                  <option value="">-- Select Vendor name --</option>
                  {/* {dropdownOptions.plan_id.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))} */}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Current Stage</Form.Label>
                <Form.Control
                  name="current_stage"
                  // value={formState.req_id}
                  // onChange={handleMainChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>BG status</Form.Label>
                <Form.Select
                  name="current_stage"
                  // value={formState.planning_id}
                  // onChange={handleMainChange}
                >
                  <option value="">-- Select BG status --</option>

                  <option value={"In progress"}>In progress</option>
                  <option value={"In progress"}>Expired </option>
                  <option value={"In progress"}>Completed </option>
                  <option value={"In progress"}>Failed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="success" onClick={"handleFinalSubmit"}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>

      {/* summary modal */}

      <Modal
        show={summeryModal}
        onHide={() => setSummeryModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Verification Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover responsive>
            <thead style={{ background: "#f0f0f0", fontWeight: "bold" }}>
              <tr>
                <th>Verifications</th>
                <th>Created Date</th>
                <th>Sufficiency Date</th>
                <th>Updated Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {verificationData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.verification}</td>
                  <td>{row.created_date}</td>
                  <td>{row.sufficiency_date}</td>
                  <td>
                    {row.updated_date} <br />
                    <span style={{ color: "#26a69a", fontSize: "12px" }}>
                      COMPLETED
                    </span>
                  </td>
                  <td style={{ color: "green", fontWeight: "bold" }}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSummeryModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InitiateBG;
