import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import Icons from "Utils/Icons"; // Adjust path as needed
import { useLocation, useNavigate } from "react-router-dom";
import { useCommonState } from "Components/CustomHooks";

const Creatmodel = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planIds, setPlanIds] = useState([]);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null); // ✅ For inline message
  const navigate = useNavigate();
  const location = useLocation();
  const { commonState } = useCommonState();
  const { user_role, user_id } = commonState?.app_data;

  const [formData, setFormData] = useState({
    hiring_plan_id: "",
    client_name: "",
    requisition_date: "",
    due_requisition_date: "",
    requisition_template: "",
    no_of_openings: "",
  });


  useEffect(() => {
    if (show) {
      setStatusMessage(null);
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

  const handleChange = async(e) => {
    const { name, value } = e.target;

    if (name === "hiring_plan_id") {
  try {
    const res = await axios.post("https://api.pixeladvant.com/api/hiringplan/detail/", {
      Planning_id: value
    });

    if (res?.data?.success) {
      const hiringData = res?.data?.data;

      const updates = {};
      if (hiringData?.no_of_openings !== undefined) {
        updates.no_of_openings = hiringData.no_of_openings;
      }
      if (hiringData?.client_name !== undefined && hiringData?.client_name !== null) {
        updates.client_name = hiringData.client_name;
      }

      setFormData(prev => ({
        ...prev,
        ...updates
      }));
    }
  } catch (err) {
    console.error("Hiring plan fetch error:", err);
  }
}

    if (name === "no_of_openings") {
      const number = parseInt(value, 10);
      if (number < 1 || number > 1000) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const {
      hiring_plan_id = "",
      client_name,
      requisition_date,
      due_requisition_date,
      requisition_template ="",
      no_of_openings,
    } = formData;
    localStorage.setItem("createreqformData", JSON.stringify(formData));
    localStorage.setItem("clientName", client_name);
    localStorage.setItem("reqDate",requisition_date)
    localStorage.setItem("reqDueDate",due_requisition_date)
    localStorage.setItem("plan_id", hiring_plan_id);
    if (
      !requisition_date ||
      !due_requisition_date ||
      !no_of_openings ||
      !client_name
    ) {
      setStatusMessage({
        type: "danger",
        text: "Please fill all required fields.",
      });
      return;
    }

    const payload = {
      Planning_id: hiring_plan_id,
      HiringManager: user_id,
      requisition_date,
      due_requisition_date,
      requisition_template,
      client_name,
      no_of_openings: parseInt(no_of_openings),
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.pixeladvant.com/api/jobrequisition/",
        payload
      );

      if (res?.data?.success) {
        const requisitionIdFromAPI = res.data.data?.RequisitionID;
        setStatusMessage({
          type: "success",
          text: "Job requisition created successfully!",
        });


        navigate("/hiring_manager/job_requisition", {
          state: {
            hiring_plan_id,
            requisition_date,
            due_requisition_date,
            requisition_date,
            no_of_openings,
            client_name,
            requisition_template,
            reqid: requisitionIdFromAPI,
          },
        });
          setFormData({
          hiring_plan_id: "",
          requisition_date: "",
          due_requisition_date: "",
          requisition_template: "",
          client_name,
          no_of_openings: "",
        });
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

const getMaxDueDate = (requisitionDateStr) => {
  if (!requisitionDateStr) return "";
  const date = new Date(requisitionDateStr);
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split("T")[0]; 
};

useEffect(()=>{
  setFormData({
    hiring_plan_id: "",
    client_name: "",
    requisition_date: "",
    due_requisition_date: "",
    requisition_template: "",
    no_of_openings: "",
  })
},[show])


  return (
    <>
      <Button  className="btn-brand-color" onClick={() => setShow(true)}>
        {Icons?.CreateNew || "+"} Create New
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName="modal-390"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Job Requisition</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* Planning ID */}
            <Form.Group className="mb-3">
              <Form.Label>Planning ID</Form.Label>
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

            {/*client name */}
            <Form.Group className="mb-3">
              <Form.Label>
                Client name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                placeholder="Enter client name"
              />
            </Form.Group>

            {/* Requisition Date */}
            <Form.Group className="mb-3">
              <Form.Label>
                Date of Requisition <span className="text-danger">*</span>
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
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleChange}
                />
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
  min={
    formData.requisition_date || new Date().toISOString().split("T")[0]
  }
  max={
    formData.requisition_date ? getMaxDueDate(formData.requisition_date) : ""
  }
  onChange={handleChange}
/>
              </div>
            </Form.Group>

            {/* Template Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Job Requisition Template</Form.Label>
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
                min={1}
                max={1000}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="flex-column">
          {statusMessage && (
            <div
              className={`text-${statusMessage.type} w-100 text-center mb-2`}
            >
              {statusMessage.text}
            </div>
          )}
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
