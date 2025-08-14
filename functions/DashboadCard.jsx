import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const DashboardCard = ({ params }) => {
  return (
    <Card className="rounded-3 p-3 d-flex flex-column align-items-start justify-content-around bg-white cardclasses">
      <div
        className="d-flex justify-content-center align-items-center p-1"
        style={{
          borderRadius: "5px",
          backgroundColor: "#FFEAF0",
          width: "45px",
          height: "40px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 50 50"
          fill="none"
        >
          <rect width="50" height="50" rx="5" fill="#FFEAF0" />
          <path
            d="M22.6867 23.6817C22.5701 23.67 22.4301 23.67 22.3017 23.6817C19.5251 23.5883 17.3201 21.3133 17.3201 18.5133C17.3201 15.655 19.6301 13.3333 22.5001 13.3333C25.3584 13.3333 27.6801 15.655 27.6801 18.5133C27.6684 21.3133 25.4634 23.5883 22.6867 23.6817Z"
            stroke="#FF6C95"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31.1448 15.6667C33.4081 15.6667 35.2281 17.4983 35.2281 19.75C35.2281 21.955 33.4781 23.7517 31.2964 23.8333C31.2031 23.8217 31.0981 23.8217 30.9931 23.8333"
            stroke="#FF6C95"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.8536 27.9867C14.0303 29.8767 14.0303 32.9567 16.8536 34.835C20.0619 36.9817 25.3236 36.9817 28.5319 34.835C31.3553 32.945 31.3553 29.865 28.5319 27.9867C25.3353 25.8517 20.0736 25.8517 16.8536 27.9867Z"
            stroke="#FF6C95"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Card.Text
        className="mb-0"
        style={{
          color: "#878787",
          fontFamily: "Manrope",
          fontSize: "1rem",
          fontWeight: "500",
        }}
      >
        Total No.of Students
      </Card.Text>

      <Card.Title
        style={{
          color: "black",
          fontFamily: "Manrope",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        100
      </Card.Title>
    </Card>
  );
};

export default DashboardCard;
