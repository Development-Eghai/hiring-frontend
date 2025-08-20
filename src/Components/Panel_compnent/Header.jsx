import React from "react";
import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import HeaderCard from "Components/Card/HeaderCard";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { update_app_data } from "Views/Common/Slices/Common_slice";
const Header = ({ offcanvasOn, offcanvasOnButton }) => {
  const { commonState } = useCommonState();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const { Name,username, role } = userInfo;

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

  const location = useLocation();

  const pathName = location.pathname.split("/").filter(Boolean).pop();

  const formattedPathName = pathName ? (
    <strong>
      {pathName.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}{" "}
    </strong>
  ) : null;

  const headerContentFunc = () => {
    return (
      <>
        <div className="col-12 d-flex flex-wrap align-items-center justify-content-between ">
          <div
            className="d-lg-none pe-4"
            onClick={() =>
              dispatch(
                update_app_data({
                  type: "canvas",
                  data: !commonState?.app_data?.canvasShow,
                })
              )
            }
          >
            <FaBars />
          </div>
          <div className="col">
            {commonState?.app_data?.user_role &&
              commonState?.app_data?.user_role}{" "}
            {formattedPathName}
          </div>
          <div className="col">{commonState?.currentMenuName}</div>

          <div className="col d-inline-flex flex-wrap justify-content-end align-items-center">
            <div className="d-inline-block me-3 text-end">
              <div className="fw-bold">{Name}</div>
              <div className="text-muted small">{role}</div>
            </div>

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
