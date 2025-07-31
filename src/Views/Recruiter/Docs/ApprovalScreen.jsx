import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosInstance from "Services/axiosInstance";
import RecruiterHeader from "../Recruiter_utils/Navbar";

const ApprovalScreen = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "https://api.pixeladvant.com/offer-approvals/status/"
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        const apiData = response.data.data;

        // const formattedData = apiData.map((item) => ({
        //   reqId: item.req_id,
        //   clientId: item.client_id,
        //   clientName: item.client_name,
        //   candidateId: item.candidate_id,
        //   candidateFirstName: item.candidate_first_name,
        //   role: item.role,
        //   recruiterScreening1: item.screening_status || "-",
        //   hiring_manager_approval: item.decision,
        //   feedback: item.comment,
        // }));

        setData(apiData);
      } else {
        console.warn("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const staticColumns = [
      {
        name: "S.No",
        selector: (row, index) => index + 1,
        width: "70px",
        center: true,
      },
      {
        name: "Req ID",
        selector: (row) => row.req_id,
        wrap: true,
      },
      {
        name: "Client ID",
        selector: (row) => row.client_id,
        wrap: true,
      },
      {
        name: "Client Name",
        selector: (row) => row.client_name,
        wrap: true,
      },
      {
        name: "Candidate id",
        selector: (row) => row.client_id,
        wrap: true,
      },
      {
        name: "Candidate Name",
        selector: (row) => row.candidate_first_name,
        wrap: true,
      },
      {
        name: "Role",
        selector: (row) => row.role,
        wrap: true,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        wrap: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        wrap: true,
      },
      {
        name: "Job Title",
        selector: (row) => row.job_title,
        wrap: true,
      },
      {
        name: "status",
        selector: (row) => row.status,
        wrap: true,
      },
      {
        name: "Decision",
        selector: (row) => row.decision,
        wrap: true,
      },
    ];

    setColumns(staticColumns);
    fetchData();
  }, []);

  // Handle selection
  //   const handleRowSelected = (state) => {
  //     setSelectedRows(state.selectedRows);
  //   };

  // Determine button visibility
  //   const renderButtons = () => {
  //     if (selectedRows.length === 1) {
  //       return (
  //         <>
  //           <button className="btn btn-primary mx-2">Approve</button>
  //           <button className="btn btn-danger">Cancel</button>
  //         </>
  //       );
  //     } else if (selectedRows.length > 1) {
  //       return (
  //         <>
  //           <button className="btn btn-primary mx-2">Approve All</button>
  //           <button className="btn btn-danger">Cancel</button>
  //         </>
  //       );
  //     }
  //     return null;
  //   };

  return (
    <>
      <RecruiterHeader />
      <div className="interview-table-wrapper">
        <div className="scroll-container bg-white rounded p-2">
          <div className="row align-items-center mb-3">
            <div className="col-md-2">
              <h5 className="fw-bold mb-0">Approval</h5>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={data}
            striped
            dense
            selectableRows
            //   onSelectedRowsChange={handleRowSelected}
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
    </>
  );
};

export default ApprovalScreen;
