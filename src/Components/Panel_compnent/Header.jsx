import React from "react";
import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import HeaderCard from "Components/Card/HeaderCard";
import { useLocation } from "react-router-dom";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ offcanvasOn, offcanvasOnButton }) => {
  const { commonState } = useCommonState();
  const dispatch = useDispatch();

  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.clear();

  sessionStorage.clear();

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  });

  

  navigate("/"); 
};


  const headerContentFunc = () => {
    return (
      <>
        <div className="col-12 d-flex flex-wrap align-items-center justify-content-between ">
          <div className="col">{commonState?.currentMenuName}</div>

          <div className="col d-inline-flex flex-wrap justify-content-end">
            <div className="d-inline-block">
              <ButtonComponent
                type="button"
                className="px-3 me-xl-2"
                clickFunction={handleLogout}
                buttonName={
                  <span>
                    {Icons.logoutLocon}
                    <span className="ms-2 d-none d-sm-inline-block">
                      {Icons.Logout}
                    </span>
                  </span>
                }
              />
            </div>

            {offcanvasOn ? (
              <div
                className={`d-inline-block header-icon-tag-width ${
                  offcanvasOn !== "" ? `d-${offcanvasOn}-none` : "d-none"
                }`}
              >
                <ButtonComponent
                  type="button"
                  className="btn-transparent"
                  clickFunction={offcanvasOnButton}
                  buttonName={Icons.menuIcon}
                />
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  };

  const recruiterHeader = () => {
    return (
      <>
        <div className="row align-items-center py-2 border-bottom">
          <div className="col-md-3">
            <h4 className="fw-bold">Recruiter_Dashboard</h4>
          </div>

          <div className="col-md-6 d-flex justify-content-center"></div>

          <div className="col-md-3 d-flex align-items-center justify-content-end gap-4">
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

            {/* Icons */}
            <FaBell className="fs-6 " />
            <FaUser className="fs-6" />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col d-flex flex-wrap gap-2">
            <ButtonComponent buttonName="Candidates" className="btn-primary" />
            <ButtonComponent
              buttonName="Schedule interview"
              className="btn-primary"
            />
            <ButtonComponent
              buttonName="Recruiter Negotiation"
              className="btn-primary"
            />
            <ButtonComponent buttonName="Screening" className="btn-primary" />
            <ButtonComponent
              buttonName="Hiring Manager Approval"
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
            <ButtonComponent buttonName="Onboarding" className="btn-primary" />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {currentPath.startsWith("/recruiter") ? (
        <HeaderCard
          cardClassName="w-100 border-0 header-card"
          cardTitleClassName="row justify-content-end mb-0"
          cardBodyClassName="py-3 header-body"
          cardContent={recruiterHeader()}
        />
      ) : (
        <HeaderCard
          cardClassName="w-100 border-0 header-card"
          cardTitleClassName="row justify-content-end mb-0"
          cardBodyClassName="py-3 header-body"
          cardContent={headerContentFunc()}
        />
      )}
    </>
  );
};

export default Header;
