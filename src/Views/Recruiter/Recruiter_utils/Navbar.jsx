import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import ButtonComponent from "Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const RecruiterHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentScreen = currentPath.split("/")[2];

  const handleNavigate = () => {
    navigate("candidate");
  };

  return (
    <>
      <div className="card rounded-3 shadow-sm p-2 mb-5">
        <div className="card-body p-0 card overflow-auto">
          <div className="row mt-2 p-2">
            <div className="col d-flex flex-wrap gap-2">
              <ButtonComponent
                buttonName="1. Candidates"
                className="btn-primary"
                clickFunction={() => navigate("/recruiter/candidate")}
              />
                <ButtonComponent
                 buttonName="2. Screening" 
                 className="btn-primary" 
                  clickFunction={() => navigate("/recruiter/recruiter_screening_dashboard")}
                 />
                <ButtonComponent
                  buttonName="3. Hiring Manager Approval"
                  className="btn-primary"
                   clickFunction={() => navigate("/recruiter/hiring_manager_approval")}
                />
              <ButtonComponent
                buttonName="4. Schedule interview"
                className="btn-primary"
                clickFunction={() => navigate("/recruiter/schedule_interview")}
              />
              

              <ButtonComponent
                buttonName="5. Interview Stages"
                className="btn-primary"
                                clickFunction={() => navigate("/recruiter/interview_stages")}

              />
              <ButtonComponent
                buttonName="6. Scorecard / Debrief"
                className="btn-primary"
                clickFunction={() => navigate("/recruiter/score_card")}
              />
              <ButtonComponent
                buttonName="7. Recruiter Negotiation"
                className="btn-primary"
                clickFunction={() => navigate("/recruiter/recruiter_negotiation")} 
              />
              <ButtonComponent buttonName="8. Approval" className="btn-primary"
              clickFunction={() => navigate("/recruiter/final_approval")}
              />
              <ButtonComponent buttonName="9. Offer & BGV" className="btn-primary"
              clickFunction={() => navigate("/recruiter/offer&bgv")}

              />
              
              <ButtonComponent
                buttonName="10. Onboarding"
                className="btn-primary"
                
              clickFunction={() => navigate("/recruiter/onboarding")}

              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RecruiterHeader;
