 import React, { useState } from "react";
import { Button, Accordion, Card, Form } from "react-bootstrap";
import { BiCheckCircle } from "react-icons/bi";

const JobRequisition = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData] = useState({ value: "700" });
  const sections = [
    "Requisitions Information",
    "Position Information",
    "Billing Details",
    "Posting Details",
    "Asset Details"
  ];

  const handleNext = () => setActiveStep((s) => Math.min(s + 1, sections.length - 1));
  const handlePrev = () => setActiveStep((s) => Math.max(s - 1, 0));

  return (
    <Card className="p-4" style={{ height: "600px" }}>
      {/* Stepper Header */}
      <div className="d-flex justify-content-between mb-3">
        {["Requisition Created", "Business Ops Review", "Strategy Office Review", "Recruiter Review", "Completed"].map((label, idx) => (
          <div className="text-center flex-fill" key={idx}>
            {activeStep > idx ? (
              <BiCheckCircle className="text-success" size={24} />
            ) : (
              <div className="bg-primary text-white rounded-circle d-inline-flex 
                              align-items-center justify-content-center" 
                   style={{ width: 24, height: 24 }}>
                {idx + 1}
              </div>
            )}
            <div className="small text-muted mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Accordion Sections */}
      <Accordion activeKey={String(activeStep)}>
        {sections.map((section, idx) => (
          <Accordion.Item eventKey={String(idx)} key={idx}>
            <Accordion.Header onClick={() => setActiveStep(idx)}>
              {section}
            </Accordion.Header>
            <Accordion.Body>
              {/* Form fields */}
              {idx === 0 && (
                <Form.Group controlId="reqId">
                  <Form.Label>Req ID: {formData.value}</Form.Label>
                </Form.Group>
              )}
              {/* Add more section-specific fields here */}

              {/* Navigation buttons */}
              <div className="d-flex justify-content-between mt-3">
                <Button variant="secondary" onClick={handlePrev} disabled={idx === 0}>
                  Previous
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  {idx + 1 === sections.length ? "Send to Business Ops" : "Next"}
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
};

export default JobRequisition;


