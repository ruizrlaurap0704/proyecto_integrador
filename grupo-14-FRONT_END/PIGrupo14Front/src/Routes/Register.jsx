import React from 'react'
import FormRegister from '../Components/FormRegister'
import { useGlobalStates } from '../Components/utils/globalContext'

const Register = () => {
  const {incorrecto} = useGlobalStates()
  return (
    <div className='register'>
        <h2>Crear cuenta</h2>
        <FormRegister/>
        <p>{incorrecto}</p>
    </div>
  )
}

export default Register