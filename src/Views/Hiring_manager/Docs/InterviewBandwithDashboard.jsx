import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "Services/axiosInstance";
import Creatmodel from "./Creatmodel";

const InterviewBandwidthDashboard = () => {
  const navigate = useNavigate();
  const [bandwidthColumns, setBandwidthColumns] = useState([]);
  const [bandwidthData, setBandwidthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const staticColumns = [
    {
      name: "Planning ID",
      selector: (row) => row.hiring_plan_id,
      sortable: true,
      wrap: true,
    },
    {
      name: "Req ID",
      selector: (row) => row.requisition_id,
      sortable: true,
      wrap: true,
    },
    {
      name: "Required Candidate",
      selector: (row) => row.required_candidate,
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "Decline Adjust Count",
    //   selector: (row) => row.decline_adjust_count,
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: "Total Candidate Pipeline",
    //   selector: (row) => row.total_candidate_pipline,
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: "Total Interviews Needed",
    //   selector: (row) => row.total_interviews_needed,
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: "Total Interview Hours",
    //   selector: (row) => row.total_interview_hrs,
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: "Working Hrs / Week",
    //   selector: (row) => row.working_hrs_per_week,
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: "Total Interview Weeks",
    //   selector: (row) => row.total_interview_weeks,
    //   sortable: true,
    //   wrap: true,
    // },
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

  const fetchInterviewBandwidth = async () => {
    try {
      const response = await axiosInstance.post(
        "/interviewer_bandwidth_dashboard/",
        {}
      );
      const staticData = response.data?.data || [];
      setBandwidthData(staticData);
      setBandwidthColumns(staticColumns);
    } catch (error) {
      console.error("Error fetching interview bandwidth:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviewBandwidth();
  }, []);

  const handleBandwidthNavigate = () => {
    navigate("interviewer_bandwidth");
  };

  return (
    <div>
      <div className="scroll-container bg-white rounded p-2 mt-3">
        <div className="row col-12 d-flex justify-content-between align-items-center mb-2 px-2 py-3">
          <div className="col">
            <h5 className="fw-bold mb-0">Interviewer Bandwidth Dashboard</h5>
          </div>
          <div className="col text-end">
            <Link
              className="btn btn-primary"
              type="button"
              to="/hiring_manager/planning/interviewer_bandwidth"
              variant="primary"
            >
              + Create Interview Bandwidth
            </Link>
          </div>
        </div>

        <DataTable
          columns={bandwidthColumns}
          data={bandwidthData}
          striped
          dense
          persistTableHead
          progressPending={loading}
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

export default InterviewBandwidthDashboard;
