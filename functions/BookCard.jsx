import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaTrashAlt, FaCircle } from "react-icons/fa";

const PdfCard = () => {
  return (
    <Card className="shadow-sm rounded-4 p-3" style={{ maxWidth: "390px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5 className="fw-semibold">Physics Volume 1</h5>
        <Button variant="light" className="p-1" style={{ color: "#ff4d4f" }}>
          <FaTrashAlt />
        </Button>
      </div>

      <Row className="align-items-center g-2">
        {/* PDF Icon */}
        <Col xs="auto">
          <div
            style={{
              width: 60,
              height: 70,
              border: "1px solid #ccc",
              borderRadius: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
            }}
          >
            <div style={{ fontSize: 10 }}>PDF</div>
            <div
              style={{
                width: 35,
                height: 45,
                backgroundColor: "#f44336",
                color: "white",
                fontWeight: "bold",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              PDF
            </div>
          </div>
        </Col>

        {/* Details */}
        <Col>
          <div>
            <div>
              <strong>Chapters:</strong> 12
            </div>
            <div>
              <strong>Question sets:</strong> 4
            </div>
            <div className="d-flex align-items-center">
              <strong className="me-1">Performance:</strong>
              <FaCircle size={8} className="me-1 text-warning" />
              <span>Developing</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Action Buttons */}
      <div className="mt-3 d-flex border-top pt-2">
        <Button variant="outline-primary" className="me-2 flex-fill">
          View
        </Button>
        <Button variant="outline-danger" className="flex-fill">
          Generate Question
        </Button>
      </div>
    </Card>
  );
};

export default PdfCard;
