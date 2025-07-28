import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Dropdown,
  Modal,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { HiringManagerHomeCard } from "Components/Card/HiringManagerHomeCard";
import Icons from "Utils/Icons";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { HandleGetReportingData } from "Views/Hiring_manager/Actions/HiringManagerAction";
import { useNavigate } from "react-router-dom";
import FilterModal from "../../Hiring_manager/Docs/FilterModal";
import axiosInstance from "Services/axiosInstance";
import Cookies from "js-cookie";
import { FaBan } from "react-icons/fa";
import { toast } from "react-toastify";

const DEFAULT_FIELDS = [
  "id",
  "job_position",
  "Recruiter",
  "division",
  "department",
  "location",
  "status",
];

const ALL_FIELDS = [
  "job_position",
  "Recruiter",
  "division",
  "department",
  "location",
  "status",
  "Position/Role",
  "Tech",
  "JD",
  "Experience",
  "Designation",
  "Target",
  "Interviewer",
  "Interview",
  "Compensation/Benefits",
  "Duration/Timeline",
  "Place",
  "Working",
  "Solicitation",
  "Educational",
  "Feedback",
  "Relocation",
  "Travel",
  "Visa",
  "Domain",
  "CIBIL",
  "Valid",
  "Govt",
  "Background",
  "Shift",
  "Differently abled",
  "Reference",
  "Role Type",
  "Job Type",
  "Communication",
  "Notice Period",
  "Joining Readiness",
  "Candidate Fit",
  "Career Gap",
  "Sabbatical",
  "Screening Questions",
  "Job Health Requirements",
  "Interview Format",
  "Social Media",
  "Language Proficiency",
];

const tableStyles = {
  headCells: {
    style: {
      backgroundColor: "#DEE5FF",
      color: "#000",
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
  rows: {
    style: {
      cursor: "pointer",
    },
  },
};


export const BuisnessOpsDashboard = () => {
  const { hiringManagerState, commonState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState(DEFAULT_FIELDS);
  const [columns, setColumns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);
  const [actionType, setActionType] = useState(""); // Approved or Rejected
  const [actionComment, setActionComment] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = (fields) => {
    dispatch(HandleGetReportingData({ fields }));
  };

  useEffect(() => {
    fetchData(selectedFields);
  }, [selectedFields]);

  useEffect(() => {
    const dynamicColumns = selectedFields.map((field) => {
      if (field === "id") {
        return {
          name: "Requisition ID",
          selector: (row) => row["id"] || "-",
          sortable: true,
        };
      } else if (field === "status") {
        return {
          name: "Status",
          cell: (row) => {
            const status = row.status || "-";
            let bgColor = "rgba(108, 117, 125, 0.4)";
            let textColor = "#000";

            if (status.toLowerCase().includes("approve")) {
              bgColor = "rgba(40, 167, 69, 0.4)";
              textColor = "#28a745";
            } else if (status.toLowerCase().includes("reject")) {
              bgColor = "rgba(220, 53, 69, 0.4)";
              textColor = "#dc3545";
            } else if (status.toLowerCase().includes("pending")) {
              bgColor = "rgba(255, 193, 7, 0.4)";
              textColor = "#856404";
            }

            return (
              <span
                className="btn btn-sm fw-semibold"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  cursor: "not-allowed",
                  pointerEvents: "auto",
                }}
              >
                {status}
              </span>
            );
          },
          sortable: true,
        };
      } else {
        return {
          name: field,
          selector: (row) => row[field] || "-",
          sortable: true,
        };
      }
    });

    dynamicColumns.unshift({
      name: "Select",
      cell: (row) => 
       { row?.status.toLowerCase().includes("pending") || "-" && <input
          type="checkbox"
          checked={selectedRows.some((r) => r.id === row.id)}
          onChange={() => handleCheckBoxChange(row)}
        />}
      ,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });

    setColumns(dynamicColumns);
  }, [selectedFields, selectedRows]);

  const handleCheckBoxChange = (row) => {
    setSelectedRows((prev) => {
      const exists = prev.find((r) => r.id === row.id);
      return exists ? prev.filter((r) => r.id !== row.id) : [...prev, row];
    });
  };

  const confirmDelete = (row) => {
    setRowToDelete(row);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        "/api/jobrequisition/delete-requisition/",
        {
          data: {
            user_role: commonState?.app_data?.user_id || "",
            requisition_id: rowToDelete.id,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Deleted successfully");
        fetchData(selectedFields);
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("API error while deleting.");
    }

    setShowConfirmModal(false);
    setRowToDelete(null);
  };

  const handleSubmitBulkAction = async () => {
    setIsSubmitting(true);
    const payload = {
      user_role: commonState?.app_data?.user_id,
      req_data: selectedRows.map((row) => ({
        req_id: row.id,
        status: actionType,
        comment: actionComment,
      })),
    };

    try {
      const response = await axiosInstance.post(
        "https://api.pixeladvant.com/api/jobrequisition/approve_requisition/",
        payload
      );

      if (response?.data?.success) {
        toast.success(`${actionType} successful`);
        fetchData(selectedFields);
        setSelectedRows([]);
      } else {
        toast.error("Action failed.");
      }
    } catch (error) {
      console.error("Bulk action error:", error);
      toast.error("API error during action.");
    }

    setIsSubmitting(false);
    setShowConfirmActionModal(false);
    setActionComment("");
  };

  const filteredData = (hiringManagerState?.reporting?.data || []).filter(
    (row) =>
      selectedFields.some((field) =>
        String(row[field] || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
  );

  const dashboardCards = [
    {
      desc: "No of Requisition Approved",
      count: 20,
      icon: <FaBan size={24} color="#F5A623" />,
    },
    {
      desc: "No of Requisition Approved",
      count: 20,
      icon: <FaBan size={24} color="#F5A623" />,
    },
    {
      desc: "No of Requisition Approved",
      count: 20,
      icon: <FaBan size={24} color="#F5A623" />,
    },
  ];

  const handleRowClick = (row) => {
  navigate("/business_ops/buisness_review", { state: row });
};


  return (
    <div className="h-100">
      <div className="d-flex gap-4">
        {dashboardCards.map((row, idx) => (
          <Card className="w-25 border-0 header-card mb-4" key={idx}>
            <Card.Body className="py-3 header-body">
              <Card.Title className="row justify-content-end mb-0">
                <div className=" d-flex gap-3">
                  <div>{row.icon}</div>
                  <div>
                    <h4>{row.count}</h4>
                    <h6>{row.desc}</h6>
                  </div>
                </div>
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Card className="p-4 home_data_table">
        <div className="row align-items-center mb-3">
          <div className="col-3">
            <h4 className="fw-bold mb-0">Job Requisition View</h4>
          </div>
          <div className="col-6 d-flex gap-3">
            <button
              className="btn btn-success"
              disabled={selectedRows.length === 0}
              onClick={() => {
                setActionType("Approved");
                setShowConfirmActionModal(true);
              }}
            >
              Approve
            </button>
            <button
              className="btn btn-danger"
              disabled={selectedRows.length === 0}
              onClick={() => {
                setActionType("Rejected");
                setShowConfirmActionModal(true);
              }}
            >
              Decline
            </button>

            <Button
              variant="outline-secondary"
              className="d-flex ps-4 align-items-center"
              onClick={() => setShowModal(true)}
            >
              <span>{Icons.Filter} Display Option</span>
            </Button>
          </div>

          <div className="col-3 d-flex justify-content-end">
            <InputGroup style={{ maxWidth: "300px" }}>
              <InputGroup.Text>{Icons.Search}</InputGroup.Text>
              <Form.Control
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={tableStyles}
          fixedHeader
          striped
          highlightOnHover
          pagination
          progressPending={hiringManagerState?.isLoading}
          onRowClicked={(row) => handleRowClick(row)}
        />
      </Card>

      <FilterModal
        show={showModal}
        onHide={() => setShowModal(false)}
        allFields={ALL_FIELDS}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
        onClear={() => setSelectedFields(DEFAULT_FIELDS)}
      />

      {/* Delete Confirm Modal */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{rowToDelete?.job_position}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Bulk Action Confirm Modal */}
      <Modal
        show={showConfirmActionModal}
        onHide={() => setShowConfirmActionModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm {actionType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={actionComment}
              onChange={(e) => setActionComment(e.target.value)}
              placeholder="Enter your comment here"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmActionModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant={actionType === "Approved" ? "success" : "danger"}
            onClick={handleSubmitBulkAction}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processing...
              </>
            ) : (
              `Confirm ${actionType}`
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BuisnessOpsDashboard;
