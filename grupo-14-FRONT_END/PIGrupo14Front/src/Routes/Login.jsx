import React from 'react'
import FormLogin from '../Components/FormLogin'
import { useGlobalStates } from '../Components/utils/globalContext'

const Login = () => {
  const {incorrecto} = useGlobalStates()
  return (
    <div className='login'>
      <FormLogin/>
      <p>{incorrecto}</p>
    </div>
  )
}

export default Login