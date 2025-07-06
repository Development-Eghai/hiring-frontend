import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Spinner, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import axiosInstance from "Services/axiosInstance";

const InterviewForm = () => {
  const [status, setStatus] = useState("rejected");
  const [parameters, setParameters] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const [reqId, setReqId] = useState("");
  const [role, setRole] = useState("");
  const [techStacks, setTechStacks] = useState("");
  const [screeningType, setScreeningType] = useState("");
  const [noOfRounds, setNoOfRounds] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const [positionRoles, setPositionRoles] = useState([]);
  const [planIds, setPlanIds] = useState([]);
  const [screeningTypes, setScreeningTypes] = useState([]);
  const [scoreCards, setScoreCards] = useState([]);

  const defaultParam = {
    score_card_name: "",
    options: "",
    guideline: "",
    min_questions: "",
    screen_type: "",
    duration: "",
    mode: "",
    feedback: "",
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const designRes = await axios.get("https://api.pixeladvant.com/design_screen_list_data/");
        const scoreCardRes = await axios.get("https://api.pixeladvant.com/config_score_card/");

        if (designRes.data?.success) {
          const { position_role, plan_id, screening_type } = designRes.data.data;
          setPositionRoles(position_role || []);
          setPlanIds(plan_id || []);
          setScreeningTypes(screening_type || []);
        }

        if (scoreCardRes.data?.success) {
          setScoreCards(scoreCardRes.data.data || []);
        }
      } catch (error) {
        toast.error("Failed to fetch dropdown data.");
        console.error("Dropdown fetch error:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChangeNoOfRounds = (e) => {
    const value = parseInt(e.target.value);
    setNoOfRounds(e.target.value);
    if (!isNaN(value) && value > 0) {
      const repeatedParams = Array.from({ length: value }, () => ({ ...defaultParam }));
      setParameters(repeatedParams);
    } else {
      setParameters([]);
    }
  };

  const handleChange = (index, key, value) => {
    const updated = [...parameters];
    if (!updated[index]) updated[index] = {};
    updated[index][key] = value;
    setParameters(updated);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const cleanedParameters = parameters.map((param) => ({
      ...param,
      feedback: param.feedback || "",
    }));

    const formData = {
      req_id: reqId,
      position_role: role,
      tech_stacks: techStacks,
      screening_type: screeningType,
      no_of_interview_round: noOfRounds,
      final_rating: rating,
      status: status,
      feedback: feedbackText,
      params: cleanedParameters,
    };

    try {
      const res = await axiosInstance.post("interview_design_screen/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status >= 200 && res.status < 300) {
        toast.success("Form submitted successfully!");
        setShowConfirm(false);
        // Reset form
        setReqId("");
        setRole("");
        setTechStacks("");
        setScreeningType("");
        setNoOfRounds("");
        setFeedbackText("");
        setParameters([]);
        setRating(0);
        setStatus("rejected");
      } else {
        toast.error("Server responded with an error.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response?.data) {
        toast.error(error.response.data.detail || "Submission failed. Please try again.");
      } else {
        toast.error("Something went wrong while submitting the form.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowConfirmation = (e) => {
    e.preventDefault();

    if (
      reqId &&
      role &&
      techStacks &&
      screeningType &&
      noOfRounds &&
      parameters.length > 0 &&
      parameters.every(
        (param) =>
          param.score_card_name &&
          param.options &&
          param.guideline &&
          param.min_questions &&
          param.screen_type &&
          param.duration &&
          param.mode
      )
    ) {
      setShowConfirm(true);
    } else {
      toast.error("Please fill in all required fields before submitting.");
    }
  };

  return (
    <div className="interview-container p-3 bg-light rounded">
      <ToastContainer position="top-right" />
      <Form onSubmit={handleShowConfirmation}>
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Planning Id</Form.Label>
              <Form.Select value={reqId} onChange={(e) => setReqId(e.target.value)}>
                <option value="">Select Planning Id</option>
                {planIds.map((id, idx) => (
                  <option key={idx} value={id}>{id}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Position/Role</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                {positionRoles.map((r, idx) => (
                  <option key={idx} value={r}>{r}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Tech Stacks</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tech stacks"
                value={techStacks}
                onChange={(e) => setTechStacks(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Screening Type</Form.Label>
              <Form.Select value={screeningType} onChange={(e) => setScreeningType(e.target.value)}>
                <option value="">Select Screening Type</option>
                {screeningTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-3">
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
        </Row>

        <div className="interview-parameters">
          <h5 className="mb-3 px-2">Interview Parameters</h5>
          <div className="parameter-scroll-wrapper px-2">
            <div className="parameter-header fw-bold bg-secondary text-white p-2 rounded d-flex justify-content-between">
              <span>Score Card</span>
              <span>Options</span>
              <span>Guideline</span>
              <span>Min Qs</span>
              <span>Screening Type</span>
              <span>Duration</span>
              <span>Mode</span>
              <span>Feedback</span>
            </div>

            {parameters.length > 0 ? (
              parameters.map((param, index) => (
                <div className="parameter-body d-flex gap-2 mt-2" key={index}>
                  <Form.Select
                    value={param.score_card_name || ""}
                    onChange={(e) => handleChange(index, "score_card_name", e.target.value)}
                  >
                    <option value="">Select</option>
                    {scoreCards.map((card) => (
                      <option key={card.id} value={card.score_card_name}>
                        {card.score_card_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    type="text"
                    value={param.options || ""}
                    onChange={(e) => handleChange(index, "options", e.target.value)}
                    placeholder="Option"
                  />
                  <Form.Control
                    type="text"
                    value={param.guideline || ""}
                    onChange={(e) => handleChange(index, "guideline", e.target.value)}
                    placeholder="Guideline"
                  />
                  <Form.Control
                    type="number"
                    value={param.min_questions || ""}
                    onChange={(e) => handleChange(index, "min_questions", e.target.value)}
                    placeholder="Min Qs"
                  />
                  <Form.Control
                    type="text"
                    value={param.screen_type || ""}
                    onChange={(e) => handleChange(index, "screen_type", e.target.value)}
                    placeholder="Screen Type"
                  />
                  <Form.Control
                    type="text"
                    value={param.duration || ""}
                    onChange={(e) => handleChange(index, "duration", e.target.value)}
                    placeholder="Duration"
                  />
                  <Form.Control
                    type="text"
                    value={param.mode || ""}
                    onChange={(e) => handleChange(index, "mode", e.target.value)}
                    placeholder="Mode"
                  />
                  <Form.Control
                    type="text"
                    value={param.feedback || ""}
                    onChange={(e) => handleChange(index, "feedback", e.target.value)}
                    placeholder="Feedback"
                  />
                </div>
              ))
            ) : (
              <p className="text-muted text-center">Please enter the number of interview rounds.</p>
            )}
          </div>
        </div>

        <div className="text-end mt-4">
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner animation="border" size="sm" /> : "Submit"}
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
          <Button variant="primary" onClick={handleSubmit}>
            Yes, Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InterviewForm;
