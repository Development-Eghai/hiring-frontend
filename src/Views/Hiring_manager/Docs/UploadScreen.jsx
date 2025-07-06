import React from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

const UploadScreen = () => {
  const interviewData = [
    {
      sNo: 1,
      reqId: "5678",
      clientId: "HCL",
      firstName: "Kumar",
      lastName: "Sachidanand",
      jobTitle: "PM",
      mode: "Online",
      stages: "Technical Round 1 & 2",
      email: "kumar.sachidanand@gmail.com",
      contact: "8904957092",
      slots: "25-06-2025 10-12 PM, 3-5 PM",
    },
    {
      sNo: 2,
      reqId: "5678",
      clientId: "HCL",
      firstName: "Abhik",
      lastName: "Paul",
      jobTitle: "Recruiter",
      mode: "Face to Face",
      stages: "Recruiter Screening",
      email: "abhik.paul@gmail.com",
      contact: "9875444",
      slots: "25-06-2025 10-12 PM, 3-5 PM, 8-11 PM",
    },
    {
      sNo: 3,
      reqId: "5678",
      clientId: "HCL",
      firstName: "Ankit",
      lastName: "Paul",
      jobTitle: "Recruiter",
      mode: "Face to Face",
      stages: "Fitment Screening",
      email: "ankit.paul@gmail.com",
      contact: "9765545",
      slots: "25-06-2025 10-12 PM, 3-5 PM, 8-11 PM",
    },
  ];

  return (
    <Container fluid className="p-4 bg-light rounded">
      <h4 className="mb-4 text-primary">Interview Calendar</h4>
      <Table responsive bordered hover className="bg-white shadow-sm rounded text-center align-middle">
        <thead className="bg-secondary text-white">
          <tr>
            <th>S.No</th>
            <th>Req ID</th>
            <th>Client ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
            <th>Interview Mode</th>
            <th>Interviewer Stages</th>
            <th>Email ID</th>
            <th>Contact Number</th>
            <th>Slots</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {interviewData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.sNo}</td>
              <td>{item.reqId}</td>
              <td>{item.clientId}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.jobTitle}</td>
              <td>{item.mode}</td>
              <td>{item.stages}</td>
              <td>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </td>
              <td>{item.contact}</td>
              <td>{item.slots}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-1">
                  Edit
                </Button>
                <Button size="sm" variant="outline-danger">Delete</Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={12}>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Button variant="success" size="sm" className="me-2">
                    Add
                  </Button>
                  <Button variant="info" size="sm" className="me-2">
                    Upload
                  </Button>
                  <Button variant="secondary" size="sm">
                    Cancel
                  </Button>
                </Col>
              </Row>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default UploadScreen;


