import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import RecruiterHeader from "../Recruiter_utils/Navbar";

const ScoreCard = () => {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const interviewDetailsMap = {
    C001: [
      {
        stage: "Screening",
        date: "01-01-2025",
        mode: "Phone",
        who: "Ankit",
        feedback: "jjlll",
        status: "Selected",
      },
      {
        stage: "Stage-1",
        date: "05-01-2025",
        mode: "Zoom",
        who: "Vasanth",
        feedback: "Comments",
        status: "Selected",
      },
      {
        stage: "Stage-2",
        date: "10-01-2025",
        mode: "Zoom",
        who: "Sachin",
        feedback: "Comments",
        status: "Selected",
      },
      {
        stage: "Stage-3",
        date: "15-01-2025",
        mode: "Face to face",
        who: "Pankaj",
        feedback: "Comments",
        status: "Selected",
      },
      {
        stage: "Offer",
        date: "15-01-2025",
        mode: "Phone",
        who: "Abhik",
        feedback: "Salary mismatch",
        status: "Rejected",
      },
    ],
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "80px",
      center: true,
    },
    {
      name: "Req ID",
      selector: (row) => row.reqId,
      width: "150px",
    },
    {
      name: "Client",
      selector: (row) => row.client,
      width: "150px",
    },
    {
      name: "Candidate ID",
      selector: (row) => row.candidateId,
      width: "160px",
    },
    {
      name: "Candidate Name",
      selector: (row) => row.candidateName,
      width: "180px",
    },
    {
      name: "Interview Date",
      selector: (row) => row.interviewDate,
      width: "180px",
    },
    {
      name: "Last Interview Stage",
      selector: (row) => row.lastInterviewStage,
      width: "200px",
    },
    {
      name: "Current Interview Status",
      selector: (row) => row.currentInterviewStatus,
      width: "220px",
    },
    {
      name: "Interview Details",
      cell: (row) => (
        <span
          onClick={() => setSelectedCandidateId(row.candidateId)}
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          View Details
        </span>
      ),
      width: "150px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Link",
      cell: () => (
        <button type="button" className="btn btn-primary text-decoration-none">
          Link
        </button>
      ),
      width: "120px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const data = [
    {
      reqId: "5678",
      client: "HCL",
      candidateId: "C001",
      candidateName: "Sunil Gupta",
      interviewDate: "01-01-2025",
      lastInterviewStage: "Round-2",
      Current_Interview_Stage: "Stage-3 Yet to happen",
      technical: "Stage-3 Yet to happen",
    },
    {
      reqId: "1234",
      client: "CTS",
      candidateId: "BAC",
      candidateName: "BAC",
      interviewDate: "03/15/2025",
      lastInterviewStage: "",
      currentInterviewStatus: "Screening",
      Current_Interview_Stage: "Stage-3 Yet to happen",
      technical: "Stage-3 Yet to happen",
    },
    {
      reqId: "8976",
      client: "HCL",
      candidateId: "XYZ",
      candidateName: "XYZ",
      interviewDate: "06-01-2025",
      lastInterviewStage: "",
      Current_Interview_Stage: "Stage-3 Yet to happen",
      technical: "Stage-3 Yet to happen",
      currentInterviewStatus: "Stage-2",
    },
  ];

  return (
    <>
      <RecruiterHeader />
      <div className="interview-table-wrapper pt-3">
        <div className="scroll-container bg-white rounded p-2">
          <div className="row align-items-center mb-3">
            <div className="col-md-2">
              <h5 className="fw-bold mb-0">Screening Round</h5>
            </div>
          </div>

          <div
            className="table-responsive-wrapper"
            style={{ overflowX: "auto" }}
          >
            <div style={{}}>
              <DataTable
                columns={columns}
                data={data}
                striped
                dense
                responsive
                persistTableHead
                fixedHeader
                fixedHeaderScrollHeight="500px"
                customStyles={{
                  headCells: {
                    style: {
                      backgroundColor: "#e8edff",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#1d1d1f",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      //   whiteSpace: "nowrap",
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
              <div className="mt-2">
                {selectedCandidateId &&
                  interviewDetailsMap[selectedCandidateId] && (
                    <div className="pt-4">
                      <h5 className="fw-bold mb-3">
                        Interview Stages for {selectedCandidateId}
                      </h5>
                      <div className="table-responsive">
                        <table className="table table-bordered ">
                          <thead className="table-primary">
                            <tr>
                              <th>Interview Stage</th>
                              <th>Interview Date</th>
                              <th>Mode of Interview</th>
                              <th>Who</th>
                              <th>Feedback</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {interviewDetailsMap[selectedCandidateId].map(
                              (item, index) => (
                                <tr key={index}>
                                  <td>{item.stage}</td>
                                  <td>{item.date}</td>
                                  <td>{item.mode}</td>
                                  <td>{item.who}</td>
                                  <td>{item.feedback}</td>
                                  <td>{item.status}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreCard;
