import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
// import PaginationWithLimit from "../Recruiter_utils/PaginationRecruiter";

export const RecruiterDashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);

  const RecuiterTableHeadings = [
    "S.no",
    "Planning ID",
    "Req ID",
    "Client Name",
    "Job Title",
    "Hiring Manager",
    "Job Posting",
    "Start Date",
    "Due Date",
    "Hiring Status",
    "Age (Days)",
    "Action",
  ];

  const CandidateTableHeading = [
    "Req ID",
    "Candidate Id",
    "Candidate Name",
    "Applied Postion",
    "Time in Stage",
    "JD From applied Position",
    "CV/Resume",
    "Cover Letter",
    "Candidate current stage",
    "Candidate Next Stage",
    "Overall Stage",
    "final stage",
    "Source",
    "action",
  ];

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
          "Candidate Name": item.Candidate_Name,
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
        const response = await axios.post(
          "https://api.pixeladvant.com/api/jobrequisition/list-requisitions/",
          { user_role: 2 }
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

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [cvFiles, setCvFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setCvFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setCvFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCVSubmit = () => {
    if (cvFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    // Create FormData
    const formData = new FormData();
    cvFiles.forEach((file, i) => {
      formData.append("cv_files[]", file);
    });
    formData.append("req_id", selectedRow?.reqId);
    console.log("Uploading files for:", selectedRow?.reqId);
    cvFiles.forEach((f) => console.log("File:", f.name));

    handleCloseModal();
  };

  const handleUploadClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null);
    // setCvFile(null);
  };

  return (
    <div className="h-100">
      <div className="row">
        <div className="card rounded-3 border-0 shadow-sm p-2 mt-5">
          <div className="card-body p-0 card overflow-auto">
            <table
              className="table mb-0 table-bordered table-striped"
              style={{ minWidth: "1200px" }}
            >
              <thead className="table-light p-2">
                <tr>
                  {RecuiterTableHeadings.map((heading, idx) => (
                    <th key={idx}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="p-2">
                {tableData.length > 0 ? (
                  tableData.map((data, idx) => (
                    <tr
                      key={idx}
                      onClick={() => fetchCandidateData(data?.reqId)}
                      style={{ cursor: "pointer" }}
                    >
                      <th scope="row">{data?.sno}</th>
                      <td>{data?.planningId}</td>
                      <td>{data?.reqId}</td>
                      <td>{data?.clientName}</td>
                      <td>
                        <a href="#!">{data?.jobTitle}</a>
                      </td>
                      <td>{data?.hiringManager}</td>
                      <td>{data?.jobPosting}</td>
                      <td>{data?.startDate}</td>
                      <td>{data?.dueDate}</td>
                      <td>{data?.hiringStatus}</td>
                      <td>{data?.ageDays}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleUploadClick(data)}
                        >
                          Upload CV
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={RecuiterTableHeadings.length}
                      className="text-center"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload modal */}
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

              {selectedRow && (
                <div className="mt-4">
                  <strong>Requisition Details:</strong>
                  <br />
                  <span className="text-muted">Job Title:</span>{" "}
                  {selectedRow.jobTitle}
                  <br />
                  <span className="text-muted">Req ID:</span>{" "}
                  {selectedRow.reqId}
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

        <div className="card rounded-3 border-0 shadow-sm p-2 mt-5">
          <div className="card-body p-0 card overflow-auto">
              <h5 className="p-3">Candidate List</h5>

            <table
              className="table mb-0 table-bordered table-striped"
              style={{ minWidth: "1200px" }}
            >
              <thead className="table-light p-2">
                <tr>
                  {CandidateTableHeading.map((heading, idx) => (
                    <th key={idx}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="p-2">
                {candidateData.length > 0 ? (
                  candidateData.map((data, idx) => (
                    <tr key={idx}>
                      {CandidateTableHeading.map((col, i) => (
                        <td key={i}>{data[col]}</td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={CandidateTableHeading.length}
                      className="text-center"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div className="row">
        <PaginationWithLimit totalItems={50} options={[10, 25, 50]} />
      </div> */}
    </div>
  );
};
