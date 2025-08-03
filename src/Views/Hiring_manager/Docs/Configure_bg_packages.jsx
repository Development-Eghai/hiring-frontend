import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

const Configure_bg_packages = () => {

    const [showPackageModal,setShowPackageModal] = useState(false);
    const [showVendorModal,setShowVedorModal] = useState(false);
    const [showCheckModal,setShowCheckModal] = useState(false);

  return (
    <div>
      <Container fluid className="py-4 px-md-5 bg-light min-vh-100">
        <Card className="shadow-sm p-4">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0 text-start">Congigure BG Packages</h5>
              <div className="d-flex gap-3">
                <Button variant="success" onClick={()=>setShowVedorModal(true)}>
                  + Add Vendor
                </Button>
                <Button variant="success" onClick={()=>setShowPackageModal(true)}>
                  + Add Package
                </Button>
                <Button variant="success" onClick={()=>setShowCheckModal(true)}>
                  + Add On-Checks
                </Button>
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
<Modal show={showVendorModal} onHide={setShowVedorModal} centered size="xl">
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
            placeholder='Enter vendor name'
            // value={formState.req_id}
            // onChange={handleMainChange}
          />        
        </Form.Group>
      </Col>

      <Col md={3}>
        <Form.Group>
          <Form.Label>Package name</Form.Label>
          <Form.Select
            name="package_name"
            // value={formState.planning_id}
            // onChange={handleMainChange}
          >
            <option value="">-- Select package name --</option>
            {/* {dropdownOptions.plan_id.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))} */}
          </Form.Select>
        </Form.Group>
      </Col>
            <Col md={3}>
        <Form.Group>
          <Form.Label>Package name</Form.Label>
          <Form.Select
            name="package_name"
            // value={formState.planning_id}
            // onChange={handleMainChange}
          >
            <option value="">-- Select package name --</option>
            {/* {dropdownOptions.plan_id.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))} */}
          </Form.Select>
        </Form.Group>
      </Col>
       <Col md={3}>
        <Form.Group>
          <Form.Label>Details</Form.Label>
          <Form.Control
            name="vendor_name"
            placeholder='Description'
            // value={formState.req_id}
            // onChange={handleMainChange}
          />        
        </Form.Group>
      </Col>
    </Row>

    <Button variant="success" onClick={"handleFinalSubmit"}>
      Add
    </Button>
  </Modal.Body>
</Modal>


{/* package modal*/}
<Modal show={showPackageModal} onHide={setShowPackageModal} centered size="xl">
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
</Modal>

{/* check modal*/}
<Modal show={showCheckModal} onHide={setShowCheckModal} centered size="xl">
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
</Modal>

        <ToastContainer position="top-right" autoClose={3000} />
      </Container>
    </div>
  );
}

export default Configure_bg_packages
