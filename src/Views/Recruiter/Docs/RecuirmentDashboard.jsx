import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
// import PaginationWithLimit from "../Recruiter_utils/PaginationRecruiter";
import RecruiterHeader from "../Recruiter_utils/Navbar";
import { useCommonState } from "Components/CustomHooks";
import { FaEdit, FaTrash } from "react-icons/fa";

export const RecruiterDashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState({});
  

  const handleEdit = (candidate) => {
    console.log(candidate,"ASddqwDQW")
    setSelectedCandidate(candidate);
    setShowModalEdit(true);
};

  const handleDelete = async(candidate_id) => {

    try {
      const response = await axios.delete(
        "https://api.pixeladvant.com/candidates/delete/", {
        data: {
          candidate_id: candidate_id,
        },
      }
      );
      if (response?.data?.success) {
        window.location.reload()
      }
    } catch (err) {
      console.error("Error fetching recruiter table data", err);
    }
  };

  const handleSubmitModal = async (formData) => {
    try {
      const dataObject = Object.fromEntries(formData.entries());
      const response = await axios.put(
        "https://api.pixeladvant.com/api/candidates/update-details/",
        dataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
         window.location.reload()
        setShowModalEdit(false);
      }
    } catch (err) {
      console.error("Error fetching recruiter table data", err);
    }
  };

  console.log(candidateData, "hv");
  console.log(tableData, "uyi");

  const { commonState } = useCommonState();

  console.log(commonState, "asdasd");
  const RecuiterTableHeadings = [
    "S.no",
    "Planning ID",
    "Req ID",
    // "Client ID",
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
    "Candidate First Name",
    "Candidate Second Name",
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
          { user_role: userInfo?.user_id, username: userInfo?.Name }
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
  }, [showModal]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [modalSourceinput, setModalSourceinput] = useState("");
  const [cvFiles, setCvFiles] = useState([]);
  const [showJdViewModal, setJdViewModal] = useState(false);
  const [jdContent, setJdContent] = useState("");
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

    // Create FormData
    const formData = new FormData();
    cvFiles.forEach((file, i) => {
      formData.append("files", file);
    });
    formData.append("req_id", selectedRow?.reqId);
    formData.append("Source", modalSourceinput);
    console.log(formData, "dca");
    cvFiles.forEach((f) => console.log("File:", f.name));

    const uploadcvresponse = await axios.post(
      "https://api.pixeladvant.com/api/upload-resumes/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(uploadcvresponse, "ascas");

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
    // setCvFile(null);
  };

  return (
    <div className="h-100">
      <RecruiterHeader />
      <div className="row px-3 mt-0">
        <div className="card rounded-3 border-0 shadow-sm p-2 ">
          <div className="mb-3 gap-2 p-2 mt-2 d-flex justify-content-between">
            <h5 className="fw-bold mb-0">Recruiter Dashboard</h5>
          </div>
          <div className="card-body p-0 card overflow-auto">
            <table
              className="table mb-0 table-bordered table-striped"
              // style={{ minWidth: "1200px" }}
            >
              <thead className="  p-2">
                <tr >
                  {RecuiterTableHeadings.map((heading, idx) => (
                    <th className="table-header" key={idx}>{heading}</th>
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
              <Form.Group className="col-5">
                <Form.Label> Source</Form.Label>
                <Form.Control
                  type="text"
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

        {candidateData?.length > 0 && (
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
                          <td key={i}>
                            {col === "JD From applied Position" &&
                            data["JD From applied Position"] ? (
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => {
                                  setJdContent(
                                    data["JD From applied Position"]
                                  );
                                  setJdViewModal(true);
                                }}
                              >
                                View JD
                              </Button>
                            ) : col === "CV/Resume" && data["CV/Resume"] ? (
                              <a
                                href={data["CV/Resume"]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View CV
                              </a>
                            ) : col === "action" ? (
                              <div className="d-flex gap-2">
                               <Button
                                      size="sm"
                                      variant="success"
                                      onClick={() => handleEdit(data)}
                                    >
                                      <FaEdit />
                                    </Button>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() =>
                                    handleDelete(data?.["Candidate Id"])
                                  }
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            ) : (
                              data[col]
                            )}
                          </td>
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
        )}
      </div>

      {/* <div className="row">
        <PaginationWithLimit totalItems={50} options={[10, 25, 50]} />
      </div> */}

      <Modal
        show={showModalEdit}
        onHide={() => setShowModalEdit(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Candidate Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="candidateForm">
            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Req ID</label>
                <input
                  className="form-select"
                  name="reqId"
                  defaultValue={selectedCandidate?.["Req ID"] || ""}
                  readOnly
                />
              </div>
              <div className="col">
                <label>Candidate ID</label>
                <input
                  className="form-select"
                  name="candidate_id "
                  defaultValue={selectedCandidate?.["Candidate Id"] || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Candidate First Name</label>
                <input
                  className="form-control"
                  name="Candidate_First_Name"
                  defaultValue={
                    selectedCandidate?.["Candidate First Name"] || ""
                  }
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault(); // Block spacebar
                    }
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\s/g, ""); // Remove pasted spaces
                  }}
                />
              </div>
              <div className="col">
                <label>Candidate Second Name</label>
                <input
                  className="form-control"
                  name="Candidate_Last_Name"
                  defaultValue={
                    selectedCandidate?.["Candidate Second Name"] || ""
                  }
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault(); // Block spacebar
                    }
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\s/g, ""); // Remove pasted spaces
                  }}
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Time in Stage</label>
                <input
                  className="form-control"
                  name="timeInStage"
                  defaultValue={selectedCandidate?.["Time in Stage"] || ""}
                />
              </div>
              <div className="col">
                <label>Applied Position</label>
                <input
                  className="form-control"
                  name="appliedPosition"
                  defaultValue={selectedCandidate?.["Applied Postion"] || ""}
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Current Stage</label>
                <input
                  className="form-control"
                  name="currentStage"
                  defaultValue={
                    selectedCandidate?.["Candidate current stage"] || ""
                  }
                />
              </div>
              <div className="col">
                <label>Next Stage</label>
                <input
                  className="form-control"
                  name="nextStage"
                  defaultValue={
                    selectedCandidate?.["Candidate Next Stage"] || ""
                  }
                />
              </div>
            </div>

            <div className="mb-3">
              <label>Source</label>
              <input
                className="form-control"
                name="source"
                defaultValue={selectedCandidate?.Source || ""}
              />
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Upload Resume</label>
                <input type="file" name="resume" className="form-control" />
              </div>
              <div className="col">
                <label>Upload Cover Letter</label>
                <input
                  type="file"
                  name="CoverLetter"
                  className="form-control"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowModalEdit(false)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const form = document.getElementById("candidateForm");
              const formData = new FormData(form);
              handleSubmitModal(formData);
            }}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showJdViewModal}
        onHide={() => setJdViewModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Job Description</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-wrap">
          <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {jdContent || "No JD available"}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setJdViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
