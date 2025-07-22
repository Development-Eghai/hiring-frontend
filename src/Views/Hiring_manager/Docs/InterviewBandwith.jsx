import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "Services/axiosInstance";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get("edit_id");

  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [planIds, setPlanIds] = useState();
  const [planIdsList, setPlanIdsList] = useState([]);
  const [reqIdsList, setReqIdsList] = useState([]);
  const [reqId, setReqId] = useState();
  const [clientid, setClientId] = useState("");
  const [clientname, setClientName] = useState("");
  const columns = [
    { name: "Metrics", selector: (row) => row.metric, grow: 3, wrap: true },
    { name: "Values", selector: (row) => row.value, grow: 1, center: true },
  ];
  useEffect(() => {
    if (reqId && planIds) {
      const getClientdetails = async () => {
        const getclientdetails = await axios.post(
          "https://api.pixeladvant.com/api/client-lookup/",
          {
            plan_id: planIds,
            req_id: reqId,
          }
        );
        console.log(getclientdetails, "Zca");
        if (getclientdetails?.data?.success) {
          setClientId(getclientdetails?.data?.data?.client_id);
          setClientName(getclientdetails?.data?.data?.client_name);
        }
      };
      getClientdetails();
    }
  }, [reqId, planIds]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const designRes = await axios.get(
          "https://api.pixeladvant.com/design_screen_list_data/"
        );

        if (designRes.data?.success) {
          const { plan_id, requisition_id } = designRes.data.data;
          setPlanIdsList(plan_id || []);
          setReqIdsList(requisition_id || []);
        }
      } catch (error) {
        console.error("Dropdown fetch error:", error);
      }
    };
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (editId) {
      const fetchEditData = async () => {
        try {
          const res = await axios.post(
            "https://api.pixeladvant.com/api/planner/by-id/",
            {
              interview_plan_id: Number(editId),
            }
          );

          if (res.data.success) {
            const data = res.data.data;
            setFormData({
              no_of_roles_to_hire: data.no_of_roles_to_hire || "",
              conversion_ratio: data.conversion_ratio || "",
              offer_decline: data.offer_decline || "",
              elimination: data.elimination || "",
              avg_interviewer_time_per_week_hrs:
                data.avg_interviewer_time_per_week_hrs || "",
              interview_round: data.interview_round || "",
              interview_time_per_round: data.interview_time_per_round || "",
              interviewer_leave_days: data.interviewer_leave_days || "",
              no_of_month_interview_happens:
                data.no_of_month_interview_happens || "",
            });

            setPlanIds(data.hiring_plan_id || "");
            setReqId(data.requisition_id || "");
          } else {
            toast.error("Failed to fetch interview planner data.");
          }
        } catch (error) {
          console.error("Error fetching planner data:", error);
          toast.error("Error fetching planner data.");
        }
      };

      fetchEditData();
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      "planning_id",
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

  const safeNumber = (val) => (val !== "" ? Number(val) : null);

  const handleCalculate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setResultData([]);

    try {
      const payload = {
        ...formData,
        plan_id: planIds,
        req_id: reqId,
        no_of_roles_to_hire: safeNumber(formData.no_of_roles_to_hire) || 0,
        conversion_ratio: safeNumber(formData.conversion_ratio) || 0,
        elimination: safeNumber(formData.elimination) || 0,
        avg_interviewer_time_per_week_hrs:
          safeNumber(formData.avg_interviewer_time_per_week_hrs) || 0,
        interview_round: safeNumber(formData.interview_round) || 0,
        interview_time_per_round:
          safeNumber(formData.interview_time_per_round) || 0,
        interviewer_leave_days:
          safeNumber(formData.interviewer_leave_days) || 0,
        no_of_month_interview_happens:
          safeNumber(formData.no_of_month_interview_happens) || 0,
        offer_decline: safeNumber(formData.offer_decline) || 0,
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
          {
            metric: "Decline Adjusted Count",
            value: data.decline_adjust_count,
          },
          {
            metric: "Total Candidate Pipeline",
            value: data.total_candidate_pipline,
          },
          {
            metric: "Total Interviews Needed",
            value: data.total_interviews_needed,
          },
          { metric: "Total Interview Hours", value: data.total_interview_hrs },
          {
            metric: "Working Hours per Week",
            value: data.working_hrs_per_week,
          },
          {
            metric: "Total Interview Weeks",
            value: data.total_interview_weeks,
          },
          {
            metric: "No. of Interviewers Needed",
            value: data.no_of_interviewer_need,
          },
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

  const handleUpdate = async () => {
  if (!validateForm()) return;

  setLoading(true);

  try {
    const payload = {
      interview_plan_id: Number(editId),
      plan_id: planIds,
      req_id: reqId,
      ...formData,
      no_of_roles_to_hire: safeNumber(formData.no_of_roles_to_hire) || 0,
      conversion_ratio: safeNumber(formData.conversion_ratio) || 0,
      elimination: safeNumber(formData.elimination) || 0,
      avg_interviewer_time_per_week_hrs: safeNumber(formData.avg_interviewer_time_per_week_hrs) || 0,
      interview_round: safeNumber(formData.interview_round) || 0,
      interview_time_per_round: safeNumber(formData.interview_time_per_round) || 0,
      interviewer_leave_days: safeNumber(formData.interviewer_leave_days) || 0,
      no_of_month_interview_happens: safeNumber(formData.no_of_month_interview_happens) || 0,
      offer_decline: safeNumber(formData.offer_decline) || 0,
      dead_line_days: 10,
      working_hours_per_day: 8,
      working_hrs_per_week: 40,
    };

    const res = await axiosInstance.put("/interview_planner_calc/", payload);

    if (res.data.success) {
      toast.success("Updated successfully!");
    } else {
      toast.error("Update failed.");
    }
  } catch (error) {
    console.error("Error during update:", error);
    toast.error("Error during update.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className=" mb-2">
        <Link
          to="/hiring_manager/planning/interviewer_bandwidth_dashboard"
          className="text-decoration-none btn p-2 btn-light"
          type="button"
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 219.151 219.151"
            style={{ enableBackground: "new 0 0 219.151 219.151" }}
            xmlSpace="preserve"
            width="20"
            height="20"
            className="me-2"
          >
            <g>
              <path
                d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
        C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
        c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"
              />
              <path
                d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
        c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
        c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
        c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"
              />
            </g>
          </svg>
          Back to Interviewer bandwidth dashboard
        </Link>
      </div>

      <div className="bg-white rounded p-4">
        <ToastContainer />
        <h3 className="mb-4 text-start">Interviewer Bandwidth Calculator</h3>

        <Form className="mb-5">
          <Row className="mb-4 d-flex gap-3">
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Planning Id <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={planIds}
                  onChange={(e) => setPlanIds(e.target.value)}
                  name="planning_id"
                >
                  <option value="">Select Planning Id</option>
                  {planIdsList.map((id, idx) => (
                    <option key={idx} value={id}>
                      {id}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Requisition ID <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={reqId}
                  onChange={(e) => setReqId(e.target.value)}
                  name="requisition_id"
                >
                  <option value="">Select Req ID</option>
                  {reqIdsList.map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4 d-flex gap-3">
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Client Id</Form.Label>
                <Form.Control type="text" value={clientid} disabled />
              </Form.Group>
            </Col>

            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Client Name</Form.Label>
                <Form.Control type="text" value={clientname} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 d-flex gap-3">
            <Col>
              <Form.Group>
                <Form.Label>
                  No. of Roles to Hire <span className="text-danger">*</span>
                </Form.Label>
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
                <Form.Label>
                  Conversion Ratio <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="conversion_ratio"
                  value={formData.conversion_ratio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 d-flex gap-3">
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
                <Form.Label>
                  No. of Interview Rounds <span className="text-danger">*</span>
                </Form.Label>
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
                <Form.Label>
                  Time per Round (hrs) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="interview_time_per_round"
                  value={formData.interview_time_per_round}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 d-flex gap-3">
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
            <Button
              variant="primary"
              onClick={editId ? handleUpdate : handleCalculate}
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : editId ? (
                "Update"
              ) : (
                "Calculate"
              )}
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
      </div>
    </div>
  );
};

export default InterviewBandwidth;
