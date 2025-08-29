import React, { useEffect, useState } from "react";
import RecruiterHeader from "../Recruiter_utils/Navbar";
import { Button, Modal, Spinner } from "react-bootstrap";
import axiosInstance from "Services/axiosInstance";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PreOnboarding = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [sendingId, setSendingId] = useState(null);

  const fetchPreOnboardingData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        "https://api.pixeladvant.com/api/candidate/pre-onboarding-form/all/"
      );
      if (res.data.success && Array.isArray(res.data.data)) {
        setTableData(res.data.data);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching pre-onboarding data:", error);
      toast.error("Failed to fetch data. Please try again.");
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const confirmSendLink = (candidate_id) => {
    setSelectedCandidate(candidate_id);
    setShowModal(true);
  };

  // Send Link Function
  const handleSendLink = async () => {
    if (!selectedCandidate) return;
    try {
      setSendingId(selectedCandidate);
      await axiosInstance.post(
        "https://api.pixeladvant.com/recruiter/send_pre_onboarding_form_invite/",
        { candidate_id: selectedCandidate }
      );
      toast.success(`Link sent successfully to Candidate`);
    } catch (error) {
      console.error("Error sending link:", error);
      toast.error("Failed to send link. Please try again.");
    } finally {
      setSendingId(null);
      setShowModal(false);
      setSelectedCandidate(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Table Columns
  const columns = [
    {
      name: "Candidate ID",
      selector: (row) => row.candidate_id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Date of Joining",
      selector: (row) => formatDate(row.date_of_joining),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          variant="success"
          size="sm"
          onClick={() => confirmSendLink(row.candidate_id)}
          disabled={sendingId === row.candidate_id}
        >
          {sendingId === row.candidate_id ? (
            <>
              <Spinner animation="border" size="sm" /> Sending...
            </>
          ) : (
            "Send Link"
          )}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchPreOnboardingData();
  }, []);

  return (
    <>
      <RecruiterHeader />
      <div className="h-100 mt-5">
        <div className="row">
          <div className="card rounded-3 border-0 shadow-sm p-2">
                        <h5 className="fw-bold mb-0 p-3">Onboarding</h5>
            <div className="card-body p-0">
              {/* <div className="col-md-12 d-flex align-items-center justify-content-end gap-3 flex-wrap p-3">
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/recruiter/pre_onboarding_form");
                  }}
                >
                  Pre-Onboarding Form
                </Button>
              </div> */}

              {/* Data Table */}
              <DataTable
                columns={columns}
                data={tableData}
                progressPending={loading}
                striped
                dense
                responsive
                persistTableHead
                fixedHeader
                fixedHeaderScrollHeight="500px"
                customStyles={{
                  headCells: {
                    style: {
                      backgroundColor: "#e8edff",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#1d1d1f",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                    },
                  },
                  cells: {
                    style: {
                      fontSize: "14px",
                      paddingTop: "15px",
                      paddingBottom: "15px",
                      whiteSpace: "nowrap",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Send Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to send the Pre-Onboarding form link to{" "}
          <strong>Candidate ID: {selectedCandidate}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSendLink}
            disabled={sendingId === selectedCandidate}
          >
            {sendingId === selectedCandidate ? (
              <>
                <Spinner animation="border" size="sm" /> Sending...
              </>
            ) : (
              "Yes, Send Link"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default PreOnboarding;
