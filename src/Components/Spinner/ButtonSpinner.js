import ButtonComponent from 'Components/Button/Button'
import React from 'react'
import SpinnerComponent from './Spinner'

const ButtonSpinner = ({ is_spinner, title, className, btnDisable, clickFunction }) => {
  return (
    <ButtonComponent
      type="button"
      clickFunction={is_spinner ? null : clickFunction}
      className={`w-100 ${className ? className : 'btn-primary'} py-2 rounded-3`}
      buttonName={is_spinner ?
        <div className='row align-items-center'>
          <div className='col-10 text-start'>
            {title || 'Loading...'}
          </div>
          <div className='col-2 border-start'>
            <SpinnerComponent />
          </div>
        </div>
        :
        <div className='col-12 text-center'>
          {title || 'Submit'}
        </div>
      }
      btnDisable={btnDisable || is_spinner || false}
    />
  )
}

export default ButtonSpinner