import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useCommonState } from "Components/CustomHooks";

export const VendorDashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const { commonState } = useCommonState();

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalSourceinput, setModalSourceinput] = useState("");
  const [cvFiles, setCvFiles] = useState([]);

  // ================= Recruiter Columns =================
  const recruiterColumns = [
    { name: "S.no", selector: (row) => row.sno, sortable: true, width: "70px" },
    { name: "Planning ID", selector: (row) => row.planningId, sortable: true },
    { name: "Req ID", selector: (row) => row.reqId, sortable: true },
    { name: "Client Name", selector: (row) => row.clientName, sortable: true },
    {
      name: "Job Title",
      selector: (row) => row.jobTitle,
      sortable: true,
      cell: (row) => <a href="#!">{row.jobTitle}</a>,
    },
    { name: "Hiring Manager", selector: (row) => row.hiringManager },
    { name: "Job Posting", selector: (row) => row.jobPosting },
    { name: "Start Date", selector: (row) => row.startDate },
    { name: "Due Date", selector: (row) => row.dueDate },
    { name: "Hiring Status", selector: (row) => row.hiringStatus },
    { name: "Age (Days)", selector: (row) => row.ageDays },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn btn-sm btn-success"
          onClick={() => handleUploadClick(row)}
        >
          Upload CV
        </button>
      ),
    },
  ];

  // ================= Candidate Columns =================
  const candidateColumns = [
    { name: "Req ID", selector: (row) => row["Req ID"], sortable: true },
    { name: "Candidate Id", selector: (row) => row["Candidate Id"] },
    { name: "First Name", selector: (row) => row["Candidate First Name"] },
    { name: "Second Name", selector: (row) => row["Candidate Second Name"] },
    { name: "Applied Postion", selector: (row) => row["Applied Postion"] },
    { name: "Time in Stage", selector: (row) => row["Time in Stage"] },
    { name: "JD From applied Position", selector: (row) => row["JD From applied Position"] },
    {
      name: "CV/Resume",
      selector: (row) => row["CV/Resume"],
      cell: (row) => (
        <a href={row["CV/Resume"]} target="_blank" rel="noreferrer">
          CV
        </a>
      ),
    },
    {
      name: "Cover Letter",
      selector: (row) => row["Cover Letter"],
      cell: (row) =>
        row["Cover Letter"] ? (
          <a href={row["Cover Letter"]} target="_blank" rel="noreferrer">
            Cover
          </a>
        ) : (
          "N/A"
        ),
    },
    { name: "Current Stage", selector: (row) => row["Candidate current stage"] },
    { name: "Next Stage", selector: (row) => row["Candidate Next Stage"] },
    { name: "Overall Stage", selector: (row) => row["Overall Stage"] },
    { name: "Final stage", selector: (row) => row["final stage"] },
    { name: "Source", selector: (row) => row["Source"] },
    { name: "Action", selector: (row) => row["action"] },
  ];

  // ================= API Fetch =================
  const fetchCandidateData = async (reqId) => {
    try {
      const response = await axios.post(
        "https://api.pixeladvant.com/api/candidates/interview-details/",
        { req_id: reqId }
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        const formatted = response.data.data.map((item) => ({
          "Req ID": item.Req_ID,
          "Candidate Id": item.Candidate_Id,
          "Candidate First Name": item?.Candidate_First_Name,
          "Candidate Second Name": item?.Candidate_Last_Name,
          "Applied Postion": item.Applied_Position,
          "Time in Stage": item.Time_in_Stage,
          "JD From applied Position": item.JD_From_applied_Position,
          "CV/Resume": item.CV_Resume,
          "Cover Letter": item.Cover_Letter,
          "Candidate current stage": item.Candidate_current_stage,
          "Candidate Next Stage": item.Candidate_Next_Stage,
          "Overall Stage": item.Overall_Stage,
          "final stage": item.Final_stage,
          Source: item.Source,
          action: "View",
        }));
        setCandidateData(formatted);
      } else {
        setCandidateData([]);
      }
    } catch (err) {
      console.error("Error fetching candidate data", err);
      setCandidateData([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const response = await axios.post(
          "https://api.pixeladvant.com/api/jobrequisition/list-requisitions/",
          {
            user_role: userInfo?.user_id,
            username: userInfo?.Name,
          }
        );

        if (response?.data?.success && Array.isArray(response.data.data)) {
          const formatted = response.data.data.map((item, index) => ({
            sno: index + 1,
            planningId: item.PlanningID,
            reqId: item.RequisitionID,
            clientName: item.ClientName,
            jobTitle: item.JobTitle,
            hiringManager: item.HiringManager,
            jobPosting: item.JobPosting,
            startDate: item.StartDate,
            dueDate: item.DueDate,
            hiringStatus: item.HiringStatus,
            ageDays: item["Age(Days)"],
          }));
          setTableData(formatted);
        }
      } catch (err) {
        console.error("Error fetching recruiter table data", err);
      }
    };
    fetchData();
  }, []);

  // ================= File Handling =================
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setCvFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setCvFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCVSubmit = async () => {
    if (cvFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    cvFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("req_id", selectedRow?.reqId);
    formData.append("Source", modalSourceinput);

    const uploadcvresponse = await axios.post(
      "https://api.pixeladvant.com/api/upload-resumes/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (uploadcvresponse?.data?.success) {
      handleCloseModal();
    }
  };

  const handleUploadClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null);
    setCvFiles([]);
  };

  // ================= RENDER =================
  return (
    <div className="h-100">
      {/* Recruiter Table */}
      <div className="card rounded-3 border-0 shadow-sm p-2 mt-5">
        <div className="card-body">
          <DataTable
            title="Recruiter Table"
            columns={recruiterColumns}
            data={tableData}
            highlightOnHover
            pagination
            striped
            onRowClicked={(row) => fetchCandidateData(row.reqId)}
          />
        </div>
      </div>

      {/* Candidate Table */}
      <div className="card rounded-3 border-0 shadow-sm p-2 mt-5">
        <div className="card-body">
          <DataTable
            title="Candidate List"
            columns={candidateColumns}
            data={candidateData}
            highlightOnHover
            pagination
            striped
          />
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload CVs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFileMultiple">
              <Form.Label>Select One or More CV Files</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleFileChange}
              />
            </Form.Group>

            {cvFiles.length > 0 && (
              <div className="mt-4">
                <h6>Selected Files:</h6>
                <ul className="list-group">
                  {cvFiles.map((file, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {file.name}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveFile(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Form.Group className="col-5 mt-3">
              <Form.Label> Source</Form.Label>
              <Form.Control
                type="text"
                value={modalSourceinput}
                onChange={(e) => setModalSourceinput(e.target.value)}
              />
            </Form.Group>

            {selectedRow && (
              <div className="mt-4">
                <strong>Requisition Details:</strong>
                <br />
                <span className="text-muted">Job Title:</span>{" "}
                {selectedRow.jobTitle}
                <br />
                <span className="text-muted">Req ID:</span> {selectedRow.reqId}
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCVSubmit}>
            Upload {cvFiles.length > 0 ? `(${cvFiles.length})` : ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
