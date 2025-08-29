
import React from "react";
import { Table, Container, Card, Button } from "react-bootstrap";
import ReportHeader from "../Hiring_manager_utils/Navbar";

const SilvermedelistReport = () => {
  // Example data (replace with API response)
  const reportData = [
    {
      clientId: "C001",
      clientName: "Acme Corp",
      firstName: "John",
      lastName: "Doe",
      position: "React Developer",
      hiringManager: "Michael Scott",
      recruiter: "Sarah Connor",
      interviewDate: "2025-08-25",
      assessment: "Excellent",
      interviewerFeedback: "Strong React knowledge, good problem solving",
      recruiterFeedback: "Candidate accepted offer",
      reasonNotSelected: "N/A",
      skills: "React, Redux, JavaScript",
      currentEmployer: "XYZ Pvt Ltd",
      currentLocation: "Bangalore",
      lastCTC: "12 LPA",
      status: "Selected",
      followUpDate: "2025-08-30",
      notes: "Will join in September"
    },
    {
      clientId: "C002",
      clientName: "Tech Solutions",
      firstName: "Jane",
      lastName: "Smith",
      position: "Node.js Developer",
      hiringManager: "Dwight Schrute",
      recruiter: "Tom Hardy",
      interviewDate: "2025-08-28",
      assessment: "Good",
      interviewerFeedback: "Solid backend skills",
      recruiterFeedback: "Candidate negotiating salary",
      reasonNotSelected: "Location mismatch",
      skills: "Node.js, Express, MongoDB",
      currentEmployer: "ABC Tech",
      currentLocation: "Chennai",
      lastCTC: "10 LPA",
      status: "Not Joined",
      followUpDate: "2025-09-01",
      notes: "Open to remote work"
    }
  ];

  return (
    <Container fluid className="">
        <ReportHeader/>
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className=" text-white fw-bold fs-5 rounded-top-4 p-3">
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold mb-0 p-2 text-dark">Silver medalist</h6>
            <div className="d-flex gap-3">
              <Button variant="outline-secondary">Filter</Button>
              <Button size="sm" className="me-2 btn btn-success">
                Export excel
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body style={{ overflowX: "auto" }}>
          <Table striped hover bordered responsive className="align-middle">
            <thead className="table-secondary">
              <tr>
                <th>Client ID</th>
                <th>Client Name</th>
                <th>Candidate First Name</th>
                <th>Candidate Last Name</th>
                <th>Position Considered For</th>
                <th>Hiring Manager</th>
                <th>Recruiter Name</th>
                <th>Interview Date(s)</th>
                <th>Assessment Score / Rating</th>
                <th>Interviewer Feedback Summary</th>
                <th>Recruiter Feedback Summary</th>
                <th>Reason Not Selected/Joined</th>
                <th>Skills / Expertise</th>
                <th>Current Employer</th>
                <th>Current Location</th>
                <th>Last CTC</th>
                <th>Status</th>
                <th>Follow-Up Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, index) => (
                <tr key={index}>
                  <td>{row.clientId}</td>
                  <td>{row.clientName}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.position}</td>
                  <td>{row.hiringManager}</td>
                  <td>{row.recruiter}</td>
                  <td>{row.interviewDate}</td>
                  <td>{row.assessment}</td>
                  <td>{row.interviewerFeedback}</td>
                  <td>{row.recruiterFeedback}</td>
                  <td className="text-danger fw-bold">
                    {row.reasonNotSelected}
                  </td>
                  <td>{row.skills}</td>
                  <td>{row.currentEmployer}</td>
                  <td>{row.currentLocation}</td>
                  <td>{row.lastCTC}</td>
                  <td
                    className={
                      row.status === "Selected"
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    {row.status}
                  </td>
                  <td>{row.followUpDate}</td>
                  <td>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SilvermedelistReport;
