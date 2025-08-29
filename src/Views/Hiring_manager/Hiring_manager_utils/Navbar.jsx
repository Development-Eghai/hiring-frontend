import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import ButtonComponent from "Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const ReportHeader = () => {
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
        <div className="card-body p-0 card ">
          <div className="row mt-2 p-2">
            <div className="col d-flex flex-wrap gap-2">
              <ButtonComponent
                buttonName="1. Silver Medalist Report"
                className="btn-primary"
                clickFunction={() => navigate("/hiring_manager/report")}
              />
                <ButtonComponent
                 buttonName="2. Compensation Report" 
                 className="btn-primary" 
                  clickFunction={() => navigate("/hiring_manager/report/compensation_report")}
                 />
                <ButtonComponent
                  buttonName="3. Decline Report"
                  className="btn-primary"
                   clickFunction={() => navigate("/hiring_manager/report/declined_report")}
                />
              <ButtonComponent
                buttonName="4. Future Data Report"
                className="btn-primary"
                clickFunction={() => navigate("/hiring_manager/report/future_start_data_report")}
              />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReportHeader;
