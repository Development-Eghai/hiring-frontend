import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosInstance from "Services/axiosInstance";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const InterviewDesignDashboard = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

          // {
          //   name: "Action",
          //   selector: (row) => row.interview_design_id,
          //   cell: (row) => (
          //     <div className="d-flex gap-2">
          //       <Link
          //         to={{
          //           pathname:
          //             "/hiring_manager/planning/interview_design_screen",
          //           search: `?edit_id=${row.interview_design_id}`,
          //           state: row,
          //         }}
          //         className="btn btn-sm btn-outline-primary"
          //       >
          //         <BsPencilSquare className="me-1" />
          //       </Link>

          //       <Button
          //         variant="outline-danger"
          //         size="sm"
          //         onClick={() => handleDelete(row.interview_design_id)}
          //       >
          //         <BsTrash className="me-1" />
          //       </Button>
          //     </div>
          //   ),
          //   ignoreRowClick: true,
          //   allowOverflow: true,
          //   button: true,
          //   width: "180px",
          // },
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

        dynamicColumns.push({
          name: "Action",
          selector: (row) => row.interview_design_id,
          cell: (row) => (
            <div className="d-flex gap-2">
              <Link
                to={{
                  pathname: "/hiring_manager/planning/interview_design_screen",
                  search: `?edit_id=${row.interview_design_id}`,
                  state: row,
                }}
                className="btn btn-sm btn-outline-primary"
              >
                <BsPencilSquare className="me-1" />
              </Link>

              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(row.interview_design_id)}
              >
                <BsTrash className="me-1" />
              </Button>
            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "180px",
        });

        const formattedData = rawData.map((item) => ({
          id: item.plan_id,
          interview_design_id: item.interview_design_id,
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

  const handleDelete = async (interview_design_id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axiosInstance.delete("/interview_design_screen/", {
        data: { interview_design_id },
      });

      setData((prev) =>
        prev.filter((row) => row.interview_design_id !== interview_design_id)
      );

      toast.success("Deleted successfully!");
    } catch (error) {
      toast.error("Delete failed. Please try again.");
      console.error(error);
    }
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
              Create Interview Design
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
