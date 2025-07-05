import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "Services/axiosInstance";

const InterviewBandwidth = () => {
  const [formData, setFormData] = useState({
    no_of_roles_to_hire: "",
    conversion_ratio: "",
    offer_decline: "",
    elimination: "",
    avg_interviewer_time_per_week_hrs: "",
    interview_round: "",
    interview_time_per_round: "",
    interviewer_leave_days: "",
    no_of_month_interview_happens: "",
  });

  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { name: "Metrics", selector: (row) => row.metric, grow: 3, wrap: true },
    { name: "Values", selector: (row) => row.value, grow: 1, center: true },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      "no_of_roles_to_hire",
      "conversion_ratio",
      "interview_round",
      "interview_time_per_round",
    ];

    for (const key of requiredFields) {
      if (formData[key] === "") {
        toast.warn(`Please fill out ${key.replace(/_/g, " ")}`);
        return false;
      }
    }
    return true;
  };

  const safeNumber = (val) => val !== "" ? Number(val) : null;

  const handleCalculate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setResultData([]);

    try {
      const payload = {
        ...formData,
        no_of_roles_to_hire: safeNumber(formData.no_of_roles_to_hire),
        conversion_ratio: safeNumber(formData.conversion_ratio),
        offer_decline: safeNumber(formData.offer_decline),
        elimination: safeNumber(formData.elimination),
        avg_interviewer_time_per_week_hrs: safeNumber(formData.avg_interviewer_time_per_week_hrs),
        interview_round: safeNumber(formData.interview_round),
        interview_time_per_round: safeNumber(formData.interview_time_per_round),
        interviewer_leave_days: safeNumber(formData.interviewer_leave_days),
        no_of_month_interview_happens: safeNumber(formData.no_of_month_interview_happens),

        // Static values
        dead_line_days: 10,
        working_hours_per_day: 8,
        working_hrs_per_week: 40,
      };

      const res = await axiosInstance.post("/interview_planner_calc/", payload);

      if (res.data.success) {
        const data = res.data.data;
        const results = [
          { metric: "Candidates Required", value: data.required_candidate },
          { metric: "Decline Adjusted Count", value: data.decline_adjust_count },
          { metric: "Total Candidate Pipeline", value: data.total_candidate_pipline },
          { metric: "Total Interviews Needed", value: data.total_interviews_needed },
          { metric: "Total Interview Hours", value: data.total_interview_hrs },
          { metric: "Working Hours per Week", value: data.working_hrs_per_week },
          { metric: "Total Interview Weeks", value: data.total_interview_weeks },
          { metric: "No. of Interviewers Needed", value: data.no_of_interviewer_need },
          { metric: "Leaves Adjustment", value: data.leave_adjustment },
        ];
        setResultData(results);
        toast.success("Calculation completed successfully!");
      } else {
        toast.error("API responded with an error.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <ToastContainer />
      <h3 className="mb-4 text-center">Interviewer Bandwidth Calculator</h3>

      <Form className="mb-5">
        <Row className="mb-3 gap-2">
          <Col>
            <Form.Group>
              <Form.Label>No. of Roles to Hire *</Form.Label>
              <Form.Control
                type="number"
                name="no_of_roles_to_hire"
                value={formData.no_of_roles_to_hire}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Conversion Ratio *</Form.Label>
              <Form.Control
                type="number"
                name="conversion_ratio"
                value={formData.conversion_ratio}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Offer Decline %</Form.Label>
              <Form.Control
                type="number"
                name="offer_decline"
                value={formData.offer_decline}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3 gap-2">
          {/* <Col>
            <Form.Group>
              <Form.Label>Elimination %</Form.Label>
              <Form.Control
                type="number"
                name="elimination"
                value={formData.elimination}
                onChange={handleChange}
              />
            </Form.Group>
          </Col> */}

          <Col>
            <Form.Group>
              <Form.Label>Avg Interviewer Time/Week (hrs)</Form.Label>
              <Form.Control
                type="number"
                name="avg_interviewer_time_per_week_hrs"
                value={formData.avg_interviewer_time_per_week_hrs}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>No. of Interview Rounds *</Form.Label>
              <Form.Control
                type="number"
                name="interview_round"
                value={formData.interview_round}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Time per Round (hrs) *</Form.Label>
              <Form.Control
                type="number"
                name="interview_time_per_round"
                value={formData.interview_time_per_round}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3 gap-2">
          <Col>
            <Form.Group>
              <Form.Label>Unplanned Leave Days</Form.Label>
              <Form.Control
                type="number"
                name="interviewer_leave_days"
                value={formData.interviewer_leave_days}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Interview Duration (Months)</Form.Label>
              <Form.Control
                type="number"
                name="no_of_month_interview_happens"
                value={formData.no_of_month_interview_happens}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-end">
          <Button variant="primary" onClick={handleCalculate} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Calculate"}
          </Button>
        </div>
      </Form>

      {resultData.length > 0 && (
        <div className="results-section">
          <h4 className="mb-3">Calculated Results</h4>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
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
                  },
                },
                rows: {
                  style: {
                    fontSize: "14px",
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default InterviewBandwidth;
