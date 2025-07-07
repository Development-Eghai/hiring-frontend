import React, { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import RequisitionForm from "./RequisitionForm ";
import { Card } from "react-bootstrap";

const JobRequisition = () => {

    const handleNext = () => {
    setCompletedSteps((prev) => [...prev, activeStep]); 
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };
  
  const steps = [
    {
      label: "Requisition Created",
      content: <RequisitionForm />,
    },
    {
      label: "Business Ops Review",
      content: (
        <div>
          <div className="mb-3">
            <label className="form-label">Reviewer Comments</label>
            <textarea className="form-control" rows="3" placeholder="Enter comments" />
          </div>
        </div>
      ),
    },
    {
      label: "Strategy Office Review",
      content: (
        <div>
          <div className="mb-3">
            <label className="form-label">Approval Status</label>
            <select className="form-select">
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      label: "Recruiter Review",
      content: (
        <div>
          <div className="mb-3">
            <label className="form-label">Recruiter Notes</label>
            <textarea className="form-control" rows="2" placeholder="Add notes" />
          </div>
        </div>
      ),
    },
    {
      label: "Completed",
      content: <p className="text-success fw-bold">All steps completed. 🎉</p>,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);


  const handleDone = () => {
    setCompletedSteps((prev) => {
      const updated = new Set([...prev, activeStep, ...steps.map((_, i) => i)]);
      return Array.from(updated);
    });
    alert("All steps completed!");
  };

  const isStepCompleted = (index) => completedSteps.includes(index);

  return (
    <div className="mt-4">
      {/* Stepper Header */}
      <div className="d-flex justify-content-between mb-4">
        {steps.map((step, idx) => (
          <div className="text-center flex-fill" key={idx}>
            {isStepCompleted(idx) ? (
              <BiCheckCircle className="text-success" size={24} />
            ) : (
              <div
                className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: 24, height: 24 }}
              >
                {idx + 1}
              </div>
            )}
            <div className="small text-muted mt-1">{step.label}</div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="border rounded p-4 mb-4"style={{ maxHeight: "800px" }}>
        <h5 className="mb-3">{steps[activeStep].label}</h5>
        {steps[activeStep].content}
      </Card>

      {/* Footer */}
      {/* <div className="d-flex justify-content-end">
        {activeStep < steps.length - 1 ? (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleDone}>
            Done
          </button>
        )}
      </div> */}
    </div>
  );
};

export default JobRequisition



