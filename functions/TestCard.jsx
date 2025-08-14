import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { BsFillTrashFill, BsFillChatDotsFill, BsClock } from "react-icons/bs";

const TestCard = () => {
  return (
    <Card
      className="d-flex flex-row align-items-center justify-content-between p-3 my-3 shadow-sm"
      style={{ borderRadius: "15px" }}
    >
      {/* Left colored bar */}
      <div
        style={{
          width: "4px",
          height: "60px",
          backgroundColor: "#FF4F6E",
          borderRadius: "5px",
          marginRight: "15px",
        }}
      />

      {/* Main Content */}
      <div className="flex-grow-1">
        <h6 className="mb-1 fw-semibold">Human Psychology</h6>
        <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
          04-03-2025 | 4:00 PM
        </p>
        <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
          Online
        </p>
      </div>

      {/* Duration and Icons */}
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center bg-light px-2 py-1 rounded">
          <BsClock size={16} className="me-1 text-muted" />
          <span style={{ fontSize: "0.85rem", color: "#555" }}>30 Min</span>
        </div>
        <BsFillChatDotsFill
          color="#5A5A5A"
          size={18}
          style={{ cursor: "pointer" }}
        />
        <BsFillTrashFill
          color="#FF4F6E"
          size={18}
          style={{ cursor: "pointer" }}
        />
      </div>
    </Card>
  );
};

export default TestCard;
