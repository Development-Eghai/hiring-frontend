import React from "react";
import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import HeaderCard from "Components/Card/HeaderCard";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ offcanvasOn, offcanvasOnButton }) => {
  const { commonState } = useCommonState();
  const dispatch = useDispatch();

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



  return (
    <>
        <HeaderCard
          cardClassName="w-100 border-0 header-card"
          cardTitleClassName="row justify-content-end mb-0"
          cardBodyClassName="py-3 header-body"
          cardContent={headerContentFunc()}
        />
    </>
  );
};

export default Header;
