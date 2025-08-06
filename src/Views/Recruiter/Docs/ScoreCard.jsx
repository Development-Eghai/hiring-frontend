import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import RecruiterHeader from "../Recruiter_utils/Navbar";
import axiosInstance from "Services/axiosInstance";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ScoreCard = () => {
  const [data, setData] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [interviewDetailsMap, setInterviewDetailsMap] = useState({});
  const [selectedCandidateName, setSelectedCandidateName] = useState("");
  const [selectedRadioRow, setSelectedRadioRow] = useState(null);

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [candidateToSend, setCandidateToSend] = useState(null);

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

  const sendFormLink = async () => {
    if (!candidateToSend) return;
    setLoading(true);
    try {
      const payload = { candidate_id: candidateToSend?.Candidate_ID };
      const res = await axiosInstance.post(
        "https://api.pixeladvant.com/send-form-link/",
        payload
      );

      if (res.data.success) {
        setShowConfirmModal(false);
        setShowSuccessModal(true);
      } else {
        toast.error(res.data.message || "Failed to send form link.");
      }
    } catch (err) {
      console.error("Error sending form link:", err);
      toast.error("Something went wrong while sending form link.");
    } finally {
      setLoading(false);
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
      cell: (row) => (
        <Button
          variant="primary"
          onClick={() => {
            setCandidateToSend(row);
            setShowConfirmModal(true);
          }}
        >
          Link
        </Button>
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
                    navigate("/recruiter/initiate_bg", {
                      state: {
                        req_id: selectedRadioRow["Req ID"],
                        candidate_id: selectedRadioRow["Candidate ID"],
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

      {/* Confirm Modal */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Form Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to send the form link to{" "}
          <b>{candidateToSend?.Candidate_Name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={sendFormLink} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Send"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Link Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="180"
            height="180"
            x="0"
            y="0"
            viewBox="0 0 24.02 24"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
            className=""
          >
            <g transform="matrix(1,0,0,1,0,0)">
              <g data-name="Layer 2">
                <g data-name="Layer 1">
                  <path
                    fill="#8dc63f"
                    d="m22.31 9.76-1-.76c.13-.46.24-.85.34-1.19.4-1.34.62-2.08.07-2.84s-1.3-.79-2.72-.83h-1.24c-.17-.44-.3-.83-.42-1.16-.46-1.32-.72-2-1.62-2.34s-1.53.14-2.69.94l-1 .69-1-.67C10 .79 9.24.29 8.33.59s-1.15 1-1.62 2.33c-.12.33-.26.72-.42 1.17L5 4.13c-1.4 0-2.17.05-2.72.81s-.28 1.5.1 2.85c.1.34.22.73.34 1.19l-1 .76C.63 10.58 0 11.05 0 12s.61 1.41 1.72 2.26l1 .76c-.12.46-.24.85-.34 1.19-.4 1.34-.62 2.08-.07 2.84s1.33.78 2.72.82h1.23c.17.44.3.83.42 1.16.47 1.32.72 2 1.62 2.34s1.53-.14 2.69-.94l1-.69 1 .67a4.2 4.2 0 0 0 2.19 1 1.71 1.71 0 0 0 .53-.09c.9-.29 1.15-1 1.62-2.33.12-.33.25-.72.42-1.16h1.24c1.4 0 2.17-.05 2.72-.82s.34-1.5-.06-2.84c-.1-.34-.22-.73-.34-1.19l1-.76C23.41 13.43 24 13 24 12s-.59-1.39-1.69-2.24z"
                    opacity="1"
                    data-original="#8dc63f"
                  />
                  <path
                    fill="#ffffff"
                    d="M10.37 17.26a1 1 0 0 1-.71-.34l-2.95-3.29a1 1 0 0 1 1.5-1.33l2.22 2.51 6.33-6.16a1 1 0 1 1 1.39 1.43L11.07 17a1 1 0 0 1-.7.26z"
                    opacity="1"
                    data-original="#ffffff"
                    className=""
                  />
                </g>
              </g>
            </g>
          </svg>

          <div className="mt-4">
            The form link has been successfully sent to{" "}
            <b>{candidateToSend?.Candidate_Name}</b>.
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScoreCard;
