import React from 'react'
import SpinnerLoading from "./LoadingSpinnerOne.gif";

export default function Spinner() {
  return (
    <div className='spinnerLoader'>
      <img src={SpinnerLoading}/>
    </div>
  )
}
