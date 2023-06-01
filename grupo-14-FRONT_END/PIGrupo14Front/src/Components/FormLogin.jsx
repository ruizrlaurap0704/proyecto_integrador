import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGlobalStates } from '../Components/utils/globalContext'

const FormLogin = () => {
  const {estarLoggueado, setEstarLoggueado,setIncorrecto, email, setEmail, password, setPassword} = useGlobalStates()
  const navigate = useNavigate()
  const [loggueado,setLoggueado] = useState({
    email:"",
    password:""
  })
  const [data, setData] = useState([])
  const url = `http://localhost:8080/usuarios/list`
    useEffect(()=>{ 
      axios(url)
      .then(res => setData(res.data))
  },[])
  if (estarLoggueado === "false") {
    console.log("si");
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
      data.forEach(e => {
        if (e.email === loggueado.email && e.password === loggueado.password) {
          setEmail({campo: "bien", valido:"true"})
          setPassword({campo: "bien", valido:"true"})
          sessionStorage.setItem("user", JSON.stringify(e))
          setIncorrecto("")
          setEstarLoggueado("oculto")
          setTimeout(() => {
            navigate(-1)
          }, 200);
          setTimeout(() => {
            location.reload()
          }, 500);
        }else{
          setTimeout(() => {
            setIncorrecto("Por favor vuelva a intentarlo, credenciales invalidas")
            setEmail({campo: "mal", valido:"false"})
            setPassword({campo: "mal", valido:"false"})
            // setEstarLoggueado("false")
          }, 700);
        }
        });
      }
  return (
    <> 
    <div id='noLogueado' className={estarLoggueado}>
    <FontAwesomeIcon icon={faCircleExclamation}/>
      Para realizar una reserva necesitas estar logueado
    </div>
    <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
      <label >Correo electrónico</label>
      <input type="email" id='inputEmail' className={email.campo} onChange={(e) => setLoggueado({...loggueado, email: e.target.value})}/>
      <label >Contraseña</label>
      <div className='input_wrapper'>
        <input type="password" className={password.campo} onChange={(e) => setLoggueado({...loggueado, password: e.target.value})}/>
      </div>
      <button type='submit'>Ingresar</button>
      <div>
          <p>¿Aún no tenes cuenta?</p>
          <Link to="/register"  onClick={location.reload}><p color='#4285F4'>Registrate</p></Link>
      </div>
    </form>
    </>
    )
}

export default FormLogin