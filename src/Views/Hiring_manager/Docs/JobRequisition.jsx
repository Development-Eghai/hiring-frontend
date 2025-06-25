import React, { useState } from "react";
import { Container, Row, Col, Button, Accordion, Card } from "react-bootstrap";
import { Person, Bell, Search } from "react-bootstrap-icons";

const JobRequisition = () => {
  const [activeKey, setActiveKey] = useState(null);

  const sections = [
    "Requisitions Information",
    "Position Information",
    "Billing Details",
    "Posting Details",
    "Asset Details",
  ];

  return (
    <div className="h-100">
      <Card className="flex-grow-1 p-4 ">
        <div className="d-flex justify-content-between align-items-center mb-4">
          {[
            "Requisition Created",
            "Business Ops Review",
            "Strategy Office Review",
            "Recruiter Review",
            "Completed",
          ].map((stage, i) => (
            <div key={i} className="text-center" style={{ flex: 1 }}>
              <div
                className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                style={{ width: 30, height: 30 }}
              >
                {i + 1}
              </div>
              <div className="small mt-2 text-muted">{stage}</div>
            </div>
          ))}
        </div>

        {/* Section Titles */}
        <div className="d-flex justify-content-end mb-2">
          <span className="me-4 fw-semibold text-primary">
            Internal Job Preview
          </span>
          <span className="fw-semibold text-primary">External Job Preview</span>
        </div>

        {/* Accordion Sections */}
        <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          {sections.map((section, index) => (
            <Accordion.Item eventKey={String(index)} key={index}>
              <Accordion.Header>{section}</Accordion.Header>
              <Accordion.Body>
                <p>Form inputs for {section} go here...</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-3 mt-4">
          <Button variant="outline-primary">Save as Draft</Button>
          <Button variant="primary">Send to Business Ops</Button>
        </div>
      </Card>
    </div>
  );
};

export default JobRequisition;
