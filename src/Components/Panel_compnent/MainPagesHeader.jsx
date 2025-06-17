import React from 'react'

import { useDispatch } from '../CustomHooks';
import Img from '../Img/Img'
import ButtonComponent from '../Button/Button';
import Image from '../../Utils/Image'
import Icons from '../../Utils/Icons';
// import { handleLogout } from '../../Redux/Actions/Common_actions/Common_action';

const MainPagesHeader = () => {
  const dispatch = useDispatch();

  return (
    <header>
      <div className="container-fluid h-100 p-0">
        <div className='d-flex flex-wrap align-items-center h-100 px-2 px-sm-4 px-md-5'>
          <div className="col">
            <Img
              src={Image.companyLogoBlue}
              className="cursor-pointer"
              width="198px"
              height="33px"
            />
          </div>
          <div className="col d-inline-flex justify-content-end">
            <ButtonComponent
              type="button"
              className="px-3 me-xl-2"
              // clickFunction={() => dispatch(handleLogout())}
              buttonName={
                <span>
                  {Icons.logoutLocon}
                  <span className='ms-2 d-none d-sm-inline-block'>Logout</span>
                </span>
                }
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default MainPagesHeader