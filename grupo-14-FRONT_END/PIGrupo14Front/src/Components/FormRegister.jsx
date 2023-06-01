import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalStates } from './utils/globalContext'

const FormRegister = () => {
    const {
        user, setUser, 
        setIncorrecto,
        name, setName,
        surname, setSurname,
        email, setEmail,
        password, setPassword,
        password2, setPassword2,
        validez, setValidez, setEstarLoggueado } = useGlobalStates()
        const navigate = useNavigate()
        const url = `http://localhost:8080/usuarios/crear`
        let data ={
            nombre: user.name,
            apellido: user.surname,
            email: user.email,
            password: user.password,
            ciudad: null,
            rol:{
                idRol:1
            }
        }
        const settings ={
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data)
        }
        const crearUsuario = () =>{
        fetch(url, settings )
        .then(response => response.json())
        .then(data =>{
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
        
        console.log(user);
        }
        // const obtenerRegistros = () =>{
        // const datos = localStorage.getItem("registros");
        // if (datos) {
        //     return JSON.parse(datos)
        // }else{return []}
        // }
        // const [registros, setRegistros] = useState(obtenerRegistros())
    const emailRegrex =  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    const mensajeError= "Por favor vuelva a intentarlo, credenciales invalidas"
    const valido =() =>{
        if (
            (user.name.length >= 3 && user.name.length <= 20) &&
            (user.surname.length >= 3 && user.surname.length <= 20 ) &&
            (emailRegrex.test(user.email)) &&
            (user.password.length >= 6 && user.name.length <= 30) &&
            ((user.password2.length >= 6 && user.password2.length <= 30) && 
            (user.password2 === user.password))
        ) {
            setName({campo: "bien", valido:"true"})
            setSurname({campo: "bien", valido:"true"})
            setEmail({campo: "bien", valido:"true"})
            setPassword({campo: "bien", valido:"true"})
            setPassword2({campo: "bien", valido:"true"})
                    setValidez("true");
                    crearUsuario()
                    setInterval(() => {
                        navigate("/login")
                        location.reload()
                    }, 500);
        }
        else{
            setName({campo: "mal", valido:"false"}); setIncorrecto(mensajeError)
            setSurname({campo: "mal", valido:"false"}); setIncorrecto(mensajeError)
            setEmail({campo: "mal", valido:"false"}); setIncorrecto(mensajeError)
            setPassword({campo: "mal", valido:"false"}); setIncorrecto(mensajeError)
            setPassword2({campo:"mal", valido:"false"}); setIncorrecto(mensajeError)
            setValidez("false")
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setEstarLoggueado("true")
        valido()
    };
    return (
        <form onSubmit={handleSubmit}>
            <article>
                <div className='nom'>
                <label>Nombre</label><br />
                <input type="text" className={name.campo} onChange={(e) => setUser({...user, name: e.target.value})}/>
                </div>
                <div className='ape'>
                <label>Apellido</label><br />
                <input type="text" className={surname.campo} onChange={(e) => setUser({...user, surname: e.target.value})}/>
                </div>
            </article>
            <label >Correo electrónico</label>
            <input type="email" id='inputEmail' className={email.campo} onChange={(e) => setUser({...user, email: e.target.value})}/>
            <label >Contraseña</label>
            <div className='input_wrapper'>
            <input type="password" className={password.campo} onChange={(e) => setUser({...user, password: e.target.value})}/>
            </div>
            <label >Confirmar contraseña</label>
            <input type="password" className={password2.campo} onChange={(e) => setUser({...user, password2: e.target.value})}/>
            <button>Crear cuenta</button>
            <div>
                <p>¿Ya tenes una cuenta?</p>
                <Link to="/login" onClick={location.reload}><p color='#4285F4'>Iniciar sesión</p></Link>
            </div>
        </form>
        )
}
export default FormRegister