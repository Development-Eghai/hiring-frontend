import React, { useState } from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';

const InterviewForm = () => {
  const [status, setStatus] = useState('rejected');
  const [parameters, setParameters] = useState([{}]);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSaveParameter = (index) => {
    const allFilled = Object.values(parameters[index]).every(val => val !== '');
    if (!allFilled) return;

    setLoadingIndex(index);
    setTimeout(() => {
      setLoadingIndex(null);
      setParameters(prev => ([
        ...prev,
        {
          scoreCard: '',
          option: '',
          guideline: '',
          minQuestions: '',
          screeningType: '',
          duration: '',
          mode: '',
          feedback: ''
        }
      ]));
    }, 3000);
  };

  const handleRemoveParameter = (index) => {
    const updated = [...parameters];
    updated.splice(index, 1);
    setParameters(updated);
  };

  const handleChange = (index, key, value) => {
    const updated = [...parameters];
    if (!updated[index]) updated[index] = {};
    updated[index][key] = value;
    setParameters(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Submitted data:', parameters);
      alert('Form submitted successfully!');
    }, 2000);
  };

  return (
    <div className="interview-container">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>Req Id</Form.Label>
              <Form.Select>
                <option>Select Req Id</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>Position/Role</Form.Label>
              <Form.Select>
                <option>Select Role</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>Tech Stacks</Form.Label>
              <Form.Control type="text" placeholder="Enter tech stacks" />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>Screening Type</Form.Label>
              <Form.Select>
                <option>Select Screening Type</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-3 px-2">
            <Form.Group>
              <Form.Label>No of Interview Round</Form.Label>
              <Form.Control type="number" placeholder="Enter number of rounds" />
            </Form.Group>
          </Col>
        </Row>

        <div className="interview-parameters ">
        <div>

          <div className="d-flex justify-content-between align-items-center px-2">
            <h5 className="mb-0">Interview Parameters</h5>
          </div>

          <div className="parameter-scroll-wrapper">
            <div className="parameter-header">
              <span>Score Card</span>
              <span>Options</span>
              <span>Guideline</span>
              <span>Min Questions</span>
              <span>Screening Type</span>
              <span>Duration</span>
              <span>Mode</span>
              <span>Feedback</span>
              <span>Action</span>
            </div>

            {parameters.map((param, index) => (
              <div className="parameter-body" key={index}>
                <Form.Select value={param.scoreCard || ''} onChange={(e) => handleChange(index, 'scoreCard', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Coding written">Coding written</option>
                  <option value="Technical round">Technical round</option>
                </Form.Select>
                <Form.Control type="text" value={param.option || ''} onChange={(e) => handleChange(index, 'option', e.target.value)} placeholder="Option" />
                <Form.Control type="text" value={param.guideline || ''} onChange={(e) => handleChange(index, 'guideline', e.target.value)} placeholder="Guideline" />
                <Form.Control type="number" value={param.minQuestions || ''} onChange={(e) => handleChange(index, 'minQuestions', e.target.value)} placeholder="Min Qs" />
                <Form.Control type="text" value={param.screeningType || ''} onChange={(e) => handleChange(index, 'screeningType', e.target.value)} placeholder="Screening Type" />
                <Form.Control type="text" value={param.duration || ''} onChange={(e) => handleChange(index, 'duration', e.target.value)} placeholder="Duration" />
                <Form.Control type="text" value={param.mode || ''} onChange={(e) => handleChange(index, 'mode', e.target.value)} placeholder="Mode" />
                <Form.Control type="text" value={param.feedback || ''} onChange={(e) => handleChange(index, 'feedback', e.target.value)} placeholder="Feedback" />
                <div className="d-flex gap-2">
                  <Button variant="success" disabled={loadingIndex === index} onClick={() => handleSaveParameter(index)}>
                    {loadingIndex === index ? <Spinner animation="border" size="sm" /> : '✔'}
                  </Button>
                  <Button variant="danger" onClick={() => handleRemoveParameter(index)}>🗑</Button>
                </div>
              </div>
            ))}
          </div>
                          
          </div>
        </div>

        <div className="feedback-section">
          <Row className="mt-5">
            <Col md={3} className="mb-3">
              <a href="#" className="feedback-guidelines">Feedback sharing guidelines for interviewer</a>
            </Col>
            <Col md={2} className="mb-3">
              <Form.Label>Final Rating</Form.Label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      cursor: 'pointer',
                      color: rating >= star ? '#ffc107' : '#ccc',
                      fontSize: '1.5rem'
                    }}
                  >
                    ★
                  </span>
                ))}
                <span className="ms-2">{rating}.0</span>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </Form.Select>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label>Feedback</Form.Label>
              <Form.Control type="text" placeholder="Enter feedback" />
            </Col>
          </Row>
        </div>

        <div className="text-end mt-4">
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InterviewForm;