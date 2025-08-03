import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import RecruiterHeader from "../Recruiter_utils/Navbar";
import axiosInstance from "Services/axiosInstance"; // ✅ make sure this path is correct
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ScoreCard = () => {
  const [data, setData] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [interviewDetailsMap, setInterviewDetailsMap] = useState({});
  const [selectedCandidateName, setSelectedCandidateName] = useState("");
  const [selectedRadioRow, setSelectedRadioRow] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          "https://api.pixeladvant.com/candidate_interview_stages/"
        );
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching interview stage data:", err);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = async (candidateId, candidateName) => {
    try {
      const res = await axiosInstance.post(
        "https://api.pixeladvant.com/candidate-interview-journey/",
        { candidate_id: candidateId }
      );

      if (res.data.success) {
        const interviewJourney = res.data.data.Interview_Journey.map(
          (item) => ({
            stage: item.Stage || "-",
            date: item.Date || "-",
            mode: item.Mode || "-",
            who: item.Interviewer || "-",
            feedback: item.Feedback || "-",
            status: item.Status || "-",
          })
        );

        setInterviewDetailsMap((prev) => ({
          ...prev,
          [candidateId]: interviewJourney,
        }));
        setSelectedCandidateId(candidateId);
        setSelectedCandidateName(candidateName);
      }
    } catch (err) {
      console.error("Error fetching interview journey:", err);
    }
  };

  const columns = [
    {
      name: "Select",
      cell: (row) => (
        <Form.Check
          type="radio"
          name="selectedRow"
          checked={selectedRadioRow?.Candidate_ID === row?.Candidate_ID}
          onChange={() => setSelectedRadioRow(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
    },
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "80px",
      center: true,
    },
    {
      name: "Req ID",
      selector: (row) => row.Req_ID || "-",
      width: "150px",
    },
    {
      name: "Client",
      selector: (row) => row.Client || "-",
      width: "150px",
    },
    {
      name: "Candidate ID",
      selector: (row) => row.Candidate_ID || "-",
      width: "160px",
    },
    {
      name: "Candidate Name",
      selector: (row) => row.Candidate_Name || "-",
      width: "180px",
    },
    {
      name: "Interview Date",
      selector: (row) => row.Interview_Date || "-",
      width: "180px",
    },
    {
      name: "Last Interview Stage",
      selector: (row) => row.Last_Interview_Stage || "-",
      width: "200px",
    },
    {
      name: "Current Interview Stage",
      selector: (row) => row.Current_Interview_Stage || "-",
      width: "220px",
    },
    {
      name: "Current Interview Status",
      selector: (row) => row.Current_Interview_Status || "-",
      width: "220px",
    },
    {
      name: "Interview Details",
      cell: (row) => (
        <span
          onClick={() =>
            handleViewDetails(row.Candidate_ID, row.Candidate_Name)
          }
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

  return (
    <>
      <RecruiterHeader />
      <div className="interview-table-wrapper pt-3">
        <div className="scroll-container bg-white rounded p-2">
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col-md-2">
              <h5 className="fw-bold mb-0">Screening Round</h5>
            </div>
            <div className="col-2">
              <Button
                variant="primary"
                onClick={() => {
                  if (selectedRadioRow) {
                    console.log("Initiating BGV for:", selectedRadioRow);
                    navigate("/recruiter/initiate_bg", {
                      state: {
                        selectedRadioRow,
                        showInitiateModal: true,
                        comesFrom: "/recruiter/score_card",
                      },
                    });
                  } else {
                    toast.warning("Please select a row to initiate BGV");
                  }
                }}
              >
                Initiate BGV
              </Button>
            </div>
          </div>

          <div
            className="table-responsive-wrapper"
            style={{ overflowX: "auto" }}
          >
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
        <div className="bg-white rounded">
          {selectedCandidateId && interviewDetailsMap[selectedCandidateId] && (
            <div className="mt-4 p-2 pt-4">
              <h5 className="fw-bold mb-3">
                Interview Stages for {selectedCandidateName}
              </h5>
              <div className="table-responsive">
                <table className="table table-bordered">
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
                          <td>{item.feedback || "-"}</td>
                          <td>{item.status || "-"}</td>
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
    </>
  );
};

export default ScoreCard;
