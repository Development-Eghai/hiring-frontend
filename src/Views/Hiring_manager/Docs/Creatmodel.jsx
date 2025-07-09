import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import Icons from "Utils/Icons"; // Adjust path as needed
import { useNavigate } from "react-router-dom";

const Creatmodel = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planIds, setPlanIds] = useState([]);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null); // ✅ For inline message
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hiring_plan_id: "",
    requisition_date: "",
    due_requisition_date:"",
    requisition_template: "",
    no_of_openings: "",
  });

  useEffect(() => {
    if (show) {
      setStatusMessage(null); // Clear message
      fetchPlanIds();
      fetchJobTemplates();
    }
  }, [show]);

  const fetchPlanIds = async () => {
    try {
      const res = await axios.post(
        "https://api.pixeladvant.com/get_plan_id_position_role/",
        {}
      );
      const data = res?.data?.data;

      if (Array.isArray(data) && data.length) {
        setPlanIds(data);
        sessionStorage.setItem("planData", JSON.stringify(data));
      } else {
        setPlanIds([]);
      }
    } catch (err) {
      console.error("Plan ID fetch error:", err);
      setPlanIds([]);
    }
  };

  const fetchJobTemplates = async () => {
    try {
      const res = await axios.get("https://api.pixeladvant.com/reqs/ids/");
      const data = res?.data?.data;

      if (Array.isArray(data)) {
        setTemplateOptions(data);
      } else {
        setTemplateOptions([]);
      }
    } catch (err) {
      console.error("Template fetch error:", err);
      setTemplateOptions([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const {
      hiring_plan_id,
      requisition_date,
      due_requisition_date,
      requisition_template,
      no_of_openings,
    } = formData;
    
    if(requisition_template){
      localStorage.setItem("reqtempid",requisition_template)
    }
    if (
      !hiring_plan_id ||
      !requisition_date ||
      !due_requisition_date ||
      !no_of_openings
    ) {
      setStatusMessage({
        type: "danger",
        text: "Please fill all required fields.",
      });
      return;
    }
    
    const payload = {
      hiring_plan_id,
      requisition_date,
      due_requisition_date,
      requisition_template,
      no_of_openings: parseInt(no_of_openings),
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.pixeladvant.com/manage-requisition/",
        payload
      );

      if (res?.data?.success) {
        setStatusMessage({
          type: "success",
          text: "Job requisition created successfully!",
        });
        setFormData({
          hiring_plan_id: "",
          requisition_date: "",
          due_requisition_date:"",
          requisition_template: "",
          no_of_openings: "",
        });
        
        res?.data?.data && localStorage.setItem("createrequisitiondata",JSON.stringify(res?.data?.data))
        navigate("/hiring_manager/job_requisition")
        // You can close modal after success if needed:
        // setTimeout(() => setShow(false), 1000);
      } else {
        setStatusMessage({
          type: "danger",
          text: "Failed to create job requisition.",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatusMessage({
        type: "danger",
        text: "An error occurred during submission.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        {Icons?.CreateNew || "+"} Create New
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName="modal-390"
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage Job Requisition</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* Planning ID */}
            <Form.Group className="mb-3">
              <Form.Label>
                Planning ID <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="hiring_plan_id"
                value={formData.hiring_plan_id}
                onChange={handleChange}
                disabled={loading || planIds.length === 0}
              >
                <option value="">Select Planning ID</option>
                {planIds.map((id, idx) => (
                  <option key={idx} value={id}>
                    {id}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Requisition Date */}
            <Form.Group className="mb-3">
              <Form.Label>
               start Date of Requisition <span className="text-danger">*</span>
              </Form.Label>

              <div
                className="position-relative"
                onClick={() =>
                  document
                    .getElementById("requisitionDateInput")
                    ?.showPicker?.()
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Control
                  type="date"
                  name="requisition_date"
                  id="requisitionDateInput"
                  value={formData.requisition_date}
                  onChange={handleChange}
                  
                />
                {/* <FaCalendarAlt
                  className="position-absolute text-muted"
                  style={{
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                /> */}
              </div>
            </Form.Group>

            {/* Requisition due Date */}
            <Form.Group className="mb-3">
              <Form.Label>
               Due Date of Requisition <span className="text-danger">*</span>
              </Form.Label>

              <div
                className="position-relative"
                onClick={() =>
                  document
                    .getElementById("requisitionDueDateInput")
                    ?.showPicker?.()
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Control
                  type="date"
                  name="due_requisition_date"
                  id="requisitionDueDateInput"
                  value={formData.due_requisition_date}
                  onChange={handleChange}
                  
                />
              </div>
            </Form.Group>

            {/* Template Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>
                Job Requisition Template <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="requisition_template"
                value={formData.requisition_template}
                onChange={handleChange}
                disabled={loading || templateOptions.length === 0}
              >
                <option value="">Select Template</option>
                {templateOptions.map((item, idx) => (
                  <option key={idx} value={item.req_ids}>
                    {item.job_position}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* No of Openings */}
            <Form.Group className="mb-3">
              <Form.Label>
                Number of Openings <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="no_of_openings"
                value={formData.no_of_openings}
                onChange={handleChange}
                placeholder="Enter number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="flex-column">
          {/* {statusMessage && (
            <div
              className={`text-${statusMessage.type} w-100 text-center mb-2`}
            >
              {statusMessage.text}
            </div>
          )} */}
          <Button
            variant="primary"
            className="w-100"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        .modal-390 .modal-dialog {
          max-width: 390px;
        }
      `}</style>
    </>
  );
};

export default Creatmodel;
