import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";
import RecruiterHeader from "../Recruiter_utils/Navbar";
// import "react-toastify/dist/ReactToastify.css";

const RecruiterScreening = () => {
  const [candidateData, setCandidateDetails] = useState({
    req_id: "",
    candidate_name: "",
    candidate_id: "",
    hiring_manager: "",
    posistion_applied: "",
    date_of_screening: "",
  });

  const [ratings, setRatings] = useState([0, 0, 0]);
  const [feedbacks, setFeedbacks] = useState(["", "", ""]);
  const [finalRating, setFinalRating] = useState(0);
  const [result, setResult] = useState("");
  const [finalFeedback, setFinalFeedback] = useState("");
  const [reqId, setReqId] = useState("");
  const [candidate, setCandidate] = useState("");

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const [rows, setRows] = useState([]);

  function fetchCandidateData() {
    let pay_load = { candidate_id: 1 };
    axios
      .post("https://api.pixeladvant.com/candidates/detail/", pay_load)
      .then((response) => {
        const obj_candidate = response.data.data;
        console.log(obj_candidate);
        let response_data = {
          req_id: obj_candidate.Req_id_fk,
          candidate_name: obj_candidate.candidate_first_name,
          candidate_id: obj_candidate.CandidateID,
          hiring_manager: obj_candidate.hr_name,
          posistion_applied: obj_candidate.position_title,
          date_of_screening: formattedDate,
        };

        setCandidateDetails(response_data);
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }

  useEffect(() => {
    fetchCandidateData();
    interviewDesignScreenParams();
  }, []);

  function interviewDesignScreenParams() {
    let params = { hiring_plan_id: "PL0001" };
    axios
      .get("http://localhost:8000/interview_design_screen/", { params })
      .then((response) => {
        console.log(response.data.data);
        setRows(response.data.data);
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }

  const handleRatingChange = (rowIndex, newRating) => {
    const updated = [...ratings];
    updated[rowIndex] = newRating;
    setRatings(updated);
  };

  const handleFeedbackChange = (rowIndex, value) => {
    const updated = [...feedbacks];
    updated[rowIndex] = value;
    setFeedbacks(updated);
  };

  const handleSubmit = async () => {
    const payload = {
      reqId: candidateData.req_id,
      candidate_id: candidateData.candidate_id,
      screeningDate: candidateData.date_of_screening,
      final_rating: finalRating,
      result: result,
      final_feedback: finalFeedback,
      reviews: rows.map((row, index) => ({
        sno: index + 1,
        parameterDefined: row.score_card,
        Guidelines: row.guideline,
        MinimumQuestions: row.min_questions,
        weightage: row.weightage,
        ActualRating: ratings[index],
        Feedback: feedbacks[index],
      })),
    };

    console.log(payload);
    axios
      .post("https://api.pixeladvant.com/candidates/screening/", payload)
      .then((response) => {
        console.log("Response from API:", response.data);
        if (response.data.success) {
          alert("Submission successful!");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error while submitting:", error);
        alert("Submission failed!");
      });
  };

  const space = "\u2003\u2003";

  return (
    <div>
      <RecruiterHeader />

      <div className="p-4 bg-white mt-2 rounded">
        <Row
          className="small text-muted text-nowrap border-bottom py-2"
          style={{ fontSize: "0.9rem" }}
        >
          <Col className="border-end">
            <strong>Req ID:</strong>
            <strong> {candidateData.req_id}</strong> {space}
          </Col>
          <Col className="border-end">
            <strong>Candidate Name:</strong> {candidateData.candidate_name}
            {space}
          </Col>
          <Col className="border-end">
            <strong>Candidate ID:</strong> {candidateData.candidate_id}
          </Col>
        </Row>
        <Row
          className="small text-muted text-nowrap border-bottom py-2"
          style={{ fontSize: "0.9rem" }}
        >
          <Col className="border-end">
            <strong>Hiring Manager:</strong> {candidateData.hiring_manager}
            {space}
          </Col>
          <Col className="border-end">
            <strong>Position Applied:</strong> {candidateData.posistion_applied}
            {space}
          </Col>
          <Col>
            <strong>Date of Screening:</strong>{" "}
            {candidateData.date_of_screening}
          </Col>
        </Row>

        {/* Rating Table */}
        <Table hover className="mt-4">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>S.No</th>
              <th style={{ width: "15%" }}>Parameter Defined</th>
              <th style={{ width: "15%" }}>Guideline</th>
              <th style={{ width: "15%" }}>Minimum Questions</th>
              <th style={{ width: "10%" }}>Weightage</th>
              <th style={{ width: "20%" }}>Actual Rating</th>
              <th style={{ width: "20%" }}>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.score_card}</td>
                <td>{row.guideline}</td>
                <td>{row.min_questions}</td>
                <td>{row.weightage}</td>
                <td>
                  <div
                    className="form-control d-flex align-items-center"
                    style={{ height: "38px" }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRatingChange(index, star)}
                        style={{
                          cursor: "pointer",
                          color: ratings[index] >= star ? "#ffc107" : "#ccc",
                          fontSize: "1.2rem",
                          marginRight: "4px",
                        }}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ms-2">{ratings[index]}.0</span>
                  </div>
                </td>
                <td>
                  <Form.Control type="text" placeholder="Feedback" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Final Rating + Result */}
        <Row className="mb-4">
          <Col md={6}></Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Final Rating</Form.Label>
              <div
                className="form-control d-flex align-items-center"
                style={{ height: "38px" }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setFinalRating(star)}
                    style={{
                      cursor: "pointer",
                      color: finalRating >= star ? "#ffc107" : "#ccc",
                      fontSize: "1.2rem",
                      marginRight: "4px",
                    }}
                  >
                    ★
                  </span>
                ))}
                <span className="ms-2">{finalRating}.0</span>
              </div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Result/Recommendations</Form.Label>
              <Form.Select>
                <option>Select option</option>
                <option>Recommended</option>
                <option>Not Recommended</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Final Feedback */}
        <Row className="mb-4">
          <Col md={6}></Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                type="text"
                placeholder="Final feedback"
                onChange={(e) => setFinalFeedback(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button variant="primary" onClick={handleSubmit}>
              Update
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RecruiterScreening;
