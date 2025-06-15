import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBarComp = ({
    componentFrom,
    progressNow
}) => {
  return (
    <ProgressBar animated now={progressNow}/>
  )
}

export default ProgressBarComp