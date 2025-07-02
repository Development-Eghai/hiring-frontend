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
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const [reqId, setReqId] = useState("");
  const [role, setRole] = useState("");
  const [techStacks, setTechStacks] = useState("");
  const [screeningType, setScreeningType] = useState("");
  const [noOfRounds, setNoOfRounds] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const params = {
    score_card: "",
    options: "",
    guideline: "",
    min_questions: "",
    screen_type: "",
    duration: "",
    mode: "",
    feedback: "",
  };

  const handleChangeNoOfRounds = (e) => {
    setNoOfRounds(e.target.value);
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      const repeatedparams = Array.from({ length: value }, () => ({
        ...params,
      }));
      setParameters(repeatedparams);
    } else {
      setParameters([]);
    }
  };

  // const handleSaveParameter = (index) => {
  //   const allFilled = Object.values(parameters[index]).every(
  //     (val) => val !== ""
  //   );
  //   if (!allFilled) {
  //     toast.warning("Please fill all fields in the parameter row.");
  //     return;
  //   }

  //   setLoadingIndex(index);
  //   setTimeout(() => {
  //     setLoadingIndex(null);
  //     setParameters((prev) => [
  //       ...prev,
  //       {
  //         score_card: "",
  //         options: "",
  //         guideline: "",
  //         min_questions: "",
  //         screen_type: "",
  //         duration: "",
  //         mode: "",
  //         feedback: "",
  //       },
  //     ]);
  //   }, 1000);
  // };

  // const handleRemoveParameter = (index) => {
  //   const updated = [...parameters];
  //   updated.splice(index, 1);
  //   setParameters(updated);
  // };

  const handleChange = (index, key, value) => {
    const updated = [...parameters];
    if (!updated[index]) updated[index] = {};
    updated[index][key] = value;
    setParameters(updated);
  };

  const validateForm = () => {
    if (
      !reqId ||
      !role ||
      !techStacks ||
      !screeningType ||
      !noOfRounds ||
      !feedbackText ||
      rating === 0
    ) {
      toast.error("Please fill all required fields.");
      return false;
    }

    const hasEmptyParam = parameters.some((param) =>
      Object.values(param).some((val) => val === "")
    );

    if (hasEmptyParam) {
      toast.error("Please complete all interview parameter fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData = {
      req_id: reqId,
      position_role: role,
      tech_stacks: techStacks,
      screening_type: screeningType,
      no_of_interview_round: noOfRounds,
      final_rating: rating,
      status: status,
      feedback: feedbackText,
      params: parameters,
    };

    try {
      const res = await axiosInstance.post(
        "interview_design_screen/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check for backend error even if request is "fulfilled"
      if (res.status >= 200 && res.status < 300) {
        toast.success("Form submitted successfully!");
        setShowConfirm(false);

        // OPTIONAL: Reset form after success
        setReqId("");
        setRole("");
        setTechStacks("");
        setScreeningType("");
        setNoOfRounds("");
        setFeedbackText("");
        setParameters([{}]);
        setRating(0);
        setStatus("rejected");
      } else {
        toast.error("Server responded with an error.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.detail || "Submission failed. Please try again."
        );
      } else {
        toast.error("Something went wrong while submitting the form.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowConfirmation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirm(true);
    }
  };

  return (
    <div className="interview-container">
      <ToastContainer position="top-right" />
      <Form onSubmit={handleShowConfirmation}>
        <Row className="mb-4">
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>Req Id</Form.Label>
              <Form.Select
                value={reqId}
                onChange={(e) => setReqId(e.target.value)}
              >
                <option>Select Req Id</option>
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>Position/Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Select Role</option>
                <option value={"Role_1"}>Role_1</option>
                <option value={"Role_2"}>Role_2</option>
                <option value={"Role_3"}>Role_3</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>Tech Stacks</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tech stacks"
                onChange={(e) => setTechStacks(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>Screening Type</Form.Label>
              <Form.Select
                value={screeningType}
                onChange={(e) => setScreeningType(e.target.value)}
              >
                <option value={""}>Select Screening Type</option>
                <option value={"type1"}>type1</option>
                <option value={"type2"}>type2</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>No of Interview Round</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of rounds"
                onChange={(e) => handleChangeNoOfRounds(e)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="interview-parameters ">
          <div>
            <div className="d-flex justify-content-between align-items-center px-2">
              <h5 className="mb-3">Interview Parameters</h5>
            </div>

            <div className="parameter-scroll-wrapper">
              <div className="parameter-header">
                <span>Score Card</span>
                <span>Options</span>
                <span>Guideline</span>
                <span>Min Questions</span>
                <span>Screening Type</span>
                <span>Duration</span>
                <span>Mode</span>
                <span>Feedback</span>
              </div>

              {parameters.length > 0 ? (
                parameters.map((param, index) => (
                  <div className="parameter-body" key={index}>
                    <Form.Select
                      value={param.score_card || ""}
                      onChange={(e) =>
                        handleChange(index, "score_card", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Coding written">Coding written</option>
                      <option value="Technical round">Technical round</option>
                    </Form.Select>
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
                      placeholder="Screening Type"
                    />
                    <Form.Control
                      type="text"
                      value={param.duration || ""}
                      onChange={(e) =>
                        handleChange(index, "duration", e.target.value)
                      }
                      placeholder="Duration"
                    />
                    <Form.Control
                      type="text"
                      value={param.mode || ""}
                      onChange={(e) =>
                        handleChange(index, "mode", e.target.value)
                      }
                      placeholder="Mode"
                    />
                    <Form.Control
                      type="text"
                      value={param.feedback || ""}
                      onChange={(e) =>
                        handleChange(index, "feedback", e.target.value)
                      }
                      placeholder="Feedback"
                    />
                    {/* <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      disabled={loadingIndex === index}
                      onClick={() => handleSaveParameter(index)}
                    >
                      {loadingIndex === index ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "✔"
                      )}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveParameter(index)}
                    >
                      🗑
                    </Button>
                  </div> */}
                  </div>
                ))
              ) : (
                <center>
                  <div>Select No of Interview Rounds</div>
                </center>
              )}
            </div>
          </div>
        </div>

        <div className="feedback-section">
          <Row className="mt-5">
            <Col md={3} className="mb-3">
              <a href="#" className="feedback-guidelines">
                Feedback sharing guidelines for interviewer
              </a>
            </Col>
            <Col md={2} className="mb-3">
              <Form.Label>Final Rating</Form.Label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      cursor: "pointer",
                      color: rating >= star ? "#ffc107" : "#ccc",
                      fontSize: "1.5rem",
                    }}
                  >
                    ★
                  </span>
                ))}
                <span className="ms-2">{rating}.0</span>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </Form.Select>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter feedback"
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </Col>
          </Row>
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
