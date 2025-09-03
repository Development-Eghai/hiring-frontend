import React, { useState } from "react";
import { Table, Container, Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
// import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ReportHeader from "../Hiring_manager_utils/Navbar";

const CompensationDetailsReport = () => {
  const [reportData] = useState([
    {
      clientName: "HCL Software",
      candidateName: "John Doe",
      position: "Software Engineer",
      department: "IT",
      recruiter: "Jane Smith",
      location: "Delhi NCR",
      offerDate: "2025-01-01",
      salary: 1500000,
    },
    {
      clientName: "HCL Software",
      candidateName: "Priya Singh",
      position: "HR Manager",
      department: "HR",
      recruiter: "Rohit Mehta",
      location: "Delhi NCR",
      offerDate: "2025-01-03",
      salary: 500000,
    },
    {
      clientName: "HCL Software",
      candidateName: "Amit Kumar",
      position: "Software Engineer",
      department: "IT",
      recruiter: "Jane Smith",
      location: "Delhi NCR",
      offerDate: "2025-01-05",
      salary: 1500000,
    },
    {
      clientName: "HCL Software",
      candidateName: "Sarah Lee",
      position: "Finance Analyst",
      department: "Finance",
      recruiter: "Nina Gupta",
      location: "Hyderabad",
      offerDate: "2025-01-06",
      salary: 700000,
    },
    {
      clientName: "HCL Software",
      candidateName: "Ravi Sharma",
      position: "Software Engineer",
      department: "IT",
      recruiter: "Jane Smith",
      location: "Hyderabad",
      offerDate: "2025-01-07",
      salary: 2000000,
    },
    {
      clientName: "HCL Software",
      candidateName: "Emily Davis",
      position: "HR Manager",
      department: "HR",
      recruiter: "Rohit Mehta",
      location: "Bangalore",
      offerDate: "2025-01-08",
      salary: 450000,
    },
    {
      clientName: "HCL Software",
      candidateName: "Arjun Patel",
      position: "Finance Analyst",
      department: "Finance",
      recruiter: "Nina Gupta",
      location: "Bangalore",
      offerDate: "2025-01-09",
      salary: 3500000,
    },
    {
      clientName: "HCL Software",
      candidateName: "Neha Verma",
      position: "Software Engineer",
      department: "IT",
      recruiter: "Jane Smith",
      location: "Bangalore",
      offerDate: "2025-01-10",
      salary: 7500000,
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
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Offer Report");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "Offer_Report.xlsx");
//   };

  return (
    
    <Container fluid className="">
        <ReportHeader/>
      <Card className="border-0 rounded-4">
        <Card.Header className=" text-white fw-bold fs-5 rounded-top-4 d-flex justify-content-between">
          <h6 className="fw-bold mb-0 p-2 text-dark">Compensation Report</h6>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={() => setShowFilter(true)}>
              Filter
            </Button>
            <Button variant="success" onClick={"exportToExcel"}>
              Export to Excel
            </Button>
          </div>
        </Card.Header>

        <Card.Body style={{ overflow: "auto" }}>
          <Table striped hover bordered responsive className="align-middle">
            <thead className="table-secondary">
              <tr>
                <th>Client Name</th>
                <th>Candidate Name</th>
                <th>Position Offered</th>
                <th>Department</th>
                <th>Recruiter Name</th>
                <th>Location</th>
                <th>Offer Date</th>
                <th>Offered Salary</th>
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
                  <td>{row.location}</td>
                  <td>{row.offerDate}</td>
                  <td className="fw-bold text-success">{row.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* 🔹 Filter Modal */}
      {/* <Modal show={showFilter} onHide={() => setShowFilter(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Report</Modal.Title>
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
                    <option>Delhi NCR</option>
                    <option>Hyderabad</option>
                    <option>Bangalore</option>
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
                    <option>Finance</option>
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

export default CompensationDetailsReport;
