import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaInfoCircle } from "react-icons/fa";
import axiosInstance from "Services/axiosInstance";
import Creatmodel from "./Creatmodel";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InterviewDesignDashboard = () => {
  const navigate = useNavigate();
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
  };

  useEffect(() => {
    fetchInterviewDesigns();
  }, []);

  return (
    <div className="interview-table-wrapper">
      <div className="scroll-container bg-white rounded p-2">
        <div className="row col-12 d-flex justify-content-between align-items-center mb-2 px-2 py-3">
          <div className="col">
            <h5 className="fw-bold mb-0">Interview Design Dashboard</h5>
          </div>
          <div className="col-2">
            <Button
              variant="primary"
              onClick={() =>
                navigate("/hiring_manager/planning/interview_design_screen")
              }
            >
              Create Design
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
    </div>
  );
};

export default InterviewDesignDashboard;
