import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal, Button, Table, Spinner } from "react-bootstrap";

const ApproversModal = ({ show, onHide, approvers }) => (
  <Modal show={show} onHide={onHide} size="xl" centered>
    <Modal.Header closeButton>
      <Modal.Title>Approvers</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {approvers.length === 0 ? (
        <p>No approvers found.</p>
      ) : (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Role</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Decision</th>
              <th>Comment</th>
              <th>Reviewed At</th>
            </tr>
          </thead>
          <tbody>
            {approvers.map((approver, idx) => (
              <tr key={idx}>
                <td>{approver.role}</td>
                <td>{approver.name}</td>
                <td>{approver.email}</td>
                <td>{approver.contact_number}</td>
                <td>{approver.job_title}</td>
                <td>{approver.status}</td>
                <td>{approver.approval?.decision || "N/A"}</td>
                <td>{approver.approval?.comment || "-"}</td>
                <td>{approver.approval?.reviewed_at || "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// Main Component
const CandidateApproverStatus = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchCandidateStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.pixeladvant.com/candidate-approver-status/"
      );
      if (response.data.success) {
        setCandidates(response.data.data);
        console.log("response", response);
      }
    } catch (error) {
      console.error("Error fetching candidate approver status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidateStatus();
  }, []);

  const handleApproverClick = (approvers) => {
    setSelectedApprovers(approvers);
    setShowModal(true);
  };

  const columns = [
    // {
    //   name: "Req ID",
    //   selector: (row) => row.req_id || "-",
    //   sortable: true,
    // },
    // {
    //   name: "Client Name",
    //   selector: (row) => row.client_name || "-",
    //   sortable: true,
    // },
    // {
    //   name: "Client ID",
    //   selector: (row) => row.client_id || "-",
    //   sortable: true,
    // },
    {
      name: "Role",
      selector: (row) => row.role || "-",
    },
    {
      name: "Name",
      selector: (row) => row.name || "-",
      sortable: true,
    },
    {
      name: "Email ",
      selector: (row) => row.email || "-",
      sortable: true,
    },
    
    {
      name: "Contact Number ",
      selector: (row) => row.contact_number || "-",
      sortable: true,
    },
    {
      name: "Job Title",
      selector: (row) => row.job_title || "-",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.overall_status || "-",
      sortable: true,
    },
    {
      name: "Decision",
      selector: (row) => row.decision || "N/A",
      sortable: true,
    },
    {
      name: "Commend",
      selector: (row) => row.comment || "-",
      sortable: true,
    },
  ];

  return (
    <div className="">
      {/* <h4 className="mb-3">Approver Details</h4> */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          className="rounded border"
          data={candidates}
          //   pagination
          // highlightOnHover
          striped
          responsive
          noHeader
        />
      )}
      <ApproversModal
        show={showModal}
        onHide={() => setShowModal(false)}
        approvers={selectedApprovers}
      />
    </div>
  );
};

export default CandidateApproverStatus;
