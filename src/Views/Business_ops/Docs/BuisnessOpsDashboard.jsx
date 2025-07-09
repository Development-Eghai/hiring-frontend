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
import FilterModal from "../../Hiring_manager/Docs/FilterModal";
import axiosInstance from "Services/axiosInstance";
import { decryptData } from "Security/Crypto/Crypto";
import Cookies from "js-cookie";
import Creatmodel from "../../Hiring_manager/Docs/Creatmodel";
import ButtonComponent from "Components/Button/Button";
import { FaBan } from "react-icons/fa";

const DEFAULT_FIELDS = [
  "id",
  "Recusion_no",
  "job_position",
  "Recruiter",
  "division",
  "department",
  "location",
  "status",
];


const tableStyles = {
  headCells: {
    style: {
      backgroundColor: "#DEE5FF",
      color: "#000",
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
};

const handleCheckBoxChange = (row) =>{
  console.log(row)  
}


export const BuisnessOpsDashboard = () => {
  const { hiringManagerState, commonState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState(DEFAULT_FIELDS);
  const [columns, setColumns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const fetchData = (fields) => {
    dispatch(HandleGetReportingData({ fields })); 
  };

  useEffect(() => {
    fetchData(selectedFields);
  }, [selectedFields]);

  useEffect(() => {
    const dynamicColumns = selectedFields.map((field) => {
      if (field === "id") {
        return {
          name: "s_no",
          selector: (row) => row["s_no"] || "-",
          sortable: true,
        };
      } 
      else if(field === "status"){
        return {
          name: field,
          cell: (row) =>
            row.status ? (
              <span className="badge bg-success">Active</span>
            ) : (
              <span className="badge bg-secondary">Inactive</span>
            ),
            sortable: true,
        };
      }else {
        return {
          name: field,
          selector: (row) => row[field] || "-",
          sortable: true,
        };
      }
    });

    dynamicColumns.unshift({
      name: "Select",
      cell: (row) => (
          <input type="checkbox"  onChange={()=>handleCheckBoxChange(row)}/>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    })

    dynamicColumns.push({
      name: "Action",
      cell: (row) => (
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            className="text-dark p-0 m-0"
            style={{ fontSize: "1.5rem" }}
          ></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleEdit(row)}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => confirmDelete(row)}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });

    setColumns(dynamicColumns);
  }, [selectedFields]);

  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    // open edit modal or navigate to edit page
  };

  const confirmDelete = (row) => {
    console.log(row,"dfsds")
    setRowToDelete(row);
    setShowConfirmModal(true);
  };

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
  const filteredData = (hiringManagerState?.reporting?.data || []).filter(
    (row) =>
      selectedFields.some((field) =>
        String(row[field] || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
  );

  console.log(filteredData,"dfasda")

  const dashboardCards = [
    {
      desc:"No of requistion Approved",
      count:20,
      icon: <FaBan size={24} color="#F5A623" />,
    },
        {
      desc:"No of requistion Approved",
      count:20,
      icon: <FaBan size={24} color="#F5A623" />,
    },
        {
      desc:"No of requistion Approved",
      count:20,
      icon: <FaBan size={24} color="#F5A623" />,
    }
  ]

  return (
    <div className="h-100">
      <div className="d-flex gap-4">
              {dashboardCards.map((row) => (
        <Card className={"w-25 border-0 header-card mb-4"}>
          <Card.Body className="py-3 header-body">
            <Card.Title className="row justify-content-end mb-0">
              <div className=" d-flex gap-3">
                <div>{row.icon}</div>
              <div>
                <h4>{row.count}</h4>
                <h6>{row.desc}</h6>
              </div>
              </div>
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
      </div>
      <Card className="p-4 home_data_table">
        <div className="row align-items-center mb-3">
          <div className="col-3">
            <h4 className="fw-bold mb-0">Job Recusion View</h4>
          </div>
          <div className="col-6 d-flex gap-3">
            <button type="button" class="btn btn-success">
              Approve
            </button>
            <button type="button" class="btn btn-danger">
              Decline
            </button>
            <button type="button" class="btn btn-primary">
              Need more info
            </button>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end w-100">
              <InputGroup style={{ maxWidth: "300px" }}>
                <InputGroup.Text>{Icons.Search}</InputGroup.Text>
                <Form.Control
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={tableStyles}
          fixedHeader
          striped
          highlightOnHover
          pagination
          progressPending={hiringManagerState?.isLoading}
        />
      </Card>

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
    </div>
  );
};

export default BuisnessOpsDashboard;
