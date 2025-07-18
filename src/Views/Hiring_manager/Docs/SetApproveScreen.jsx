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
} from "react-bootstrap";
import axiosInstance from "Services/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetApproveScreen = () => {
  const [approvers, setApprovers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    hiring_plan: "PL0001",
    role: "",
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    job_title: "",
    set_as_approver: "Yes",
  });

  const fetchApprovers = async () => {
    try {
      const res = await axiosInstance.get("/api/set-approver/");
      if (res.data.success) {
        setApprovers(res.data.data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setEditMode(false);
    setFormData({
      id: null,
      hiring_plan: "PL0001",
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      contact_number: "",
      job_title: "",
      set_as_approver: "Yes",
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this approver?")) return;
    try {
      const res = await axiosInstance.delete("/api/set-approver/", { data: { id } });
      if (res.data.success) {
        toast.success("Approver deleted successfully!");
        fetchApprovers();
      } else {
        toast.error(res.data.message || "Failed to delete approver.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed.");
    }
  };

  const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = async () => {
  if (!isValidEmail(formData.email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  try {
    if (editMode) {
      const res = await axiosInstance.put("/api/set-approver/", formData);
      if (res.data.success) {
        toast.success("Approver updated successfully!");
      } else {
        toast.error(res.data.message || "Failed to update approver.");
      }
    } else {
      const res = await axiosInstance.post("/api/set-approver/", formData);
      if (res.data.success) {
        toast.success("Approver added successfully!");
      } else {
        toast.error(res.data.message || "Failed to add approver.");
      }
    }
    setShowModal(false);
    fetchApprovers();
  } catch (err) {
    console.error("Submit error:", err);
    toast.error(err?.response?.data?.message || "Form submission failed.");
  }
};


  return (
    <Container fluid className="py-4 px-md-5 bg-light min-vh-100">
      <Card className="shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0">Set Approver Screen</h5>
          <Button variant="success" onClick={handleAddNew}>
            + Add Approver
          </Button>
        </div>

        <div className="table-responsive">
          <Table striped bordered hover size="sm" className="text-center align-middle">
            <thead className="bg-primary text-white">
              <tr>
                <th>Approver</th>
                <th>Role</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Hiring Plan</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvers.map((a) => (
                <tr key={a.id}>
                  <td>{a.set_as_approver}</td>
                  <td>{a.role}</td>
                  <td>{a.first_name}</td>
                  <td>{a.last_name}</td>
                  <td>{a.job_title}</td>
                  <td>
                    <a href={`mailto:${a.email}`}>{a.email}</a>
                  </td>
                  <td>{a.contact_number}</td>
                  <td>{a.hiring_plan}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-1"
                      onClick={() => handleEdit(a)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Approver" : "Add Approver"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
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
                    value={formData.job_title}
                    onChange={handleInputChange}
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
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Set as Approver</Form.Label>
              <Form.Select
                name="set_as_approver"
                value={formData.set_as_approver}
                onChange={handleInputChange}
              >
                <option value="Yes">Yes</option>
                <option value="Maybe">Maybe</option>
                <option value="NA">NA</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editMode ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default SetApproveScreen;
