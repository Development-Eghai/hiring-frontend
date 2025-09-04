import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";
import RecruiterHeader from "../Recruiter_utils/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const RecruiterScreening = () => {
  const [candidateData, setCandidateDetails] = useState({
    req_id: "",
    candidate_name: "",
    candidate_id: "",
    hiring_manager: "",
    posistion_applied: "",
    date_of_screening: "",
  });

  const [newRow, setNewRow] = useState({
    score_card: "",
    guideline: "",
    skills: "",
    weightage: "",
    feedback: "",
    rating: 0,
  });

  const [rows, setRows] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [finalRating, setFinalRating] = useState(0);
  const [result, setResult] = useState("");
  const [finalFeedback, setFinalFeedback] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});


  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location?.state;

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // ⭐ Handle row input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "weightage" && value < 1) return;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  // ⭐ Handle rating change per row
  const handleRatingChange = (rowIndex, newRating) => {
    const updated = [...ratings];
    updated[rowIndex] = newRating;
    setRatings(updated);
  };

  // ⭐ Handle feedback change per row
  const handleFeedbackChange = (rowIndex, value) => {
    const updated = [...feedbacks];
    updated[rowIndex] = value;
    setFeedbacks(updated);
  };

  // ⭐ Add new row
  const handleAddNewRow = () => {
    if (!newRow.score_card || !newRow.guideline || !newRow.skills || !newRow.weightage) {
      alert("Fill all required fields");
      return;
    }
    setRows((prev) => [...prev, newRow]);
    setRatings((prev) => [...prev, newRow.rating]);
    setFeedbacks((prev) => [...prev, newRow.feedback]);
    setNewRow({
      score_card: "",
      guideline: "",
      skills: "",
      weightage: "",
      feedback: "",
      rating: 0,
    });
    setIsAdding(false);
  };


  const startEditing = (index) => {
  setEditingIndex(index);
  setEditedRow({
    ...rows[index],
    rating: ratings[index],
    feedback: feedbacks[index],
  });
};

const handleEditedInputChange = (e) => {
  const { name, value } = e.target;
  if (name === "weightage" && value < 1) return;
  setEditedRow((prev) => ({ ...prev, [name]: value }));
};

const handleEditedRatingChange = (newRating) => {
  setEditedRow((prev) => ({ ...prev, rating: newRating }));
};


const handleSaveEdit = (index) => {
  const updatedRows = [...rows];
  updatedRows[index] = {
    ...editedRow,
    actual_rating: editedRow.rating,
    feedback: editedRow.feedback,
  };
  setRows(updatedRows);

  const updatedRatings = [...ratings];
  updatedRatings[index] = editedRow.rating;
  setRatings(updatedRatings);

  const updatedFeedbacks = [...feedbacks];
  updatedFeedbacks[index] = editedRow.feedback;
  setFeedbacks(updatedFeedbacks);

  setEditingIndex(null);
};


const cancelEdit = () => {
  setEditingIndex(null);
  setEditedRow({});
};

  // ⭐ Fetch candidate details
  function fetchCandidateData() {
    let pay_load = { candidate_id: routeState?.candidate_id };
    axios
      .post("https://api.pixeladvant.com/candidates/detail/", pay_load)
      .then((response) => {
        const obj_candidate = response.data.data;
        const interview_design_id = obj_candidate.interview_design_id;

        let response_data = {
          req_id: obj_candidate.Req_id_fk,
          candidate_name: obj_candidate.candidate_first_name,
          candidate_id: obj_candidate.CandidateID,
          hiring_manager: obj_candidate.hr_name,
          posistion_applied: obj_candidate.position_title,
          interview_design_id,
          date_of_screening: formattedDate,
        };

        setCandidateDetails(response_data);
        interviewDesignScreenParams(interview_design_id);
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }

  // ⭐ Fetch interview design + reviews
  function interviewDesignScreenParams(id) {
    let params = { candidate_id: routeState?.candidate_id };
    axios
      .post("https://api.pixeladvant.com/get-reviews-by-candidate/", params)
      .then((response) => {
        const rowsData = response?.data?.data?.reviews || [];
        const candidateDetails = response?.data?.data?.candidate_summary;
        console.log(candidateDetails,"dqedewf23e12")
        setRows(rowsData);

        // Initialize ratings + feedbacks from API
        setFinalRating(candidateDetails?.final_rating)
        setFinalFeedback(candidateDetails?.final_feedback)
        setResult(candidateDetails?.result)
        setRatings(rowsData.map((row) => row.actual_rating || 0));
        setFeedbacks(rowsData.map((row) => row.feedback || ""));
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }

  useEffect(() => {
    fetchCandidateData();
  }, []);

  // ⭐ Submit final payload
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
        id: row.id || null,
        parameterDefined: row.score_card,
        Guidelines: row.guideline,
        Skills: row.skills,
        weightage: row.weightage,
        ActualRating: ratings[index],
        Feedback: feedbacks[index],
      })),
    };

    console.log(payload);
    axios
      .put("https://api.pixeladvant.com/candidates/screening/", payload)
      .then((response) => {
        if (response.data.success) {
          alert("Submission successful!");
          navigate("/recruiter/screening_dashboard");
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
      {/* Candidate Info */}
      <Row className="small text-muted text-nowrap border-bottom py-2" style={{ fontSize: "0.9rem" }}>
        <Col className="border-end"><strong>Req ID:</strong> {candidateData.req_id}{space}</Col>
        <Col className="border-end"><strong>Candidate Name:</strong> {candidateData.candidate_name}{space}</Col>
        <Col className="border-end"><strong>Candidate ID:</strong> {candidateData.candidate_id}</Col>
      </Row>
      <Row className="small text-muted text-nowrap border-bottom py-2" style={{ fontSize: "0.9rem" }}>
        <Col className="border-end"><strong>Hiring Manager:</strong> {candidateData.hiring_manager}{space}</Col>
        <Col className="border-end"><strong>Position Applied:</strong> {candidateData.posistion_applied}{space}</Col>
        <Col><strong>Date of Screening:</strong> {candidateData.date_of_screening}</Col>
      </Row>

      {/* Rating Table */}
      <Table hover className="mt-4">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Parameter Defined</th>
            <th>Guideline</th>
            <th>Skills</th>
            <th>Weightage</th>
            <th>Actual Rating</th>
            <th>Feedback</th>
            <th>
              {!isAdding && <Button size="sm" onClick={() => setIsAdding(true)}>Add</Button>}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editingIndex === index ? (
                  <Form.Control name="score_card" value={editedRow.score_card} onChange={handleEditedInputChange} />
                ) : row.score_card}
              </td>
              <td>
                {editingIndex === index ? (
                  <Form.Control name="guideline" value={editedRow.guideline} onChange={handleEditedInputChange} />
                ) : row.guideline}
              </td>
              <td>
                {editingIndex === index ? (
                  <Form.Control name="skills" value={editedRow.skills} onChange={handleEditedInputChange} />
                ) : row.skills}
              </td>
              <td>
                {editingIndex === index ? (
                  <Form.Control type="number" name="weightage" value={editedRow.weightage} onChange={handleEditedInputChange} />
                ) : row.weightage}
              </td>
              <td>
                <div className="form-control d-flex align-items-center" style={{ height: "38px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() =>
                        editingIndex === index
                          ? handleEditedRatingChange(star)
                          : handleRatingChange(index, star)
                      }
                      style={{
                        cursor: "pointer",
                        color:
                          (editingIndex === index ? editedRow.rating : ratings[index]) >= star
                            ? "#ffc107"
                            : "#ccc",
                        fontSize: "1.2rem",
                        marginRight: "4px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ms-2">
                    {editingIndex === index ? editedRow.rating : ratings[index]}.0
                  </span>
                </div>
              </td>
              <td>
                {editingIndex === index ? (
                  <Form.Control
                    name="feedback"
                    value={editedRow.feedback}
                    onChange={handleEditedInputChange}
                    placeholder="Feedback"
                  />
                ) : (
                  <Form.Control
                    type="text"
                    placeholder="Feedback"
                    value={feedbacks[index] || ""}
                    onChange={(e) => handleFeedbackChange(index, e.target.value)}
                  />
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="success" onClick={() => handleSaveEdit(index)}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit}>Cancel</Button>
                  </div>
                ) : (
                  <Button size="sm" onClick={() => startEditing(index)}>Edit</Button>
                )}
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
                  placeholder="Parameter"
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
                  name="skills"
                  value={newRow.skills}
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
                      onClick={() => setNewRow((prev) => ({ ...prev, rating: star }))}
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
                  <Button size="sm" variant="success" onClick={handleAddNewRow}>Save</Button>
                  <Button size="sm" variant="secondary" onClick={() => setIsAdding(false)}>Cancel</Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Final Rating + Result */}
      <Row className="mb-4">
        <Col md={6}></Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Final Rating</Form.Label>
            <div className="form-control d-flex align-items-center" style={{ height: "38px" }}>
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
            <Form.Select value={result} onChange={(e) => setResult(e.target.value)}>
              <option value="">Select option</option>
              <option value="Recommended">Recommended</option>
              <option value="Not Recommended">Not Recommended</option>
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
              value={finalFeedback}
              onChange={(e) => setFinalFeedback(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Submit */}
      <Row>
        <Col className="text-center">
          <Button variant="primary" onClick={handleSubmit}>Update</Button>
        </Col>
      </Row>
    </div>
  </div>
);
};

export default RecruiterScreening;
