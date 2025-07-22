import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosInstance from "Services/axiosInstance";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const InterviewBandwidthDashboard = () => {
  const [bandwidthColumns, setBandwidthColumns] = useState([]);
  const [bandwidthData, setBandwidthData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    {
      name: "Interview Round",
      selector: (row) => row.interview_round,
      sortable: true,
      wrap: true,
    },
    {
      name: "Deadline Days",
      selector: (row) => row.dead_line_days,
      sortable: true,
      wrap: true,
    },
    {
      name: "Roles to Hire",
      selector: (row) => row.no_of_roles_to_hire,
      sortable: true,
      wrap: true,
    },
    {
      name: "Offer Decline %",
      selector: (row) => row.offer_decline,
      sortable: true,
      wrap: true,
    },
    {
      name: "No. of Interviewers",
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
    {
      name: "Action",
      selector: (row) => row.interview_plan_id, // helps for sorting/fallback
      cell: (row) => (
        <div className="d-flex gap-2">
          <Link
            to={{
              pathname: "/hiring_manager/planning/interviewer_bandwidth",
              search: `?edit_id=${row.interview_plan_id}`,
              state: row,
            }}
            className="btn btn-sm btn-outline-primary"
          >
            <BsPencilSquare className="me-1" />
          </Link>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() =>
              handleDelete(row.requisition_id, row.hiring_plan_id)
            }
          >
            <BsTrash className="me-1" />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "180px",
    },
  ];

  const handleDelete = async (requisition_id, hiring_plan_id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axiosInstance.delete("/interview_planner_calc/", {
        data: {
          req_id:requisition_id,
          plan_id: hiring_plan_id,
        },
      });

      setBandwidthData((data) =>
        data.filter((row) => row.requisition_id !== requisition_id)
      );
      toast.success("Deleted successfully!");
    } catch (error) {
      toast.error("Delete failed. Please try again.");
      console.error(error);
    }
  };

  const fetchInterviewBandwidth = async () => {
    setLoading(true);
    try {
      const payload = {
        field_names: [
          "hiring_plan_id",
          "requisition_id",
          "leave_adjustment",
          "dead_line_days",
          "offer_decline",
          "no_of_roles_to_hire",
          "interview_round",
          "no_of_interviewer_need",
          "required_candidate",
          "interview_plan_id",
        ],
      };

      const response = await axiosInstance.post(
        "/interviewer_bandwidth_dashboard/",
        payload
      );

      const responseData = response?.data?.data || [];
      setBandwidthData(responseData);
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
              to="/hiring_manager/planning/interviewer_bandwidth"
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
