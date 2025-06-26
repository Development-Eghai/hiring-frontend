import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const fieldKeys = [
  "job_position", "tech_stacks", "jd_details", "experience_range",
  "designation", "target_companies", "interview_status",
  "compensation", "location", "working_model",
  "education_decision", "relocation", "travel_opportunities",
  "visa_requirements", "domain_knowledge", "background_verification",
  "shift_timings", "role_type", "job_type",
  "communication_language", "notice_period", "additional_comp",
  "citizen_requirement", "career_gap", "sabbatical",
  "screening_questions", "job_health_requirements",
  "social_media_links", "language_proficiency"
];

const CustomizeFieldLabels = () => {
  const [labels, setLabels] = useState(() =>
    fieldKeys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
  );

  const handleChange = (key, value) => {
    setLabels((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted alternate labels:", labels);
    alert("Alternate labels saved!");
  };

  return (
    <div className="home_data_table my-5">
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h4 className="mb-4 fw-bold text-primary">Customize Field Labels</h4>
          <Form>
            {fieldKeys.map((key, idx) => (
              <Card key={key} className="mb-3 border-0 bg-light-subtle">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={3} className="fw-semibold py-2 text-secondary">
                      {idx + 1}. {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Col>
                    <Col md={9}>
                      <Form.Control
                        type="text"
                        placeholder="Enter display name"
                        value={labels[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="p-2"
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}

            <div className="text-end mt-4">
              <Button variant="primary"  onClick={handleSubmit}>
                Submit All Labels
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomizeFieldLabels;
