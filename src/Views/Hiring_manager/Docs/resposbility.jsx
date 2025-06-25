import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons"; // using Bootstrap Icons

const roles = ["Hiring Manager", "Recruiter", "Coordinator", "Sourcer"];

const ResponsibilitySetting = () => {
  const [expandedRoles, setExpandedRoles] = useState({});
  const [notifiedOthers, setNotifiedOthers] = useState([]);

  const toggleRole = (role) => {
    setExpandedRoles((prev) => ({ ...prev, [role]: true }));
  };

  const deleteRole = (roleToDelete) => {
    setExpandedRoles((prev) => {
      const newState = { ...prev };
      delete newState[roleToDelete];
      return newState;
    });
  };

  const addNotifiedOther = () => {
    setNotifiedOthers((prev) => [...prev, {}]);
  };

  const deleteNotifiedOther = (indexToDelete) => {
    setNotifiedOthers((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const renderTaskFields = () => (
    <>
      <Row className="mb-3 gap-2">
        <Col >
          <Form.Group>
            <Form.Label>Application Review</Form.Label>
            <Form.Control type="number" placeholder="Days" />
          </Form.Group>
        </Col>
        <Col >
          <Form.Group>
            <Form.Label>Phone Interview</Form.Label>
            <Form.Control type="number" placeholder="Days" />
          </Form.Group>
        </Col>
        <Col >
          <Form.Group>
            <Form.Label>Reference Check</Form.Label>
            <Form.Control type="number" placeholder="Days" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3 gap-2">
        <Col >
          <Form.Group>
            <Form.Label>Face to Face</Form.Label>
            <Form.Control type="number" placeholder="Days" />
          </Form.Group>
        </Col>
        <Col >
          <Form.Group>
            <Form.Label>Verbal Offer</Form.Label>
            <Form.Control type="number" placeholder="Days" />
          </Form.Group>
        </Col>
        <Col >
          <Form.Group>
            <Form.Label>Other</Form.Label>
            <Form.Control type="number" placeholder="Days" />
          </Form.Group>
        </Col>
      </Row>
    </>
  );

  return (
    <div className="    ">
      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="mb-3 fw-bold">Setting Responsibility</h4>
          <p className="text-muted mb-4">
            These people will be assigned tasks for all new candidates by default. You can edit who's responsible in the candidate's profile.
          </p>

          {/* Role Sections */}
          {roles.map((role) => (
            <Card key={role} className="mb-4 border-0 bg-light">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2 position-relative">
                  <h6 className="fw-semibold mb-0">{role} Tasks</h6>

                  {!expandedRoles[role] && (
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => toggleRole(role)}
                    >
                      + Add Notification
                    </Button>
                  )}

                  {expandedRoles[role] && (
                    <Button
                      variant="link"
                      size="sm"
                      className="position-absolute top-0 end-0 text-danger"
                      onClick={() => deleteRole(role)}
                    >
                      <Trash size={18} />
                    </Button>
                  )}
                </div>

                {expandedRoles[role] && (
                  <div className="bg-white p-3 mt-4 rounded">
                    {renderTaskFields()}
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}

          {/* Notified Others Section */}
          <Card className=" border-0  bg-light">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center ">
                <h6 className="fw-semibold mb-0">+ Notified Others</h6>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={addNotifiedOther}
                >
                  + Add Others 
                </Button>
              </div>

              {notifiedOthers.map((_, index) => (
                <Card key={index} className="mb-3 border p-3 shadow-sm  bg-white position-relative">
                  <h6 className="text-muted mb-3">Notified Person {index + 1}</h6>
                  <Button
                    variant="link"
                    size="sm"
                    className="position-absolute top-0 end-0 text-danger"
                    onClick={() => deleteNotifiedOther(index)}
                  >
                    <Trash size={18} />
                  </Button>
                  <Row className="mb-3 gap-2">
                    <Col >
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="Enter first name" />
                      </Form.Group>
                    </Col>
                    <Col >
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Enter last name" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3 gap-2">
                    <Col >
                      <Form.Group>
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>
                    </Col>
                    <Col >
                      <Form.Group>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control placeholder="Enter mobile number" />
                      </Form.Group>
                    </Col>
                  </Row>
                  {renderTaskFields()}
                </Card>
              ))}
            </Card.Body>
          </Card>

          <div className="text-end mt-4">
            <Button variant="primary px-5">Sumbit</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResponsibilitySetting;
