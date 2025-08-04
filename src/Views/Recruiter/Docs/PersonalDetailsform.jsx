import React, { useState } from "react";
import { Form, Row, Col, Button, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axiosInstance from "Services/axiosInstance";

const initialReferences = [
  {
    name: "",
    designation: "",
    organization: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  {
    name: "",
    designation: "",
    organization: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
];

const initialEducation = [
  {
    qualification: "Post-Graduation",
    institution: "",
    university: "",
    from: "",
    to: "",
    program: "",
    marks: "",
  },
  {
    qualification: "Graduation",
    institution: "",
    university: "",
    from: "",
    to: "",
    program: "",
    marks: "",
  },
  {
    qualification: "HSC/12th",
    institution: "",
    university: "",
    from: "",
    to: "",
    program: "",
    marks: "",
  },
  {
    qualification: "SSC/10th",
    institution: "",
    university: "",
    from: "",
    to: "",
    program: "",
    marks: "",
  },
  {
    qualification: "Others",
    institution: "",
    university: "",
    from: "",
    to: "",
    program: "",
    marks: "",
  },
];

const initialEmployment = [
  {
    companyName: "",
    address: "",
    type: "",
    designation: "",
    reportedTo: "",
    reportedToPosition: "",
    reportedToContact: "",
    from: "",
    to: "",
    empCode: "",
    salary: "",
    pfAccountNumber: "",
    reason: "",
    mode: "",
    otherReason: "",
  },
  {
    companyName: "",
    address: "",
    type: "",
    designation: "",
    reportedTo: "",
    reportedToPosition: "",
    reportedToContact: "",
    from: "",
    to: "",
    empCode: "",
    salary: "",
    pfAccountNumber: "",
    reason: "",
    mode: "",
    otherReason: "",
  },
];

const PersonalDetailsForm = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    references: initialReferences,
    education: initialEducation,
    employment: initialEmployment,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reference handler
  const handleReferenceChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.references];
      updated[index][field] = value;
      return { ...prev, references: updated };
    });
  };

  // Education handler
  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.education];
      updated[index][field] = value;
      return { ...prev, education: updated };
    });
  };

  // Employment handler
  const handleEmploymentChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.employment];
      updated[index][field] = value;
      return { ...prev, employment: updated };
    });
  };

  // Employment radio
  const handleEmploymentRadioChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.employment];
      updated[index].type = value;
      return { ...prev, employment: updated };
    });
  };

  const handleEmpModeCheckbox = (index, label, checked) => {
    setFormData((prev) => {
      const updated = [...prev.employment];
      let currentMode = updated[index].mode || "";
      let modes = currentMode
        ? currentMode.split(",").map((mode) => mode.trim())
        : [];
      if (checked) {
        if (!modes.includes(label)) modes.push(label);
      } else {
        modes = modes.filter((mode) => mode !== label);
      }
      updated[index].mode = modes.join(", ");
      return { ...prev, employment: updated };
    });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token is missing in the URL");
      return;
    }

    if (!agreed) {
      toast.error("You must accept the terms and privacy policy.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        token,
        personal_detail: {
          title: formData.title,
          first_name: formData.firstName,
          middle_name: formData.middleName,
          last_name: formData.lastName,
        },
        references: formData.references.map((ref) => ({
          name: ref.name,
          designation: ref.designation,
          organization: ref.organization,
          relationship: ref.relationship,
          phone_number: ref.phone,
          email: ref.email,
          address: ref.address,
        })),
        education_details: formData.education.map((edu) => ({
          qualification: edu.qualification,
          institution_city: edu.institution,
          university_board: edu.university,
          from_date: edu.from,
          to_date: edu.to,
          program: edu.program,
          marks_or_cgpa: edu.marks,
        })),
        employment_details: formData.employment.map((emp) => ({
          company_name: emp.companyName,
          address: emp.address,
          employment_type: emp.type,
          designation: emp.designation,
          reported_to_name: emp.reportedTo,
          reported_to_position: emp.reportedToPosition,
          reported_to_contact: emp.reportedToContact,
          from_date: emp.from,
          to_date: emp.to,
          emp_code_or_ssn: emp.empCode,
          monthly_salary: parseFloat(emp.salary) || 0,
          pf_account_number: emp.pfAccountNumber,
          reason_for_leaving: emp.reason,
          mode_of_separation: emp.mode,
          other_reason: emp.otherReason,
        })),
      };

      const res = await axiosInstance.post(
        "/api/candidate-submissions/",
        payload
      );
      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-3 rounded">
      <div className="form-wrapper">
        <h2 className="mb-4">Personal Details Form</h2>
        <Form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <h5 className="section-title">Personal Details</h5>
          <Row className="mb-3">
            <Col md={2}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* References */}
          <h5 className="section-title">References</h5>
          {formData.references.map((ref, i) => (
            <Row key={i} className="mb-3">
              <Col md={2}>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={ref.name}
                  required
                  onChange={e =>
                    handleReferenceChange(i, "name", e.target.value)
                  }
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  placeholder="Designation"
                  value={ref.designation}
                  onChange={e =>
                    handleReferenceChange(i, "designation", e.target.value)
                  }
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  placeholder="Organization"
                  value={ref.organization}
                  onChange={e =>
                    handleReferenceChange(i, "organization", e.target.value)
                  }
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  placeholder="Relationship"
                  value={ref.relationship}
                  onChange={e =>
                    handleReferenceChange(i, "relationship", e.target.value)
                  }
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  value={ref.phone}
                  onChange={e =>
                    handleReferenceChange(i, "phone", e.target.value)
                  }
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={ref.email}
                  onChange={e =>
                    handleReferenceChange(i, "email", e.target.value)
                  }
                />
              </Col>
              <Col md={12} className="mt-2">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  value={ref.address}
                  onChange={e =>
                    handleReferenceChange(i, "address", e.target.value)
                  }
                />
              </Col>
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
                  <td>
                    <Form.Control
                      type="text"
                      required
                      value={edu.institution}
                      onChange={e =>
                        handleEducationChange(i, "institution", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={edu.university}
                      onChange={e =>
                        handleEducationChange(i, "university", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      value={edu.from}
                      onChange={e =>
                        handleEducationChange(i, "from", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      value={edu.to}
                      onChange={e =>
                        handleEducationChange(i, "to", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={edu.program}
                      onChange={e =>
                        handleEducationChange(i, "program", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={edu.marks}
                      onChange={e =>
                        handleEducationChange(i, "marks", e.target.value)
                      }
                    />
                  </td>
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
              {formData.employment.map((emp, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <Form.Control
                      type="text"
                      required
                      value={emp.companyName}
                      onChange={e =>
                        handleEmploymentChange(i, "companyName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      required
                      value={emp.address}
                      onChange={e =>
                        handleEmploymentChange(i, "address", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      label="Permanent"
                      checked={emp.type === "Permanent"}
                      onChange={e =>
                        handleEmploymentRadioChange(i, "Permanent")
                      }
                      name={`empType${i}`}
                    />
                    <Form.Check
                      type="radio"
                      label="Contract"
                      checked={emp.type === "Contract"}
                      onChange={e => handleEmploymentRadioChange(i, "Contract")}
                      name={`empType${i}`}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Designation"
                      className="mt-1"
                      required
                      value={emp.designation}
                      onChange={e =>
                        handleEmploymentChange(i, "designation", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Reported to Name"
                      required
                      value={emp.reportedTo}
                      onChange={e =>
                        handleEmploymentChange(i, "reportedTo", e.target.value)
                      }
                    />
                    <Form.Control
                      type="text"
                      placeholder="Position"
                      className="mt-1"
                      value={emp.reportedToPosition}
                      onChange={e =>
                        handleEmploymentChange(
                          i,
                          "reportedToPosition",
                          e.target.value
                        )
                      }
                    />
                    <Form.Control
                      type="text"
                      placeholder="Contact"
                      className="mt-1"
                      value={emp.reportedToContact}
                      onChange={e =>
                        handleEmploymentChange(
                          i,
                          "reportedToContact",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Form.Label className="small mb-0">From</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      value={emp.from}
                      onChange={e =>
                        handleEmploymentChange(i, "from", e.target.value)
                      }
                    />
                    <Form.Label className="small mt-2 mb-0">To</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      value={emp.to}
                      onChange={e =>
                        handleEmploymentChange(i, "to", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      required
                      value={emp.empCode}
                      onChange={e =>
                        handleEmploymentChange(i, "empCode", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Monthly Salary"
                      required
                      value={emp.salary}
                      onChange={e =>
                        handleEmploymentChange(i, "salary", e.target.value)
                      }
                    />
                    <Form.Control
                      type="text"
                      placeholder="PF A/C No."
                      className="mt-1"
                      value={emp.pfAccountNumber}
                      onChange={e =>
                        handleEmploymentChange(
                          i,
                          "pfAccountNumber",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Reason"
                      required
                      value={emp.reason}
                      onChange={e =>
                        handleEmploymentChange(i, "reason", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      label="Resignation"
                      checked={emp.mode?.includes("Resignation")}
                      onChange={e =>
                        handleEmpModeCheckbox(i, "Resignation", e.target.checked)
                      }
                    />
                    <Form.Check
                      type="checkbox"
                      label="Termination"
                      checked={emp.mode?.includes("Termination")}
                      onChange={e =>
                        handleEmpModeCheckbox(i, "Termination", e.target.checked)
                      }
                    />
                    <Form.Check
                      type="checkbox"
                      label="Absconded"
                      checked={emp.mode?.includes("Absconded")}
                      onChange={e =>
                        handleEmpModeCheckbox(i, "Absconded", e.target.checked)
                      }
                    />
                    <Form.Check
                      type="checkbox"
                      label="Closed Operations"
                      checked={emp.mode?.includes("Closed Operations")}
                      onChange={e =>
                        handleEmpModeCheckbox(
                          i,
                          "Closed Operations",
                          e.target.checked
                        )
                      }
                    />
                    <Form.Check
                      type="checkbox"
                      label="Others"
                      checked={emp.mode?.includes("Others")}
                      onChange={e =>
                        handleEmpModeCheckbox(i, "Others", e.target.checked)
                      }
                    />
                    <Form.Control
                      type="text"
                      placeholder="If others, specify"
                      className="mt-1"
                      value={emp.otherReason}
                      onChange={e =>
                        handleEmploymentChange(i, "otherReason", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Agreement and Submit */}
          <div className="text-end mt-3">
            <Form.Check
              type="checkbox"
              label="Accept terms and conditions & privacy policy"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mb-2"
            />
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
