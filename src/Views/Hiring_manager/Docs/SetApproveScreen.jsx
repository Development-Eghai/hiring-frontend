import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Container,
  Card,
  CardBody,
} from "react-bootstrap";
import axiosInstance from "Services/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CandidateApprovalStatus from "./CandidateApprovalStatus";
import DataTable from "react-data-table-component";

const SetApproveScreen = () => {
  const [approvers, setApprovers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [loadingClient, setLoadingClient] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewApproversData, setViewApproversData] = useState([]);

  const [dropdownOptions, setDropdownOptions] = useState({
    requisition_id: [],
    plan_id: [],
  });

  const fetchDropdownData = async () => {
    try {
      const res = await axiosInstance.get(
        "https://api.pixeladvant.com/design_screen_list_data/"
      );
      if (res.data.success) {
        setDropdownOptions({
          requisition_id: res.data.data.requisition_id || [],
          plan_id: res.data.data.plan_id || [],
        });
      } else {
        toast.error(res.data.message || "Failed to load dropdown data.");
      }
    } catch (error) {
      console.error("Dropdown fetch error:", error);
      toast.error("Failed to fetch dropdown data.");
    }
  };

  useEffect(() => {
    fetchApprovers();
    fetchDropdownData();
  }, []);

  const fetchClientDetails = async (req_id, plan_id) => {
    if (!req_id || !plan_id) return;
    setLoadingClient(true);

    try {
      const res = await axiosInstance.post(
        "https://api.pixeladvant.com/api/client-lookup/",
        {
          req_id,
          plan_id,
        }
      );

      if (res.data.success) {
        const { client_name, client_id } = res.data.data;
        setFormState((prev) => ({
          ...prev,
          client_name,
          client_id,
        }));
      } else {
        toast.error(res.data.message || "Failed to retrieve client details.");
      }
    } catch (err) {
      console.error("Error fetching client data:", err);
      toast.error("Error fetching client information.");
    } finally {
      setLoadingClient(false);
    }
  };

  const [formState, setFormState] = useState({
    req_id: "",
    planning_id: "",
    client_name: "",
    client_id: "",
    no_of_approvers: 1,
    approvers: [
      {
        role: "",
        job_title: "",
        first_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        set_as_approver: "Yes",
      },
    ],
  });

  const fetchApprovers = async () => {
  try {
    const res = await axiosInstance.get("/api/set-approver/");
    if (res.data.success) {
      const approversList = res.data.data?.approvers;
      if (Array.isArray(approversList)) {
        setViewApproversData(approversList);
      } else {
        setViewApproversData([]);
        console.warn("Approvers list is invalid:", approversList);
      }
    } else {
      toast.error(res.data.message || "Failed to fetch approvers.");
    }
  } catch (error) {
    console.error("Error fetching approvers:", error);
    toast.error("Error fetching approvers.");
  }
};

  useEffect(() => {
    fetchApprovers();
  }, []);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    const updatedState = { ...formState, [name]: value };
    setFormState(updatedState);

    if (
      (name === "req_id" && updatedState.planning_id) ||
      (name === "planning_id" && updatedState.req_id)
    ) {
      fetchClientDetails(
        name === "req_id" ? value : updatedState.req_id,
        name === "planning_id" ? value : updatedState.planning_id
      );
    }
  };

  const handleApproverChange = (index, e) => {
    const { name, value } = e.target;
    const updatedApprovers = [...formState.approvers];
    updatedApprovers[index][name] = value;
    setFormState({ ...formState, approvers: updatedApprovers });
  };

  const handleNoOfApproversChange = (e) => {
    const count = parseInt(e.target.value, 10);
    const updatedApprovers = Array.from(
      { length: count },
      (_, i) =>
        formState.approvers[i] || {
          role: "",
          job_title: "",
          first_name: "",
          last_name: "",
          email: "",
          contact_number: "",
          set_as_approver: "Yes",
        }
    );
    setFormState({
      ...formState,
      no_of_approvers: count,
      approvers: updatedApprovers,
    });
  };

  const handleAddNew = () => {
    setFormState({
      req_id: "",
      planning_id: "",
      client_name: "",
      client_id: "",
      no_of_approvers: 1,
      approvers: [
        {
          role: "",
          job_title: "",
          first_name: "",
          last_name: "",
          email: "",
          contact_number: "",
          set_as_approver: "Yes",
        },
      ],
    });
    setStep(1);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStep(1);
  };

  const handleFinalSubmit = async () => {
    try {
      const res = await axiosInstance.post("/api/set-approver/", formState);
      if (res.data.success) {
        toast.success("Approvers added successfully!");
        handleCloseModal();
        fetchApprovers();
      } else {
        toast.error(res.data.message || "Failed to submit approvers.");
      }
    } catch (err) {
      console.error("Final submit error:", err);
      toast.error("Submission failed.");
    }
  };

  return (
    <div>
      <Container fluid className="py-4 px-md-5 bg-light min-vh-100">
        <Card className="shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold m-0">Approver Details</h5>
            <Button variant="success" onClick={handleAddNew}>
              + Add Approver
            </Button>
          </div>
          
{/*             <CandidateApprovalStatus />
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
                  <th>Req ID</th>
                  <th>Planning ID</th>
                  <th>Client Name</th>
                  <th>No. of Approver</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {approvers.map((a, i) => (
                  <tr key={i}>
                    <td>{a.req_id}</td>
                    <td>{a.planning_id}</td>
                    <td>{a.client_name}</td>
                    <td>{a.no_of_approvers}</td>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        setViewApproversData(a.approvers || []);
                        setShowViewModal(true);
                      }}
                    >
                      View
                    </Button>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div> */} 
        </Card>
        {/* <hr /> */}

        {/* <div>
          <CandidateApprovalStatus />
        </div>

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Set Approver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {step === 1 && (
              <>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Req ID</Form.Label>
                      <Form.Select
                        name="req_id"
                        value={formState.req_id}
                        onChange={handleMainChange}
                      >
                        <option value="">-- Select Req ID --</option>
                        {dropdownOptions.requisition_id.map((id, index) => (
                          <option key={index} value={id}>
                            {id}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Planning ID</Form.Label>
                      <Form.Select
                        name="planning_id"
                        value={formState.planning_id}
                        onChange={handleMainChange}
                      >
                        <option value="">-- Select Planning ID --</option>
                        {dropdownOptions.plan_id.map((id, index) => (
                          <option key={index} value={id}>
                            {id}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-end">
                  {loadingClient ? (
                    <Button variant="primary" disabled>
                      Loading...
                    </Button>
                  ) : (
                    formState.req_id &&
                    formState.planning_id &&
                    formState.client_name &&
                    formState.client_id && (
                      <Button variant="primary" onClick={() => setStep(2)}>
                        Next
                      </Button>
                    )
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Client Name</Form.Label>
                      <Form.Control
                        name="client_name"
                        placeholder="Enter client name"
                        value={formState.client_name}
                        onChange={handleMainChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Client ID</Form.Label>
                      <Form.Control
                        name="client_id"
                        placeholder="Enter client ID"
                        value={formState.client_id}
                        onChange={handleMainChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Number of Approvers</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    name="no_of_approvers"
                    value={formState.no_of_approvers}
                    onChange={handleNoOfApproversChange}
                  />
                </Form.Group>

                {formState.approvers.map((approver, index) => (
                  <div key={index} className="border rounded p-3 mb-4">
                    <h6 className="fw-bold">Approver {index + 1}</h6>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Role</Form.Label>
                          <Form.Select
                            name="role"
                            value={approver.role}
                            onChange={(e) => handleApproverChange(index, e)}
                          >
                            <option value="">-- Select Role --</option>
                            <option value="Manager">Manager</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Reviewer">Reviewer</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Job Title</Form.Label>
                          <Form.Control
                            name="job_title"
                            value={approver.job_title}
                            onChange={(e) => handleApproverChange(index, e)}
                            placeholder="Enter job title"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            name="first_name"
                            value={approver.first_name}
                            onChange={(e) => handleApproverChange(index, e)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            name="last_name"
                            value={approver.last_name}
                            onChange={(e) => handleApproverChange(index, e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={approver.email}
                            onChange={(e) => handleApproverChange(index, e)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Contact Number</Form.Label>
                          <Form.Control
                            name="contact_number"
                            value={approver.contact_number}
                            onChange={(e) => handleApproverChange(index, e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group>
                      <Form.Label>Set as Approver</Form.Label>
                      <Form.Select
                        name="set_as_approver"
                        value={approver.set_as_approver}
                        onChange={(e) => handleApproverChange(index, e)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                ))}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            {step === 2 && (
              <Button variant="success" onClick={handleFinalSubmit}>
                Submit
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        <Modal
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Approver Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DataTable
              columns={[
                { name: "Role", selector: (row) => row.role, sortable: true },
                { name: "Job Title", selector: (row) => row.job_title },
                { name: "First Name", selector: (row) => row.first_name },
                { name: "Last Name", selector: (row) => row.last_name },
                { name: "Email", selector: (row) => row.email },
                { name: "Contact", selector: (row) => row.contact_number },
                { name: "Approver", selector: (row) => row.set_as_approver },
              ]}
              data={viewApproversData}
              // pagination
              // highlightOnHover
              // striped
              responsive
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowViewModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer position="top-right" autoClose={3000} />
      </Container>
    </div>
  );
};

export default SetApproveScreen;
