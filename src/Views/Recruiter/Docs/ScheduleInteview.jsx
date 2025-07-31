import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Form, Modal, Row, Col, Table, Spinner } from "react-bootstrap";
import { FaEye, FaTrash, FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import RecruiterHeader from "../Recruiter_utils/Navbar";
import axiosInstance from "Services/axiosInstance";
import { toast } from "react-toastify";

const ScheduleInterview = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [guests, setGuests] = useState([]);
  const [interviewRounds, setInterviewRounds] = useState(1);
  const [scheduleSlots, setScheduleSlots] = useState([
    { date: "", time: "", guests: [] },
  ]);
  const [editData, setEditData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [deleteScheduleId, setDeleteScheduleId] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const [interviewers, setInterviewers] = useState([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState("");

  const [mode, setMode] = useState("");
  const [rounds, setRounds] = useState([]);
  const [selectedRoundIndex, setSelectedRoundIndex] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);

  //Get api calll
  useEffect(() => {
    fetchScheduleData();
  }, []);

  const [data, setData] = useState([]);

  const fetchScheduleData = async () => {
    try {
      const res = await axiosInstance.get("/candidates/schedule-meet/");
      if (res.data.success) {
        const transformed = res.data.data.map((item, index) => ({
          id: index + 1,
          schedule_id: item.schedule_id,
          reqId: item.req_id,
          planningId: item.planning_id,
          candidateName: item.candidate_name,
          DurationID: item.durations,
          position: item.job_position,
          MeetLink: item.meet_link,
          scheduleDate:
            item.schedule_slots?.[0]?.date +
            " | " +
            item.schedule_slots?.[0]?.time,
          fullData: item,
        }));
        setData(transformed);
      }
    } catch (err) {
      console.error("Error fetching schedule data", err);
    }
  };

  const handleViewDetails = (fullData) => {
    setEditData(fullData);
    setSelectedReqId(fullData.req_id);
    setSelectedCandidate(fullData.candidate_name);
    setGuests(fullData.guests || []);
    setInterviewRounds(fullData.no_of_rounds || 1);
    setScheduleSlots(fullData.schedule_slots || []);
    setShowDetailsModal(true);
  };

  // modal fields
  const [reqOptions, setReqOptions] = useState([]);
  useEffect(() => {
    fetchReqIds();
  }, []);

  const fetchReqIds = async () => {
    try {
      const response = await axiosInstance.get("/reqs/ids/");
      if (response.data.success) {
        setReqOptions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching req IDs", error);
    }
  };

  const [selectedReqId, setSelectedReqId] = useState("");

  //for candidate name
  const [reqCandidateOptions, setCandidateOptions] = useState([]);

  const fetchCandidateName = async (reqId) => {
    if (!reqId) return;
    try {
      const response = await axiosInstance.post("/candidates/by-requisition/", {
        requisition_id: reqId,
      });
      console.log(response.data);
      if (response.data.success) {
        setCandidateOptions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  const [selectedCandidate, setSelectedCandidate] = useState("");

  const handleCandidateChange = (value) => {
    setSelectedCandidate(value);
  };

  const handleReqChange = async (reqId) => {
    setSelectedReqId(reqId);
    setSelectedCandidate("");
    await fetchCandidateName(reqId);
    await fetchInterviewers(reqId); 

    try {
      const response = await axiosInstance.post("/api/schedule/context/", {
        req_id: reqId,
      });
      if (response.data.success) {
        const ctx = response.data.data.data;
        setEditData({
          candidateName: ctx.candidate_name,
          position: ctx.job_position,
          planningId: ctx.planning_id,
          interviewer: ctx.interviewer_name,
          location: ctx.location,
          timeZone: ctx.time_zone,
          durations: ctx.durations,
          purpose: ctx.purpose,
          mode: ctx.mode,
          selectedRoundIndex: ctx.round_name,
        });
        setScheduleSlots(
          ctx.schedule_slots.map((slot) => ({
            date: slot.date,
            time: slot.time,
            guests: [],
          }))
        );
        setSelectedInterviewer(ctx.interviewer_name || "");
      }
    } catch (error) {
      console.error("Error fetching context", error);
    }
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const handleEdit = async (row) => {
    try {
      const res = await axiosInstance.post("/api/schedule/get/", {
        schedule_id: row.schedule_id,
      });

      if (res.data.success) {
        const data = res.data.data;

        setSelectedReqId(data.req_id);
        setSelectedCandidate(data.candidate_name);
        setGuests(data.guests || []);
        setInterviewRounds(data.no_of_rounds || 1);
        setScheduleSlots(data.schedule_slots || []);

        setEditData({
          planningId: data.planning_id,
          interviewer: data.interviewer_name,
          position: data.job_position,
          location: data.location,
          timeZone: data.time_zone,
          durations: data.durations,
          purpose: data.purpose,
          mode: data.mode,
          selectedRoundIndex: data.round_name,
          schedule_id: data.schedule_id,
        });

        await fetchCandidateName(data.req_id);
        setShowFormModal(true);
      } else {
        toast.error("Failed to fetch schedule details");
      }
    } catch (error) {
      console.error("Error fetching schedule by ID:", error);
      toast.error("Something went wrong while fetching schedule details.");
    }
  };

  const handleDelete = (row) => {
    setDeleteTarget(row);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteScheduleId) return;

    try {
      const res = await axiosInstance.delete("/api/schedule/delete/", {
        data: { schedule_id: deleteScheduleId },
      });
      console.log("Delete response:", res);

      if (res.status === 200 || res.status === 204) {
        toast.success("Deleted successfully");
        setDeleteScheduleId(null);
        setShowConfirm(false);
        fetchScheduleData();
      } else {
        toast.warning("Delete failed: unexpected status");
      }
    } catch (error) {
      console.error("Delete error:", error.response || error);
      toast.error("Delete failed. Check console for details.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowFormModal(false);
    setShowDetailsModal(false);
    setEditData(null);
    setGuests([]);
    setInterviewRounds(1);
    setScheduleSlots([{ date: "", time: "", guests: [] }]);
  };

  const fetchInterviewers = async (reqId) => {
    try {
      const response = await axiosInstance.post(
        "/interviewer/by-requisition/",
        { requisition_id: reqId }
      );
      if (response.data.success) {
        setInterviewers(response.data.data);
      } else {
        setInterviewers([]);
      }
    } catch (error) {
      console.error("Error fetching interviewers:", error);
      setInterviewers([]);
    }
  };

  const handleInterviewerSelect = async (interviewerId) => {
    if (!interviewerId) return;

    try {
      const response = await axiosInstance.post("/api/interviewer-context/", {
        interviewer_id: Number(interviewerId),
      });
      if (response.data.success) {
        setMode(response.data.data.mode || "");
        setRounds(response.data.data.rounds || []);
        setSelectedRoundIndex(0);
        setSelectedSlots((response.data.data.rounds || []).map(() => 0));
        setEditData((prev) => ({
          ...prev,
          mode: response.data.data.mode || "",
        }));
        updateRounds((response.data.data.rounds || []).length);
        setScheduleSlots(
          (response.data.data.rounds || []).map((r) =>
            r.slots && r.slots[0]
              ? { date: r.slots[0].date, time: r.slots[0].time, guests: [] }
              : { date: "", time: "", guests: [] }
          )
        );
      }
    } catch (error) {
      console.error("Error fetching interviewer context", error);
    }
  };

  const columns = [
    {
      name: "",
      cell: (row) => (
        <Form.Check
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRow(row.id)}
        />
      ),
      width: "60px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Req ID",
      selector: (row) => row.reqId,
      sortable: true,
      width: "120px",
    },
    {
      name: "Planning ID",
      selector: (row) => row.planningId,
      sortable: true,
      width: "130px",
    },
    {
      name: "Candidate Name",
      selector: (row) => row.candidateName,
      sortable: true,
      width: "180px",
    },
    {
      name: "Applied Position",
      selector: (row) => row.position,
      sortable: true,
      width: "180px",
    },
    {
      name: "Duration",
      selector: (row) => row.DurationID,
      sortable: true,
      width: "120px",
    },
    {
      name: "Interview Schedule",
      selector: (row) => row.scheduleDate,
      sortable: true,
      width: "200px",
    },
    {
      name: "Meet Link",
      cell: (row) =>
        row.MeetLink ? (
          <a
            href={row.MeetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-primary"
          >
            <FaExternalLinkAlt className="me-2" />
            Open Link
          </a>
        ) : (
          "-"
        ),
      sortable: false,
      width: "160px",
    },
    {
      name: "View Details",
      cell: (row) => (
        <span
          style={{ cursor: "pointer", color: "#0d6efd" }}
          onClick={() => handleViewDetails(row.fullData)}
        >
          <FaEye className="me-2" />
          View More
        </span>
      ),
      width: "150px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="success"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <FaEdit />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row)}
            title="Delete"
          >
            <FaTrash
              onClick={() => {
                setDeleteScheduleId(row.schedule_id);
                setShowConfirm(true);
              }}
            />
          </Button>
        </div>
      ),
      width: "120px",
    },
  ];

  const handleAddGuest = () => {
    setGuests([...guests, { name: "", email: "" }]);
  };

  const handleGuestChange = (index, field, value) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
  };

  const removeGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const handleAddScheduleGuest = (index) => {
    const updated = [...scheduleSlots];
    updated[index].guests.push("");
    setScheduleSlots(updated);
  };

  const handleScheduleGuestChange = (slotIndex, guestIndex, value) => {
    const updated = [...scheduleSlots];
    updated[slotIndex].guests[guestIndex] = value;
    setScheduleSlots(updated);
  };

  const removeScheduleGuest = (slotIndex, guestIndex) => {
    const updated = [...scheduleSlots];
    updated[slotIndex].guests.splice(guestIndex, 1);
    setScheduleSlots(updated);
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...scheduleSlots];
    updated[index][field] = value;
    setScheduleSlots(updated);
  };

  const updateRounds = (num) => {
    setInterviewRounds(num);
    const newSlots = Array.from({ length: num }, () => ({
      date: "",
      time: "",
      guests: [],
    }));
    setScheduleSlots(newSlots);
  };

  //form submit
  const [loading, setLoading] = useState(false);

  const handleSubmitSchedule = async () => {
    if (loading) return;
    if (!selectedReqId || !selectedCandidate) {
      toast.error("Please select Req ID and Candidate Name");
      return;
    }

    for (let slot of scheduleSlots) {
      for (let guestEmail of slot.guests) {
        if (!validateEmail(guestEmail)) {
          toast.error(`Invalid guest email: ${guestEmail}`);
          return;
        }
      }
    }

    const payload = {
      schedule_id: editData?.schedule_id,
      req_id: selectedReqId,
      candidate_name: selectedCandidate,
      round_name: rounds[selectedRoundIndex]?.round_name || "",
      planning_id: editData?.planningId,
      interviewer_name: (() => {
        const selectedObj = interviewers.find(
          (i) => String(i.id) === String(selectedInterviewer)
        );
        return selectedObj ? selectedObj.name : "";
      })(),
      job_position: editData?.position,
      location: editData?.location,
      time_zone: editData?.timeZone,
      durations: editData?.durations,
      purpose: rounds[selectedRoundIndex]?.round_name || "",
      mode: editData?.mode,
      guests,
      schedule_slots: scheduleSlots.map((slot) => ({
        date: slot.date,
        time: slot.time,
        guests: slot.guests,
      })),
    };

    setLoading(true);
    try {
      const isUpdate = !!editData?.schedule_id;
      const res = isUpdate
        ? await axiosInstance.put(
            "https://api.pixeladvant.com/api/schedule/update/",
            payload
          )
        : await axiosInstance.post(
            "https://api.pixeladvant.com/candidates/schedule-meet/",
            payload
          );

      if (res.data.success) {
        toast.success(
          isUpdate
            ? "Interview updated successfully!"
            : "Interview scheduled successfully!"
        );
        handleModalClose();
        fetchScheduleData();
      } else {
        toast.warning("Operation failed. Please check inputs.");
      }
    } catch (error) {
      console.error("Schedule Error:", error);
      toast.error("Error occurred during scheduling.");
    } finally {
      setLoading(false);
    }
  };

  const renderDetailsTable = () => {
    if (!editData) return null;

    const {
      req_id,
      planning_id,
      candidate_name,
      job_position,
      durations,
      interviewer_name,
      location,
      time_zone,
      purpose,
      mode,
      round_name,
      meet_link,
      guests = [],
      schedule_slots = [],
    } = editData;

    return (
      <Table bordered responsive>
        <tbody>
          <tr>
            <th>Req ID</th>
            <td>{req_id}</td>
          </tr>
          <tr>
            <th>Planning ID</th>
            <td>{planning_id}</td>
          </tr>
          <tr>
            <th>Candidate Name</th>
            <td>{candidate_name}</td>
          </tr>
          <tr>
            <th>Job Position</th>
            <td>{job_position}</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{durations}</td>
          </tr>
          <tr>
            <th>Interviewer</th>
            <td>{interviewer_name}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>{location}</td>
          </tr>
          <tr>
            <th>Time Zone</th>
            <td>{time_zone}</td>
          </tr>
          <tr>
            <th>Purpose</th>
            <td>{purpose}</td>
          </tr>
          <tr>
            <th>Mode</th>
            <td>{mode}</td>
          </tr>
          <tr>
            <th>No. of Rounds</th>
            <td>{purpose}</td>
          </tr>
          <tr>
            <th>Meet Link</th>
            <td>
              {meet_link ? (
                <a href={meet_link} target="_blank" rel="noopener noreferrer">
                  {meet_link}
                </a>
              ) : (
                "-"
              )}
            </td>
          </tr>
          <tr>
            <th>Guests</th>
            <td>
              {guests.length > 0 ? (
                <ul>
                  {guests.map((g, i) => (
                    <div key={i}>
                      <li>Name : {g.name} </li>
                      <li>Email ID : {g.email} </li>
                    </div>
                  ))}
                </ul>
              ) : (
                "-"
              )}
            </td>
          </tr>
          <tr>
            <th>Schedule Slots</th>
            <td>
              {schedule_slots.length > 0 ? (
                <ul>
                  {schedule_slots.map((s, i) => (
                    <div key={i}>
                      <li>Date : {s.date} </li>
                      <li>
                        Time : {s.time}
                        <br />
                        Guests:{" "}
                        {s.guests && s.guests.length > 0
                          ? s.guests.join(", ")
                          : "None"}
                      </li>
                    </div>
                    // <li key={i}>
                    //    at
                    //   <br />
                    //   Guests:{" "}
                    //   {s.guests && s.guests.length > 0
                    //     ? s.guests.join(", ")
                    //     : "None"}
                    // </li>
                  ))}
                </ul>
              ) : (
                "-"
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <RecruiterHeader />

      <div className="mt-5">
        <div className="mb-3 gap-2 d-flex justify-content-between">
          <h4>Schedule Interview</h4>
          <Button onClick={() => setShowFormModal(true)}>
            Add Schedule Interview
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          highlightOnHover
          persistTableHead
          responsive
        />

        {/* modal for form */}
        <Modal show={showFormModal} onHide={handleModalClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{" Schedule Interview"}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form>
              <Row className="mb-3 gap-2">
                <Col>
                  <Form.Label>Req Id</Form.Label>
                  <Form.Select
                    value={selectedReqId}
                    onChange={(e) => handleReqChange(e.target.value)}
                  >
                    <option>Select</option>
                    {reqOptions.map((item, index) => (
                      <option key={index} value={item.req_ids}>
                        {item.req_ids}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Planning Id</Form.Label>
                  <Form.Control
                    placeholder="Planning ID here"
                    value={editData?.planningId || ""}
                  />
                </Col>
              </Row>

              <Row className="mb-3 gap-2">
                <Col>
                  <Form.Label>Candidate Name</Form.Label>
                  <Form.Select
                    value={selectedCandidate}
                    onChange={(e) => handleCandidateChange(e.target.value)}
                  >
                    <option value="">Select</option>
                    {reqCandidateOptions.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Label>Position Name</Form.Label>
                  <Form.Control
                    placeholder="Position Name here"
                    value={editData?.position || ""}
                  />{" "}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Interviewer Name</Form.Label>
                  <Form.Select
                    value={selectedInterviewer}
                    onChange={async (e) => {
                      setSelectedInterviewer(e.target.value);
                      await handleInterviewerSelect(e.target.value);
                    }}
                  >
                    <option value="">Select Interviewer</option>
                    {interviewers.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <div className="mb-3 gap-2 p-2 rounded  bg-light my-3">
                <div className="d-flex p-3 rounded justify-content-between align-items-center bg-light py-2  px-2">
                  <Form.Label className="mb-0 text-primary">
                    Guests invite
                  </Form.Label>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={handleAddGuest}
                  >
                    Add Guest
                  </Button>
                </div>
                {guests.map((guest, index) => (
                  <Row key={index} className="align-items-center gap-2 mt-2">
                    <Col>
                      <Form.Control
                        value={guest.name}
                        placeholder="Name"
                        onChange={(e) =>
                          handleGuestChange(index, "name", e.target.value)
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        value={guest.email}
                        placeholder="Email"
                        onChange={(e) =>
                          handleGuestChange(index, "email", e.target.value)
                        }
                      />
                    </Col>
                    <Col>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeGuest(index)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </div>

              <Row className="mb-3 gap-2">
                <Col>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    placeholder="Location here"
                    value={editData?.location || ""}
                  />
                </Col>
                <Col>
                  <Form.Label>Time Zone</Form.Label>
                  <Form.Control
                    placeholder="Time Zone here"
                    value={editData?.timeZone || ""}
                  />
                </Col>
              </Row>

              <Row className="mb-3 gap-2">
                <Col>
                  <Form.Label>Durations</Form.Label>
                  <Form.Control
                    placeholder="Enter"
                    value={editData?.durations || ""}
                  />
                </Col>
                {/* <Col>
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    placeholder="Enter"
                    value={editData?.selectedRoundIndex || ""}
                  />
                </Col> */}
                <Col>
                  <Form.Label>Mode</Form.Label>
                  <Form.Control
                    placeholder="enter"
                    value={editData?.mode || ""}
                  />
                </Col>
              </Row>

              <Row className="mb-3 gap-2">
                {/* <Col>
                  <Form.Label>Mode</Form.Label>
                  <Form.Control
                    placeholder="enter"
                    value={editData?.mode || ""}
                  />
                </Col> */}
                <Col>
                  {rounds.length > 0 && (
                    <Row className="mb-3 gap-2">
                      <Col>
                        <Form.Label>Round Name</Form.Label>
                        <Form.Select
                          value={selectedRoundIndex}
                          onChange={(e) =>
                            setSelectedRoundIndex(e.target.value)
                          }
                        >
                          {rounds.map((round, idx) => (
                            <option value={idx} key={idx}>
                              {round.round_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>

              <div className="mt-4">
                {scheduleSlots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="border rounded p-3 mt-3 bg-light"
                  >
                    <Row className="mb-2 gap-2 ">
                      <Form.Label>Schedule Date</Form.Label>

                      <Col>
                        <Form.Control
                          type="date"
                          value={slot.date || ""}
                          // // onChange={(e) =>
                          // //   handleScheduleChange(
                          // //     slotIndex,
                          // //     "date",
                          // //     e.target.value
                          // //   )
                          // }
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          placeholder="Time"
                          value={slot.time}
                          onChange={(e) =>
                            handleScheduleChange(
                              slotIndex,
                              "time",
                              e.target.value
                            )
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleAddScheduleGuest(slotIndex)}
                        >
                          + Add Guest
                        </Button>
                      </Col>
                    </Row>

                    {slot.guests.map((guestEmail, guestIndex) => (
                      <Row key={guestIndex} className="mb-2 gap-2 ">
                        <Col>
                          <Form.Control
                            placeholder="Guest email"
                            value={guestEmail}
                            onChange={(e) =>
                              handleScheduleGuestChange(
                                slotIndex,
                                guestIndex,
                                e.target.value
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              removeScheduleGuest(slotIndex, guestIndex)
                            }
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    ))}
                  </div>
                ))}
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmitSchedule}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    className="me-2"
                  />
                  Scheduling...
                </>
              ) : (
                "Schedule Interview"
              )}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete */}
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this interview schedule?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show details */}
        <Modal show={showDetailsModal} onHide={handleModalClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Schedule Interview Details</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {renderDetailsTable()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ScheduleInterview;
