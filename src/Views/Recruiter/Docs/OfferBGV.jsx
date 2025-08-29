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
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const OfferBGV = () => {
  //  states

  const CandidateTableHeading = [
    "Req ID",
    "Client Id",
    "Client Name",
    "Candidate Id",
    "Candidate First Name",
    "Candidate Second Name",
    "Applied Position",
    "HM Approver",
    "Generate Offer",
    "Status",
    "action",
  ];
  const [viewApproversData, setViewApproversData] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);

  const [Screeningdetails, setScreeningDetails] = useState([]);
  const [showgenerateModal, setshowGenerateModal] = useState(false);
  const [variablePays, setVariablePays] = useState([{ name: "", value: "" }]);
  const [selectedGenerateRow, setselectedGenerateRow] = useState([]);
  const [generateValue, setGenerateValue] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRadioRow, setSelectedRadioRow] = useState(null);
  console.log(selectedRadioRow, "czcweE");
  const [selectedRow, setSelectedRow] = useState({});
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

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "https://api.pixeladvant.com/api/offer-details/"
      );

      if (response?.data?.success) {
        setScreeningDetails(response?.data?.data);
      }
    } catch (err) {
      console.error("Error fetching recruiter table data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showgenerateModal]);

  //functions

  const handleEdit = (data) => {
    // setSelectedCandidate(data);
    // setShowModal(true);
    // setSelectedCandidate(candidate);
    // setShowModal(true);
  };

  const handleGenerate = async (e, data) => {
    e.preventDefault();
    setselectedGenerateRow(data);
    const requisition_id = data?.Req_ID;
    const candidate_id = data?.Candidate_Id;

    if (
      Array.isArray(data?.Generate_Offer) &&
      data?.Generate_Offer.length === 0
    ) {
      try {
        const response = await axios.post(
          "https://api.pixeladvant.com/offer-details/prefill-generate-offer/",
          {
            requisition_id,
            candidate_id,
          }
        );
        if (response?.data?.success) {
          const { data } = response?.data;
          setGenerateValue(data);
          if (Array.isArray(data?.variable_pay)) {
            setVariablePays(data?.variable_pay);
          } else {
            setVariablePays([{ name: "", value: "" }]);
          }
        }
      } catch (error) {
        console.log("error from get prefilled value");
      }
    } else {
      {
        const { Generate_Offer } = data;
        setGenerateValue(...Generate_Offer);
      }
    }
    setshowGenerateModal(true);
  };

  const handleDelete = async (candidate_id) => {
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

  const handleSubmitModal = async (formData) => {
    const { name, value, ...filteredData } = Object.fromEntries(
      formData.entries()
    );
    const salary = [{ name: name, value: value }];
    const req_id = selectedGenerateRow?.Req_ID;
    const candidate_id = selectedGenerateRow?.Candidate_Id;
    const data = {
      ...filteredData,
      req_id,
      candidate_id,
      variablePays,
      salary,
    };

    try {
      const response = await axios.post(
        "https://api.pixeladvant.com/offer/generate/",
        data
      );

      if (response?.data?.success) {
        fetchData();
        setshowGenerateModal(false);
      }
    } catch (error) {
      console.log("error from post generate modal in offerbvg", error);
    }
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
                <div className="col-4">
                              <h5 className="fw-bold mb-0 p-3">Offer & BGV</h5>

                </div>
                <div className="col-md-7 d-flex align-items-center justify-content-end gap-3 flex-wrap">
                  {/* Search Bar */}
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (selectedRadioRow) {
                        navigate("/recruiter/initiate_bg", {
                          state: {
                            req_id: selectedRadioRow["Req ID"],
                            candidate_id: selectedRadioRow["Candidate ID"],
                            showInitiateModal: true,
                            comesFrom: "/recruiter/offer&bgv",
                          },
                        });
                      } else {
                        toast.warning("Please select a row to initiate BGV");
                      }
                    }}
                  >
                    Initiate BGV
                  </Button>
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
                            <td>
                              {
                                <input
                                  type="radio"
                                  onChange={() => setSelectedRadioRow(data)}
                                />
                              }
                            </td>
                            <th>{data?.Req_ID}</th>
                            <td>{data?.Client_Name}</td>
                            <td>{data?.Candidate_Id}</td>
                            <td>{data?.Candidate_First_Name}</td>
                            <td>{data?.Candidate_Last_Name}</td>

                            <td>{data?.Applied_Position}</td>
                            <td>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => {
                                  setViewApproversData(data.Approvers || []);
                                  setShowViewModal(true);
                                }}
                              >
                                View
                              </Button>
                            </td>
                            <td>
                              {data?.Generate_Offer && (
                                <>
                                  <a
                                    href={""}
                                    onClick={(e) => handleGenerate(e, data)}
                                  >
                                    Generate
                                  </a>
                                </>
                              )}
                            </td>
                            <td>{data?.Status}</td>

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
      {/* <Modal
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
      </Modal> */}

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
          <form id="genrateForm">
            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>First Name</label>
                <input
                  className="form-control"
                  placeholder="Enter First Name"
                  name="first_name"
                  defaultValue={generateValue?.first_name || ""}
                />
              </div>
              <div className="col">
                <label>Last Name</label>
                <input
                  className="form-control"
                  name="last_name"
                  placeholder="Enter Last Name"
                  defaultValue={generateValue?.last_name || ""}
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Candidate Email</label>
                <input
                  className="form-control"
                  placeholder="Enter candidate email"
                  name="candidate_email"
                  defaultValue={generateValue?.candidate_email || ""}
                />
              </div>
              <div className="col">
                <label>Recruiter Email</label>
                <input
                  placeholder="Enter recruiter email"
                  className="form-control"
                  name="recruiter_email"
                  defaultValue={generateValue?.recruiter_email || ""}
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
                  name="job_title"
                  defaultValue={generateValue?.job_title || ""}
                />
              </div>
              <div className="col">
                <label>Estimated Start Date</label>
                <input
                  className="form-control"
                  name="estimated_start_date"
                  type="date"
                  defaultValue={generateValue?.estimated_start_date || ""}
                />
              </div>
            </div>
            <div className="row mt-2 mb-2 d-flex gap-3">
              <div className="col">
                <label>Job City</label>
                <select
                  className="form-select"
                  name="job_city"
                  defaultValue={
                    (generateValue?.job_city?.value &&
                      generateValue?.job_city?.value) ||
                    ""
                  }
                >
                  <option>Select city</option>
                  <option>chennai</option>
                  <option>coimbatore</option>
                </select>
              </div>
              <div className="col">
                <label>Job Country</label>
                <select
                  className="form-select"
                  name="job_country"
                  defaultValue={
                    (generateValue?.job_country?.value &&
                      generateValue?.job_country?.value) ||
                    ""
                  }
                >
                  <option>Select country</option>
                  <option>India</option>
                  <option>China</option>
                </select>
              </div>
            </div>
            <div className="col-6">
              <label>Currency</label>
              <select
                className="form-select"
                name="currency"
                defaultValue={
                  (generateValue?.currency?.value &&
                    generateValue?.currency?.value) ||
                  ""
                }
              >
                {" "}
                <option>select currency</option>
                <option>INR</option>
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
                  name="name"
                  defaultValue={
                    Array.isArray(generateValue?.salary) &&
                    generateValue.salary.length > 0
                      ? generateValue.salary[0]?.name || ""
                      : ""
                  }
                />
              </div>
              <div className="col">
                <label>Value</label>
                <input
                  placeholder="0"
                  className="form-control"
                  name="value"
                  defaultValue={
                    Array.isArray(generateValue?.salary) &&
                    generateValue.salary.length > 0
                      ? generateValue.salary[0]?.value || ""
                      : ""
                  }
                />
              </div>
            </div>

            <hr />
            <Modal.Title>Variable Pay</Modal.Title>

            {Array.isArray(variablePays) &&
              variablePays.map((pay, index) => (
                <div className="row mb-2 d-flex gap-3" key={index}>
                  <div className="col">
                    <label>Name</label>
                    <input
                      className="form-control"
                      placeholder="variable"
                      value={pay.name || ""}
                      onChange={(e) => {
                        const updated = [...variablePays];
                        updated[index] = {
                          ...updated[index],
                          name: e.target.value,
                        };
                        setVariablePays(updated);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label>Value</label>
                    <input
                      className="form-control"
                      placeholder="0"
                      value={pay.value || ""}
                      onChange={(e) => {
                        const updated = [...variablePays];
                        updated[index] = {
                          ...updated[index],
                          value: e.target.value,
                        };
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
              const form = document.getElementById("genrateForm");
              const formData = new FormData(form);
              handleSubmitModal(formData);
            }}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* view approver */}

      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Approver Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable
            columns={[
              { name: "Role", selector: (row) => row.role, sortable: true },
              { name: "Job Title", selector: (row) => row.job_title },
              { name: "First Name", selector: (row) => row.first_name },
              { name: "Last Name", selector: (row) => row.last_name },
              { name: "Email", selector: (row) => row.email },
              { name: "Contact", selector: (row) => row.contact_number },
              { name: "Approver", selector: (row) => row.set_as_approver },
              //             {
              //   name: "Action",
              //   cell: (row) => (
              //                   <Button
              //                     variant="outline-danger"
              //                     size="sm"
              //                     onClick={() => handleDelete(row)}
              //                   >
              //                     <BsTrash className="me-1" />
              //                   </Button>
              //   ),
              //   ignoreRowClick: true,
              //   allowOverflow: true,
              //   button: true,
              // },
            ]}
            data={viewApproversData}
            // pagination
            // highlightOnHover
            // striped
            responsive
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OfferBGV;
