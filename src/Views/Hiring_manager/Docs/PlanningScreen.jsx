import React, { useState, useEffect } from "react";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Icons from "Utils/Icons";
import FilterComponentPlanning from "./FilterComponentplanning";
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
  "Background",
  "Career Gap",
  "Candidate Fit",
  "CIBIL",
  "Communication",
  "Compensation/Benefits",
  "Department",
  "Designation",
  "Differently abled",
  "Domain",
  "Duration/Timeline",
  "Educational",
  "Experience",
  "Feedback",
  "Govt",
  "Interview",
  "Interview Format",
  "Interviewer",
  "JD",
  "Job Health Requirements",
  "Job Type",
  "Joining Readiness",
  "Language Proficiency",
  "Location",
  "Notice Period",
  "Place",
  "Recruiter",
  "Reference",
  "Relocation",
  "Role Type",
  "Sabbatical",
  "Screening Questions",
  "Shift",
  "Social Media",
  "Solicitation",
  "Status",
  "Target",
  "Tech",
  "Travel",
  "Valid",
  "Visa",
  "Working",
];

export const PlanningScreen = () => {
  const { commonState } = useCommonState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFields, setSelectedFields] = useState(defaultFields);
  const { planningScreenState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();

  const handleFieldChange = (fields) => setSelectedFields(fields);
  const handleReset = () => setSelectedFields(defaultFields);

  useEffect(() => {
    dispatch(HandleGetPlanningScreen({ fields: selectedFields }));
  }, [selectedFields]);

  useEffect(() => {
    const data = planningScreenState?.reporting?.data || [];
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = data.filter((item) =>
      selectedFields.some((field) =>
        String(item[field] || "")
          .toLowerCase()
          .includes(lowerSearch)
      )
    );

    setFilteredData(filtered);
  }, [planningScreenState?.reporting?.data, searchTerm, selectedFields]);

  const columns = [
    ...selectedFields.map((field) => ({
      name: field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      selector: (row) => row[field] ?? "-",
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
            {Icons.Edit}
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            {Icons.Delete}
            Delete
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
    </div>
  );
};
