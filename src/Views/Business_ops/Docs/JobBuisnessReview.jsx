import React, { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import BuisnessOpsReview from "./BuisnessOpsReview";
import { Card, ListGroup, Container, Button, Row, Col } from "react-bootstrap";

const JobBuisnessReview = () => {
  const handleNext = () => {
    setCompletedSteps((prev) => [...prev, activeStep]);
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const steps = [
    {
      label: "Requisition Created",
      content: <h1></h1>,
    },
    {
      label: "Business Ops Review",
      content: <BuisnessOpsReview />,
    },
    {
      label: "Strategy Office Review",
      content: (
        <div>
          <div className="mb-3">
            <label className="form-label">Approval Status</label>
            <select className="form-select">
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      label: "Recruiter Review",
      content: (
        <div>
          <div className="mb-3">
            <label className="form-label">Recruiter Notes</label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Add notes"
            />
          </div>
        </div>
      ),
    },
    {
      label: "Completed",
      content: <p className="text-success fw-bold">All steps completed. 🎉</p>,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleDone = () => {
    setCompletedSteps((prev) => {
      const updated = new Set([...prev, activeStep, ...steps.map((_, i) => i)]);
      return Array.from(updated);
    });
    alert("All steps completed!");
  };

  const isStepCompleted = (index) => completedSteps.includes(index);

  return (
    <div className="mt-4">
      {/* Stepper Header */}
      <div className="d-flex justify-content-between mb-4">
        {steps.map((step, idx) => (
          <div className="text-center flex-fill" key={idx}>
            {isStepCompleted(idx) ? (
              <BiCheckCircle className="text-success" size={24} />
            ) : (
              <div
                className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: 24, height: 24 }}
              >
                {idx + 1}
              </div>
            )}
            <div className="small text-muted mt-1">{step.label}</div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="border rounded p-4 mb-4" style={{ maxHeight: "700px" }}>
        <Container
          className="mt-4"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <h4>Requisition View Details</h4>

          <Card className="mb-3">
            <Card.Header>General Info</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>User Role:</strong> "Admin"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Requisition ID:</strong> "REQ001"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Planning ID:</strong> "PLAN123"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Hiring Manager:</strong> "John Doe"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Position Title:</strong> "Software Engineer"
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className="mb-3">
            <Card.Header>Position Information</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Internal Title:</strong> "Developer"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>External Title:</strong> "React Developer"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Job Position:</strong> "Frontend Developer"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Company/Client:</strong> "TechCorp"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Location:</strong> "Chennai"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Geo Zone:</strong> "Asia-Pacific"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Band:</strong> "B2"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Client Interview:</strong> "Yes"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Date of Requisition:</strong> "2025-07-21"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Due Date of Requisition:</strong> "2025-08-21"
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className="mb-3">
            <Card.Header>Skills Required</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Primary Skills:</strong> "React, JavaScript"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Secondary Skills:</strong> "Redux, Bootstrap"
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className="mb-3">
            <Card.Header>Billing Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Billing Type:</strong> "Hourly"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Billing Start Date:</strong> "2025-07-01"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Billing End Date:</strong> "2025-12-31"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Contract Start Date:</strong> "2025-07-01"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Contract End Date:</strong> "2025-12-31"
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className="mb-3">
            <Card.Header>Posting Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Experience:</strong> "2-4 Years"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Qualification:</strong> "B.Tech, MCA"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Designation:</strong> "Software Engineer"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Job Region:</strong> "South India"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Required Score:</strong> "80"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Internal Description:</strong>
                <div
                  dangerouslySetInnerHTML={{
                    __html: "This is internal JD description.",
                  }}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>External Description:</strong>
                <div
                  dangerouslySetInnerHTML={{
                    __html: "This is external JD description.",
                  }}
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className="mb-3">
            <Card.Header>Asset Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Laptop Type:</strong> "Windows"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Laptop Needed:</strong> "Yes"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Comments:</strong> "Urgent requirement"
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Row className="mt-4 mb-5 d-flex gap-3 justify-content-end">
            <Col xs="auto">
              <Button variant="danger" onClick={""}>
                Reject
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="success" onClick={""}>
                Approve
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default JobBuisnessReview;
