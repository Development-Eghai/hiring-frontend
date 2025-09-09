import React, { useEffect, useState } from "react";
import { Table, Container, Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
// import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ReportHeader from "../Hiring_manager_utils/Navbar";
import axios from "axios";

const FutureStartDataReport = () => {
  const [reportData,setReportData] = useState([]);

    const fetchData = async ()=>{
  try {
    const response = await axios.get("https://api.pixeladvant.com/api/yet-to-join-report/");

    const {data,success,message} =response?.data;

    if(success){
      setReportData(data)
    }
  } catch (error) {
    
  }
}

useEffect(()=>{
  fetchData();
},[])

  const exportToExcel = async() => {
    try  {
      const response = await axios.get(
        "https://api.pixeladvant.com/report/export-yet-to-join/",
        {
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "report.xlsx";

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, fileName);
    } catch (err) {
      console.error("Error downloading Excel file:", err);
    }
  };

  return (
    <Container fluid className="">
        <ReportHeader/>
      <Card className="border-0 rounded-4 shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center rounded-top-4 bg-light">
          <h6 className="fw-bold mb-0 p-2 text-dark">Future Start Data Report</h6>
          <div className="d-flex gap-2">
            {/* <Button variant="outline-primary">
              Filter
            </Button> */}
            <Button variant="success" onClick={exportToExcel}>
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
              {reportData?.length > 0 ? reportData.map((row, index) => (
                <tr key={index}>
                  <td>{row?.["Client Name"]}</td>
                  <td>{row?.["Candidate Name"]}</td>
                  <td>{row?.["Position Offered"]}</td>
                  <td>{row?.["Department"]}</td>
                  <td>{row?.["Recruiter Name"]}</td>
                  <td>{row?.["Offer Date"]}</td>
                  <td>{row?.["Expected Date Of Joining"]}</td>
                  <td>{row?.["Current Employer"]}</td>
                  <td>{row?.["Location"]}</td>
                  <td className="fw-bold text-success">{row?.["CTC Offered"].toLocaleString()}</td>
                  <td>{row?.["Status"]}</td>
                  <td>{row?.["Assessment Score / Rating"]}</td>
                  <td>{row?.["Interviewer Feedback"]}</td>
                  <td>{row?.["Recruiter Comments"]}</td>
                </tr>
              )): (<tr><td colSpan={12} className="text-center">No data found</td></tr>)}
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
