import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert, Card, Spinner } from 'react-bootstrap';
import { FaUpload, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pixeladvant.com',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

const PreOnboardingForm = () => {
  const [formData, setFormData] = useState({
    candidateInfo: {
      id: 'C001',
// candidateInfo[id]:1,
      firstName: 'Pankaj',
      lastName: 'Pundir',
      dateOfJoining: ''
    },
    personalDetails: {
      dob: '',
      maritalStatus: 'Single',
      gender: 'Male',
      bloodGroup: '',
      permanentAddress: '',
      presentAddress: '',
      emergencyPOCName: '',
      emergencyContactNumber: '',
      photograph: null
    },
    referenceCheck: [
      { sNo: 1, firstName: '', lastName: '', designation: '', reportingManagerName: '', officialEmailId: '', phoneNumber: '' },
      { sNo: 2, firstName: '', lastName: '', designation: '', reportingManagerName: '', officialEmailId: '', phoneNumber: '' }
    ],
    bankingDetails: {
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      branchAddress: '',
      bankStatement: null,
      cancelCheque: null
    },
    financialDocuments: {
      pfNumber: '',
      uanNumber: '',
      pranNumber: '',
      form16: null,
      salarySlips: null
    },
    nomineeDetails: [
      { firstName: 'A', lastName: '', share: 25 },
      { firstName: '', lastName: '', share: 10 },
      { firstName: '', lastName: '', share: 15 },
      { firstName: '', lastName: '', share: 50 },
      { firstName: '', lastName: '', share: '' }
    ],
    insuranceDetails: [
      { firstName: '', lastName: '', dob: '' },
      { firstName: '', lastName: '', dob: '' },
      { firstName: '', lastName: '', dob: '' },
      { firstName: '', lastName: '', dob: '' },
      { firstName: '', lastName: '', dob: '' }
    ],
    uploadedDocuments: {
      education: {
        '10th': null,
        '12th': null,
        'Diploma': null,
        'Graduate': null,
        'Post Graduate': null,
        'Certificates': null
      },
      employment: {
        'Offer Letter': null,
        'Relieving Letter': null,
        'Service Letter': null
      },
      other: {
        'Passport': null,
        'PanCard': null,
        'Background Verification': null
      }
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const handleFileUpload = (category, type, file) => {
    setFormData(prev => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [category]: {
          ...prev.uploadedDocuments[category],
          [type]: file
        }
      }
    }));
  };

  const handleFileDelete = (category, type) => {
    setFormData(prev => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [category]: {
          ...prev.uploadedDocuments[category],
          [type]: null
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    const backendFormData = new FormData();
    
    Object.entries(formData).forEach(([section, data]) => {
      if (section === 'uploadedDocuments') {
        Object.entries(data).forEach(([category, docs]) => {
          Object.entries(docs).forEach(([docType, file]) => {
            if (file) {
              backendFormData.append(`${category}_${docType.replace(/\s+/g, '_')}`, file);
            }
          });
        });
      } else if (Array.isArray(data)) {
        data.forEach((item, index) => {
          Object.entries(item).forEach(([key, value]) => {
            backendFormData.append(`${section}[${index}].${key}`, value);
          });
        });
      } else {
        Object.entries(data).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            backendFormData.append(`${section}.${key}`, value);
          }
        });
      }
    });
    
    try {
      console.log('Submitted Form Data:', formData);
      console.log('Backend FormData:', backendFormData);
      
      const response = await api.post('/api/candidate/pre-onboarding-form/', backendFormData);
      
      console.log('API Response:', response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response) {
        setSubmitError(`Error ${error.response.status}: ${error.response.data.message || 'Failed to submit form'}`);
      } else if (error.request) {
        setSubmitError('No response from server. Please check your internet connection.');
      } else {
        setSubmitError('Failed to submit form. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const documentCategories = [
    {
      name: 'Education Documents',
      key: 'education',
      documents: ['10th', '12th', 'Diploma', 'Graduate', 'Post Graduate', 'Certificates']
    },
    {
      name: 'Previous Employment',
      key: 'employment',
      documents: ['Offer Letter', 'Relieving Letter', 'Service Letter']
    },
    {
      name: 'Other Documents',
      key: 'other',
      documents: ['Passport', 'PanCard', 'Background Verification']
    }
  ];

  return (
    <Container fluid className="p-4 bg-light">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title as="h3" className="mb-4 text-primary">Pre-Onboarding Form</Card.Title>
          
          {isSubmitted && (
            <Alert variant="success" className="mb-4">
              <FaCheck className="me-2" /> Form submitted successfully!
            </Alert>
          )}
          
          {submitError && (
            <Alert variant="danger" className="mb-4">
              <FaTimes className="me-2" /> {submitError}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            {/* Candidate Info */}
            <Card className="mb-4">
              <Card.Header as="h5" className="bg-primary text-white">Candidate Information</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Label>Candidate ID</Form.Label>
                    <Form.Control 
                      readOnly 
                      value={formData.candidateInfo.id} 
                      onChange={(e) => handleChange('candidateInfo', 'id', e.target.value)} 
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                      value={formData.candidateInfo.firstName} 
                      onChange={(e) => handleChange('candidateInfo', 'firstName', e.target.value)} 
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                      value={formData.candidateInfo.lastName} 
                      onChange={(e) => handleChange('candidateInfo', 'lastName', e.target.value)} 
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Label>Date of Joining</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={formData.candidateInfo.dateOfJoining} 
                      onChange={(e) => handleChange('candidateInfo', 'dateOfJoining', e.target.value)} 
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Personal Details */}
            <Card className="mb-4">
              <Card.Header as="h5" className="bg-primary text-white">Personal Details</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={formData.personalDetails.dob} 
                      onChange={(e) => handleChange('personalDetails', 'dob', e.target.value)} 
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Marital Status</Form.Label>
                    <Form.Select 
                      value={formData.personalDetails.maritalStatus} 
                      onChange={(e) => handleChange('personalDetails', 'maritalStatus', e.target.value)}
                    >
                      <option>Single</option>
                      <option>Married</option>
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select 
                      value={formData.personalDetails.gender} 
                      onChange={(e) => handleChange('personalDetails', 'gender', e.target.value)}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Control 
                      value={formData.personalDetails.bloodGroup} 
                      onChange={(e) => handleChange('personalDetails', 'bloodGroup', e.target.value)} 
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label>Permanent Address</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3}
                      value={formData.personalDetails.permanentAddress} 
                      onChange={(e) => handleChange('personalDetails', 'permanentAddress', e.target.value)} 
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Present Address</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3}
                      value={formData.personalDetails.presentAddress} 
                      onChange={(e) => handleChange('personalDetails', 'presentAddress', e.target.value)} 
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label>Emergency Contact Name</Form.Label>
                    <Form.Control 
                      value={formData.personalDetails.emergencyPOCName} 
                      onChange={(e) => handleChange('personalDetails', 'emergencyPOCName', e.target.value)} 
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Emergency Contact Number</Form.Label>
                    <Form.Control 
                      value={formData.personalDetails.emergencyContactNumber} 
                      onChange={(e) => handleChange('personalDetails', 'emergencyContactNumber', e.target.value)} 
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Label>Photograph</Form.Label>
                    {formData.personalDetails.photograph ? (
                      <div className="d-flex align-items-center">
                        <span className="me-2">{formData.personalDetails.photograph.name}</span>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleChange('personalDetails', 'photograph', null)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ) : (
                      <Form.Control 
                        type="file" 
                        onChange={(e) => handleChange('personalDetails', 'photograph', e.target.files[0])} 
                      />
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Reference Check */}
            <Card className="mb-4">
              <Card.Header as="h5" className="bg-primary text-white">Reference Check Details</Card.Header>
              <Card.Body>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Designation</th>
                      <th>Reporting Manager Name</th>
                      <th>Official Email ID</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.referenceCheck.map((ref, index) => (
                      <tr key={index}>
                        <td>{ref.sNo}</td>
                        <td>
                          <Form.Control 
                            value={ref.firstName} 
                            onChange={(e) => handleArrayChange('referenceCheck', index, 'firstName', e.target.value)} 
                          />
                        </td>
                        <td>
                          <Form.Control 
                            value={ref.lastName} 
                            onChange={(e) => handleArrayChange('referenceCheck', index, 'lastName', e.target.value)} 
                          />
                        </td>
                        <td>
                          <Form.Control 
                            value={ref.designation} 
                            onChange={(e) => handleArrayChange('referenceCheck', index, 'designation', e.target.value)} 
                          />
                        </td>
                        <td>
                          <Form.Control 
                            value={ref.reportingManagerName} 
                            onChange={(e) => handleArrayChange('referenceCheck', index, 'reportingManagerName', e.target.value)} 
                          />
                        </td>
                        <td>
                          <Form.Control 
                            type="email"
                            value={ref.officialEmailId} 
                            onChange={(e) => handleArrayChange('referenceCheck', index, 'officialEmailId', e.target.value)} 
                          />
                        </td>
                        <td>
                          <Form.Control 
                            value={ref.phoneNumber} 
                            onChange={(e) => handleArrayChange('referenceCheck', index, 'phoneNumber', e.target.value)} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Banking Details */}
            <Card className="mb-4">
              <Card.Header as="h5" className="bg-primary text-white">Banking Details</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control 
                      value={formData.bankingDetails.bankName} 
                      onChange={(e) => handleChange('bankingDetails', 'bankName', e.target.value)} 
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control 
                      value={formData.bankingDetails.accountNumber} 
                      onChange={(e) => handleChange('bankingDetails', 'accountNumber', e.target.value)} 
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>IFSC Code</Form.Label>
                    <Form.Control 
                      value={formData.bankingDetails.ifscCode} 
                      onChange={(e) => handleChange('bankingDetails', 'ifscCode', e.target.value)} 
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Branch Address</Form.Label>
                    <Form.Control 
                      value={formData.bankingDetails.branchAddress} 
                      onChange={(e) => handleChange('bankingDetails', 'branchAddress', e.target.value)} 
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label>Bank Statement</Form.Label>
                    {formData.bankingDetails.bankStatement ? (
                      <div className="d-flex align-items-center">
                        <span className="me-2">{formData.bankingDetails.bankStatement.name}</span>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleChange('bankingDetails', 'bankStatement', null)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ) : (
                      <Form.Control 
                        type="file" 
                        onChange={(e) => handleChange('bankingDetails', 'bankStatement', e.target.files[0])} 
                      />
                    )}
                  </Col>
                  <Col md={6}>
                    <Form.Label>Cancel Cheque</Form.Label>
                    {formData.bankingDetails.cancelCheque ? (
                      <div className="d-flex align-items-center">
                        <span className="me-2">{formData.bankingDetails.cancelCheque.name}</span>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleChange('bankingDetails', 'cancelCheque', null)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ) : (
                      <Form.Control 
                        type="file" 
                        onChange={(e) => handleChange('bankingDetails', 'cancelCheque', e.target.files[0])} 
                      />
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Financial Documents */}
            <Card className="mb-4">
              <Card.Header as="h5" className="bg-primary text-white">Financial Documents</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Label>PF Number</Form.Label>
                    <Form.Control 
                      value={formData.financialDocuments.pfNumber} 
                      onChange={(e) => handleChange('financialDocuments', 'pfNumber', e.target.value)} 
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>UAN Number</Form.Label>
                    <Form.Control 
                      value={formData.financialDocuments.uanNumber} 
                      onChange={(e) => handleChange('financialDocuments', 'uanNumber', e.target.value)} 
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>PRAN Number</Form.Label>
                    <Form.Control 
                      value={formData.financialDocuments.pranNumber} 
                      onChange={(e) => handleChange('financialDocuments', 'pranNumber', e.target.value)} 
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Form-16</Form.Label>
                    {formData.financialDocuments.form16 ? (
                      <div className="d-flex align-items-center">
                        <span className="me-2">{formData.financialDocuments.form16.name}</span>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleChange('financialDocuments', 'form16', null)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ) : (
                      <Form.Control 
                        type="file" 
                        onChange={(e) => handleChange('financialDocuments', 'form16', e.target.files[0])} 
                      />
                    )}
                  </Col>
                  <Col md={3}>
                    <Form.Label>Salary Slips</Form.Label>
                    {formData.financialDocuments.salarySlips ? (
                      <div className="d-flex align-items-center">
                        <span className="me-2">{formData.financialDocuments.salarySlips.name}</span>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleChange('financialDocuments', 'salarySlips', null)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ) : (
                      <Form.Control 
                        type="file" 
                        onChange={(e) => handleChange('financialDocuments', 'salarySlips', e.target.files[0])} 
                      />
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Nominee Details */}
            <Card className="mb-4">
              <Card.Header as="h5" className="bg-primary text-white">Nominee Details</Card.Header>
              <Card.Body>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>% of Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.nomineeDetails.map((nominee, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Control 
                            value={nominee.firstName} 
                            onChange={(e) => handleArrayChange('nomineeDetails', index, 'firstName', e.target.value)} 
                          />
                        </td>
                        <td>
                          <Form.Control 
                            value={nominee.lastName} 
                            onChange={(e) => handleArrayChange('nomineeDetails', index, 'lastName', e.target.value)} 
                          />
                        </td>
                        <td>
                          <Form.Control 
                            type="number"
                            value={nominee.share} 
                            onChange={(e) => handleArrayChange('nomineeDetails', index, 'share', e.target.value)} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Insurance Details */}
            <Card className="mb-4">
              <Card.Header as="h5" className="bg-primary text-white">Insurance Details</Card.Header>
              <Card.Body>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Date of Birth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.insuranceDetails.map((insurance, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Control 
                            value={insurance.firstName} 
                            onChange={(e) => handleArrayChange('insuranceDetails', index, 'firstName', e.target.value)} 
                          />
                        </td>
                        <td>
                          <Form.Control 
                            value={insurance.lastName} 
                            onChange={(e) => handleArrayChange('insuranceDetails', index, 'lastName', e.target.value)} 
                          />
                        </td>
                        <td>
                          <Form.Control 
                            type="date"
                            value={insurance.dob} 
                            onChange={(e) => handleArrayChange('insuranceDetails', index, 'dob', e.target.value)} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Upload Documents */}
            <Card className="mb-4">
              <Card.Header as="h5" className="bg-primary text-white">Upload Documents</Card.Header>
              <Card.Body>
                {documentCategories.map((category) => (
                  <div key={category.key} className="mb-4">
                    <h6 className="mb-3">{category.name}</h6>
                    <Row>
                      {category.documents.map((doc) => (
                        <Col md={4} className="mb-3" key={doc}>
                          <Form.Label>{doc}</Form.Label>
                          {formData.uploadedDocuments[category.key][doc] ? (
                            <div className="d-flex align-items-center border rounded p-2 bg-light">
                              <span className="me-2 flex-grow-1">{formData.uploadedDocuments[category.key][doc].name}</span>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleFileDelete(category.key, doc)}
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <Form.Control 
                                type="file" 
                                className="me-2"
                                onChange={(e) => handleFileUpload(category.key, doc, e.target.files[0])} 
                              />
                              <Button variant="outline-primary">
                                <FaUpload />
                              </Button>
                            </div>
                          )}
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-end">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Form'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PreOnboardingForm;