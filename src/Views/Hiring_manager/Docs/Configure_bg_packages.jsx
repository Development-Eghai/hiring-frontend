import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

const Configure_bg_packages = () => {

    const [showPackageModal,setShowPackageModal] = useState(false);
    const [showVendorModal,setShowVedorModal] = useState(false);
    const [showCheckModal,setShowCheckModal] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState([]);

  const [packageRows, setPackageRows] = useState([
  { package_name: "", package_rate: "" }
]);

      const [formRows, setFormRows] = useState([
    { title: "", description: "", rate: "" }
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
    setFormRows([...formRows, { title: "", description: "", rate: "" }]);
  };

  const handleMultiSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setSelectedChecks(selected);
  };

    const handleFinalSubmit = () => {
    console.log("Submitted Rows:", formRows);
    console.log("Selected for multi-select:", selectedChecks);
  };

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
                  <th>Vendor Name</th>
                  <th>Package Name</th>
                  <th>Package Rate</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {approvers.map((a, i) => (
                  <tr key={i}>
                    <td>{a.req_id}</td>
                    <td>{a.planning_id}</td>
                    <td>{a.client_name}</td>
                    <td>{a.no_of_approvers}</td>
                    <td className="d-flex p-2 gap-2 justify-content-center">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => {
                          setViewApproversData(a.approvers || []);
                          setShowViewModal(true);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleEdit(a.req_id)}
                      >
                        <BsPencilSquare className="me-1" />
                      </Button>

                    </td>
                  </tr>
                ))} */}
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
              <Form.Control name="vendor_name" placeholder="Enter vendor name" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control name="vendor_email" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control name="vendor_address" placeholder="Enter address" />
            </Form.Group>
          </Col>
        </Row>

        {/* Package Info */}
        {packageRows.map((row, index) => (
    <Row className="mb-3 d-flex gap-3" key={index}>
      <Col md={5}>
        <Form.Group>
          <Form.Label>Package Name</Form.Label>
          <Form.Control
            name="package_name"
            value={row.package_name}
            placeholder="Enter package name"
            onChange={(e) => handlePackageRowChange(index, "package_name", e.target.value)}
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
            onChange={(e) => handlePackageRowChange(index, "package_rate", e.target.value)}
          />
        </Form.Group>
      </Col>
    </Row>
  ))}

  <Button variant="success" className="mb-3" onClick={addPackageRow}>
    + Add Row
  </Button>


        {/* Dynamic Rows Section */}
        {formRows.map((row, index) => (
          <Row key={index} className="mb-3 d-flex gap-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={row.title}
                  onChange={(e) => handleRowChange(index, "title", e.target.value)}
                  placeholder="Enter Title"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={row.description}
                  onChange={(e) => handleRowChange(index, "description", e.target.value)}
                  placeholder="Describe"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  value={row.rate}
                  onChange={(e) => handleRowChange(index, "rate", e.target.value)}
                  placeholder="Enter rate"
                />
              </Form.Group>
            </Col>
          </Row>
        ))}

        <Button variant="success" className="mb-3" onClick={addRow}>
          + Add Row
        </Button>

<Row className='d-flex justify-content-center'>
          <Button className='col-2 ' variant="success" onClick={handleFinalSubmit}>
          Submit
        </Button>
</Row>
      </Modal.Body>
    </Modal>


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
}

export default Configure_bg_packages
