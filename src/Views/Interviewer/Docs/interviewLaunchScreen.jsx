import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const LaunchInterview = () => {
  const [interviewDetails, setInterviewDetails] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [finalRating, setFinalRating] = useState(0);
  const [result, setResult] = useState("");
  const [finalFeedback, setFinalFeedback] = useState("");
  const [rows, setRows] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  

  
  const [newRow, setNewRow] = useState({
    score_card: "",
    guideline: "",
    min_questions: "",
    weightage: "",
    feedback: "",
    rating: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location?.state;
  const candidate_id1 = routeState?.[0]?.candidate_id;
  const normalizedState = Array.isArray(routeState) ? routeState : [routeState];


  useEffect(() => {
    setInterviewDetails(routeState);
  }, [routeState]);

  const handleRatingChange = (rowIndex, newRating) => {
    const updated = [...ratings];
    updated[rowIndex] = newRating;
    setRatings(updated);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if ((name === "min_questions" || name === "weightage") && value < 1) return;

    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewRatingChange = (rating) => {
    setNewRow((prev) => ({ ...prev, rating }));
  };

  const handleAddNewRow = () => {
    if (
      !newRow.score_card ||
      !newRow.guideline ||
      !newRow.min_questions ||
      !newRow.weightage
    ) {
      alert("Fill all required fields");
      return;
    }
    setRows((prev) => [...prev, newRow]);
    setRatings((prev) => [...prev, newRow.rating]);
    setFeedbacks((prev) => [...prev, newRow.feedback]);
    setNewRow({
      score_card: "",
      guideline: "",
      min_questions: "",
      weightage: "",
      feedback: "",
      rating: 0,
    });
    setIsAdding(false);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    const updatedRatings = [...ratings];
    const updatedFeedbacks = [...feedbacks];
    updatedRows.splice(index, 1);
    updatedRatings.splice(index, 1);
    updatedFeedbacks.splice(index, 1);
    setRows(updatedRows);
    setRatings(updatedRatings);
    setFeedbacks(updatedFeedbacks);
  };

  const handleSubmit = async () => {
    const payload = {
      reqId: interviewDetails[0]?.req_id,
      schedule_id: interviewDetails[0]?.schedule_id,
      candidate_id: interviewDetails[0]?.candidate_id,
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
    console.log(payload, "Payload to submit");

    //

    try {
      const response = await axios.put(
        "https://api.pixeladvant.com/api/interview/review/",
        payload
      );
      console.log(response, "dasd");
      if (response?.data?.success) {
        navigate("/interviewer/dashboard");
      }
    } catch (error) {
      console.log(error, "error from post review");
    }
  };



  const fetchCandidateData = async (candidate_id) => {
  if (!candidate_id) return;

  try {
    const response = await axios.post(
      "https://api.pixeladvant.com/get-reviews-by-candidate/",
      { candidate_id }
    );

    const { candidate_summary, reviews } = response?.data?.data || {};

    // Defensive fallback
    const rowsData = Array.isArray(reviews) ? reviews : [];

    setRows(rowsData);
    // setFinalRating(candidate_summary?.final_rating || 0);
    // setFinalFeedback(candidate_summary?.final_feedback || "");
    // setResult(candidate_summary?.result || "");

    // Ratings and feedbacks for each row
    setRatings(rowsData.map((row) => row.actual_rating || 0));
    setFeedbacks(rowsData.map((row) => row.feedback || ""));
  } catch (error) {
    console.error("Error fetching candidate data:", error);
  }
};


useEffect(() => {
  const normalized = Array.isArray(routeState) ? routeState : [routeState];
  if (normalized[0]?.candidate_id) {
    setInterviewDetails(normalized);
    fetchCandidateData(normalized[0]?.candidate_id);
  }
}, [routeState]);


const {
  req_id,
  candidate_first_name,
  candidate_last_name,
  candidate_id,
  job_title,
  interviewer_stage,
  interview_date,
} = interviewDetails[0] || {};



  return (
  <div className="p-4 bg-white mt-2 rounded">
    <Row className="small text-muted border-bottom py-2" style={{ fontSize: "0.9rem" }}>
      <Col className="border-end"><strong>Req ID:</strong> {req_id}</Col>
      <Col className="border-end"><strong>Candidate Name:</strong> {candidate_first_name} {candidate_last_name}</Col>
      <Col><strong>Candidate ID:</strong> {candidate_id}</Col>
    </Row>

    <Row className="small text-muted border-bottom py-2" style={{ fontSize: "0.9rem" }}>
      <Col className="border-end"><strong>Job Title:</strong> {job_title}</Col>
      <Col className="border-end"><strong>Interviewer Stage:</strong> {interviewer_stage}</Col>
      <Col><strong>Interview Date:</strong> {interview_date}</Col>
    </Row>

    <Table hover className="mt-4">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Score Card</th>
          <th>Guideline</th>
          <th>Skills</th>
          <th>Weightage</th>
          <th>Actual Rating</th>
          <th>Feedback</th>
          <th>
            {!isAdding && (
              <Button size="sm" onClick={() => setIsAdding(true)}>
                Add Skill
              </Button>
            )}
          </th>
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
    <td><span>{ratings[index]}.0</span></td>
    <td>{feedbacks[index]}</td>
    <td>
      <Button size="sm" variant="danger" onClick={() => handleRemoveRow(index)}>
        Remove
      </Button>
    </td>
  </tr>
))}



        {isAdding && (
          <tr>
            <td>{rows.length + 1}</td>
            <td>
              <Form.Control
                name="score_card"
                value={newRow.score_card}
                onChange={handleInputChange}
                placeholder="Skill"
              />
            </td>
            <td>
              <Form.Control
                name="guideline"
                value={newRow.guideline}
                onChange={handleInputChange}
                placeholder="Guideline"
              />
            </td>
            <td>
              <Form.Control
                type="text"
                name="min_questions"
                min="1"
                value={newRow.min_questions}
                onChange={handleInputChange}
                placeholder="Skills"
              />
            </td>
            <td>
              <Form.Control
                type="number"
                name="weightage"
                min="1"
                value={newRow.weightage}
                onChange={handleInputChange}
                placeholder="Weightage"
              />
            </td>
            <td>
              <div className="form-control d-flex align-items-center" style={{ height: "38px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleNewRatingChange(star)}
                    style={{
                      cursor: "pointer",
                      color: newRow.rating >= star ? "#ffc107" : "#ccc",
                      fontSize: "1.2rem",
                      marginRight: "4px",
                    }}
                  >
                    ★
                  </span>
                ))}
                <span className="ms-2">{newRow.rating}.0</span>
              </div>
            </td>
            <td>
              <Form.Control
                name="feedback"
                value={newRow.feedback}
                onChange={handleInputChange}
                placeholder="Feedback"
              />
            </td>
            <td>
              <div className="d-flex gap-2">
                <Button size="sm" variant="success" onClick={handleAddNewRow}>
                  Save
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </Table>


      <Row className="justify-content-center mb-4">
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
            <Form.Label>Result</Form.Label>
            <Form.Select
              value={result}
              onChange={(e) => setResult(e.target.value)}
            >
              <option value="">Select option</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Final Feedback</Form.Label>
            <Form.Control
              type="text"
              placeholder="Final feedback"
              value={finalFeedback}
              onChange={(e) => setFinalFeedback(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Col md={12} className="text-center d-block">
        <Button variant="primary" className="mt-4" onClick={handleSubmit}>
          Submit
        </Button>
      </Col>
    </div>
  );
};

export default LaunchInterview;
