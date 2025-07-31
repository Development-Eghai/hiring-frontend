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

const OfferBGV = () => {
  //  states

  const CandidateTableHeading = [
    "Req ID",
    "Client Id",
    "Client Name",
    "Candidate Id",
    "Candidate First Name",
    "Candidate Second Name",
    "HM Approver",
    "FPNA/Business Ops",
    "Generate Offer",
    "Status",
    "action",
  ];

  const [Screeningdetails, setScreeningDetails] = useState([]);
  const [showgenerateModal, setshowGenerateModal] = useState(false);
  const [variablePays, setVariablePays] = useState([{ name: "", value: "" }]);

  const [showModal, setShowModal] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [candidateDeleted, setCandidateDeleted] = useState(false);

  const navigate = useNavigate();

  // effects
  const dummyCandidateData = [
    {
      req_id: "REQ-001",
      client_id: "CL-101",
      client_name: "ABC Technologies",
      candidate_id: "CAND-501",
      Candidate_first_name: "John",
      Candidate_last_name: "Doe",
      hm_approver: "Alice",
      buisness_ops: "Bob",
      generate_offer: true,
      status: "Pending",
    },
    {
      req_id: "REQ-002",
      client_id: "CL-102",
      client_name: "XYZ Corp",
      candidate_id: "CAND-502",
      Candidate_first_name: "Jane",
      Candidate_last_name: "Smith",
      hm_approver: "Carol",
      buisness_ops: "Dave",
      generate_offer: false,
      status: "Approved",
    },
    {
      req_id: "REQ-003",
      client_id: "CL-103",
      client_name: "Techwave Ltd",
      candidate_id: "CAND-503",
      Candidate_first_name: "Rahul",
      Candidate_last_name: "Verma",
      hm_approver: "Eve",
      buisness_ops: "Frank",
      generate_offer: true,
      status: "Generated",
    },
  ];

  useEffect(() => {
    setScreeningDetails(dummyCandidateData);
    // const fetchData = async () => {
    //   try {
    //     const response = await axiosInstance.get(
    //       "https://api.pixeladvant.com/candidates/screening/"
    //     );

    //     if (response?.data?.success) {
    //       setScreeningDetails(response?.data?.data);
    //     }
    //   } catch (err) {
    //     console.error("Error fetching recruiter table data", err);
    //   }
    // };

    // fetchData();
  }, []);

  //functions

  const handleEdit = (data) => {
    // setSelectedCandidate(data);
    // setShowModal(true);
    // setSelectedCandidate(candidate);
    // setShowModal(true);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setshowGenerateModal(true);
  };

  const handleDelete = async (candidate_id) => {
    console.log(",:adcassadkl");

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
                            <td>{data?.client_id}</td>
                            <td>{data?.client_name}</td>
                            <td>{data?.candidate_id}</td>
                            <td>{data?.Candidate_first_name}</td>
                            <td>{data?.Candidate_last_name}</td>

                            <td>{data?.hm_approver}</td>
                            <td>{data?.buisness_ops}</td>
                            <td>
                              {data?.generate_offer && (
                                <>
                                  <a href={""} onClick={handleGenerate}>
                                    Generate
                                  </a>
                                </>
                              )}
                              {/* {data?.Cover_Letter && (
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
                              )} */}
                            </td>
                            <td>{data?.status}</td>

                            <td>
                              <div className="d-flex gap-2">
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
                                  onClick={() =>
                                    handleDelete(data?.Candidate_Id)
                                  }
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={15}
                            className="text-center text-muted py-3"
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
                  defaultValue={selectedCandidate?.score || ""}
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
              //   handleSubmitModal(formData);
            }}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* Generate modal */}
      <Modal
        show={showgenerateModal}
        onHide={() => setshowGenerateModal(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Basic Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="candidateForm">
            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>First Name</label>
                <input
                  className="form-control"
                  placeholder="Enter First Name"
                  name="req_id"
                  defaultValue={selectedCandidate?.req_id || ""}
                />
              </div>
              <div className="col">
                <label>Last Name</label>
                <input
                  className="form-control"
                  name="req_id"
                  placeholder="Enter Last Name"
                  defaultValue={selectedCandidate?.candidate_id || ""}
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Candidate Email</label>
                <input
                  className="form-control"
                  placeholder="Enter candidate email"
                  name="Candidate_First_Name"
                  defaultValue={selectedCandidate?.client_name || ""}
                />
              </div>
              <div className="col">
                <label>Recruiter Email</label>
                <input
                  placeholder="Enter recruiter email"
                  className="form-control"
                  name="appliedPosition"
                  defaultValue={selectedCandidate?.applied_position || ""}
                />
              </div>
            </div>
            <hr />
            <Modal.Title>Job Information</Modal.Title>

            <div className="row mt-2 mb-2 d-flex gap-3">
              <div className="col">
                <label>Job Title</label>
                <input
                  placeholder="Enter Job Title"
                  className="form-control"
                  name="timeInStage"
                  defaultValue={selectedCandidate?.time_in_stage || ""}
                />
              </div>
              <div className="col">
                <label>Estimated Start Date</label>
                <input
                  className="form-control"
                  name="resumeScore"
                  type="date"
                  defaultValue={selectedCandidate?.score || ""}
                />
              </div>
            </div>
            <div className="row mt-2 mb-2 d-flex gap-3">
              <div className="col">
                <label>Job City</label>
                <select className="form-select">
                  <option>Select city</option>
                  <option>chennai</option>
                  <option>coimbatore</option>
                </select>
              </div>
              <div className="col">
                <label>Job Country</label>
                <select className="form-select">
                  <option>Select country</option>
                  <option>India</option>
                  <option>China</option>
                </select>
              </div>
            </div>
            <div className="col-6">
              <label>Currency</label>
              <select className="form-select">
                {" "}
                <option>select currency</option>
                <option>Indian currency</option>
              </select>
            </div>

            <hr />
            <Modal.Title>Salary</Modal.Title>
            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Name</label>
                <input
                  placeholder="salary"
                  className="form-control"
                  name="Candidate_First_Name"
                  defaultValue={selectedCandidate?.client_name || ""}
                />
              </div>
              <div className="col">
                <label>Value</label>
                <input
                  placeholder="0"
                  className="form-control"
                  name="appliedPosition"
                  defaultValue={selectedCandidate?.applied_position || ""}
                />
              </div>
            </div>

            <hr />
            <Modal.Title>Variable Pay</Modal.Title>

            {variablePays.map((pay, index) => (
              <div className="row mb-2 d-flex gap-3" key={index}>
                <div className="col">
                  <label>Name</label>
                  <input
                    className="form-control"
                    placeholder="variable"
                    name={`variablePayName_${index}`}
                    value={pay.name}
                    onChange={(e) => {
                      const updated = [...variablePays];
                      updated[index].name = e.target.value;
                      setVariablePays(updated);
                    }}
                  />
                </div>
                <div className="col">
                  <label>Value</label>
                  <input
                    className="form-control"
                    placeholder="0"
                    name={`variablePayValue_${index}`}
                    value={pay.value}
                    onChange={(e) => {
                      const updated = [...variablePays];
                      updated[index].value = e.target.value;
                      setVariablePays(updated);
                    }}
                  />
                </div>
              </div>
            ))}

            <div>
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={() =>
                  setVariablePays([...variablePays, { name: "", value: "" }])
                }
              >
                Add New Variable Pay
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setshowGenerateModal(false)}
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

export default OfferBGV;
