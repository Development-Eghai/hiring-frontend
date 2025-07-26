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
      <div className="card rounded-3 shadow-sm p-2">
        <div className="card-body p-0 card overflow-auto">
          <div className="row align-items-center p-2 border-bottom ">
            <div className="col-md-4">
              <h4 className="fw-bold">
                {"Recruiter"} {currentScreen}
              </h4>
            </div>
            {/* <div className="col-md-4 d-flex align-items-center justify-content-end gap-4">
              <div className="input-group input-group-sm w-100">
              <input
                type="text"
                className="form-control"
                placeholder="Search .."
              />
              <span className="input-group-text bg-white border-start-0">
                <FaSearch />
                </span>
                </div>
                
                Icons
                <FaBell className="fs-6 " />
                <FaUser className="fs-6" />
                </div> */}
          </div>
          <div className="row mt-2 p-2">
            <div className="col d-flex flex-wrap gap-2">
              <ButtonComponent
                buttonName="Candidates"
                className="btn-primary"
                clickFunction={() => navigate("/recruiter/candidate")}
              />
                <ButtonComponent
                 buttonName="Screening" 
                 className="btn-primary" 
                  clickFunction={() => navigate("/recruiter/recruiter_screening_dashboard")}
                 />
                <ButtonComponent
                  buttonName="Hiring Manager Approval"
                  className="btn-primary"
                   clickFunction={() => navigate("/recruiter/recruiter_approval")}
                />
              <ButtonComponent
                buttonName="Schedule interview"
                className="btn-primary"
                clickFunction={() => navigate("/recruiter/schedule_interview")}
              />
              <ButtonComponent
                buttonName="Recruiter Negotiation"
                className="btn-primary"
              />

              <ButtonComponent
                buttonName="Interview Stages"
                className="btn-primary"
              />
              <ButtonComponent
                buttonName="Scorecard / Debrief"
                className="btn-primary"
              />
              <ButtonComponent buttonName="Offer" className="btn-primary" />
              <ButtonComponent buttonName="Approval" className="btn-primary" />
              <ButtonComponent
                buttonName="Onboarding"
                className="btn-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RecruiterHeader;
