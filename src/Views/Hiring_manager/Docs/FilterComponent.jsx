import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Icons from 'Utils/Icons';

const FILTER_OPTIONS = {
  positionRole: 'Position/Role',
  tech: 'Tech',
  jd: 'JD',
  experience: 'Experience',
  designation: 'Designation',
  target: 'Target',
  interviewer: 'Interviewer',
  interview: 'Interview',
  compensationBenefits: 'Compensation/Benefits',
  durationTimeline: 'Duration/Timeline',
  place: 'Place',
  working: 'Working',
  solicitation: 'Solicitation',
  educational: 'Educational',
  feedback: 'Feedback',
  relocation: 'Relocation',
  travel: 'Travel',
  visa: 'Visa',
  domain: 'Domain',
  cibil: 'Cibil',
  valid: 'Valid',
  govt: 'Govt',
  background: 'Background',
  shift: 'Shift',
  differently: 'Differently',
  reference: 'Reference',
  role: 'Role',
  job: 'Job',
  communication: 'Communication',
  notice: 'Notice',
  joining: 'Joining',
  candidate: 'Candidate',
  career: 'Career',
  sabbatical: 'Sabbatical',
  screening: 'Screening',
  social: 'Social',
  language: 'Language',
};

const FilterComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState(
    Object.keys(FILTER_OPTIONS).reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleCheckboxChange = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearFilters = () => {
    const cleared = Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: false }), {});
    setFilters(cleared);
    console.log('Filters cleared:', cleared);
  };

  const applyFilters = () => {
    console.log('Applied filters:', filters);
    closeModal();
  };

  return (
    <>
      <Button variant="outline-secondary" className="d-flex align-items-center" onClick={openModal}>
        <span>{Icons.Filter} Display  Options</span>
      </Button>

      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Display  Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row"
            style={{maxHeight: '600px',overflowY: 'auto',minWidth: '600px'}}>
            {[
              Object.entries(FILTER_OPTIONS).slice(0, Math.ceil(Object.keys(FILTER_OPTIONS).length / 3)),
              Object.entries(FILTER_OPTIONS).slice(
                Math.ceil(Object.keys(FILTER_OPTIONS).length / 3),
                Math.ceil((Object.keys(FILTER_OPTIONS).length * 2) / 3)
              ),
              Object.entries(FILTER_OPTIONS).slice(Math.ceil((Object.keys(FILTER_OPTIONS).length * 2) / 3))
            ].map((column, colIndex) => (
              <div className="col-md-4" key={colIndex}>
                {column.map(([key, label]) => (
                  <div key={key}>
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={() => handleCheckboxChange(key)}
                    />{' '}
                    {label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={applyFilters}>
            Update Screen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterComponent;
