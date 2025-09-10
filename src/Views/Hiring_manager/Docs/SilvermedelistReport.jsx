
import React, { useEffect, useState } from "react";
import { Table, Container, Card } from "react-bootstrap";
import ReportHeader from "../Hiring_manager_utils/Navbar";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { saveAs } from "file-saver";

const SilvermedelistReport = () => {
  // Example data (replace with API response)
  const [reportData,setReportData] = useState([]);
  const [dropdowns,setdropdowns] = useState([]);
  const [show,setshow] = useState(false);

  const [filters, setFilters] = useState({
    client_name: "",
    position_considered_for: "",
    recruiter_name: "",
    start_date: "",
    end_date: "",
    skills_expertise: ""
  });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      client_name: "",
      position_considered_for: "",
      recruiter_name: "",
      start_date: "",
      end_date: "",
      skills_expertise: ""
    });
  };

  
    const fetchDropdownData = async() => {
  try {
    const response = await axios.get("https://api.pixeladvant.com/report/dropdowns/");
  
    const {success,data} = response?.data;
  
    if(success){
      setdropdowns(data);
    }
  } catch (error) {
    
  }
    }
  
    useEffect(()=>{
  fetchDropdownData()
    },[])


const fetchData = async ()=>{
  try {
    const response = await axios.post("https://api.pixeladvant.com/api/candidate-feedback/",filters);

    const {data,success,message} =response?.data;

    if(success){
      setReportData(data)
    }
  } catch (error) {
    
  }
}
  useEffect(() => {
    fetchData();
  }, []);

  const onApply = () => {
    fetchData();
    setshow(false)
  };

    const exportToExcel = async() => {
    try  {
      const response = await axios.get(
        "https://api.pixeladvant.com/api/candidate-feedback/export/",
        {
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "feedback report.xlsx";

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
      <ReportHeader />
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className=" text-white fw-bold fs-5 rounded-top-4 p-3">
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold mb-0 p-2 text-dark">Silver medalist</h6>
            <div className="d-flex gap-3">
              <Button variant="outline-secondary" onClick={() => setshow(true)}>
                Filter
              </Button>
              <Button
                size="sm"
                className="me-2 btn btn-success"
                onClick={exportToExcel}
              >
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
              {reportData?.length > 0 ? (
                reportData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Client_ID}</td>
                    <td>{row.Client_Name}</td>
                    <td>{row.Candidate_First_Name}</td>
                    <td>{row.Candidate_Last_Name}</td>
                    <td>{row.Position_Considered_For}</td>
                    <td>{row.Hiring_Manager}</td>
                    <td>{row.recruiter_name}</td>
                    <td>{row.interview_date}</td>
                    <td>{row.assessment_score}</td>
                    <td>{row.interviewer_feedback}</td>
                    <td>{row.recruiter_feedback}</td>
                    <td className="text-danger fw-bold">
                      {row.reason_not_selected}
                    </td>
                    <td>{row.skills}</td>
                    <td>{row.current_employer}</td>
                    <td>{row.current_location}</td>
                    <td>{row.last_ctc}</td>
                    <td
                      className={
                        row.status === "Selected"
                          ? "text-success fw-bold"
                          : "text-danger fw-bold"
                      }
                    >
                      {row.status}
                    </td>
                    <td>{row.follow_up_date}</td>
                    <td>{row.notes}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={() => setshow(false)}
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Candidates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              {/* Left Column */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Select
                    name="client_name"
                    value={filters.client_name}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Client Name --</option>
                    {dropdowns?.client_name?.map((val, ind) => (
                      <option key={ind} value={val.value}>
                        {val.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Position Considered For</Form.Label>
                  <Form.Select
                    type="text"
                    name="position_considered_for"
                    value={filters.position_considered_for}
                    onChange={handleChange}
                    placeholder="Enter Position"
                  >
                    <option value="">-- Select Position --</option>
                    {dropdowns?.position_offered?.map((val, ind) => (
                      <option key={ind} value={val.value}>
                        {val.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Recruiter Name</Form.Label>
                  <Form.Select
                    type="text"
                    name="recruiter_name"
                    value={filters.recruiter_name}
                    onChange={handleChange}
                    placeholder="Enter Recruiter Name"
                  >
                    <option value="">-- Select Recruiter --</option>
                    {dropdowns?.recruiter_name?.map((val, ind) => (
                      <option key={ind} value={val.value}>
                        {val.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Right Column */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={filters.start_date}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={filters.end_date}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Skills Expertise</Form.Label>
                  <Form.Control
                    type="text"
                    name="skills_expertise"
                    value={filters.skills_expertise}
                    onChange={handleChange}
                    placeholder="Enter Skills (e.g., Python)"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetFilters}>
            Reset
          </Button>
          <Button variant="primary" onClick={onApply}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SilvermedelistReport;
