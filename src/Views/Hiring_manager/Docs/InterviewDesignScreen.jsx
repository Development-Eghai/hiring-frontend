import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Spinner, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import axiosInstance from "Services/axiosInstance";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const InterviewForm = () => {
  const [status, setStatus] = useState("");
  const [parameters, setParameters] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const interview_design_id = searchParams.get("edit_id");

  const [reqIdsList, setReqIdsList] = useState([]);
  const [reqId, setReqId] = useState();
  const [role, setRole] = useState("");
  const [techStacks, setTechStacks] = useState("");
  const [screeningType, setScreeningType] = useState("");
  const [noOfRounds, setNoOfRounds] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const [positionRoles, setPositionRoles] = useState([]);
  const [planIds, setPlanIds] = useState();
  const [planIdsList, setPlanIdsList] = useState([]);
  // const [screeningTypes, setScreeningTypes] = useState([]);
  const [scoreCards, setScoreCards] = useState([]);
  const [clientid, setClientId] = useState("");
  const [clientname, setClientName] = useState("");

  const navigate = useNavigate();

  const defaultParam = {
    score_card_name: "",
    options: "",
    guideline: "",
    min_questions: "",
    screen_type: "",
    duration: "",
    duration_metric: "", // Add duration_metric
    Weightage: "",
    feedback: "",
  };

  useEffect(() => {
    const fetchDesignById = async () => {
      if (!interview_design_id) return;

      try {
        const res = await axiosInstance.post(
          "https://api.pixeladvant.com/api/design/by-id/",
          {
            interview_design_id,
          }
        );

        if (res.data?.success && res.data?.data) {
          const data = res.data.data;
          setPlanIds(data.plan_id);
          setReqId(data.req_id);
          setRole(data.position_role);
          setTechStacks(data.tech_stacks);
          // setScreeningType(data.screening_type);
          setNoOfRounds(data.no_of_interview_round);
          setRating(data.final_rating || 0);
          setStatus(data.status || "");
          setFeedbackText(data.feedback || "");
          setParameters(
            (data.params || []).map((param) => ({
              ...param,
              weightage: param.Weightage || param.weightage || 0,
              Weightage: param.Weightage || param.weightage || 0,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch interview design by ID", error);
        toast.error("Failed to fetch design details.");
      }
    };

    fetchDesignById();
  }, [interview_design_id]);

  useEffect(() => {
    if (reqId) {
      const getClientdetails = async () => {
        const getclientdetails = await axios.post(
          "https://api.pixeladvant.com/api/client-lookup/",
          {
            plan_id: planIds || "",
            req_id: reqId,
          }
        );
        if (getclientdetails?.data?.success) {
          setClientId(getclientdetails?.data?.data?.client_id);
          setClientName(getclientdetails?.data?.data?.client_name);
        }
      };
      getClientdetails();
    }
  }, [reqId, planIds]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const designRes = await axios.get(
          "https://api.pixeladvant.com/design_screen_list_data/"
        );
        const scoreCardRes = await axios.get(
          "https://api.pixeladvant.com/admin_configuration/"
          // {
          //   score_card: true,
          // }
        );

        if (designRes.data?.success) {
          const { position_role, plan_id, requisition_id } =
            designRes.data.data;
          setPositionRoles(position_role || []);
          setPlanIdsList(plan_id || []);
          setReqIdsList(requisition_id || []);
          // setScreeningTypes(screening_type || []);
        }

        if (scoreCardRes.data?.success) {
          const rawCards = scoreCardRes.data.data?.["Score Card"] || [];
          const formattedScoreCards = rawCards.map((name, idx) => ({
            id: idx,
            score_card_name: name,
          }));
          setScoreCards(formattedScoreCards);
        }
      } catch (error) {
        console.error("Dropdown fetch error:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handlePlanIdChange = async (selectedId) => {
    setPlanIds(selectedId);

    setTechStacks("");

    if (!selectedId) return;

    try {
      const res = await axiosInstance.post(
        "https://api.pixeladvant.com/api/hiringplan/detail/",
        { Planning_id: selectedId }
      );

      if (res.data?.success) {
        const tech = res.data?.data?.tech_stacks || "";
        setTechStacks(tech);
      } else {
        toast.error("Tech stack fetch failed");
      }
    } catch (error) {
      console.error("Error fetching tech stacks:", error);
      toast.error("Error fetching tech stacks");
    }
  };

  const handleChangeNoOfRounds = (e) => {
    const value = parseInt(e.target.value);
    setNoOfRounds(e.target.value);
    if (!isNaN(value) && value > 0) {
      const repeatedParams = Array.from({ length: value }, () => ({
        ...defaultParam,
        weightage: "",
      }));
      setParameters(repeatedParams);
    } else {
      setParameters([]);
    }
  };

  const handleWeightChange = (index, value) => {
    const newWeight = value === "" ? "" : Number(value);

    // Calculate sum of other values (skip empty or current)
    const otherTotal = parameters.reduce(
      (sum, param, i) =>
        i !== index ? sum + (Number(param.weightage) || 0) : sum,
      0
    );

    const maxAllowed = 100 - otherTotal;

    if (newWeight !== "" && newWeight > maxAllowed) {
      toast.error(`Max allowed here is ${maxAllowed}%`);
      return;
    }

    const updatedParameters = [
      ...parameters.slice(0, index),
      { ...parameters[index], weightage: newWeight, Weightage: newWeight },
      ...parameters.slice(index + 1),
    ];

    setParameters(updatedParameters);
  };

  const handleChange = (index, key, value) => {
    const updated = [...parameters];
    if (!updated[index]) updated[index] = {};
    updated[index][key] = value;
    setParameters(updated);
  };

  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();
    toast.dismiss();

    if (!interview_design_id && !showConfirm) {
      setShowConfirm(true);
      return;
    }

    if (
      !reqId ||
      !techStacks ||
      parameters.length === 0 ||
      !parameters.every(
        (param) =>
          param.score_card_name &&
          param.options &&
          param.weightage &&
          param.guideline &&
          param.min_questions &&
          param.screen_type &&
          param.duration &&
          param.duration_metric 
      )
    ) {
      toast.error("Please fill in all required fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    const cleanedParameters = parameters.map((param) => ({
      ...param,
      mode: "", 
      feedback: param.feedback || "",
      duration_metric: param.duration_metric || "",
    }));

    const formData = {
      plan_id: planIds,
      req_id: reqId,
      tech_stacks: techStacks,
      // screening_type: screeningType,
      no_of_interview_round: parameters.length,
      final_rating: rating,
      status: status,
      feedback: feedbackText,
      params: cleanedParameters,
    };

    try {
      let res;
      if (interview_design_id) {
        res = await axiosInstance.put(
          "https://api.pixeladvant.com/interview_design_screen/",
          { ...formData, interview_design_id },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        res = await axiosInstance.post(
          "https://api.pixeladvant.com/interview_design_screen/",
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (res.status >= 200 && res.status < 300) {
        toast.dismiss();
        toast.success(
          interview_design_id
            ? "Interview Design updated successfully!"
            : "Form submitted successfully!"
        );
        setShowConfirm(false);

        setTimeout(() => {
          navigate("/hiring_manager/planning/interview_design_dashboard");
        }, 560);

        if (!interview_design_id) {
          setReqId("");
          setRole("");
          setTechStacks("");
          // setScreeningType("");
          setNoOfRounds("");
          setFeedbackText("");
          setParameters([]);
          setRating(0);
          setStatus("rejected");
        }
      } else {
        toast.dismiss();
        toast.error("Server responded with an error.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error submitting form:", error);
      toast.error(
        error?.response?.data?.detail ||
          "Something went wrong while submitting the form."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowConfirmation = (e) => {
    e.preventDefault();
    toast.dismiss();
    if (
      reqId &&
      techStacks &&
      noOfRounds &&
      parameters.length > 0 &&
      parameters.every(
        (param) =>
          param.score_card_name &&
          param.options &&
          param.weightage &&
          param.guideline &&
          param.min_questions &&
          param.screen_type &&
          param.duration
      )
    ) {
      setShowConfirm(true);
    } else {
      toast.error("Please fill in all required fields before submitting.");
    }
  };

  return (
    <div>
      <div className=" mb-2">
        <Link
          to="/hiring_manager/planning/interview_design_dashboard"
          className="text-decoration-none btn p-2 btn-light"
          type="button"
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 219.151 219.151"
            style={{ enableBackground: "new 0 0 219.151 219.151" }}
            xmlSpace="preserve"
            width="20"
            height="20"
            className="me-2"
          >
            <g>
              <path
                d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
        C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
        c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"
              />
              <path
                d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
        c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
        c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
        c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"
              />
            </g>
          </svg>
          Back to Interview Design dashboard
        </Link>
      </div>

      <div className="interview-container p-3 bg-light rounded">
        <ToastContainer position="top-right" />
        <Form onSubmit={handleFormSubmit} className="justify-content-center">
          <Row className="mb-4 d-flex gap-3">
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Planning Id</Form.Label>
                <Form.Select
                  value={planIds}
                  onChange={(e) => {
                    toast.dismiss(); 
                    handlePlanIdChange(e.target.value);
                  }}
                  disabled={!!interview_design_id}
                >
                  <option value="">Select Planning Id</option>
                  {planIdsList.map((id, idx) => (
                    <option key={idx} value={id}>
                      {id}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Requisition ID<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={reqId}
                  onChange={(e) => {
                    toast.dismiss(); 
                    setReqId(e.target.value);
                  }}
                  disabled={!!interview_design_id} 
                >
                  <option value="">Select Req ID</option>
                  {reqIdsList.map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4 d-flex gap-3">
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Client Id</Form.Label>
                <Form.Control type="text" value={clientid} disabled />
              </Form.Group>
            </Col>

            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Client Name</Form.Label>
                <Form.Control type="text" value={clientname} disabled />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4 d-flex gap-3">
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Tech Stacks</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tech stacks"
                  value={techStacks}
                  onChange={(e) => {
                    toast.dismiss(); 
                    setTechStacks(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            {/* <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Screening Type</Form.Label>
                <Form.Select
                  value={screeningType}
                  onChange={(e) => setScreeningType(e.target.value)}
                >
                  <option value="">Select Screening Type</option>
                  {screeningTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col> */}
          </Row>

          {/* <Row className="mb-4">
            <Col md={4} className="mb-3 d-flex gap-3">
              <Form.Group>
                <Form.Label>No of Interview Rounds</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number of rounds"
                  value={noOfRounds}
                  onChange={handleChangeNoOfRounds}
                />
              </Form.Group>
            </Col>
          </Row> */}
          <div>
            <Row className="">
              <Col className="d-flex justify-content-start">
                <h5 className=" fw-bold px-2">Interview Parameters</h5>
              </Col>
              <Col className="d-flex justify-content-end gap-3">
                <Button
                  variant="primary"
                  onClick={() =>
                    setParameters([
                      ...parameters,
                      { ...defaultParam, weightage: "" },
                    ])
                  }
                >
                  Add Interview Parameter
                </Button>
              </Col>
              
            </Row>
          </div>

          <div className="interview-parameters">
            <div className="parameter-scroll-wrapper px-2">
              <div className="parameter-header fw-bold bg-secondary text-white p-2 rounded d-flex justify-content-between">
                <span style={{ minWidth: 150 }}>Score Card</span>
                <span>Options</span>
                <span>Guideline</span>
                <span>Min Qs</span>
                <span>Mode of Interview</span>
                <span>Duration</span>
                <span>Duration Metric</span> 
                <span>Weightage</span>
                <span>Feedback</span>
                <span>Action</span>
              </div>

              {parameters.length > 0 ? (
                parameters.map((param, index) => {
                  // Calculate max allowed for this parameter
                  const otherTotal = parameters.reduce(
                    (sum, p, i) => (i !== index ? sum + (Number(p.weightage) || 0) : sum),
                    0
                  );
                  const maxAllowed = 100 - otherTotal;

                  return (
                    <div className="parameter-body d-flex gap-2 mt-2" key={index}>
                     
                      <CreatableSelect
                        isClearable
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        options={scoreCards.map(card => ({
                          label: card.score_card_name,
                          value: card.score_card_name,
                        }))}
                        value={
                          param.score_card_name
                            ? { label: param.score_card_name, value: param.score_card_name }
                            : null
                        }
                        onChange={option =>
                          handleChange(index, "score_card_name", option ? option.value : "")
                        }
                        placeholder="Select or enter"
                        className="flex-grow-1"
                        styles={{
                          container: base => ({ ...base, minWidth: 200 }),
                          menuPortal: base => ({ ...base, zIndex: 99999 }),
                          menu: base => ({ ...base, zIndex: 99999 }),
                        }}
                      />
                      <Form.Control
                        type="text"
                        value={param.options || ""}
                        onChange={(e) =>
                          handleChange(index, "options", e.target.value)
                        }
                        placeholder="Option"
                      />
                      <Form.Control
                        type="text"
                        value={param.guideline || ""}
                        onChange={(e) =>
                          handleChange(index, "guideline", e.target.value)
                        }
                        placeholder="Guideline"
                      />
                      <Form.Control
                        type="number"
                        value={param.min_questions || ""}
                        onChange={(e) =>
                          handleChange(index, "min_questions", e.target.value)
                        }
                        placeholder="Min Qs"
                      />
                      <Form.Control
                        type="text"
                        value={param.screen_type || ""}
                        onChange={(e) =>
                          handleChange(index, "screen_type", e.target.value)
                        }
                        placeholder="Screen Type"
                      />
                      <Form.Control
                        type="number"
                        value={param.duration || ""}
                        onChange={(e) =>
                          handleChange(index, "duration", e.target.value)
                        }
                        placeholder="Duration"
                      />
                      <Form.Select
                        value={param.duration_metric || ""}
                        onChange={e => handleChange(index, "duration_metric", e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="days">Days</option>
                        <option value="hours">Hours</option>
                        <option value="mins">Mins</option>
                      </Form.Select>
                      <Form.Control
                        type="number"
                        value={param.weightage || ""}
                        onChange={(e) => {
                          toast.dismiss();
                          let value = Number(e.target.value);
                          if (value > maxAllowed) value = maxAllowed;
                          if (value < 0) value = 0;
                          const updatedParameters = [...parameters];
                          updatedParameters[index].weightage = value;
                          updatedParameters[index].Weightage = value;
                          setParameters(updatedParameters);
                        }}
                        placeholder="weightage"
                        min={0}
                        max={maxAllowed}
                      />
                      <Form.Control
                        type="text"
                        value={param.feedback || ""}
                        onChange={(e) => {
                          toast.dismiss();
                          handleChange(index, "feedback", e.target.value);
                        }}
                        placeholder="Feedback"
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          toast.dismiss();
                          const updated = [...parameters];
                          updated.splice(index, 1);
                          setParameters(updated);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted text-center">
                  Please enter the number of interview rounds.
                </p>
              )}
            </div>
          </div>

          <div className="text-end mt-4">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner animation="border" size="sm" />
              ) : interview_design_id ? (
                "Update"
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Form>

        {/* Confirmation Modal */}
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to submit the interview form?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowConfirm(false);
                setTimeout(() => handleFormSubmit(), 0);
              }}
            >
              Yes, Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default InterviewForm;
