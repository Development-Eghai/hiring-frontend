import React, { useState } from "react";
import { Form, Row, Col, Button, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const PersonalDetailsForm = () => {
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    primarySkill: "",
    source: "",
    nationality: "",
    citizenship: "",
    gender: "",
    dob: "",
    placeOfBirth: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    maritalStatus: "",
    spouseName: "",
    currentAddress: "",
    currentStay: "",
    permanentAddress: "",
    permanentStay: "",
    preferredLocation: "",
    passportNumber: "",
    passportExpiry: "",
    references: [
      { name: "", designation: "", organization: "", relationship: "", phone: "", email: "", address: "" },
      { name: "", designation: "", organization: "", relationship: "", phone: "", email: "", address: "" }
    ],
    education: [
      { qualification: "Post-Graduation", institution: "", university: "", from: "", to: "", program: "", marks: "" },
      { qualification: "Graduation", institution: "", university: "", from: "", to: "", program: "", marks: "" },
      { qualification: "HSC/12th", institution: "", university: "", from: "", to: "", program: "", marks: "" },
      { qualification: "SSC/10th", institution: "", university: "", from: "", to: "", program: "", marks: "" },
      { qualification: "Others", institution: "", university: "", from: "", to: "", program: "", marks: "" }
    ],
    employment: [
      { type: "", designation: "", address: "", reportedTo: "", from: "", to: "", empCode: "", salary: "", reason: "", mode: "" }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Form submitted successfully!");
    }, 1000);
  };

  return (
    <div className="bg-white p-3 rounded">
      <div className="form-wrapper">
        <h2 className="mb-4">Personal Details Form</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          
          {/* Personal Details */}
          <h5 className="section-title">Personal Details</h5>
          <Row className="mb-3">
            <Col md={2}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Select name="title" value={formData.title} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* References */}
          <h5 className="section-title">References</h5>
          {formData.references.map((_, i) => (
            <Row key={i} className="mb-3">
              <Col md={3}><Form.Control type="text" placeholder="Name" required /></Col>
              <Col md={3}><Form.Control type="text" placeholder="Designation" /></Col>
              <Col md={3}><Form.Control type="text" placeholder="Organization" /></Col>
              <Col md={3}><Form.Control type="text" placeholder="Phone" /></Col>
            </Row>
          ))}

          {/* Education */}
          <h5 className="section-title">Education Details</h5>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Qualification</th>
                <th>Institution & City</th>
                <th>University / Board</th>
                <th>From</th>
                <th>To</th>
                <th>Program</th>
                <th>% Marks / CGPA</th>
              </tr>
            </thead>
            <tbody>
              {formData.education.map((edu, i) => (
                <tr key={i}>
                  <td>{edu.qualification}</td>
                  <td><Form.Control type="text" required /></td>
                  <td><Form.Control type="text" /></td>
                  <td><Form.Control type="date" /></td>
                  <td><Form.Control type="date" /></td>
                  <td><Form.Control type="text" /></td>
                  <td><Form.Control type="text" /></td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Employment */}
          <h5 className="section-title">Employment Details</h5>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Employment Type & Designation</th>
                <th>Reported To</th>
                <th>Employment Period</th>
                <th>Emp Code / SSN</th>
                <th>Salary & PF A/C No.</th>
                <th>Reason for Leaving</th>
                <th>Mode of Separation</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2].map((num) => (
                <tr key={num}>
                  <td>{num}</td>
                  <td><Form.Control type="text" required /></td>
                  <td><Form.Control type="text" required /></td>
                  <td>
                    <Form.Check type="radio" label="Permanent" name={`empType${num}`} />
                    <Form.Check type="radio" label="Contract" name={`empType${num}`} />
                    <Form.Control type="text" placeholder="Designation" className="mt-1" required />
                  </td>
                  <td><Form.Control type="text" placeholder="Name, Position, Contact" required /></td>
                  <td>
                    <Form.Label className="small mb-0">From</Form.Label>
                    <Form.Control type="date" required />
                    <Form.Label className="small mt-2 mb-0">To</Form.Label>
                    <Form.Control type="date" required />
                  </td>
                  <td><Form.Control type="text" required /></td>
                  <td>
                    <Form.Control type="number" placeholder="Monthly Salary" required />
                    <Form.Control type="text" placeholder="PF A/C No." className="mt-1" />
                  </td>
                  <td><Form.Control type="text" placeholder="Reason" required /></td>
                  <td>
                    <Form.Check type="checkbox" label="Resignation" />
                    <Form.Check type="checkbox" label="Termination" />
                    <Form.Check type="checkbox" label="Absconded" />
                    <Form.Check type="checkbox" label="Closed Operations" />
                    <Form.Check type="checkbox" label="Others" />
                    <Form.Control type="text" placeholder="If others, specify" className="mt-1" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Submit */}
          <div className="text-end mt-3">
             <td>
                    <Form.Check type="checkbox" label="Accpet terms and conditions & privacy policy"  /> 
                  </td>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Submit"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
