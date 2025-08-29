import React, { useState } from "react";
import { Table, Container, Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
// import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ReportHeader from "../Hiring_manager_utils/Navbar";

const FutureStartDataReport = () => {
  const [reportData] = useState([
    {
      clientName: "HCL Software",
      candidateName: "John Doe",
      position: "Software Engineer",
      department: "IT",
      recruiter: "Jane Smith",
      offerDate: "2025-01-01",
      expectedJoining: "2025-01-11",
      currentEmployer: "ABC Corp",
      location: "Bangalore",
      ctc: 1200000,
      status: "Yet to Join",
      assessmentScore: "****",
      feedback: "Summarized details",
      comments: "",
    },
    {
      clientName: "HCL Software",
      candidateName: "Priya Singh",
      position: "HR Manager",
      department: "HR",
      recruiter: "Rohit Mehta",
      offerDate: "2025-01-03",
      expectedJoining: "2025-01-11",
      currentEmployer: "XYZ Ltd",
      location: "Delhi",
      ctc: 1500000,
      status: "Yet to Join",
      assessmentScore: "***",
      feedback: "Summarized details",
      comments: "",
    },
  ]);

  const [showFilter, setShowFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const filteredData = reportData.filter((row) => {
    return (
      (locationFilter ? row.location === locationFilter : true) &&
      (departmentFilter ? row.department === departmentFilter : true)
    );
  });

  // const exportToExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(filteredData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "FutureStartData");
  //   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  //   saveAs(data, "FutureStartData_Report.xlsx");
  // };

  return (
    <Container fluid className="">
        <ReportHeader/>
      <Card className="border-0 rounded-4 shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center rounded-top-4 bg-light">
          <h6 className="fw-bold mb-0 p-2 text-dark">Future Start Data Report</h6>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={() => setShowFilter(true)}>
              Filter
            </Button>
            <Button variant="success" onClick={"exportToExcel"}>
              Export to Excel
            </Button>
          </div>
        </Card.Header>

        <Card.Body style={{ overflowX: "auto" }}>
          <Table striped hover bordered responsive className="align-middle">
            <thead className="table-secondary">
              <tr>
                <th>Client Name</th>
                <th>Candidate Name</th>
                <th>Position Offered</th>
                <th>Department</th>
                <th>Recruiter Name</th>
                <th>Offer Date</th>
                <th>Expected Joining</th>
                <th>Current Employer</th>
                <th>Location</th>
                <th>CTC Offered</th>
                <th>Status</th>
                <th>Assessment Score / Rating</th>
                <th>Interviewer Feedback</th>
                <th>Recruiter Comments</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.clientName}</td>
                  <td>{row.candidateName}</td>
                  <td>{row.position}</td>
                  <td>{row.department}</td>
                  <td>{row.recruiter}</td>
                  <td>{row.offerDate}</td>
                  <td>{row.expectedJoining}</td>
                  <td>{row.currentEmployer}</td>
                  <td>{row.location}</td>
                  <td className="fw-bold text-success">{row.ctc.toLocaleString()}</td>
                  <td>{row.status}</td>
                  <td>{row.assessmentScore}</td>
                  <td>{row.feedback}</td>
                  <td>{row.comments}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* 🔹 Filter Modal */}
      {/* <Modal show={showFilter} onHide={() => setShowFilter(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Future Start Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option>Bangalore</option>
                    <option>Delhi</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option>IT</option>
                    <option>HR</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilter(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowFilter(false)}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
};

export default FutureStartDataReport;
