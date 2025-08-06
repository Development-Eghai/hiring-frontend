import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Dropdown,
  Modal,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Icons from "Utils/Icons";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { useNavigate } from "react-router-dom";
import FilterModal from "../../Hiring_manager/Docs/FilterModal";
import axiosInstance from "Services/axiosInstance";
import Cookies from "js-cookie";
import { FaBan, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import RecruiterHeader from "../Recruiter_utils/Navbar";

const DEFAULT_FIELDS = [
  "req_id",
  "client_id",
  "first_name",
  // "Last Name",
  // "Job Title",
  // "Interview Mode",
  "interviewer_stage",
  // "Email ID",
  "candidate_id",
  // "Candidate First Name",
  // "Candidate Last Name",
  // "Role",
  "feedback",
  "interview_results",
  // "Contact Number",
  // "Round Name",
  // "Interview Date",
  // "Start Time",
  // "End Time",
  // "Meet Link",
];

const ALL_FIELDS = [
  "req_id",
  "client_id",
  "first_name",
  "last_name",
  "job_title",
  "interview_mode",
  "interviewer_stage",
  "email_id",
  "candidate_id",
  "candidate_first_name",
  "candidate_last_name",
  "role",
  "feedback",
  "interview_results",
  "contact_number",
  "round_name",
  "interview_date",
  "start_time",
  "end_time",
  "meet_link",
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

export const InterviewerStages = () => {
  const { hiringManagerState, commonState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showView, setShowView] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState(DEFAULT_FIELDS);
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  console.log(tableData[0]?.Feedback, "fdsfas");
  const [selectedRowFields, setSelectedRowFields] = useState([]);
  console.log(selectedFields, "cdc");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [selectedRadioRow, setSelectedRadioRow] = useState(null);
  const [showInitiateModal, setShowInitiateModal] = useState(false);

  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);
  const [actionType, setActionType] = useState(""); // Approved or Rejected
  const [actionComment, setActionComment] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const actionColumn = {
  //   name: "Actions",
  //   cell: (row) => (
  //     <div className="d-flex gap-2">
  //       <Button
  //         size="sm"
  //         variant="success"
  //         // onClick={() => handleEdit(data)}
  //       >
  //         <FaEdit />
  //       </Button>
  //       <Button
  //         size="sm"
  //         variant="danger"
  //         // onClick={() => handleDelete(data?.Candidate_Id)}
  //       >
  //         <FaTrash />
  //       </Button>
  //     </div>
  //   ),
  //   ignoreRowClick: true,
  //   allowOverflow: true,
  //   button: true,
  //   //  style: {
  //   //   minWidth: "140px",
  //   //   maxWidth: "160px",
  //   //   whiteSpace: "nowrap",
  //   // },
  // };

  const columns = [
    {
      name: "Select",
      cell: (row) => (
        <Form.Check
          type="radio"
          name="selectedRow"
          checked={selectedRadioRow?.candidate_id === row?.candidate_id}
          onChange={() => setSelectedRadioRow(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
    },
    ...DEFAULT_FIELDS.map((field) => ({
      name: field,
      selector: (row) => row[field] ?? "-",
      sortable: true,
    })),
  ];

  const filteredData = tableData.map((item) => {
    const filteredItem = {};
    DEFAULT_FIELDS.forEach((field) => {
      if (field in item) {
        filteredItem[field] = item[field];
      }
    });
    return filteredItem;
  });

  const handleRowClick = (row) => {
    console.log(row, "adfas");
    setSelectedRowFields(row);
    setShowView(true);
  };

  useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await axiosInstance.get(
          "https://api.pixeladvant.com/api/interview/report/"
        );

        if (response?.data?.success) {
          const normalizedData = response?.data?.data.map((obj) => {
            const newObj = {};
            Object.entries(obj).forEach(([key, value]) => {
              const cleanedKey = key.trim().toLowerCase().replace(/\s+/g, "_");
              newObj[cleanedKey] = value || "-";
            });
            return newObj;
          });
          setTableData(normalizedData);
          // setSelectedFields(DEFAULT_FIELDS)
          console.log(response?.data?.data, "DCWED");
        }
      } catch (err) {
        console.error("Error fetching recruiter table data", err);
      }
    }

    fetchTableData();
  }, []);

  return (
    <div className="h-100">
      <RecruiterHeader />
      <Card className="p-4 home_data_table">
        <div className="row align-items-center mb-3">
          <div className="col-3">
            <h4 className="fw-bold mb-0">Interview</h4>
          </div>
          {/* <div className="col-6 d-flex justify-content-end gap-3">
            <button
              className="btn btn-primary"
              disabled={selectedRows.length === 0}
              onClick={() => {
                navigate("/interviewer/launch_interview", {
                  state: selectedRows,
                });
              }}
            >
              Launch Interview
            </button>
            <button
              className="btn btn-secondary"
              disabled={selectedRows.length === 0}
              onClick={() => {
                setActionType("Rejected");
                setShowConfirmActionModal(true);
              }}
            >
              View Guidelines
            </button>

            <Button
              variant="outline-secondary"
              className="d-flex ps-4 align-items-center"
              onClick={() => setShowModal(true)}
            >
              <span>{Icons.Filter} Display Option</span>
            </Button>
          </div> */}
          <div className="col-4"></div>
          <div className="col-2 text-end">
            <Button
              variant="primary"
              onClick={() => {
                if (selectedRadioRow) {
                  navigate("/recruiter/initiate_bg", {
                    state: {
                      req_id: selectedRadioRow?.req_id,
                      candidate_id: selectedRadioRow?.candidate_id,
                      showInitiateModal: true,
                      comesFrom: "/recruiter/interview_stages",
                    },
                  });
                } else {
                  toast.warning("Please select a row to initiate BGV");
                }
              }}
            >
              Initiate BGV
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
          data={tableData}
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
        allFields={DEFAULT_FIELDS}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
        onClear={() => setSelectedFields(DEFAULT_FIELDS)}
      />

      {/* view modal  */}
      <Modal
        show={showView}
        onHide={() => setShowView(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Interview Details</Modal.Title>
        </Modal.Header>

        <div style={{ padding: "20px" }}>
          <Table bordered hover responsive>
            <tbody>
              {ALL_FIELDS.map((field, index) => {
                const value = selectedRowFields?.[field];
                const isMeetLink =
                  field.toLowerCase().includes("meet") &&
                  typeof value === "string";

                return (
                  <tr key={index}>
                    <th style={{ width: "40%" }}>{field}</th>
                    <td>
                      {isMeetLink ? (
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {value}
                        </a>
                      ) : value === null || value === "" ? (
                        "-"
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InterviewerStages;
