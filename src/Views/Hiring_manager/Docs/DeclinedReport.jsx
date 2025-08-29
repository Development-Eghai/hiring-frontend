import React, { useState } from "react";
import { Table, Container, Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
import ReportHeader from "../Hiring_manager_utils/Navbar";


const DeclinedReport = () => {
  const [reportData] = useState([
    {
      clientName: "HCL Software",
      candidateName: "John Doe",
      position: "Software Engineer",
      department: "IT",
      recruiter: "Jane Smith",
      offerDate: "2025-01-01",
      declineDate: "2025-01-03",
      assessmentScore: "****",
      feedback: "Summarized details",
      reason: "Better offer",
      employer: "ABC Corp",
      location: "Bangalore",
      ctc: 1200000,
    },
    {
      clientName: "HCL Software",
      candidateName: "Priya Singh",
      position: "HR Manager",
      department: "HR",
      recruiter: "Rohit Mehta",
      offerDate: "2025-01-03",
      declineDate: "2025-01-05",
      assessmentScore: "***",
      feedback: "Summarized details",
      reason: "Personal reasons",
      employer: "XYZ Ltd",
      location: "Delhi",
      ctc: 1500000,
    },
    {
      clientName: "HCL Software",
      candidateName: "Amit Kumar",
      position: "Software Engineer",
      department: "IT",
      recruiter: "Jane Smith",
      offerDate: "2025-01-05",
      declineDate: "2025-01-07",
      assessmentScore: "*****",
      feedback: "Summarized details",
      reason: "Better offer",
      employer: "TechSoft",
      location: "Bangalore",
      ctc: 1250000,
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

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Declined Report");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "Declined_Report.xlsx");
//   };

  return (
    <Container fluid className="">
        <ReportHeader/>
      <Card className="border-0 rounded-4 shadow-sm ">
        <Card.Header className="d-flex justify-content-between align-items-center rounded-top-4 bg-light">
          <h6 className="fw-bold mb-0 p-2 text-dark">Declined Report</h6>
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
                <th>Decline Date</th>
                <th>Assessment Score / Rating</th>
                <th>Interviewer Feedback</th>
                <th>Reason for Decline</th>
                <th>Current Employer</th>
                <th>Location</th>
                <th>CTC Offered</th>
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
                  <td>{row.declineDate}</td>
                  <td>{row.assessmentScore}</td>
                  <td>{row.feedback}</td>
                  <td>{row.reason}</td>
                  <td>{row.employer}</td>
                  <td>{row.location}</td>
                  <td className="fw-bold text-danger">{row.ctc.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* <Modal show={showFilter} onHide={() => setShowFilter(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Declined Report</Modal.Title>
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

export default DeclinedReport;
