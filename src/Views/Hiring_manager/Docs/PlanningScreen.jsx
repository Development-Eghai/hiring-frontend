import React, { useState, useEffect } from "react";
import { Card, Form, InputGroup, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Icons from "Utils/Icons";
import FilterComponentPlanning from "./FilterComponentplanning";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

import {
  useCommonState,
  useCustomNavigate,
  useDispatch,
} from "Components/CustomHooks";
import { HandleGetPlanningScreen } from "../Actions/HiringManagerAction";
import axiosInstance from "Services/axiosInstance";

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

const defaultFields = [
  "id",
  "job_position",
  "Tech",
  "JD",
  "Experience",
  "Designation",
  "Target",
];

const allFields = [
  "background_verification",
  "career_gap",
  "citizen_requirement",
  "communication_language",
  "compensation",
  "designation",
  "domain",
  "domain_name",
  "education_qualification",
  "experience_range",
  "github_link",
  "jd_details",
  "job_health_requirements",
  "job_position",
  "job_type",
  "language_proficiency",
  "location",
  "no_of_openings",
  "relocation",
  "relocation_amount",
  "role_type",
  "shift_timings",
  "social_media_links",
  "target_companies",
  "tech_stacks",
  "travel_opportunities",
  "visa_country",
  "visa_requirements",
  "visa_type",
  "working_model",

  // "Background",
  // "Career Gap",
  // "Candidate Fit",
  // "CIBIL",
  // "Communication",
  // "Compensation/Benefits",
  // "Department",
  // "Designation",
  // "Differently abled",
  // "Domain",
  // "Duration/Timeline",
  // "Educational",
  // "Experience",
  // "Feedback",
  // "Govt",
  // "Interview",
  // "Interview Format",
  // "Interviewer",
  // "JD",
  // "Job Health Requirements",
  // "Job Type",
  // "Joining Readiness",
  // "Language Proficiency",
  // "Location",
  // "Notice Period",
  // "Place",
  // "Recruiter",
  // "Reference",
  // "Relocation",
  // "Role Type",
  // "Sabbatical",
  // "Screening Questions",
  // "Shift",
  // "Social Media",
  // "Solicitation",
  // "Status",
  // "Target",
  // "Tech",
  // "Travel",
  // "Valid",
  // "Visa",
  // "Working",
];

export const PlanningScreen = () => {
  const { commonState } = useCommonState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFields, setSelectedFields] = useState(defaultFields);
  const { planningScreenState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const [showJdViewModal, setJdViewModal] = useState(false);
const [jdContent, setJdContent] = useState("");

  const handleFieldChange = (fields) => setSelectedFields(fields);
  const handleReset = () => setSelectedFields(defaultFields);

  useEffect(() => {
    dispatch(HandleGetPlanningScreen({ fields: selectedFields }));
  }, [selectedFields]);
useEffect(() => {
  const data = planningScreenState?.reporting?.data || [];
  const lowerSearch = searchTerm.trim().toLowerCase();

  if (!lowerSearch) {
    setFilteredData(data);
    return;
  }

  const filtered = data.filter((item) =>
    selectedFields.some((field) => {
      if (!item.hasOwnProperty(field)) return false;

      const value = String(item[field] || "");

      // Only use first 2 words for "Jd" field
      const contentToSearch =
        field === "Jd"
          ? value.split(/\s+/).slice(0, 2).join(" ")
          : value;

      return contentToSearch.toLowerCase().includes(lowerSearch);
    })
  );

  setFilteredData(filtered);
}, [planningScreenState?.reporting?.data, searchTerm, selectedFields]);



const columns = [
  ...selectedFields.map((field) => ({
    name: field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    // Instead of always returning raw value, check if it's JD
    cell: (row) => {
      if (field === "JD" && row[field]) {
        return (
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => {
              setJdContent(row[field]);
              setJdViewModal(true);
            }}
          >
            View JD
          </Button>
        );
      }
      return row[field] ?? "-";
    },
    sortable: true,
  })),
  {
    name: "Actions",
    cell: (row) => (
      <div className="d-flex gap-2">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() =>
            navigate(
              `/hiring_manager/planning/hiring_planning_form?edit_id=${row.id}`
            )
          }
        >
          <BsPencilSquare className="me-1" />
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => handleDelete(row.id)}
        >
          <BsTrash className="me-1" />
        </Button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];



  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const { data } = await axiosInstance.delete("hiring_plan/", {
        data: {
          user_role: commonState?.app_data?.user_id || "",
          hiring_plan_id: id,
        },
      });

      if (data?.error_code === 204) {
        dispatch(HandleGetPlanningScreen({ fields: selectedFields }));
      } else {
        alert("Failed to delete. " + (data?.message || ""));
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="h-100">
      <Card className="p-4 h-100">
        <div className="row align-items-center mb-3">
          <div className="col-3 d-flex">
            <h4 className="fw-bold mb-0">Planning Lists</h4>
          </div>
          <div className="col-9 d-flex justify-content-end">
            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end w-100">
              {/* <h6 className="fw-normal mt-2">View Requisition templates</h6> */}
              <FilterComponentPlanning
                allFields={allFields}
                selectedFields={selectedFields}
                onFieldChange={handleFieldChange}
                onReset={handleReset}
              />
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
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={tableStyles}
          fixedHeader
          striped
          highlightOnHover
          pagination
          progressPending={planningScreenState?.isLoading}
          className="custom-datatable"
        />
      </Card>

      <Modal show={showJdViewModal} onHide={() => setJdViewModal(false)} size="lg" centered>
  <Modal.Header closeButton>
    <Modal.Title>Job Description</Modal.Title>
  </Modal.Header>
  <Modal.Body className="d-flex flex-wrap">
  <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
  {jdContent || "No JD available"}
</div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setJdViewModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};
