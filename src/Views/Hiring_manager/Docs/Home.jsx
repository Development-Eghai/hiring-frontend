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
import FilterModal from "./FilterModal";
import axiosInstance from "Services/axiosInstance";
import { decryptData } from "Security/Crypto/Crypto";
import Cookies from "js-cookie";
import Creatmodel from "./Creatmodel";

const DEFAULT_FIELDS = [
  "id",
  "Client_name",
  "Requisition_id",
  "Planning_id",
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
].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

const tableStyles = {
  headCells: {
    style: {
      backgroundColor: "#DEE5FF",
      color: "#000",
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
};

export const Home = () => {
  const { hiringManagerState, commonState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState(DEFAULT_FIELDS);
  const [columns, setColumns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

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
          name: "s_no",
          selector: (row) => row["s_no"] || "-",
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
    dynamicColumns.push({
      name: "Action",
      cell: (row) => (
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            className="text-dark p-0 m-0"
            style={{ fontSize: "1.5rem" }}
          ></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleEdit(row)}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => confirmDelete(row)}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });

    setColumns(dynamicColumns);
  }, [selectedFields]);

  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    // open edit modal or navigate to edit page
    navigate("/hiring_manager/job_requisition", { state: row });
  };

  const confirmDelete = (row) => {
    setRowToDelete(row);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!rowToDelete?.id) {
        alert("Missing requisition ID");
        return;
      }
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
        console.log("Delete confirmed:", response.data);
        // Refresh table data after delete
        fetchData(selectedFields);
      } else {
        alert("Failed to delete. " + (response?.data?.message || ""));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting requisition.");
    }

    setShowConfirmModal(false);
    setRowToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setRowToDelete(null);
  };
  const filteredData = (hiringManagerState?.reporting?.data || [])
    .filter((row) =>
      selectedFields.some((field) =>
        String(row[field] || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    )
    .map((row) => ({
      ...row,
      Requisition_id: row.id,
    }));

  console.log(filteredData, "aas");

  return (
    <div className="h-100">
      {hiringManagerState?.jsonOnly?.home_cards?.map((card, index) => (
        <div className="row py-3">
          <div
            className="col-12 col-md-6 col-lg-4 col-xl mb-3 px-2"
            key={index}
          >
            <HiringManagerHomeCard data={card} />
          </div>
        </div>
      ))}

      <Card className="p-4 home_data_table">
        <div className="row align-items-center mb-3">
          <div className="col-3">
            <h4 className="fw-bold mb-0">Job Roles</h4>
          </div>
          <div className="col-9 d-flex justify-content-end">
            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end w-100">
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center"
                onClick={() => setShowModal(true)}
              >
                <span>{Icons.Filter} Display Option</span>
              </Button>

              <InputGroup style={{ maxWidth: "300px" }}>
                <InputGroup.Text>{Icons.Search}</InputGroup.Text>
                <Form.Control
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              <Creatmodel show={showModal} onHide={() => setShowModal(false)} />
            </div>
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
      <Modal show={showConfirmModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{rowToDelete?.job_position}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
