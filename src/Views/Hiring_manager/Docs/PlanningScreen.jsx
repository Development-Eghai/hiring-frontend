import React, { useState, useEffect } from "react";
import JsonData from "../Hiring_manager_utils/JsonData";
import { Card, Form, InputGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Creatmodel from "./Creatmodel";
import Icons from "Utils/Icons";
import FilterComponent from "./FilterComponent";
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

export const PlanningScreen = () => {
    const { jsonOnly } = JsonData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { planningScreenState } = useCommonState();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(HandleGetPlanningScreen({
            fields: ["Position/Role", "Tech", "JD", "Experience", "Designation", "Target"]
        }));
    }, []);

    useEffect(() => {
        const data = planningScreenState?.reporting?.data || [];

        const lowerSearch = searchTerm.toLowerCase();

        const filtered = data.filter((item) =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(lowerSearch)
            )
        );

        setFilteredData(filtered);
    }, [planningScreenState?.reporting?.data, searchTerm]);

    return (
        <div className="h-100">
            <Card className="p-4">
                <div className="row align-items-center mb-3">
                    <div className="col-3 d-flex">
                        <h4 className="fw-bold mb-0">Planning Lists</h4>
                    </div>
                    <div className="col-9 d-flex justify-content-end">
                        <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end w-100">
                            <h6 className="fw-normal mt-2">View Requisition templates</h6>
                            <FilterComponent />
                            <InputGroup style={{ maxWidth: '300px' }}>
                                <InputGroup.Text>{Icons.Search}</InputGroup.Text>
                                <Form.Control
                                    placeholder="Search job title..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                            <Creatmodel show={showModal} onHide={() => setShowModal(false)} />
                        </div>
                    </div>
                </div>

                <DataTable
                    columns={jsonOnly?.columns1}
                    data={filteredData}
                    customStyles={tableStyles}
                    fixedHeader
                    fixedHeaderScrollHeight="500px"
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
