import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import RecruiterHeader from "../Recruiter_utils/Navbar";
import axios from "axios";
import { Button } from "react-bootstrap";
import ButtonComponent from "Components/Button/Button";
import { saveAs } from "file-saver";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "Services/axiosInstance";

const CandidateScreen = () => {
  //  states

  const CandidateTableHeading = [
    "Req ID",
    "Candidate Id",
    "Candidate First Name",
    "Candidate Second Name",
    "Applied Postion",
    "Time in Stage",
    "JD From applied Position",
    "CV/Resume",
    "Candidate current stage",
    "Candidate Next Stage",
    "Overall Stage",
    "final stage",
    "Source",
    "Score",
    "action",
  ];

  const [candidateDetails, setCandidateDetails] = useState([]);
  console.log(candidateDetails, "dscdas");
  const [showJdViewModal, setJdViewModal] = useState(false);
const [jdContent, setJdContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [candidateDeleted,setCandidateDeleted] = useState(false);

  // effects

  useEffect(() => {
    fetchData();
  }, [candidateDeleted,showModal]);


      const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://api.pixeladvant.com/api/candidates/all-details/"
        );

        if (response?.data?.success) {
          setCandidateDetails(response?.data?.data);
        }
      } catch (err) {
        console.error("Error fetching recruiter table data", err);
      }
    };
  //functions

  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
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
        setCandidateDeleted(!candidateDeleted)
        setShowModal(false);
        fetchData()
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
        setShowModal(false);
        fetchData()
      }
    } catch (err) {
      console.error("Error fetching recruiter table data", err);
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await axios.get(
        "https://api.pixeladvant.com/api/candidates/export-excel/",
        {
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "candidates.xlsx";

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, fileName);
    } catch (err) {
      console.error("Error downloading Excel file:", err);
    }
  };

  const handleShow = async (e, candidateId, field) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.pixeladvant.com/api/candidates/resume/",
        {
          candidate_id: candidateId,
        }
      );

      if (response?.data?.success) {
        switch (field) {
          case "jd":
            window.open(response?.data?.data?.JD_url, "_blank");
          case "cv":
            window.open(response?.data?.data?.resume_url, "_blank");
          case "cl":
            window.open(response?.data?.data?.cover_letter_url, "_blank");
        }
      }
    } catch (err) {
      console.error("Error fetching recruiter table data", err);
    }
  };

  return (
    <>
      <RecruiterHeader />
      <div className="h-100">
        <div className="row">
          <div className="card rounded-3 border-0 shadow-sm p-2">
            <div className="card-body p-0">
              {/* Filter Controls */}
              <div className="row mb-3 d-flex gap-4">
                <div className="col-4">
               <h5 className="fw-bold mb-0 p-3">Candidates</h5>
                </div>
                <div className="col-md-7 d-flex align-items-center justify-content-end gap-3 flex-wrap">
                  {/* Dropdown */}
                  <select className="form-select form-select-sm w-auto">
                    <option value="" disabled>
                      Status
                    </option>
                    <option value="">all</option>
                    <option value="inprograss">In-Progress</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <select className="form-select form-select-sm w-auto">
                    <option value="">Stage</option>
                    <option value="1">stage 1</option>
                    <option value="2">stage 2</option>
                    <option value="3">stage 3</option>
                    <option value="4">stage 4</option>
                  </select>

                  {/* Search Bar */}
                  <div className="input-group input-group-sm w-50">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search .."
                    />
                    <span className="input-group-text bg-white border-start-0">
                      <FaSearch />
                    </span>
                  </div>
                  <ButtonComponent
                    buttonName="Export excel"
                    className="btn-success"
                    clickFunction={handleExportExcel}
                  />
                </div>
              </div>

              {/* Table Section */}
<div className="overflow-hidden">
  <div className="row p-2 overflow-hidden">
    <div className="table-responsive table-wrapper">
      <table className="table mb-0 table-striped">
        <thead>
          <tr className="table_head">
            {CandidateTableHeading &&
              CandidateTableHeading.map((heading, idx) => (
                <th className="table-header text-center" key={idx}>
                  {heading}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {candidateDetails.length > 0 ? (
            candidateDetails.map((data, idx) => (
              <tr key={idx}>
                <th>{data?.Req_ID}</th>
                <td>{data?.Candidate_Id}</td>
                <td>{data?.Candidate_First_Name}</td>
                <td>{data?.Candidate_Last_Name}</td>
                <td>{data?.Applied_Position}</td>
                <td>{data?.Time_in_Stage}</td>
                <td>
                  {data?.JD_From_applied_Position && (
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => {
                        setJdContent(data?.JD_From_applied_Position);
                        setJdViewModal(true);
                      }}
                    >
                      View JD
                    </Button>
                  )}
                </td>
                <td>
                  {data?.CV_Resume && (
                    <a
                      href="#"
                      onClick={(e) => handleShow(e, data?.Candidate_Id, "jd")}
                    >
                      JD,
                    </a>
                  )}
                  {data?.CV_Resume && (
                    <a
                      href="#!"
                      onClick={(e) => handleShow(e, data?.Candidate_Id, "cv")}
                    >
                      CV,
                    </a>
                  )}
                  {data?.Cover_Letter && (
                    <a
                      href="#!"
                      onClick={(e) => handleShow(e, data?.Candidate_Id, "cl")}
                    >
                      CL
                    </a>
                  )}
                </td>
                <td>{data?.Candidate_current_stage}</td>
                <td>{data?.Candidate_Next_Stage}</td>
                <td>{data?.Overall_Stage}</td>
                <td>{data?.Final_stage}</td>
                <td>{data?.Source}</td>
                <td>{data?.Score}</td>
                <td>
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
                      onClick={() => handleDelete(data?.Candidate_Id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={15} className="text-center text-muted py-3">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>

      {/* edit modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
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
                <select
                  className="form-select"
                  name="reqId"
                  defaultValue={selectedCandidate?.Req_ID || ""}
                >
                  <option value="">Select Req ID</option>
                  {[
                    ...new Set(candidateDetails.map((item) => item.Req_ID)),
                  ].map((id, i) => (
                    <option key={i} value={id}>
                      {id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label>Candidate ID</label>
                <select
                  className="form-select"
                  name="candidate_id "
                  defaultValue={selectedCandidate?.Candidate_Id || ""}
                >
                  <option value="">Select Candidate ID</option>
                  {[
                    ...new Set(
                      candidateDetails.map((item) => item.Candidate_Id)
                    ),
                  ].map((id, i) => (
                    <option key={i} value={id}>
                      {id}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Candidate First Name</label>
                <input
                  className="form-control"
                  name="Candidate_First_Name"
                  defaultValue={selectedCandidate?.Candidate_First_Name || ""}
                />
              </div>
              <div className="col">
                <label>Candidate Second Name</label>
                <input
                  className="form-control"
                  name="Candidate_Last_Name"
                  defaultValue={selectedCandidate?.Candidate_Last_Name || ""}
                />
              </div>
              <div className="col">
                <label>Applied Position</label>
                <input
                  className="form-control"
                  name="appliedPosition"
                  defaultValue={selectedCandidate?.Applied_Position || ""}
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Time in Stage</label>
                <input
                  className="form-control"
                  name="timeInStage"
                  defaultValue={selectedCandidate?.Time_in_Stage || ""}
                />
              </div>
              <div className="col">
                <label>Resume Score</label>
                <input
                  className="form-control"
                  name="resumeScore"
                  defaultValue={selectedCandidate?.Score || ""}
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
                    selectedCandidate?.Candidate_current_stage || ""
                  }
                />
              </div>
              <div className="col">
                <label>Next Stage</label>
                <input
                  className="form-control"
                  name="nextStage"
                  defaultValue={selectedCandidate?.Candidate_Next_Stage || ""}
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
            onClick={() => setShowModal(false)}
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


            <Modal show={showJdViewModal} onHide={() => setJdViewModal(false)} size="lg" centered>
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
    </>
  );
};

export default CandidateScreen;
