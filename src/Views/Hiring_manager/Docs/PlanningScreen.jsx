import React, { useState, useEffect } from "react";
import JsonData from "../Hiring_manager_utils/JsonData";
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Icons from "Utils/Icons";
import FilterComponentPlanning from "./FilterComponentplanning";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { HandleGetPlanningScreen } from "../Actions/HiringManagerAction";

const tableStyles = {
    headCells: {
        style: {
            backgroundColor: '#DEE5FF',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '14px',
        },
    },
};

// Default fields (uncommented ones)
const defaultFields = [
    "job_position",
    "Tech",
    "JD",
    "Experience",
    "Designation",
    "Target"
];

// All available fields (from API support)
const allFields = [
    "job_position", "Recruiter", "division", "department", "location", "status",
    "Tech", "JD", "Experience", "Designation", "Target", "Interviewer", "Interview",
    "Compensation/Benefits", "Duration/Timeline", "Place", "Working", "Solicitation",
    "Educational", "Feedback", "Relocation", "Travel", "Visa", "Domain", "CIBIL",
    "Valid", "Govt", "Background", "Shift", "Differently abled", "Reference", "Role Type",
    "Job Type", "Communication", "Notice Period", "Joining Readiness", "Candidate Fit",
    "Career Gap", "Sabbatical", "Screening Questions", "Job Health Requirements",
    "Interview Format", "Social Media", "Language Proficiency"
];

export const PlanningScreen = () => {
    const { jsonOnly } = JsonData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedFields, setSelectedFields] = useState(defaultFields);
    const { planningScreenState } = useCommonState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(HandleGetPlanningScreen({ fields: selectedFields }));
    }, [selectedFields]);

    useEffect(() => {
        const data = planningScreenState?.reporting?.data || [];
        const lowerSearch = searchTerm.toLowerCase();

        const filtered = data.filter(item =>
            selectedFields.some(field =>
                String(item[field] || '').toLowerCase().includes(lowerSearch)
            )
        );

        setFilteredData(filtered);
    }, [planningScreenState?.reporting?.data, searchTerm, selectedFields]);

    // Generate columns dynamically from selectedFields
    const columns = selectedFields.map(field => ({
        name: field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        selector: row => row[field] ?? '-',
        sortable: true
    }));

    const handleFieldChange = (fields) => setSelectedFields(fields);

    const handleReset = () => setSelectedFields(defaultFields);

    return (
        <div className="h-100">
            <Card className="p-4 h-100">
                <div className="row align-items-center mb-3">
                    <div className="col-3 d-flex">
                        <h4 className="fw-bold mb-0">Planning Lists</h4>
                    </div>
                    <div className="col-9 d-flex justify-content-end">
                        <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end w-100">
                            <h6 className="fw-normal mt-2">View Requisition templates</h6>
                            <FilterComponentPlanning
                                allFields={allFields}
                                selectedFields={selectedFields}
                                onFieldChange={handleFieldChange}
                                onReset={handleReset}
                            />
                            <InputGroup style={{ maxWidth: '300px' }}>
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
