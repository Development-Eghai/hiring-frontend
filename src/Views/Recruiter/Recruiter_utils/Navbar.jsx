import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import ButtonComponent from "Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const RecruiterHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Define all steps with path & label
  const steps = [
    { label: "1. Candidates", path: "/recruiter/candidate" },
    { label: "2. Screening", path: "/recruiter/screening_dashboard" },
    { label: "3. Hiring Manager Approval", path: "/recruiter/hiring_manager_approval" },
    { label: "4. Schedule interview", path: "/recruiter/schedule_interview" },
    { label: "5. Interview Stages", path: "/recruiter/interview_stages" },
    { label: "6. Scorecard / Debrief", path: "/recruiter/score_card" },
    { label: "7. Recruiter Negotiation", path: "/recruiter/recruiter_negotiation" },
    { label: "8. Approval", path: "/recruiter/final_approval" },
    { label: "9. Offer & BGV", path: "/recruiter/offer&bgv" },
    { label: "10. Onboarding", path: "/recruiter/onboarding" },
  ];

  return (
    <div className="card rounded-3 shadow-sm p-2 mb-2">
      <div className="card-body p-2 card">
        <div className="row mt-2">
          <div className="col d-flex flex-wrap gap-2">
            {steps.map((step, index) => {
              const isActive = currentPath === step.path;
              return (
                <ButtonComponent
                  key={index}
                  buttonName={step.label}
                  className={isActive ? "btn-primary" : "btn-outline-primary"} // active vs stroke
                  clickFunction={() => navigate(step.path)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterHeader;
