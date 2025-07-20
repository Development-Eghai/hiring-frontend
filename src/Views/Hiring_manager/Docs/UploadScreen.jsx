import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import axiosInstance from "Services/axiosInstance";
import { FaEdit, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const UploadScreen = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [calenderList, setCalenderList] = useState([]);
  const [planIdsList, setPlanIdsList] = useState([]);
  const [reqIdsList, setReqIdsList] = useState([]);
  const [slotDate, setSlotDate] = useState(null);
  const [slotStart, setSlotStart] = useState(null);
  const [slotEnd, setSlotEnd] = useState(null);
  const [slots, setSlots] = useState([]);
  const [editSlots, setEditSlots] = useState([]);

  const [getinterviewdetails, setgetinterviewdetails] = useState([]);
  const [planIds, setPlanIds] = useState();
  const [reqId, setReqId] = useState();

  const [clientid, setClientId] = useState("");
  const [clientname, setClientName] = useState("");
  const [deletee, setdelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditDate, setSelectedEditData] = useState({});

  const [showuploadmodal, setShowUploadModal] = useState(false);

  const [file, setFile] = useState(null);
  const handleAddSlot = () => {
    if (slotDate && slotStart && slotEnd) {
      const newSlot = {
        date: slotDate.toISOString().split("T")[0],
        start_time: slotStart.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        end_time: slotEnd.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };
      setSlots([...slots, newSlot]);
      setSlotDate(null);
      setSlotStart(null);
      setSlotEnd(null);
    }
  };

  const handleEditAddSlot = () => {
    if (slotDate && slotStart && slotEnd) {
      const newSlot = {
        date: slotDate.toISOString().split("T")[0],
        start_time: slotStart.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        end_time: slotEnd.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };
      setEditSlots([...editSlots, newSlot]);
      setSlotDate(null);
      setSlotStart(null);
      setSlotEnd(null);
    }
  };

  const handleAddModal = (candidate) => {
    setShowAddModal(true);
  };

  const handleSubmitAddModal = async (formData) => {
    try {
      const dataObject = Object.fromEntries(formData.entries());
      dataObject.slots = slots;
      const response = await axios.post(
        "https://api.pixeladvant.com/api/interviewers/",
        dataObject
      );
      if (response?.data?.success) {
        setShowAddModal(false);
        setClientId("");
        setClientName("");
      }
    } catch (err) {
      console.error("Error create calender table data", err);
    }
  };

  const handleSubmitEditModal = async (formData, interviewer_id) => {
    try {
      const dataObject = Object.fromEntries(formData.entries());
      dataObject.slots = editSlots;
      dataObject.interviewer_id = interviewer_id;
      const response = await axios.put(
        "https://api.pixeladvant.com/api/interviewers/",
        dataObject
      );
      if (response?.data?.success) {
        setShowEditModal(false);
      }
    } catch (err) {
      console.error("Error update calender table data", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://api.pixeladvant.com/api/interviewers/"
        );

        if (response?.data?.success) {
          setCalenderList(response?.data?.data);
        }
      } catch (err) {
        console.error("Error fetching calender table data", err);
      }
    };

    fetchData();
  }, [showDeleteModal, deletee, showAddModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (err) {
        console.error("Error fetching calender table data", err);
      }
    };

    fetchData();
  }, []);

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
    if (reqId) {
      const getClientdetails = async () => {
        const getclientdetails = await axios.post(
          "https://api.pixeladvant.com/api/client-lookup/",
          {
            plan_id: planIds,
            req_id: reqId,
          }
        );
        if (getclientdetails?.data?.success) {
          setClientId(getclientdetails?.data?.data?.client_id);
          setClientName(getclientdetails?.data?.data?.client_name);
        }
        const response = await axiosInstance.post(
          "https://api.pixeladvant.com/api/job/metadata/",
          {
            plan_id: planIds,
            req_id: reqId,
          }
        );

        if (response?.data?.success) {
          setgetinterviewdetails(response?.data?.data);
        }
      };
      getClientdetails();
    }
  }, [reqId, planIds]);
  const handleRemoveSlot = (index) => {
    const updatedSlots = [...slots];
    updatedSlots.splice(index, 1);
    setSlots(updatedSlots);
  };
  const handleRemoveeditSlot = (index) => {
    const updatedSlots = [...editSlots];
    updatedSlots.splice(index, 1);
    setEditSlots(updatedSlots);
  };

  const handleEdit = async (item) => {
    setShowEditModal(true);

    const response = await axiosInstance.post(
      "https://api.pixeladvant.com/api/job/metadata/",
      {
        plan_id: item?.plan_id,
        req_id: item?.req_id,
      }
    );

    item.interview_stage = response?.data?.data?.interviewer_stage || [];

    setSelectedEditData(item);
    setEditSlots(item?.slots);
  };

  const handleDelete = async (interviewer_id) => {
    try {
      const response = await axios.delete(
        "https://api.pixeladvant.com/api/interviewers/",
        {
          data: {
            interviewer_id,
          },
        }
      );
      if (response?.data?.success) {
        setdelete(true);
      }
    } catch (err) {
      console.error("Error fetching recruiter table data", err);
    }
  };

  return (
    <Container fluid className="p-4 bg-light rounded">
      <div className="row d-flex justify-content-between">
        <div className="col-2">
          <h4 className="mb-4 text-primary">Interview Calendar</h4>
        </div>

        <div className="col-2">
          <Button
            variant="success"
            size="sm"
            className="me-2"
            onClick={handleAddModal}
          >
            Add
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="me-2"
            onClick={() => setShowUploadModal(true)}
          >
            Upload
          </Button>
        </div>
      </div>
      <Table
        responsive
        bordered
        hover
        className="bg-white shadow-sm rounded text-center align-middle"
      >
        <thead className="bg-secondary text-white">
          <tr>
            <th>S.No</th>
            <th>Req ID</th>
            <th>Client ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
            <th>Interview Mode</th>
            <th>Interviewer Stages</th>
            <th>Email ID</th>
            {/* <th>Contact Number</th> */}
            <th>Slots</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {calenderList.map((item, idx) => (
            <tr key={item?.interviewer_id}>
              <td>{idx + 1}</td>
              <td>{item?.req_id}</td>
              <td>{item?.client_id}</td>
              <td>{item?.first_name}</td>
              <td>{item?.last_name}</td>
              <td>{item?.job_title}</td>
              <td>{item?.interview_mode}</td>
              <td>{item?.interviewer_stage}</td>
              <td>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </td>
              {/* <td>{item.contact}</td> */}
              <td>
                {item?.slots?.map((row, index) => (
                  <span key={index} className="badge bg-primary me-1 mb-1">
                    {row?.date} ({row?.start_time} - {row?.end_time})
                  </span>
                ))}
              </td>{" "}
              <td>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "100%" }}
                >
                  <FaEdit
                    style={{
                      cursor: "pointer",
                      color: "#0d6efd",
                      marginRight: "10px",
                    }}
                    onClick={() => handleEdit(item)}
                  />
                  <FaTrash
                    style={{ cursor: "pointer", color: "#dc3545" }}
                    onClick={() => handleDelete(item?.interviewer_id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* create modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Interview Calender</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="calenderForm">
            {/* Existing Fields */}
            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Req ID</label>
                <select
                  className="form-select"
                  name="req_id"
                  onChange={(e) => setReqId(e.target.value)}
                >
                  <option value="">Select Req ID</option>
                  {reqIdsList.map((id) => (
                    <option value={id}>{id}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label>Planning ID</label>
                <select
                  className="form-select"
                  name="planningId"
                  onChange={(e) => setPlanIds(e.target.value)}
                >
                  <option value="">Select Planning ID</option>
                  {planIdsList.map((id) => (
                    <option value={id}>{id}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Client ID</label>
                <input
                  className="form-control"
                  name="client_id"
                  readOnly
                  defaultValue={clientid}
                />
              </div>
              <div className="col">
                <label>Client Name</label>
                <input
                  className="form-control"
                  name="client_name"
                  defaultValue={clientname}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Job Title</label>
                <input
                  className="form-control"
                  name="job_title"
                  readOnly
                  defaultValue={getinterviewdetails?.job_position}
                />
              </div>
              <div className="col">
                <label>Interview Mode</label>
                <input
                  className="form-control"
                  name="interview_mode"
                  defaultValue={getinterviewdetails?.interview_mode?.[0] || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>First Name</label>
                <input className="form-control" name="first_name" />
              </div>
              <div className="col">
                <label>Last Name</label>
                <input className="form-control" name="last_name" />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Interview Stage</label>
                <select className="form-control" name="interviewer_stage">
                  <option value={""}>Select Stage</option>
                  {Array.isArray(getinterviewdetails?.interviewer_stage) &&
                    getinterviewdetails.interviewer_stage.length > 0 &&
                    getinterviewdetails.interviewer_stage.map((row, index) => (
                      <option key={index} value={row}>
                        {row}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col">
                <label>Email</label>
                <input className="form-control" name="email" />
              </div>
            </div>
            <hr />
            <h6>Add Interview Slots</h6>

            <div className="row mb-2 d-flex gap-3 align-items-center">
              <div className="col">
                <label>Select Date</label>
                <DatePicker
                  selected={slotDate}
                  onChange={(d) => setSlotDate(d)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  placeholderText="Date"
                />
              </div>
              <div className="col">
                <label>Start Time</label>
                <DatePicker
                  selected={slotStart}
                  onChange={(t) => setSlotStart(t)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Start"
                  dateFormat="HH:mm:ss"
                  className="form-control"
                  placeholderText="Start Time"
                />
              </div>
              <div className="col">
                <label>End Time</label>
                <DatePicker
                  selected={slotEnd}
                  onChange={(t) => setSlotEnd(t)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="End"
                  dateFormat="HH:mm:ss"
                  className="form-control"
                  placeholderText="End Time"
                />
              </div>
              <div className="col-auto mt-4">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleAddSlot}
                >
                  + Add Slot
                </button>
              </div>
            </div>

            {/* Display slots */}
            {slots.length > 0 && (
              <div className="mb-2">
                {slots.map((s, i) => (
                  <span key={i} className="badge bg-primary me-1 mb-1">
                    {s.date} ({s.start_time} - {s.end_time})
                    <button
                      type="button"
                      className="btn-close btn-close-white btn-sm ms-2"
                      aria-label="Close"
                      onClick={() => handleRemoveSlot(i)}
                      style={{ fontSize: "0.6rem" }}
                    ></button>
                  </span>
                ))}
              </div>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowAddModal(false)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const form = document.getElementById("calenderForm");
              const formData = new FormData(form);
              handleSubmitAddModal(formData);
            }}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>

      {/* edit modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Interview Calender Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="calenderForm">
            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Req ID</label>
                <input
                  className="form-control"
                  name="req_id"
                  defaultValue={selectedEditDate?.req_id}
                  readOnly
                />
              </div>
              <div className="col">
                <label>Planning ID</label>
                <input
                  className="form-control"
                  name="plan_id"
                  defaultValue={selectedEditDate?.plan_id}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Client ID</label>
                <input
                  className="form-control"
                  name="client_id"
                  readOnly
                  defaultValue={selectedEditDate?.client_id}
                />
              </div>
              <div className="col">
                <label>Client Name</label>
                <input
                  className="form-control"
                  name="client_name"
                  defaultValue={selectedEditDate?.client_name}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Job Title</label>
                <input
                  className="form-control"
                  name="job_title"
                  readOnly
                  defaultValue={selectedEditDate?.job_title}
                />
              </div>
              <div className="col">
                <label>Interview Mode</label>
                <input
                  className="form-control"
                  name="interview_mode"
                  defaultValue={selectedEditDate?.interview_mode}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>First Name</label>
                <input
                  className="form-control"
                  name="first_name"
                  defaultValue={selectedEditDate?.first_name}
                />
              </div>
              <div className="col">
                <label>Last Name</label>
                <input
                  className="form-control"
                  name="last_name"
                  defaultValue={selectedEditDate?.last_name}
                />
              </div>
            </div>

            <div className="row mb-2 d-flex gap-3">
              <div className="col">
                <label>Interview Stage</label>
                <select
                  className="form-control"
                  name="interviewer_stage"
                  defaultValue={selectedEditDate?.interviewer_stage || ""}
                >
                  <option value={""}>Select Stage</option>
                  {Array.isArray(selectedEditDate?.interview_stage) &&
                    selectedEditDate.interview_stage.length > 0 &&
                    selectedEditDate.interview_stage.map((row, index) => (
                      <option key={index} value={row}>
                        {row}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  defaultValue={selectedEditDate?.email}
                />
              </div>
            </div>
            <hr />
            <h6>Add Interview Slots</h6>

            <div className="row mb-2 d-flex gap-3 align-items-center">
              <div className="col">
                <label>Select Date</label>
                <DatePicker
                  selected={slotDate}
                  onChange={(d) => setSlotDate(d)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  placeholderText="Date"
                />
              </div>
              <div className="col">
                <label>Start Time</label>
                <DatePicker
                  selected={slotStart}
                  onChange={(t) => setSlotStart(t)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Start"
                  dateFormat="HH:mm"
                  className="form-control"
                  placeholderText="Start Time"
                />
              </div>
              <div className="col">
                <label>End Time</label>
                <DatePicker
                  selected={slotEnd}
                  onChange={(t) => setSlotEnd(t)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="End"
                  dateFormat="HH:mm"
                  className="form-control"
                  placeholderText="End Time"
                />
              </div>
              <div className="col-auto mt-4">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleEditAddSlot}
                >
                  + Add Slot
                </button>
              </div>
            </div>

            {/* Display slots */}
            {editSlots.length > 0 && (
              <div className="mb-2">
                {editSlots.map((s, i) => (
                  <span key={i} className="badge bg-primary me-1 mb-1">
                    {s.date} ({s.start_time} - {s.end_time})
                    <button
                      type="button"
                      className="btn-close btn-close-white btn-sm ms-2"
                      aria-label="Close"
                      onClick={() => handleRemoveeditSlot(i)}
                      style={{ fontSize: "0.6rem" }}
                    ></button>
                  </span>
                ))}
              </div>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowEditModal(false)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const form = document.getElementById("calenderForm");
              const formData = new FormData(form);
              handleSubmitEditModal(formData, selectedEditDate?.interviewer_id);
            }}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>

      {/* delete pop-up */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Body>
          <p>Are you Sure You want to delete this record</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={""}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* upload modal */}
      <Modal show={showuploadmodal} onHide={() => setShowUploadModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Excel File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={""}>
            <Form.Group controlId="formFile">
              <Form.Label>Select Excel File (.xlsx or .xls)</Form.Label>
              <Form.Control
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <div className="mt-3 d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={() => setShowUploadModal}
                className="me-2"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Upload
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UploadScreen;
