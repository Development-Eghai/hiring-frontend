import React, { useEffect, useState } from "react";
import { Table, Container, Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
// import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ReportHeader from "../Hiring_manager_utils/Navbar";
import axios from "axios";

const CompensationDetailsReport = () => {
  const [reportData,setReportData] = useState([]);
  const [show,setshow] = useState(false);
  const [dropdowns,setdropdowns] = useState([]);
  const [filters, setFilters] = useState({
    client_name: "",
    location: "",
    min_salary: "",
    max_salary: "",
    start_date: "",
    end_date: ""
  });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      client_name: "",
      location: "",
      min_salary: "",
      max_salary: "",
      start_date: "",
      end_date: ""
    });
  };

  const onApply = () => {
    fetchData()
    setshow(false)
  };

  const fetchData = async ()=>{
  try {
    const response = await axios.post("https://api.pixeladvant.com/api/offer-report/",filters);

    const {data,success,message} =response?.data;

    if(success){
      setReportData(data)
      console.log(data,"dasdasd")
    }
  } catch (error) {
    
  }
}
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


useEffect(()=>{
  fetchData()
},[])


  const exportToExcel = async() => {
    try  {
      const response = await axios.get(
        "https://api.pixeladvant.com/report/export-offer/",
        {
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "compension report.xlsx";

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
      <Card className="border-0 rounded-4">
        <Card.Header className=" text-white fw-bold fs-5 rounded-top-4 d-flex justify-content-between">
          <h6 className="fw-bold mb-0 p-2 text-dark">Compensation Report</h6>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={() => setshow(true)}>
              Filter
            </Button>
            <Button variant="success" onClick={exportToExcel}>
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
              {reportData?.length > 0 ? (
                reportData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Client_Name}</td>
                    <td>{row.Candidate_Name}</td>
                    <td>{row.Position_Offered}</td>
                    <td>{row.Department}</td>
                    <td>{row.Recruiter_Name}</td>
                    <td>{row.Location}</td>
                    <td>{row.Offer_Date}</td>
                    <td className="fw-bold text-success">
                      {row.Offered_Salary.toLocaleString()}
                    </td>
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
          <Modal.Title>Filter Jobs</Modal.Title>
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
                  <Form.Label>Location</Form.Label>
                  <Form.Select
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                    placeholder="Enter Location"
                  >
                    <option value="">-- Select location --</option>
                    {dropdowns?.location?.map((val, ind) => (
                      <option key={ind} value={val.value}>
                        {val.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Minimum Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="min_salary"
                    value={filters.min_salary}
                    onChange={handleChange}
                    placeholder="Enter Minimum Salary"
                  />
                </Form.Group>
              </Col>

              {/* Right Column */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Maximum Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="max_salary"
                    value={filters.max_salary}
                    onChange={handleChange}
                    placeholder="Enter Maximum Salary"
                  />
                </Form.Group>

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
