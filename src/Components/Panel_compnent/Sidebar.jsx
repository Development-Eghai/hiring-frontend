import React, { useEffect } from 'react'
import Image from 'Utils/Image';
import OffCanvas from 'Components/Offcanvas/OffCanvas';
import { useCustomNavigate } from 'Components/CustomHooks';
import Img from 'Components/Img/Img';
import NavLinkComp from 'Components/Router_components/NavLink';


const Sidebar = ({
    menuOptions,
    responsiveOn,
    offCanvasShow,
    handleCanvasOpenOrClose,

    header,
    companyLogo,
    user_role,

    footer,
    footerClickFunction
}) => { 
    const navigate = useCustomNavigate();

    useEffect(() => {
        if (window.location.pathname === "/dashboard" || window.location.pathname === "/dashboard/") {
            switch (user_role) {
                case "Super Admin":
                    navigate("/dashboard/home")
                    break;

                case "admin":
                case "Admin":
                    navigate("/dashboard/home")
                    break;

                case "Employee":
                    navigate("/dashboard/services/insurance")
                    break;

                case "SEO Specialist":
                    navigate("/dashboard/blog")
                    break;

                default:
                    break;
            }
        }

    }, [])

    const hanldeButton = (v) => {
        return <>
            <div className="col-3 pb-1 text-center">
                {v.icon}
            </div>
            <div className="col text-start">
                <p className='mb-0'>{v.name}</p>
            </div>
        </>
    }

    const headerFun = (width, height, image) => {
        return <Img
            src={image}
            alt='company logo'
            width={width}
            height={height}
        />
    }

    const bodyContent = () => {
        return <nav className='navmenu w-100 pe-3'>
            <ul className='w-100 px-1 '>
                {menuOptions?.map((v, i) => (
                    v?.type === "link" ?
                        <li className="list-unstyled w-100" key={i}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className='navlink-sidebar'
                                title={hanldeButton(v)}
                                to={v?.route}
                            />
                        </li>
                        :
                        <li className="list-unstyled w-100" key={i}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className=' w-100 d-flex flex-wrap align-items-center mb-1 navlink-sidebar rounded px-2 py-2 text-decoration-none pe-none'
                                title={hanldeButton(v)}
                                to={v?.route}
                            />

                            <ul className='h-100 w-100 px-1 ms-4'>
                                {
                                    v?.options?.map((v, i) => (
                                        <li className="list-unstyled w-100 " key={i}>
                                            <NavLinkComp
                                                componentFrom="sidebar menus"
                                                className=' w-100 d-flex flex-wrap align-items-center mb-1 navlink-sidebar rounded px-2 py-2 text-decoration-none'
                                                title={hanldeButton(v)}
                                                to={v?.route}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                ))}
            </ul>
        </nav >
    }


    return (
        <>
            <div className={`sidebar d-none ${responsiveOn !== '' ? `d-${responsiveOn}-block` : 'd-block'}`}>
                <div className="container-fluid">
                    {/* header */}
                    {
                        header ?
                            <>
                                <div className="sidebar-header position-relative">
                                    <div className="row h-100 align-items-center justify-content-center sidebar-header-underline">
                                        <div className="col text-center">
                                            {headerFun('198px', '30px', companyLogo)}
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            null
                    }

                    {/* body */}
                    <div className="sidebar-body">
                        {bodyContent()}
                    </div>
                </div>

                <div className="sidebarCircleOne">
                    <Img src={Image.circleImageOne} width={"90%"} height={"90%"} />
                </div>

                <div className="sidebarCircleTwo">
                    <Img src={Image.circleImageTwo} width={"90%"} height={"90%"} />
                </div>

                <div className="sidebarCircleThree">
                    <Img src={Image.circleImageThree} width={"90%"} height={"90%"} />
                </div>
            </div>


            <OffCanvas
                offCanvasShow={offCanvasShow}
                offcanvasPlacement="start"
                offcanvasClassname="rounded border-0 sidebar offcanvas-sidebar"
                handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                canvasHeader={headerFun('198px', '33px', companyLogo)}
                offcanvasHeaderClassname="sidebar-header"
                offcanvasHeaderTitleClassname="col-11 text-center"
                offcanvasBodyClassname="sidebar-body-without-footer"
                canvasBody={bodyContent()}
            />
        </>
    )
}

export default Sidebar