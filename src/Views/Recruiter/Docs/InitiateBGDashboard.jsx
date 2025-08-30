import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Select from "react-dropdown-select";
import { useLocation, useNavigate } from "react-router-dom";

const InitiateBG = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeState = location.state;

  const [formState, setFormState] = useState({
    requisition: "",
    candidate: "",
    first_name: "",
    last_name: "",
    email_id: "",
    location: "",
    vendor: "",
    selected_package: "",
    custom_checks: "",
    current_stage: "",
    bg_status: "",
  });
  const [dropdownOptions, setdropDownOptions] = useState({});
  const [summeryModal, setSummeryModal] = useState(false);
  const [bg_details, setBg_details] = useState([]);

  async function fetchFormData() {
    try {
      const response = await axios.post(
        "https://api.pixeladvant.com/api/bg-check/contextual-data/",
        {
          candidate_id: routeState?.candidate_id,
          requisition_id: routeState?.req_id,
        }
      );

      const { success, data } = response?.data;
      if (success) {
        const { vendor_options, package_options, ...restData } = data;

        setdropDownOptions({
          vendor_options,
          package_options,
        });
        setFormState({
          requisition: routeState?.req_id,
          candidate: routeState?.candidate_id,
          ...restData,
        });
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchFormData();
  }, []);

  const verificationData = [
    {
      verification: "Aadhaar Verification",
      created_date: "08 Jun, 2022",
      sufficiency_date: "08 Jun, 2022",
      updated_date: "08 Jun, 2022",
      status: "Success",
    },
    {
      verification: "PAN Card Verification",
      created_date: "22 Dec, 2022",
      sufficiency_date: "22 Dec, 2022",
      updated_date: "22 Dec, 2022",
      status: "Success",
    },
    {
      verification: "Court Record Verification",
      created_date: "08 Jun, 2022",
      sufficiency_date: "09 Jun, 2022",
      updated_date: "09 Jun, 2022",
      status: "Success",
    },
    {
      verification: "Police Verification via Law Firm",
      created_date: "15 Jun, 2022",
      sufficiency_date: "15 Jun, 2022",
      updated_date: "20 Jun, 2022",
      status: "Success",
    },
    {
      verification: "Permanent Address Verification (Postal)",
      created_date: "22 Dec, 2022",
      sufficiency_date: "22 Dec, 2022",
      updated_date: "28 Dec, 2022",
      status: "Success",
    },
  ];

  const handleCloseInitiateModal = () => {
    navigate(routeState?.comesFrom);
  };

  const handleMainChange = async (e) => {
    const { name, value } = e.target;
    if (name === "vendor") {
      try {
        const response = await axios.post(
          "https://api.pixeladvant.com/bg/contextual/checks/",
          { vendor_id: value }
        );
        const { success, data } = response?.data;

        if (success) {
          const { addon_checks } = data;
          await getVendorPackages(value, addon_checks);
        }
      } catch (error) {}
    }
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      selected_package: name === "vendor" ? [] : prev.selected_package,
      custom_checks: name === "vendor" ? [] : prev.custom_checks,
    }));
  };

  const handleSubmit = async () => {
    const new_payload = formState;
    formState.selected_package = formState.selected_package.map((v) => v.id);
    formState.custom_checks = formState.custom_checks.map((v) => v.value);

    try {
      const response = await axios.post(
        "https://api.pixeladvant.com/initiate-bg-check/",
        new_payload
      );

      const { success, data } = response?.data;

      if (success) {
        navigate(routeState?.comesFrom);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getVendorPackages(vendorId, addon_checks) {
    try {
      const response = await axios.post(
        "https://api.pixeladvant.com/bg-check/packages-by-vendor/",
        { vendor_id: vendorId }
      );
      const { success, data } = response?.data;
      if (success) {
        const { package_options } = data;
        let update_package_options = {
          ...dropdownOptions,
          package_options,
          addon_checks,
        };
        setdropDownOptions(update_package_options);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDetails() {
    try {
      const response = await axios.get(
        "https://api.pixeladvant.com/initiate-bg-check/"
      );

      const { success, data } = response?.data;

      if (success) {
        setBg_details(data);
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchDetails();
  }, []);

  const handleRowClick = (a) => {
    setSummeryModal(true);
  };

  return (
    <>
      <Container fluid className="py-4 px-md-5 bg-light min-vh-100">
        <Card className="shadow-sm p-4">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0 text-start">Initate BG Dashboard</h5>
            </div>

            {/* <CandidateApprovalStatus /> */}
          </div>
          <div className="table-responsive">
            <Table
              striped
              bordered
              hover
              size="sm"
              className="text-center align-middle"
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-1">Req ID</th>
                  <th>Candidate ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email ID</th>
                  <th>Location</th>
                  <th>Vendor Name</th>
                  <th>VendorPackage</th>
                  <th>Add on Check</th>
                  <th>Status</th>
                  <th>Decision</th>
                </tr>
              </thead>
              <tbody>
                {bg_details.map((a, i) => (
                  <tr
                    key={i}
                    onClick={() => handleRowClick(a)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="p-3">{a.req_id}</td>
                    <td>{a.candidate_id}</td>
                    <td>{a.first_name}</td>
                    <td>{a.last_name}</td>
                    <td>{a.email_id}</td>
                    <td>{a.location}</td>
                    <td>{a.vendor_name}</td>
                    <td>{a.vendor_package}</td>
                    <td>{a.add_on_check}</td>
                    <td>{a.status}</td>
                    <td>{a.decision}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>

      {/* initiate Modal */}
      <Modal
        show={routeState?.showInitiateModal}
        onHide={handleCloseInitiateModal}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Initiate BG</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="mb-3 d-flex gap-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Req ID</Form.Label>
                <Form.Control
                  name="requisition"
                  value={formState?.requisition || ""}
                  onChange={handleMainChange}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Candidate ID</Form.Label>
                <Form.Control
                  name="candidate"
                  value={formState?.candidate || ""}
                  readOnly
                  onChange={handleMainChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  name="candidate_first_name"
                  value={formState?.candidate_first_name || ""}
                  onChange={handleMainChange}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  value={formState?.candidate_last_name || ""}
                  name="candidate_last_name"
                  readOnly
                  onChange={handleMainChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="candidate_email"
                  value={formState?.candidate_email || ""}
                  readOnly
                  onChange={handleMainChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  value={formState?.location}
                  onChange={handleMainChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Vendor Name</Form.Label>
                <Form.Select
                  name="vendor"
                  value={formState.vendor}
                  onChange={handleMainChange}
                >
                  <option value="">-- Select Vendor name --</option>
                  {Array.isArray(dropdownOptions?.vendor_options) &&
                    dropdownOptions.vendor_options.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Label>Vendor Package</Form.Label>
              <Select
                options={
                  dropdownOptions?.package_options
                    ? dropdownOptions?.package_options.map((v, i) => {
                        return { ...v, value: v.name };
                      })
                    : []
                }
                labelField="name"
                valueField="id"
                multi
                className="form-control"
                values={formState.selected_package || []}
                onChange={(value) =>
                  setFormState((prev) => ({ ...prev, selected_package: value }))
                }
              />
            </Col>

            <Col md={4}>
              <Form.Label>Add on-check</Form.Label>
              <Select
                options={
                  dropdownOptions?.addon_checks
                    ? dropdownOptions?.addon_checks.map((v, i) => {
                        return { ...v, id: i + 1, value: v.name };
                      })
                    : []
                }
                labelField="name"
                valueField="id"
                multi
                className="form-control"
                values={formState.custom_checks || []}
                onChange={(value) =>
                  setFormState((prev) => ({ ...prev, custom_checks: value }))
                }
              />
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Current Stage</Form.Label>
                <Form.Control
                  name="current_stage"
                  value={formState.current_stage}
                  onChange={handleMainChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>BG status</Form.Label>
                <Form.Select
                  name="bg_status"
                  value={formState.bg_status}
                  onChange={handleMainChange}
                >
                  <option value="">-- Select BG status --</option>

                  <option value={"In progress"}>In progress</option>
                  <option value={"In progress"}>Expired </option>
                  <option value={"In progress"}>Completed </option>
                  <option value={"In progress"}>Failed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>

      {/* summary modal */}

      <Modal
        show={summeryModal}
        onHide={() => setSummeryModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Verification Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover responsive>
            <thead style={{ background: "#f0f0f0", fontWeight: "bold" }}>
              <tr>
                <th>Verifications</th>
                <th>Created Date</th>
                <th>Sufficiency Date</th>
                <th>Updated Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {verificationData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.verification}</td>
                  <td>{row.created_date}</td>
                  <td>{row.sufficiency_date}</td>
                  <td>
                    {row.updated_date} <br />
                    <span style={{ color: "#26a69a", fontSize: "12px" }}>
                      COMPLETED
                    </span>
                  </td>
                  <td style={{ color: "green", fontWeight: "bold" }}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSummeryModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InitiateBG;
