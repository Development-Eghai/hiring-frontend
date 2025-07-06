import React from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

const SetApproveScreen = () => {
  const approvers = [
    {
      status: "Yes",
      role: "FPNA/Business Ops",
      fname: "Rajkumar",
      lname: "R",
      designation: "VP, IT",
      email: "rajkumar@gmail.com",
      contact: "1234567890",
    },
    {
      status: "Maybe",
      role: "HR/Recruitment Head",
      fname: "Rajkumar",
      lname: "R",
      designation: "Director, Finance",
      email: "rajkumar@gmail.com",
      contact: "1234567890",
    },
    {
      status: "NA",
      role: "CEO",
      fname: "Rajkumar",
      lname: "R",
      designation: "Director Recruitment",
      email: "rajkumar@gmail.com",
      contact: "1234567890",
    },
  ];

  const candidates = [
    {
      sNo: 1,
      reqId: "5678",
      clientId: "HCL001",
      clientName: "HCL",
      candidateId: "C001",
      candidateFirst: "Kumar",
      candidateLast: "Sachidanand",
      hmApprover: "Yes",
      fpnaOps: "Awaiting",
      status: "Waiting Req Approval",
    },
    {
      sNo: 2,
      reqId: "5678",
      clientId: "HCL001",
      clientName: "HCL",
      candidateId: "C002",
      candidateFirst: "AA",
      candidateLast: "XXY",
      hmApprover: "Awaiting",
      fpnaOps: "Awaiting",
      status: "Waiting Req Approval",
    },
  ];

  return (
    <div className="p-4">
      <h5>SET APPROVER SCREEN</h5>

      <Table striped bordered hover size="sm" className="mt-3 text-center align-middle">
        <thead className="bg-warning text-dark">
          <tr>
            <th>Set as Approver</th>
            <th>ROLE</th>
            <th>F_NAME</th>
            <th>L_NAME</th>
            <th>DESIGNATION</th>
            <th>EMAIL</th>
            <th>CONTACT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {approvers.map((a, idx) => (
            <tr key={idx}>
              <td>{a.status}</td>
              <td>{a.role}</td>
              <td>{a.fname}</td>
              <td>{a.lname}</td>
              <td>{a.designation}</td>
              <td>
                <a href={`mailto:${a.email}`}>{a.email}</a>
              </td>
              <td>{a.contact}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-1">Edit</Button>
                <Button size="sm" variant="outline-danger">Delete</Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={8}>
              <Button variant="success" size="sm">Add new approver</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Table striped bordered hover size="sm" className="mt-4 text-center align-middle">
        <thead className="bg-warning text-dark">
          <tr>
            <th>S.No</th>
            <th>Req ID</th>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Candidate ID</th>
            <th>Candidate First Name</th>
            <th>Candidate Last Name</th>
            <th>HM Approver</th>
            <th>FPNA/Business Ops</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, idx) => (
            <tr key={idx}>
              <td>{c.sNo}</td>
              <td>{c.reqId}</td>
              <td>{c.clientId}</td>
              <td>{c.clientName}</td>
              <td>{c.candidateId}</td>
              <td>{c.candidateFirst}</td>
              <td>{c.candidateLast}</td>
              <td>{c.hmApprover}</td>
              <td>{c.fpnaOps}</td>
              <td>{c.status}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-1">Edit</Button>
                <Button size="sm" variant="outline-danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SetApproveScreen;


