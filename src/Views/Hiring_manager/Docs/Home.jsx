import React, { useState } from "react";
import JsonData from "../Hiring_manager_utils/JsonData";
import { HiringManagerHomeCard } from "Components/Card/HiringManagerHomeCard";
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Icons from "Utils/Icons";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { HandleGetReportingData } from "Views/Hiring_manager/Actions/HiringManagerAction";
 
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

export const Home = () => {
    const { hiringManagerState } = useCommonState();
    const dispatch = useDispatch();
    const { jsonOnly } = JsonData();
    const [searchTerm, setSearchTerm] = useState('');

    React.useEffect(() => {
        dispatch(HandleGetReportingData({ fields: ["job-poistion", "Recruiter", "divison", "department", "location", "status"] }))
    }, [])

    return (
        <div className="h-100">
            <div className="row py-3">
                {jsonOnly?.home_cards?.map((card, index) =>
                    <div className="col-12 col-md-6 col-lg-4 col-xl mb-3 px-2" key={index}>
                        <HiringManagerHomeCard data={card} />
                    </div>
                )}
            </div>
            <Card className="p-4 home_data_table">
                <div className="row align-items-center mb-3">
                    <div className="col-3">
                        <h4 className="fw-bold mb-0">Job Roles</h4>
                    </div>
                    <div className="col-9 d-flex justify-content-end">
                        <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end w-100">
                            <Button variant="outline-secondary" className="d-flex align-items-center">
                                <span>{Icons.Filter} Filter</span>
                            </Button>
                            <InputGroup style={{ maxWidth: '300px' }}>
                                <InputGroup.Text>
                                    {Icons.Search}
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Search job title..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                            <Button variant="primary" className="d-flex align-items-center">
                                <span>{Icons.CreateNew} Create New</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <DataTable
                    columns={jsonOnly?.columns}
                    data={hiringManagerState?.reporting?.data || []}
                    customStyles={tableStyles}
                    pagination
                    responsive
                    striped
                    highlightOnHover
                    progressPending={hiringManagerState?.isLoading}
                />
            </Card>
        </div>

    )
}

