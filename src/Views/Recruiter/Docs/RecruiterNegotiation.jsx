import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal, Form, Row, Col, Spinner, Table } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import RecruiterHeader from "../Recruiter_utils/Navbar";
import axios from "axios";
import axiosInstance from "Services/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import ScheduleMeetModal from "./ScheduleMeetModal";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.pixeladvant.com/api/offer-negotiations/";

const negotiationStatuses = [
  "Open",
  "In progress",
  "Successful",
  "Closed",
  "Sent for Realingment",
  "Failed",
];

const RecruiterNegotiation = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedRadioRow, setSelectedRadioRow] = useState(null);
  const [selectedRowDetails,setSelectedRowDetails]= useState([]);
  const [showViewModal,setShowViewModal] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) {
        setTableData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (row) => {
    setSelectedRow({
      ...row,
      benefits: row.benefit_details || [],
    });
    setEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const payload = {
        id: selectedRow.id,
        requisition: selectedRow.requisition,
        client_name: selectedRow.client_name,
        first_name: selectedRow.first_name,
        last_name: selectedRow.last_name,
        position_applied: selectedRow.position_applied,
        client_id: selectedRow.client_id,
        expected_salary: selectedRow.expected_salary,
        offered_salary: selectedRow.offered_salary,
        expected_title: selectedRow.expected_title,
        offered_title: selectedRow.offered_title,
        expected_location: selectedRow.expected_location,
        offered_location: selectedRow.offered_location,
        expected_doj: selectedRow.expected_doj,
        offered_doj: selectedRow.offered_doj,
        expected_work_mode: selectedRow.expected_work_mode,
        offered_work_mode: selectedRow.offered_work_mode,
        negotiation_status: selectedRow.negotiation_status,
        comments: selectedRow.comments,
        benefits: selectedRow.benefits || [],
      };

      await axiosInstance.post(API_URL, payload);
      setEditModal(false);
      fetchData();
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  // Handle Delete
  const handleDelete = (row) => {
    setSelectedRow(row);
    setDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}${selectedRow.id}/`);
      setDeleteModal(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const handleView = (row)=>{
setSelectedRowDetails(row)
setShowViewModal(true)
  }

  const columns = [
    {
      name: "Select",
      cell: (row) => (
        <Form.Check
          type="radio"
          name="selectedRow"
          checked={selectedRadioRow?.client_id === row?.client_id}
          onChange={() => setSelectedRadioRow(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
    },
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
      center: true,
    },
    {
      name: "Req ID",
      selector: (row) => row.requisition || "-",
      sortable: true,
      width: "100px",
    },
    {
      name: "First Name",
      selector: (row) => row.first_name || "-",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name || "-",
      sortable: true,
    },
    {
      name: "Position/Role Applied for",
      selector: (row) => row.position_applied || "-",
      sortable: true,
      width: "220px",
    },
    {
      name: "Negotiation Status",
      selector: (row) => row.negotiation_status || "-",
      sortable: true,
      width: "200px",
      cell: (row) => {
        const statusColors = {
          Successful: "badge bg-success",
          Closed: "badge bg-secondary",
          "Sent for Realingment": "badge bg-warning text-dark",
          Failed: "badge bg-danger",
          Open: "badge bg-info text-dark",
          "In progress": "badge bg-primary",
        };
        return (
          <span
            className={statusColors[row.negotiation_status] || "badge bg-light"}
          >
            {row.negotiation_status}
          </span>
        );
      },
    },
    {
      name: "Comments/Notes",
      selector: (row) => row.comments || "-",
      width: "200px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
                   <Button
            size="sm"
            variant="primary"
            title="Edit"
            onClick={() => handleView(row)}
          >
            view
          </Button> 
          <Button
            size="sm"
            variant="warning"
            title="Edit"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </Button>
          {/* <Button
            size="sm"
            variant="danger"
            title="Delete"
            onClick={() => handleDelete(row)}
          >
            <FaTrash />
          </Button> */}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const ALLFIELDS =  [
    {
      name: "Select",
      cell: (row) => (
        <Form.Check
          type="radio"
          name="selectedRow"
          checked={selectedRadioRow?.client_id === row?.client_id}
          onChange={() => setSelectedRadioRow(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
    },
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
      center: true,
    },
    {
      name: "Req ID",
      selector: (row) => row.requisition || "-",
      sortable: true,
      width: "100px",
    },
    {
      name: "Client ID",
      selector: (row) => row.client_id || "-",
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.first_name || "-",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name || "-",
      sortable: true,
    },
    {
      name: "Position/Role Applied for",
      selector: (row) => row.position_applied || "-",
      sortable: true,
      width: "220px",
    },
    {
      name: "Expected Salary",
      selector: (row) => row.expected_salary || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Offered Salary",
      selector: (row) => row.offered_salary || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Expected Job Title",
      selector: (row) => row.expected_title || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Offered Job Title",
      selector: (row) => row.offered_title || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Expected Location",
      selector: (row) => row.expected_location || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Offered Location",
      selector: (row) => row.offered_location || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Expected DOJ",
      selector: (row) => row.expected_doj || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Offered DOJ",
      selector: (row) => row.offered_doj,
      sortable: true,
    } || "-",
    {
      name: "Expected Work Mode",
      selector: (row) => row.expected_work_mode || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Offered Work Mode",
      selector: (row) => row.offered_work_mode || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Benefits",
      selector: (row) => (row.benefit_details || []).join(", ") || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Negotiation Status",
      selector: (row) => row.negotiation_status || "-",
      sortable: true,
      width: "200px",
      cell: (row) => {
        const statusColors = {
          Successful: "badge bg-success",
          Closed: "badge bg-secondary",
          "Sent for Realingment": "badge bg-warning text-dark",
          Failed: "badge bg-danger",
          Open: "badge bg-info text-dark",
          "In progress": "badge bg-primary",
        };
        return (
          <span
            className={statusColors[row.negotiation_status] || "badge bg-light"}
          >
            {row.negotiation_status}
          </span>
        );
      },
    },
    {
      name: "Comments/Notes",
      selector: (row) => row.comments || "-",
      width: "200px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="warning"
            title="Edit"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </Button>
          {/* <Button
            size="sm"
            variant="danger"
            title="Delete"
            onClick={() => handleDelete(row)}
          >
            <FaTrash />
          </Button> */}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <RecruiterHeader />
      <div className="bg-white rounded p-3">
        <div className="row align-items-center mt-3 mb-3">
          <div className="col-md-4">
            <h4 className="mb-0">Recruiter Negotiation</h4>
          </div>
          <div className="col-md-8 text-end d-flex justify-content-end gap-3">
            <Button
              variant="primary"
              onClick={() => {
                if (selectedRadioRow) {
                  navigate("/recruiter/initiate_bg", {
                    state: {
                      selectedRadioRow,
                      showInitiateModal: true,
                      comesFrom: "/recruiter/recruiter_negotiation",
                    },
                  });
                } else {
                  toast.warning("Please select a row to initiate BGV");
                }
              }}
            >
              Initiate BGV
            </Button>

            <Button variant="success" onClick={() => setShowModal(true)}>
              Schedule Meeting
            </Button>

            <ScheduleMeetModal
              show={showModal}
              handleClose={() => setShowModal(false)}
            />
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />

        {loading ? (
          <div className="text-center p-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={tableData}
            dense
            responsive
            persistTableHead
            fixedHeader
            fixedHeaderScrollHeight="500px"
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: "#e8edff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#1d1d1f",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                },
              },
              cells: {
                style: {
                  fontSize: "14px",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  whiteSpace: "nowrap",
                },
              },
            }}
          />
        )}
      </div>

      {/* Edit Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Negotiation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Req ID</Form.Label>
                  <Form.Control value={selectedRow.requisition} readOnly />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Client ID</Form.Label>
                  <Form.Control value={selectedRow.client_id} readOnly />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control value={selectedRow.client_name} readOnly />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={selectedRow.first_name}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        first_name: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={selectedRow.last_name}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        last_name: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    value={selectedRow.position_applied}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        position_applied: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Expected Salary</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRow.expected_salary || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        expected_salary: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Offered Salary</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRow.offered_salary || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        offered_salary: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Expected Job Title</Form.Label>
                  <Form.Control
                    value={selectedRow.expected_title || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        expected_title: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Offered Job Title</Form.Label>
                  <Form.Control
                    value={selectedRow.offered_title || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        offered_title: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Expected Location</Form.Label>
                  <Form.Control
                    value={selectedRow.expected_location || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        expected_location: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Offered Location</Form.Label>
                  <Form.Control
                    value={selectedRow.offered_location || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        offered_location: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Expected DOJ</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedRow.expected_doj || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        expected_doj: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Offered DOJ</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedRow.offered_doj || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        offered_doj: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Expected Work Mode</Form.Label>
                  <Form.Control
                    value={selectedRow.expected_work_mode || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        expected_work_mode: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Offered Work Mode</Form.Label>
                  <Form.Control
                    value={selectedRow.offered_work_mode || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        offered_work_mode: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Negotiation Status</Form.Label>
                  <Form.Select
                    value={selectedRow.negotiation_status}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        negotiation_status: e.target.value,
                      })
                    }
                  >
                    {negotiationStatuses.map((status, i) => (
                      <option key={i} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Label>Benefits (comma separated)</Form.Label>
                  <Form.Control
                    value={selectedRow.benefits?.join(", ") || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        benefits: e.target.value
                          .split(",")
                          .map((b) => b.trim()),
                      })
                    }
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={selectedRow.comments || ""}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        comments: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>
            {selectedRow?.first_name} {selectedRow?.last_name}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* view details */}

          <Modal show={showViewModal} onHide={()=>setShowViewModal(false)} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Negotiation Full Details</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Req ID</td>
              <td>{selectedRowDetails?.requisition || "-"}</td>
            </tr>
            <tr>
              <td>Client ID</td>
              <td>{selectedRowDetails?.client_id || "-"}</td>
            </tr>
            <tr>
              <td>First Name</td>
              <td>{selectedRowDetails?.first_name || "-"}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{selectedRowDetails?.last_name || "-"}</td>
            </tr>
            <tr>
              <td>Position/Role Applied for</td>
              <td>{selectedRowDetails?.position_applied || "-"}</td>
            </tr>
            <tr>
              <td>Expected Salary</td>
              <td>{selectedRowDetails?.expected_salary || "-"}</td>
            </tr>
            <tr>
              <td>Offered Salary</td>
              <td>{selectedRowDetails?.offered_salary || "-"}</td>
            </tr>
            <tr>
              <td>Expected Job Title</td>
              <td>{selectedRowDetails?.expected_title || "-"}</td>
            </tr>
            <tr>
              <td>Offered Job Title</td>
              <td>{selectedRowDetails?.offered_title || "-"}</td>
            </tr>
            <tr>
              <td>Expected Location</td>
              <td>{selectedRowDetails?.expected_location || "-"}</td>
            </tr>
            <tr>
              <td>Offered Location</td>
              <td>{selectedRowDetails?.offered_location || "-"}</td>
            </tr>
            <tr>
              <td>Expected DOJ</td>
              <td>{selectedRowDetails?.expected_doj || "-"}</td>
            </tr>
            <tr>
              <td>Offered DOJ</td>
              <td>{selectedRowDetails?.offered_doj || "-"}</td>
            </tr>
            <tr>
              <td>Expected Work Mode</td>
              <td>{selectedRowDetails?.expected_work_mode || "-"}</td>
            </tr>
            <tr>
              <td>Offered Work Mode</td>
              <td>{selectedRowDetails?.offered_work_mode || "-"}</td>
            </tr>
            <tr>
              <td>Benefits</td>
              <td>{(selectedRowDetails?.benefit_details || []).join(", ") || "-"}</td>
            </tr>
            <tr>
              <td>Negotiation Status</td>
              <td>
                <span
                  className={
                    {
                      Successful: "badge bg-success",
                      Closed: "badge bg-secondary",
                      "Sent for Realingment": "badge bg-warning text-dark",
                      Failed: "badge bg-danger",
                      Open: "badge bg-info text-dark",
                      "In progress": "badge bg-primary",
                    }[selectedRowDetails?.negotiation_status] || "badge bg-light"
                  }
                >
                  {selectedRowDetails?.negotiation_status || "-"}
                </span>
              </td>
            </tr>
            <tr>
              <td>Comments/Notes</td>
              <td>{selectedRowDetails?.comments || "-"}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShowViewModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default RecruiterNegotiation;
