import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';

const Configure_bg_packages = () => {

    const [showViewModal,setShowViewModal] = useState(false);
    const [showVendorModal,setShowVedorModal] = useState(false);
    const [selectedRow,setSelectedRow] = useState([]);
    
  const [details,setDetails] = useState([]);
  const [formstate,setFormState] = useState({
    vendor_name:"",
    vendor_address:"",
    vendor_email:"",

  })

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const [packageRows, setPackageRows] = useState([
    {
      package_name: "",
      package_description: "",
      package_rate: "",
      details: [
        {
          add_on_check_title: "",
          add_on_check_desc: "",
          add_on_check_rate: ""
        }
      ]
    }
  ]);

      const [formRows, setFormRows] = useState([
    { title: "", description: "", rate: "" }
  ]);

  const handlePackageRowChange = (index, field, value) => {
    const updated = [...packageRows];
    updated[index][field] = value;
    setPackageRows(updated);
  };

  
  const handleAddOnChange = (pkgIndex, addOnIndex, field, value) => {
    const updated = [...packageRows];
    updated[pkgIndex].details[addOnIndex][field] = value;
    setPackageRows(updated);
  };

    const addPackageRow = () => {
    setPackageRows([
      ...packageRows,
      {
        package_name: "",
        package_description: "",
        package_rate: "",
        details: [
          {
            add_on_check_title: "",
            add_on_check_desc: "",
            add_on_check_rate: ""
          }
        ]
      }
    ]);
  };

    const addAddOnRow = (pkgIndex) => {
    const updated = [...packageRows];
    updated[pkgIndex].details.push({
      add_on_check_title: "",
      add_on_check_desc: "",
      add_on_check_rate: ""
    });
    setPackageRows(updated);
  };

const fetchData = async()=>{
  try {
    const response = await axios.get("https://api.pixeladvant.com/bg-package-setup/")

    const{data,success} = response?.data;

    if(success){
      setDetails(data)
    }
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
fetchData() 
},[])


    const handleRowChange = (index, field, value) => {
    const updated = [...formRows];
    updated[index][field] = value;
    setFormRows(updated);
  };

  const addRow = () => {
    setFormRows([...formRows, { title: "", description: "", rate: "" }]);
  };


    const handleFinalSubmit =async () => {
      const payload = {
        ...formstate,
        packages: packageRows
      };
      console.log(payload,"Cdscda")
      // try {
      //   const response = await axios.post("https://api.pixeladvant.com/bg-package-setup/",data)
      //   const {data,success} = response?.data;
      //   if(success){
      //             console.log(response,"fsdfasdz")
      //     setShowVedorModal(false)
      //     fetchData()
      //   }
      // } catch (error) {
        
      // }
  };

  const handleViewDetails = (a)=>{
    setSelectedRow([a])
    setShowViewModal(true)
  }

  const handleEdit = async(a)=>{
    setFormState(a)
    setPackageRows(a?.packages)
    setFormRows(a?.details)
    setShowVedorModal(true)
  }


  return (
    <div>
      <Container fluid className="py-4 px-md-5 bg-light min-vh-100">
        <Card className="shadow-sm p-4">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0 text-start">Configure BG Packages</h5>
              <div className="d-flex gap-3">
                <Button variant="success" onClick={()=>setShowVedorModal(true)}>
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
                    <td>{i+1}</td>
                    <td>{a.vendor_name}</td>
                    <td>{a.package_name}</td>
                    <td>{a.package_rate}</td>
                    <td>{a.details && <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={()=>handleViewDetails(a)}
                      >
                        View
                      </Button> }</td>
                    <td className="d-flex p-2 gap-2 justify-content-center">
                      
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleEdit(a)}
                      >
                        <BsPencilSquare className="me-1" />
                      </Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
        {/* <hr /> */}

        {/* <div>
          <CandidateApprovalStatus />
        </div>

        {/*vendor Modal */}
 <Modal show={showVendorModal} onHide={() => setShowVedorModal(false)} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Add Vendor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Static Vendor Fields */}
        <Row className="mb-3 d-flex gap-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                name="vendor_name"
                value={formstate.vendor_name}
                placeholder="Enter vendor name"
                onChange={handleMainChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="vendor_email"
                value={formstate.vendor_email}
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
                value={formstate.vendor_address}
                placeholder="Enter address"
                onChange={handleMainChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Dynamic Packages */}
        {packageRows.map((pkg, pkgIndex) => (
          <div key={pkgIndex} className="border p-3 mb-3 rounded bg-light">
            <h5>Package {pkgIndex + 1}</h5>
            <Row className="mb-3 d-flex gap-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Package Name</Form.Label>
                  <Form.Control
                    name="package_name"
                    value={pkg.package_name}
                    placeholder="Enter package name"
                    onChange={(e) =>
                      handlePackageRowChange(pkgIndex, "package_name", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Package Description</Form.Label>
                  <Form.Control
                    name="package_description"
                    value={pkg.package_description}
                    placeholder="Enter package description"
                    onChange={(e) =>
                      handlePackageRowChange(pkgIndex, "package_description", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Package Rate</Form.Label>
                  <Form.Control
                    name="package_rate"
                    value={pkg.package_rate}
                    placeholder="Enter package rate"
                    onChange={(e) =>
                      handlePackageRowChange(pkgIndex, "package_rate", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Add-on rows per package */}
            {pkg.details.map((addOn, addOnIndex) => (
              <Row key={addOnIndex} className="mb-2">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Add-on Title</Form.Label>
                    <Form.Control
                      value={addOn.add_on_check_title}
                      placeholder="Add-on Title"
                      onChange={(e) =>
                        handleAddOnChange(pkgIndex, addOnIndex, "add_on_check_title", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Add-on Description</Form.Label>
                    <Form.Control
                      value={addOn.add_on_check_desc}
                      placeholder="Add-on Description"
                      onChange={(e) =>
                        handleAddOnChange(pkgIndex, addOnIndex, "add_on_check_desc", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Add-on Rate</Form.Label>
                    <Form.Control
                      value={addOn.add_on_check_rate}
                      placeholder="Add-on Rate"
                      onChange={(e) =>
                        handleAddOnChange(pkgIndex, addOnIndex, "add_on_check_rate", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            ))}

            <Button
              variant="secondary"
              className="mb-3"
              onClick={() => addAddOnRow(pkgIndex)}
            >
              + Add Add-on
            </Button>
          </div>
        ))}

        <Button variant="success" className="mb-4" onClick={addPackageRow}>
          + Add Package
        </Button>

        <Row className="d-flex justify-content-center">
          <Button className="col-2" variant="success" onClick={handleFinalSubmit}>
            Submit
          </Button>
        </Row>
      </Modal.Body>
    </Modal>

{/* view modal */}

 <Modal show={showViewModal} onHide={()=>setShowViewModal(false)} size="lg" centered scrollable>
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
                    <td><strong>Vendor Name</strong></td>
                    <td>{pkg.vendor_name || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Vendor Email</strong></td>
                    <td>{pkg.vendor_email || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Vendor Address</strong></td>
                    <td>{pkg.vendor_address || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Package Name</strong></td>
                    <td>{pkg.package_name || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Package Rate</strong></td>
                    <td>{pkg.package_rate || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Details</strong></td>
                    <td>
                      <Table striped bordered hover responsive size="sm" className="mb-0">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pkg.details?.map((detail, i) => (
                            <tr key={i}>
                              <td>{detail.title || "-"}</td>
                              <td>{detail.description || "-"}</td>
                              <td>{detail.rate || "-"}</td>
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
        <Button variant="secondary" onClick={()=>setShowViewModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

        <ToastContainer position="top-right" autoClose={3000} />
      </Container>
    </div>
  );
}

export default Configure_bg_packages
