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
import { useNavigate } from "react-router-dom";

const RecruiterScreeningDashboard = () => {
  //  states

  const CandidateTableHeading = [
    "Req ID",
    "Candidate Id",
    "Client Name",
    // "Candidate Second Name",
    "Applied Postion",
    "Time in Stage",
    // "JD From applied Position",
    "CV/Resume",
    // "Candidate current stage",
    // "Candidate Next Stage",
    // "Overall Stage",
    // "final stage",
    // "Source",
    "Score",
    "Status",
    "Comments",
    "action",
  ];

  const [Screeningdetails, setScreeningDetails] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [candidateDeleted,setCandidateDeleted] = useState(false);

  const navigate = useNavigate();

  // effects

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://api.pixeladvant.com/candidates/screening/"
        );

        if (response?.data?.success) {
          setScreeningDetails(response?.data?.data);
        }
      } catch (err) {
        console.error("Error fetching recruiter table data", err);
      }
    };

    fetchData();
  }, []);

  //functions

  const handleEdit = (data) => {
    setSelectedCandidate(data)
    setShowModal(true)
    // setSelectedCandidate(candidate);
    // setShowModal(true);
  };

  const handleDelete = async(candidate_id) => {
    console.log(",:adcassadkl")

    // try {
    //   const response = await axios.delete(
    //     "https://api.pixeladvant.com/candidates/delete/", {
    //     data: {
    //       candidate_id: candidate_id,
    //     },
    //   }
    //   );
    //   if (response?.data?.success) {
    //     setCandidateDeleted(!candidateDeleted)
    //     setShowModal(false);
    //   }
    // } catch (err) {
    //   console.error("Error fetching recruiter table data", err);
    // }

  };


  return (
    <>
      <RecruiterHeader />
      <div className="h-100 mt-5">
        <div className="row">
          <div className="card rounded-3 border-0 shadow-sm p-2">
            <div className="card-body p-0">
              {/* Filter Controls */}
              <div className="row mb-3 d-flex gap-4">
                <div className="col-4"></div>
                <div className="col-md-7 d-flex align-items-center justify-content-end gap-3 flex-wrap">
                  {/* Dropdown */}
                  {/* <select className="form-select form-select-sm w-auto">
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
                  </select> */}

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
                  {/* <ButtonComponent
                    buttonName="Export excel"
                    className="btn-success"
                    clickFunction={handleExportExcel}
                  /> */}
                </div>
              </div>

              {/* Table Section */}
              <div className="row">
                <div className="table-responsive">
                  <table className="table table-bordered mb-0">
                    <thead className="table-light">
                      <tr>
                        {CandidateTableHeading &&
                          CandidateTableHeading.map((heading, idx) => (
                            <th key={idx}>{heading}</th>
                          ))}
                      </tr>
                    </thead>
                    <tbody className="p-2">
                      {Screeningdetails.length > 0 ? (
                        Screeningdetails.map((data, idx) => (
                          <tr key={idx}>
                            <th>{data?.req_id}</th>
                            <td>{data?.candidate_id}</td>
                            <td>{data?.client_name}</td>
                            {/* <td>{data?.Candidate_Last_Name}</td> */}
                            <td>{data?.applied_position}</td>
                            <td>{data?.time_in_stage}</td>
                            {/* <td>{data?.JD_From_applied_Position}</td> */}
                            <td>
                              {data?.resume_url && (
                                <>
                                  <a
                                    href={data?.resume_url}
                                  >
                                   JD,
                                  </a>
                                </>
                              )}
                              {data?.cover_letter_url && (
                                <>
                                  <a
                                    href={data?.cover_letter_url}
                                  >
                                    CV,
                                  </a>
                                </>
                              )}
                              {data?.Cover_Letter && (
                                <>
                                  <a
                                    href="#!"
                                    // onClick={(e) =>
                                    //   handleShow(e, data?.Candidate_Id, "cl")
                                    // }
                                  >
                                   CL
                                  </a>
                                </>
                              )}
                            </td>
                            <td>{data?.final_rating}</td>
                            <td>{data?.result}</td>
                            <td>{data?.final_feedback}</td>
                            {/* <td>{data?.Final_stage}</td>
                            <td>{data?.Source}</td>
                            <td>{data?.Score}</td> */}

                            <td>
                              <div className="d-flex gap-2">
                            <Button
                                  size="sm"
                                  variant="success"
                                  onClick={()=>navigate("/recruiter/recruiter_screening",{state:data})}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
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
                          <td colSpan={15} className="text-center text-muted py-3">No data found</td>
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

      {/* edit modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Screening Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="candidateForm">
            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Req ID</label>
                      <input
                  className="form-control"
                  name="req_id"
                  defaultValue={selectedCandidate?.req_id || ""}
                  disabled
                /> 
              </div>
              <div className="col">
                <label>Candidate ID</label>
                    <input
                  className="form-control"
                  name="req_id"
                  defaultValue={selectedCandidate?.candidate_id || ""}
                  disabled
                /> 
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Client Name</label>
                <input
                  className="form-control"
                  name="Candidate_First_Name"
                  defaultValue={selectedCandidate?.client_name || ""}
                />
              </div>
              {/* <div className="col">
                <label>Candidate Second Name</label>
                <input
                  className="form-control"
                  name="Candidate_Last_Name"
                  defaultValue={selectedCandidate?.Candidate_Last_Name || ""}
                />
              </div> */}
              <div className="col">
                <label>Applied Position</label>
                <input
                  className="form-control"
                  name="appliedPosition"
                  defaultValue={selectedCandidate?.applied_position || ""}
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Time in Stage</label>
                <input
                  className="form-control"
                  name="timeInStage"
                  defaultValue={selectedCandidate?.time_in_stage || ""}
                />
              </div>
              <div className="col">
                <label>Score</label>
                <input
                  className="form-control"
                  name="resumeScore"
                  defaultValue={selectedCandidate?.final_rating || ""}
                />
              </div>
            </div>

            {/* <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Current Stage</label>
                <input
                  className="form-control"
                  name="currentStage"
                  defaultValue={
                    selectedCandidate?.Candidate_current_stage || ""
                  }
                /> */}
              {/* </div>
              <div className="col">
                <label>Next Stage</label>
                <input
                  className="form-control"
                  name="nextStage"
                  defaultValue={selectedCandidate?.Candidate_Next_Stage || ""}
                />
              </div>
            </div> */}

            {/* <div className="mb-3">
              <label>Source</label>
              <input
                className="form-control"
                name="source"
                defaultValue={selectedCandidate?.Source || ""}
              />
            </div> */}

            {/* <div className="row mb-2 d-flex gap-3">
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
            </div> */}
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
            //   handleSubmitModal(formData);
            }}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RecruiterScreeningDashboard;
