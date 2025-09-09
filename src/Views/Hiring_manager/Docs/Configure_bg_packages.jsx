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
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import DataTable from "react-data-table-component";

const Configure_bg_packages = () => {
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showVendorModal, setShowVedorModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState([]);

  const [packageRows, setPackageRows] = useState([
    { package_name: "", package_rate: "" ,package_description:""},
  ]);
  const [showVendorEditModal, setshowVendorEditModal] = useState(false);

  const [formRows, setFormRows] = useState([
    { add_on_check_title: "", add_on_check_desc: "", add_on_check_rate: "" },
  ]);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedRow, setSelectedRow] = useState([]);
  const [details, setDetails] = useState([]);
  const [formState, setFormState] = useState([
    {
      vendor_name: "",
      vendor_email: "",
      vendor_address: "",
    },
  ]);

  const handlePackageRowChange = (index, field, value) => {
    const updated = [...packageRows];
    updated[index][field] = value;
    setPackageRows(updated);
  };

  const addPackageRow = () => {
    setPackageRows([...packageRows, { package_name: "", package_rate: "" }]);
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...formRows];
    updated[index][field] = value;
    setFormRows(updated);
  };

  const addRow = () => {
    setFormRows([...formRows, { add_on_check_title: "", add_on_check_desc: "", add_on_check_rate: "" }]);
  };

  const handleMultiSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setSelectedChecks(selected);
  };

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://api.pixeladvant.com/bg-package-setup/"
      );
      const { success, data } = response?.data;

      if (success) {
        setDetails(data);
        console.log(data, "dasdas");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleFinalSubmit = async () => {
    console.log("Submitted Rows:", formRows);
    console.log("Selected for multi-select:", packageRows);
    const { 0: _, ...cleanFormState } = formState;
    const payload = {
      ...cleanFormState,
      packages: [...packageRows],
      details: [...formRows],
    };
    console.log(payload, "cascas");

    try {
      const response = await axios.post(
        "https://api.pixeladvant.com/bg-package-setup/",
        payload
      );

      const { success, data, message } = response?.data;

      if (success) {
        setShowVedorModal(false);
        fetchData()
      }
    } catch (error) {}
  };

  const handleViewDetails = (a) => {
    setSelectedRow([a]);
    setShowViewModal(true);
  };

  const removePackageRow = (index) => {
    setPackageRows((prev) => prev.filter((_, i) => i !== index));
  };
  
  const removeRow = (index) => {
    setFormRows((prev) => prev.filter((_, i) => i !== index));
  };
  

  const handleDelete = async (vendor_id) => {
    try {
      const response = await axios.delete(
        "https://api.pixeladvant.com/bg-package-setup/",
        { data: { vendor_id } }
      );

      const { success, data, message } = response?.data;

      if (success) {
        toast.success(message);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (a) => {
    try {
      const response = await axios.post(
        "https://api.pixeladvant.com/vendor-packages/",
        {
          vendor_id: a?.vendor_id,
        }
      );

      const { success, data } = response?.data;
      const { packages, details, ...datas } = data;

      setFormState(datas);
      setPackageRows(packages);
      setFormRows(details);
      setshowVendorEditModal(true);
    } catch (error) {}
  };

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

      const handleEditSubmit = async () => {
    const payload = {
      ...formState,
      packages: packageRows,
      details:formRows,
    };
    try {
      const response = await axios.put(
        "https://api.pixeladvant.com/bg-package-setup/",
        payload
      );
      const { data, success } = response?.data;
      if (success) {
        setshowVendorEditModal(false);
        fetchData();
                    setFormRows([
              {
                add_on_check_title: "",
                add_on_check_desc: "",
                add_on_check_rate: "",
              },
            ]);
            setPackageRows([
              { package_name: "", package_rate: "", package_description: "" },
            ]);
            setFormState([
              {
                vendor_name: "",
                vendor_email: "",
                vendor_address: "",
              },
            ]);
      }
    } catch (error) {
      console.log(error, "Cdscds");
    }
  };
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Vendor Name",
      selector: (row) => row.vendor_name,
      sortable: true,
    },
    {
      name: "Package Name",
      selector: (row) => row.package_name,
      sortable: true,
    },
    {
      name: "Package Rate",
      selector: (row) => row.package_rate,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) =>
        row.details ? (
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => handleViewDetails(row)}
          >
            View
          </Button>
        ) : null,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handleEdit(row)}
          >
            <BsPencilSquare className="me-1" />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(row.vendor_id)}
          >
            <BsTrash className="me-1" />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

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


  return (
    <div>
<Container fluid className="py-4 px-md-5 bg-light">
        <Card className="shadow-sm p-4">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0 text-start">Configure BG Packages</h5>
              <div className="d-flex gap-3">
                <Button
                  variant="success"
                  onClick={() => setShowVedorModal(true)}
                >
                  + Add Vendor
                </Button>
                {/* <Button variant="success" onClick={()=>setShowPackageModal(true)}>
                  + Add Package
                </Button>
                <Button variant="success" onClick={()=>setShowCheckModal(true)}>
                  + Add On-Checks
                </Button> */}
              </div>
            </div>

            {/* <CandidateApprovalStatus /> */}
          </div>
          {/* <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
            <Table
              striped
              bordered
              hover
              size="sm"
              className="text-center align-middle"
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th>S.no</th>
                  <th>Vendor Name</th>
                  <th>Package Name</th>
                  <th>Package Rate</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {details.map((a, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{a.vendor_name}</td>
                    <td>{a.package_name}</td>
                    <td>{a.package_rate}</td>
                    <td>
                      {a.details && (
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleViewDetails(a)}
                        >
                          View
                        </Button>
                      )}
                    </td>
                    <td className="d-flex p-2 gap-2 justify-content-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleEdit(a)}
                      >
                        <BsPencilSquare className="me-1" />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(a.vendor_id)}
                      >
                        <BsTrash className="me-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div> */}
          <DataTable
          columns={columns}
          data={details}
          striped
          dense
          persistTableHead
          // progressPending={loading}
          customStyles={tableStyles}
          />
        </Card>
        {/* <hr /> */}

        {/* <div>
          <CandidateApprovalStatus />
        </div>

        {/*vendor Modal */}
        <Modal
          show={showVendorModal}
          onHide={() => setShowVedorModal(false)}
          centered
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Vendor</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Vendor Details */}
            <h5 className="mb-3">Vendor Details</h5>
            <Row className="mb-4 d-flex ">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Vendor Name</Form.Label>
                  <Form.Control
                    name="vendor_name"
                    placeholder="Enter Vendor Name"
                    value={formState?.vendor_name}
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="vendor_email"
                    value={formState?.vendor_email}
                    placeholder="Enter Email"
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="vendor_address"
                    value={formState?.vendor_address}
                    placeholder="Enter Address"
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    name="mobile_no"
                    value={formState?.mobile_no}
                    placeholder="Enter Mobile Number"
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Package Details */}
            <div className="d-flex justify-content-between mb-2">
              <h5 className="">Package Details</h5>
              <Button
                variant="outline-success"
                size="sm"
                onClick={addPackageRow}
              >
                Add
              </Button>
            </div>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Package Name</th>
                  <th>Description</th>
                  <th>Verification</th> {/* Multi-select */}
                  <th>Rate</th>
                  <th style={{ width: "150px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packageRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        value={row.package_name}
                        placeholder="Enter Package Name"
                        onChange={(e) =>
                          handlePackageRowChange(
                            index,
                            "package_name",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={row.package_description}
                        placeholder="Enter Description"
                        onChange={(e) =>
                          handlePackageRowChange(
                            index,
                            "package_description",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Select
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          valueContainer: (base) => ({
                            ...base,
                            display: "flex",
                            flexWrap: "nowrap",
                            overflowX: "auto",
                            maxHeight: "38px",
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#e0f2ff",
                            borderRadius: "6px",
                            marginRight: "4px",
                          }),
                        }}
                        menuPosition="fixed"
                        isMulti
                        options={[
                          { value: "Email", label: "Email" },
                          { value: "Phone", label: "Phone" },
                          { value: "ID Proof", label: "ID Proof" },
                          { value: "Address Proof", label: "Address Proof" },
                        ]}
                        value={
                          row.package_verification &&
                          row.package_verification.map((v) => ({
                            value: v,
                            label: v,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          const values = selectedOptions.map(
                            (opt) => opt.value
                          );
                          handlePackageRowChange(
                            index,
                            "package_verification",
                            values
                          );
                        }}
                      />
                    </td>

                    <td>
                      <Form.Control
                        value={row.package_rate}
                        placeholder="Enter Package Rate"
                        onChange={(e) =>
                          handlePackageRowChange(
                            index,
                            "package_rate",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="text-center">
                      {packageRows.length > 1 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="me-2"
                          onClick={() => removePackageRow(index)}
                        >
                          Remove
                        </Button>
                      )}
                      {/* {index === packageRows.length - 1 && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={addPackageRow}
                        >
                          Add
                        </Button>
                      )} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Add-on Details */}
            <div className="d-flex justify-content-between mb-2">
              <h5 className="">Add-on Details</h5>
              <Button variant="outline-success" size="sm" onClick={addRow}>
                Add
              </Button>
            </div>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Rate</th>
                  <th style={{ width: "150px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        value={row.add_on_check_title}
                        placeholder="Enter Title"
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "add_on_check_title",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={row.add_on_check_desc}
                        placeholder="Enter Description"
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "add_on_check_desc",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={row.add_on_check_rate}
                        placeholder="Enter Rate"
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "add_on_check_rate",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="text-center">
                      {/* Remove button (only show if more than 1 row) */}
                      {formRows.length > 1 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="me-2"
                          onClick={() => removeRow(index)}
                        >
                          Remove
                        </Button>
                      )}

                      {/* Add button only for last row */}
                      {/* {index === formRows.length - 1 && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={addRow}
                        >
                          Add
                        </Button>
                      )} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Submit */}
            <Row className="d-flex justify-content-center">
              <Button
                className="col-2"
                variant="success"
                onClick={handleFinalSubmit}
              >
                Submit
              </Button>
            </Row>
          </Modal.Body>
        </Modal>

        {/* view modal */}

        <Modal
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          size="lg"
          centered
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>Vendor Package Details</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {selectedRow?.length > 0 ? (
              selectedRow.map((pkg, idx) => (
                <div key={pkg.package_id} className="mb-4 border-bottom pb-3">
                  <Table striped bordered responsive>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Vendor Name</strong>
                        </td>
                        <td>{pkg.vendor_name || "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Vendor Email</strong>
                        </td>
                        <td>{pkg.vendor_email || "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Vendor Address</strong>
                        </td>
                        <td>{pkg.vendor_address || "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Package Name</strong>
                        </td>
                        <td>{pkg.package_name || "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Package Rate</strong>
                        </td>
                        <td>{pkg.package_rate || "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Details</strong>
                        </td>
                        <td>
                          <Table
                            striped
                            bordered
                            hover
                            responsive
                            size="sm"
                            className="mb-0"
                          >
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Rate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(pkg.details || []).map((detail, i) => (
                                <tr key={i}>
                                  <td>{detail?.title || "-"}</td>
                                  <td>{detail?.description || "-"}</td>
                                  <td>{detail?.rate || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ))
            ) : (
              <p>No package data available.</p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowViewModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* edeit vendor modal */}

        <Modal
          show={showVendorEditModal}
          onHide={() => {
            setshowVendorEditModal(false);
            setFormRows([
              {
                add_on_check_title: "",
                add_on_check_desc: "",
                add_on_check_rate: "",
              },
            ]);
            setPackageRows([
              { package_name: "", package_rate: "", package_description: "" },
            ]);
            setFormState([
              {
                vendor_name: "",
                vendor_email: "",
                vendor_address: "",
              },
            ]);
          }}
          centered
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Vendor</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Vendor Details */}
            <h5 className="mb-3">Vendor Details</h5>
            <Row className="mb-4 d-flex ">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Vendor Name</Form.Label>
                  <Form.Control
                    name="vendor_name"
                    placeholder="Enter Vendor Name"
                    value={formState?.vendor_name}
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="vendor_email"
                    value={formState?.vendor_email}
                    placeholder="Enter Email"
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="vendor_address"
                    value={formState?.vendor_address}
                    placeholder="Enter Address"
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    name="mobile_no"
                    value={formState?.mobile_no}
                    placeholder="Enter Mobile Number"
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Package Details */}
            <div className="d-flex justify-content-between mb-2">
              <h5 className="">Package Details</h5>
              <Button
                variant="outline-success"
                size="sm"
                onClick={addPackageRow}
              >
                Add
              </Button>
            </div>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Package Name</th>
                  <th>Description</th>
                  <th>Verification</th> {/* Multi-select */}
                  <th>Rate</th>
                  <th style={{ width: "150px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packageRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        value={row.package_name}
                        placeholder="Enter Package Name"
                        onChange={(e) =>
                          handlePackageRowChange(
                            index,
                            "package_name",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={row.package_description}
                        placeholder="Enter Description"
                        onChange={(e) =>
                          handlePackageRowChange(
                            index,
                            "package_description",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Select
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          valueContainer: (base) => ({
                            ...base,
                            display: "flex",
                            flexWrap: "nowrap",
                            overflowX: "auto",
                            maxHeight: "38px",
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#e0f2ff",
                            borderRadius: "6px",
                            marginRight: "4px",
                          }),
                        }}
                        menuPosition="fixed"
                        isMulti
                        options={[
                          { value: "Email", label: "Email" },
                          { value: "Phone", label: "Phone" },
                          { value: "ID Proof", label: "ID Proof" },
                          { value: "Address Proof", label: "Address Proof" },
                        ]}
                        value={
                          row.package_verification &&
                          row.package_verification.map((v) => ({
                            value: v,
                            label: v,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          const values = selectedOptions.map(
                            (opt) => opt.value
                          );
                          handlePackageRowChange(
                            index,
                            "package_verification",
                            values
                          );
                        }}
                      />
                    </td>

                    <td>
                      <Form.Control
                        value={row.package_rate}
                        placeholder="Enter Package Rate"
                        onChange={(e) =>
                          handlePackageRowChange(
                            index,
                            "package_rate",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="text-center">
                      {packageRows.length > 1 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="me-2"
                          onClick={() => removePackageRow(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Add-on Details */}
            <div className="d-flex justify-content-between mb-2">
              <h5 className="">Add-on Details</h5>
              <Button variant="outline-success" size="sm" onClick={addRow}>
                Add
              </Button>
            </div>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Rate</th>
                  <th style={{ width: "150px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        value={row.add_on_check_title}
                        placeholder="Enter Title"
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "add_on_check_title",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={row.add_on_check_desc}
                        placeholder="Enter Description"
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "add_on_check_desc",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={row.add_on_check_rate}
                        placeholder="Enter Rate"
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "add_on_check_rate",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="text-center">
                      {/* Remove button (only show if more than 1 row) */}
                      {formRows.length > 1 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="me-2"
                          onClick={() => removeRow(index)}
                        >
                          Remove
                        </Button>
                      )}

                      {/* Add button only for last row */}
                      {/* {index === formRows.length - 1 && (

                      )} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Submit */}
            <Row className="d-flex justify-content-center">
              <Button
                className="col-2 "
                variant="success"
                onClick={handleEditSubmit}
              >
                Update
              </Button>
            </Row>
          </Modal.Body>
        </Modal>

        {/* <Modal
          show={showVendorEditModal}
          onHide={() => {
            setshowVendorEditModal(false);
            setFormRows([
              {
                add_on_check_title: "",
                add_on_check_desc: "",
                add_on_check_rate: "",
              },
            ]);
            setPackageRows([
              { package_name: "", package_rate: "", package_description: "" },
            ]);
            setFormState([
              {
                vendor_name: "",
                vendor_email: "",
                vendor_address: "",
              },
            ]);
          }}
          centered
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Vendor</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="mb-3 d-flex gap-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Vendor Name</Form.Label>
                  <Form.Control
                    name="vendor_name"
                    placeholder="Enter vendor name"
                    value={formState?.vendor_name}
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="vendor_email"
                    value={formState?.vendor_email}
                    placeholder="Enter email"
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="vendor_address"
                    value={formState?.vendor_address}
                    placeholder="Enter address"
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {packageRows.map((row, index) => (
              <Row className="mb-3 d-flex gap-3" key={index}>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Package Name</Form.Label>
                    <Form.Control
                      name="package_name"
                      value={row.package_name}
                      placeholder="Enter package name"
                      onChange={(e) =>
                        handlePackageRowChange(
                          index,
                          "package_name",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Package Rate</Form.Label>
                    <Form.Control
                      name="package_rate"
                      value={row.package_rate}
                      placeholder="Enter package rate"
                      onChange={(e) =>
                        handlePackageRowChange(
                          index,
                          "package_rate",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Package Decribtion</Form.Label>
                    <Form.Control
                      name="package_description"
                      value={row.package_description}
                      placeholder="package Decribe"
                      onChange={(e) =>
                        handlePackageRowChange(
                          index,
                          "package_description",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            ))}

            <Button variant="success" className="mb-3" onClick={addPackageRow}>
              + Add Row
            </Button>

            {formRows.map((row, index) => (
              <Row key={index} className="mb-3 d-flex gap-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      value={row.add_on_check_title}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "add_on_check_title",
                          e.target.value
                        )
                      }
                      placeholder="Enter Title"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      value={row.add_on_check_desc}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "add_on_check_desc",
                          e.target.value
                        )
                      }
                      placeholder="Describe"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                      value={row.add_on_check_rate}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "add_on_check_rate",
                          e.target.value
                        )
                      }
                      placeholder="Enter rate"
                    />
                  </Form.Group>
                </Col>
              </Row>
            ))}

            <Button variant="success" className="mb-3" onClick={addRow}>
              + Add Row
            </Button>

            <Row className="d-flex justify-content-center">
              <Button
                className="col-2 "
                variant="success"
                onClick={handleEditSubmit}
              >
                Update
              </Button>
            </Row>
          </Modal.Body>
        </Modal> */}
        {/* package modal*/}
        {/* <Modal show={showPackageModal} onHide={setShowPackageModal} centered size="xl">
  <Modal.Header closeButton>
    <Modal.Title>Add Package</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group>
          <Form.Label>Package Name</Form.Label>
          <Form.Control
            name="package_rate"
            placeholder="Enter package name"
          />
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group>
          <Form.Label>Package Rate</Form.Label>
          <Form.Control
            name="package_rate"
            placeholder="Enter package rate"
          />

        </Form.Group>
      </Col>
    </Row>

    <Button variant="success">
      Add
    </Button>
  </Modal.Body>
</Modal> */}

        {/* check modal*/}
        {/* <Modal show={showCheckModal} onHide={setShowCheckModal} centered size="xl">
  <Modal.Header closeButton>
    <Modal.Title>Add Package</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Row className="mb-3 d-flex gap-3">
              <Col md={3}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="package_rate"
            placeholder="Enter Title"
          />
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="package_rate"
            placeholder="Describe"
          />
        </Form.Group>
      </Col>

      <Col md={3}>
        <Form.Group>
          <Form.Label>Rate</Form.Label>
          <Form.Control
            name="check_rate"
            placeholder="Enter rate"
          />

        </Form.Group>
      </Col>
    </Row>

    <Button variant="success">
      Add
    </Button>
  </Modal.Body>
</Modal> */}

        <ToastContainer position="top-right" autoClose={3000} />
      </Container>
    </div>
  );
};

export default Configure_bg_packages;
