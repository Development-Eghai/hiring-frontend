import React from 'react'
import LoginForm from 'Components/Form/LoginForm'
import { Card, CardBody } from 'react-bootstrap'

const Login = () => {
  return (
    <div className='bg-light'>
      <div className='row justify-content-center vh-100 align-items-center'>
        <div className='col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 login-large-screen-width'>
          <Card className='border border-light-subtle rounded-4 shadow-sm'>
            <CardBody className='p-5'>
              <div className='text-center py-4'>
                {/* <Img
                    src={Image.CompanyLogo}
                    alt='modelrocket-logo'
                    width='60%'
                    height='60%'
                  />  */}
                <h5 className='pb-4 text-primary border-bottom'>Pixel Advant</h5>
              </div>
              <LoginForm />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login