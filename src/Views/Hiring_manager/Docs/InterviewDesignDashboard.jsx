import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaInfoCircle } from "react-icons/fa";
import axiosInstance from "Services/axiosInstance";
import Creatmodel from "./Creatmodel";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InterviewDesignDashboard = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [bandwidthColumns, setBandwidthColumns] = useState([]);
  const [bandwidthData, setBandwidthData] = useState([]);

  const fetchInterviewDesigns = async () => {
    try {
      const response = await axiosInstance.get("/interivew_design_dashboard/");
      if (response.data.success && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const maxRounds = Math.max(
          ...rawData.map((item) => item.interview_rounds?.length || 0)
        );

        const dynamicColumns = [
          {
            name: "S.No",
            selector: (row, index) => index + 1,
            width: "70px",
            center: true,
          },
           {
            name: "Planning ID",
            selector: (row) => row.id,
            wrap: true,
            grow: 2,
          },
          {
            name: "Position / Role",
            selector: (row) => row.label,
            wrap: true,
            grow: 2,
          },
          {
            name: "Tech Stack",
            selector: (row) => row.techStack,
            wrap: true,
            grow: 2,
          },
          {
            name: "Screening Type",
            selector: (row) => row.screeningtype,
            wrap: true,
            grow: 2,
          },
        ];

        for (let i = 0; i < maxRounds; i++) {
          dynamicColumns.push({
            name: `Interview Round ${i + 1}`,
            selector: (row) => row.interview_rounds[i] || "-",
            wrap: true,
            grow: 2,
          });
        }

        dynamicColumns.push({
          name: "Status",
          selector: (row) => row.status,
          wrap: true,
          grow: 1,
        });

        const formattedData = rawData.map((item) => ({
          id: item.plan_id,
          label: item.position_role,
          techStack: item.tech_stacks,
          screeningtype: item.screening_type,
          interview_rounds: item.interview_rounds || [],
          status: item.status,
        }));

        setColumns(dynamicColumns);
        setData(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch interview design dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInterviewBandwidth = () => {
    const staticData = [
      {
        planning_id: "PLN001",
        req_id: "REQ123",
        required_candidate: 7,
        decline_adjust_count: 0.49,
        total_candidate_pipline: 7.49,
        total_interviews_needed: 52.43,
        total_interview_hrs: 367.01,
        working_hrs_per_week: 40,
        total_interview_weeks: 9.17525,
        no_of_interviewer_need: 36.701,
        leave_adjustment: 59,
      },
      {
        planning_id: "PLN001",
        req_id: "REQ123",
        required_candidate: 7,
        decline_adjust_count: 0.49,
        total_candidate_pipline: 7.49,
        total_interviews_needed: 52.43,
        total_interview_hrs: 367.01,
        working_hrs_per_week: 40,
        total_interview_weeks: 9.17525,
        no_of_interviewer_need: 36.701,
        leave_adjustment: 59,
      },
    ];

    const staticColumns = [
      {
        name: "Planning ID",
        selector: (row) => row.planning_id,
        sortable: true,
        wrap: true,
      },
      {
        name: "Req ID",
        selector: (row) => row.req_id,
        sortable: true,
        wrap: true,
      },
      {
        name: "Required Candidate",
        selector: (row) => row.required_candidate,
        sortable: true,
        wrap: true,
      },
      {
        name: "Decline Adjust Count",
        selector: (row) => row.decline_adjust_count,
        sortable: true,
        wrap: true,
      },
      {
        name: "Total Candidate Pipeline",
        selector: (row) => row.total_candidate_pipline,
        sortable: true,
        wrap: true,
      },
      {
        name: "Total Interviews Needed",
        selector: (row) => row.total_interviews_needed,
        sortable: true,
        wrap: true,
      },
      {
        name: "Total Interview Hours",
        selector: (row) => row.total_interview_hrs,
        sortable: true,
        wrap: true,
      },
      {
        name: "Working Hrs / Week",
        selector: (row) => row.working_hrs_per_week,
        sortable: true,
        wrap: true,
      },
      {
        name: "Total Interview Weeks",
        selector: (row) => row.total_interview_weeks,
        sortable: true,
        wrap: true,
      },
      {
        name: "No. of Interviewer Needed",
        selector: (row) => row.no_of_interviewer_need,
        sortable: true,
        wrap: true,
      },
      {
        name: "Leave Adjustment",
        selector: (row) => row.leave_adjustment,
        sortable: true,
        wrap: true,
      },
    ];

    setBandwidthData(staticData);
    setBandwidthColumns(staticColumns);
  };

  useEffect(() => {
    fetchInterviewDesigns();
  }, []);

  useEffect(() => {
    fetchInterviewDesigns();
    fetchInterviewBandwidth();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("interview_design_screen");
  };

  const handlebandwidthNavigate = () => {
    navigate("interviewer_bandwidth");
  };

  return (
    <div className="interview-table-wrapper">
      <div className="scroll-container bg-white rounded p-2">
        <div className="row col-12 d-flex justify-content-between align-items-center mb-2 px-2 py-3">
          <div className="col ">
            <h5 className="fw-bold mb-0">Interview Design Dashboard</h5>
          </div>
          <div className="col text-end  ">
            <Button variant="primary" onClick={handleNavigate}>
              + Create Interview Design Screen
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          striped
          dense
          progressPending={loading}
          persistTableHead
          customStyles={{
            tableWrapper: {
              style: {
                display: "block",
                maxWidth: "100%",
                overflowY: "auto",
                overflowX: "auto",
              },
            },
            headCells: {
              style: {
                backgroundColor: "#e8edff",
                fontWeight: "600",
                fontSize: "14px",
                color: "#1d1d1f",
                paddingTop: "20px",
                paddingBottom: "20px",
                whiteSpace: "nowrap",
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
      </div>

      <div className="scroll-container bg-white rounded p-2 mt-3">
        <div className="row col-12 d-flex justify-content-between align-items-center mb-2 px-2 py-3">
          <div className="col ">
            <h5 className="fw-bold mb-0">Interview Bandwith Dashboard</h5>
          </div>
          <div className="col text-end  ">
            <Button variant="primary" onClick={handlebandwidthNavigate}>
              + Create Interview Bandwith
            </Button>
          </div>
        </div>
        <DataTable
          columns={bandwidthColumns}
          data={bandwidthData}
          striped
          dense
          persistTableHead
          customStyles={{
            tableWrapper: {
              style: {
                display: "block",
                maxWidth: "100%",
                overflowY: "auto",
                overflowX: "auto",
              },
            },
            headCells: {
              style: {
                backgroundColor: "#e8edff",
                fontWeight: "600",
                fontSize: "14px",
                color: "#1d1d1f",
                paddingTop: "20px",
                paddingBottom: "20px",
                whiteSpace: "nowrap",
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
      </div>
    </div>
  );
};

export default InterviewDesignDashboard;
