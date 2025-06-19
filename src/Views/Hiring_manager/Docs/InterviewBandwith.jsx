import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";

const InterviewBandwidth = () => {
  const resultData = [
    { metric: "Candidates Required", value: "120" },
    { metric: "Decline Adjusted Count", value: "24" },
    { metric: "Total Candidate Pipeline", value: "144" },
    { metric: "Total Interviews Needed", value: "432" },
    { metric: "Total Interview Hours", value: "864" },
    { metric: "Working Hours per Week", value: "40" },
    { metric: "Total Interview Weeks", value: "21.6" },
    { metric: "Interviewer Bandwidth per Month", value: "14.4" },
    { metric: "No. of Interviewers Needed", value: "14.4" },
    { metric: "Leaves Adjustment", value: "15.9" },
  ];

  const columns = [
    {
      name: "Metrics",
      selector: (row) => row.metric,
      grow: 3,
      wrap: true,
    },
    {
      name: "Values",
      selector: (row) => row.value,
      grow: 1,
      center: true,
    },
  ];

  return (
    <Container className="interview-bandwidth-container py-4">
      <h3 className="section-title mb-4">Interview Bandwidth Calculator</h3>

      {/* Input Form */}
      <Form className="input-form mb-5">
        <Row className="mb-3 g-2">
          <Col md={4} className="px-2">
            <Form.Group>
              <Form.Label>No. of Roles to Hire</Form.Label>
              <Form.Control type="number" placeholder="Enter number" />
            </Form.Group>
          </Col>
          <Col md={4} className="px-2">
            <Form.Group>
              <Form.Label>Conversion Ratio (e.g., 12 means 1:12)</Form.Label>
              <Form.Select>
                <option>1:12</option>
                <option>1:10</option>
                <option>1:15</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="px-2">
            <Form.Group>
              <Form.Label>Offer Decline %</Form.Label>
              <Form.Control type="number" placeholder="%" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} className="px-2">
            <Form.Group>
              <Form.Label>Elimination %</Form.Label>
              <Form.Control type="number" placeholder="%" />
            </Form.Group>
          </Col>
          <Col md={4} className="px-2">
            <Form.Group>
              <Form.Label>Avg Interviewer Time per Week (hrs)</Form.Label>
              <Form.Control type="number" placeholder="Hours" />
            </Form.Group>
          </Col>
          <Col md={4} className="px-2">
            <Form.Group>
              <Form.Label>No. of Rounds of Interview</Form.Label>
              <Form.Control type="number" placeholder="Rounds" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} className="px-2">
            <Form.Group>
              <Form.Label>Interview Time per Round (hrs)</Form.Label>
              <Form.Control type="number" placeholder="Hours" />
            </Form.Group>
          </Col>
          <Col md={4} className="px-2">
            <Form.Group>
              <Form.Label>Unplanned Leave Days per Interviewer</Form.Label>
              <Form.Control type="number" placeholder="Days" />
            </Form.Group>
          </Col>
          <Col md={4} className="px-2">
            <Form.Group>
              <Form.Label>No. of Months Interview Happens</Form.Label>
              <Form.Control type="number" placeholder="Months" />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-end">
          <Button variant="primary px-5">Calculate</Button>
        </div>
      </Form>

      {/* Results Table Using React Data Table */}
      <div className="results-section">
        <h4 className="mb-3">Calculated Section</h4>
        <div
          
        >
          <DataTable
            columns={columns}
            data={resultData}
            striped
            dense
            persistTableHead
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: "#f1f5fb",
                  fontSize: "16px",
                  fontWeight: "bold",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  whiteSpace: "nowrap",
                },
              },
              rows: {
                style: {
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  whiteSpace: "nowrap",
                },
              },
              cells: {
                style: {
                  fontSize: "14px",
                },
              },
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default InterviewBandwidth;
