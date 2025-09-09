import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Dropdown,
  Modal,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { HiringManagerHomeCard } from "Components/Card/HiringManagerHomeCard";
import Icons from "Utils/Icons";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { HandleGetReportingData } from "Views/Hiring_manager/Actions/HiringManagerAction";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import axiosInstance from "Services/axiosInstance";
import { decryptData } from "Security/Crypto/Crypto";
import Cookies from "js-cookie";
import Creatmodel from "./Creatmodel";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";

const DEFAULT_FIELDS = [
  "id",
  "Planning_id",
  "Requisition_id",
  "Client_name",
  // "Planning_id",
  "job_position",
  "Recruiter",
  // "division",
  // "department",
  "No_of_positions",
  "location",
  "status",
];

const FIELD_LABELS = {
  id: "S.No",
  Planning_id: "Planning ID",
  Requisition_id: "Requisition ID",
  Client_name: "Client Name",
  job_position: "Job Position",
  Recruiter: "Recruiter",
  No_of_positions: "Openings",
  location: "Location",
  status: "Status",
};


const ALL_FIELDS = [
  "job_position",
  "Recruiter",
  "division",
  "department",
  "location",
  "status",
  "Position/Role",
  "Tech",
  "JD",
  "Experience",
  "Designation",
  "Target",
  "Interviewer",
  "Interview",
  "Compensation/Benefits",
  "Duration/Timeline",
  "Place",
  "Working",
  "Solicitation",
  "Educational",
  "Feedback",
  "Relocation",
  "Travel",
   "No_of_positions",
  "Visa",
  "Domain",
  "CIBIL",
  "Valid",
  "Govt",
  "Background",
  "Shift",
  "Differently abled",
  "Reference",
  "Role Type",
  "Job Type",
  "Communication",
  "Notice Period",
  "Joining Readiness",
  "Candidate Fit",
  "Career Gap",
  "Sabbatical",
  "Screening Questions",
  "Job Health Requirements",
  "Interview Format",
  "Social Media",
  "Language Proficiency",
].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

 const tableStyles = {
  header: {
    style: {
      fontSize: '18px',
      fontWeight: '600',
      padding: '16px',
    },
  },
  headRow: {
    style: {
      backgroundColor: "linear-gradient(135deg, #0F172A 0%, #374151 100%)", // dark slate header
      borderBottomWidth: '2px',
      borderBottomColor: '#CBD5E1',
      borderBottomStyle: 'solid',
    },
  },
  headCells: {
    style: {
      fontSize: '15px',
      fontWeight: '700',
      color: '#F9FAFB', // light text
      padding: '14px 12px',
      letterSpacing: '0.3px',
      whiteSpace: 'normal',   // 👈 prevents cutting off
      wordBreak: 'break-word' // 👈 wraps long text
    },
  },
  rows: {
    style: {
      minHeight: '52px',
      fontSize: '14px',
      fontWeight: '500',
      '&:nth-of-type(odd)': {
        backgroundColor: '#F9FAFB', // zebra striping
      },
      '&:hover': {
        backgroundColor: '#E0F2FE  ', // light hover
        cursor: 'pointer',
      },
    },
  },
  cells: {
    style: {
      padding: '12px',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
    },
  },
};


const conditionalRowStyles = [
  {
    when: row => true, // applies to all rows
    style: {
      '&:hover': {
        backgroundColor: '#E0F2FE ',
        cursor: 'pointer',
      },
    },
  },
];

export const Home = () => {
  const { hiringManagerState, commonState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState(DEFAULT_FIELDS);
  const [columns, setColumns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [selectedReqId, setSelectedReqId] = useState(null);

  const fetchData = (fields) => {
    const params = {
      user_role:commonState?.app_data?.user_id,
      fields
    }
    dispatch(HandleGetReportingData(params));
  };

  useEffect(() => {
    fetchData(selectedFields);
  }, [selectedFields]);

  useEffect(() => {
  const dynamicColumns = selectedFields.map((field) => {
    if (field === "id") {
      return {
        name: FIELD_LABELS[field] || "S.No",
        selector: (row) => row["s_no"] || "-",
        sortable: true,
      };
    } else {
      return {
        name: FIELD_LABELS[field] || field,
        selector: (row) => row[field] || "-",
        sortable: true,
      };
    }
  });

  dynamicColumns.unshift({
    name: "Select",
    cell: (row) => (
      <input
        type="radio"
        name="selectedRow"
        onChange={() => handleRadioSelect(row)}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  });

  dynamicColumns.push({
    name: "Action",
    cell: (row) => (
      <td className="d-flex p-2 gap-2 justify-content-center">
        <Button
          variant="outline-secondary"
          className="btn-bran-edit-color"
          size="sm"
          onClick={() => handleEdit(row)}
        >
          <BsPencilSquare className="me-1" />
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => confirmDelete(row)}
        >
          <BsTrash className="me-1" />
        </Button>
      </td>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  });

  setColumns(dynamicColumns);
}, [selectedFields]);



  const handleRadioSelect = (row) => {
  setSelectedReqId(row?.id);
  console.log("Selected Req ID:", row?.id);
};


  const handleEdit = (row) => {
    // open edit modal or navigate to edit page
    navigate("/hiring_manager/job_requisition", { state:{ reqid:row?.id}});
  };

  const confirmDelete = (row) => {
    setRowToDelete(row);
    setShowConfirmModal(true);
  };


  
const [show, setShow] = useState(false);
  const handleConfirmDelete = async () => {
    try {
      if (!rowToDelete?.id) {
        alert("Missing requisition ID");
        return;
      }
      const response = await axiosInstance.delete(
        "/api/jobrequisition/delete-requisition/",
        {
          data: {
            user_role: commonState?.app_data?.user_id || "",
            requisition_id: rowToDelete.id,
          },
        }
      );

      if (response?.data?.success) {
        console.log("Delete confirmed:", response.data);
        // Refresh table data after delete
        fetchData(selectedFields);
      } else {
        alert("Failed to delete. " + (response?.data?.message || ""));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting requisition.");
    }

    setShowConfirmModal(false);
    setRowToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setRowToDelete(null);
  };
  const filteredData = (hiringManagerState?.reporting?.data || [])
    .filter((row) =>
      selectedFields.some((field) =>
        String(row[field] || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    )
    .map((row) => ({
      ...row,
      Requisition_id: row.id,
    }));

  const [recruiterDropDown,setrecruiterDropDown] = useState([]);
const [formData, setFormData] = useState({
  type: "",
  recruiter: [],  // now array
  vendor: [],     // now array
});


  async function fetchAssignRecDropdown() {
    try {
      const response = await axios.get("https://api.pixeladvant.com/api/jobrequisition/recruiter-vendor-dropdown/")
      const {success,data} = response?.data;
      if(success){
        setrecruiterDropDown({
        "Recruiter": [
            {
                "label": "PixelREQ",
                "value": "PixelREQ",
                "email": "pixelreq@gmail.com"
            }
            
        ],
        "Vendor": [
            {
                "label": "Pixelvendor",
                "value": "Pixelvendor",
                "email": "pixelven@gmail.com"
            }
        ]
    })
      }
    } catch (error) {
      console.log(error,"dasda")
    }
  }

  useEffect(()=>{
    fetchAssignRecDropdown()
  },[])

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleAssign = async () => {
  try {
    const payload = {
      requisition_id: selectedReqId,
      recruiter_name: formData.vendor.length
        ? [...formData.recruiter, ...formData.vendor].join(",")
        : formData.recruiter.join(","),
    };

    const response = await axios.post(
      "https://api.pixeladvant.com/api/requisition/assign-recruiter/",
      payload
    );

    const { success, data, message } = response?.data;
    if (success) {
      setFormData({
        type: "",
        recruiter: [],
        vendor: [],
      });
      setShow(false);
    }
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="h-100">
      {hiringManagerState?.jsonOnly?.home_cards?.map((card, index) => (
        <div className="row py-3">
          <div
            className="col-12 col-md-6 col-lg-4 col-xl mb-3 px-2"
            key={index}
          >
            <HiringManagerHomeCard data={card} />
          </div>
        </div>
      ))} 

      <Card className="p-4 home_data_table">
        <div className="row align-items-center mb-4">
          <div className="col-3">
            <h4 className="fw-bold mb-0">Job Roles</h4>
          </div>
          <div className="col-9 d-flex justify-content-end">
            <div className="d-flex align-items-center gap-4 flex-wrap justify-content-end w-100">
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center btn-brand-outline"
                onClick={() => setShowModal(true)}
              >
                <span>{Icons.Filter} Display Option</span>
              </Button>

              <InputGroup style={{ maxWidth: "300px" }}>
                <InputGroup.Text>{Icons.Search}</InputGroup.Text>
                <Form.Control
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              {selectedReqId && <button className="btn btn-secondary" onClick={() => setShow(true)}>Assign Recruiter</button>}

              <Creatmodel show={showModal} onHide={() => setShowModal(false)} />
            </div>
          </div>
        </div>

        <DataTable
          fixedHeader
          columns={columns}
          data={filteredData}
          customStyles={tableStyles}

          striped
          highlightOnHover
          pagination
          progressPending={hiringManagerState?.isLoading}
           className="rounded-xl shadow-md"
           conditionalRowStyles={conditionalRowStyles}
        />
      </Card>

      <FilterModal
        show={showModal}
        onHide={() => setShowModal(false)}
        allFields={ALL_FIELDS}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
        onClear={() => setSelectedFields(DEFAULT_FIELDS)}
      />

      {/* Delete Confirm Modal */}
      <Modal show={showConfirmModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{rowToDelete?.job_position}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

          <Modal show={show} onHide={()=>setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Recruiter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            {/* Dropdown 1 */}
          <Form.Group className="mb-3">
            <Form.Label>Select Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </Form.Select>
          </Form.Group>
{formData?.type && (
  <Form.Group className="mb-3">
    <Form.Label>Select Recruiter</Form.Label>
    <Select
      isMulti
      name="recruiter"
      value={recruiterDropDown?.Recruiter?.filter(option =>
        formData.recruiter.includes(option.value)
      )}
      options={recruiterDropDown?.Recruiter || []}
      onChange={(selected) => {
        setFormData({
          ...formData,
          recruiter: selected ? selected.map((s) => s.value) : [],
        });
      }}
    />
  </Form.Group>
)}

{/* Dropdown 3 - Vendor */}
{formData?.type === "external" && (
  <Form.Group className="mb-3">
    <Form.Label>Select Vendor</Form.Label>
    <Select
      isMulti
      name="vendor"
      value={recruiterDropDown?.Vendor?.filter(option =>
        formData.vendor.includes(option.value)
      )}
      options={recruiterDropDown?.Vendor || []}
      onChange={(selected) => {
        setFormData({
          ...formData,
          vendor: selected ? selected.map((s) => s.value) : [],
        });
      }}
    />
  </Form.Group>
)}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShow(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAssign}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>

    </div>
  );
};

export default Home;
