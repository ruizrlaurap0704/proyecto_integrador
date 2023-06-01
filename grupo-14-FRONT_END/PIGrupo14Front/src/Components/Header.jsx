import { Link } from 'react-router-dom'
import { useGlobalStates } from './utils/globalContext'
import {faFacebook, faInstagram, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  const { ocultoReg, setOcultoReg, ocultoLog, setOcultoLog, ocultoAdmin, setOcultoAdmin, ocultoRes, setOcultoRes } = useGlobalStates()
  const obtenerRegistros = () => {
    const datos = sessionStorage.getItem("user")
    if (datos) {
      return JSON.parse(datos)
    } else {return []}
  }
  
  const user = obtenerRegistros()
  window.addEventListener("load", function () {
    if (sessionStorage.length === 0) {
      document.getElementById("padre").classList.add("oculto")
      document.getElementById("padreMob").classList.add("oculto")
      document.getElementById("logueado").classList.add("oculto")
      document.getElementById("administrador").classList.add("oculto")
      document.getElementById("misReservas").classList.add("oculto")
      document.getElementById("logueadoMob").classList.add("oculto")
      document.getElementById("cerrarSesionMenu").classList.add("oculto")
      document.getElementById("menu").classList.add("visible")
      document.getElementById("navigatorBut").classList.remove("oculto")
      setOcultoReg("")
      setOcultoLog("")
      setOcultoAdmin("oculto")
      setOcultoRes("oculto")
    }
    if (location.pathname === "/register") {
      setOcultoReg("oculto")
    }
    if (location.pathname === "/login") {
      setOcultoLog("oculto")
    }
    if (user.length !== 0) {
      if (user.rol.nombre === "Administrador") {
        document.getElementById("administrador").classList.remove("oculto")
        setOcultoAdmin("")
      }
      else if (user.rol.nombre === "User") {
        document.getElementById("administrador").classList.add("oculto")
      setOcultoAdmin("oculto")
      }
    }
    
  })
  // console.log(user.rol.length);
  const nombre = user.nombre
  const apellido = user.apellido
  let primeraN = ""
  let primeraA = ""
  if (sessionStorage.length > 0) {
    primeraN = nombre.charAt(0).toUpperCase()
    primeraA = apellido.charAt(0).toUpperCase()
  }

  const cerrarSesion = () => {
    sessionStorage.removeItem("user")
    document.getElementById("padre").classList.add("oculto")
    document.getElementById("padreMob").classList.add("oculto")
    document.getElementById("logueado").classList.add("oculto")
    document.getElementById("administrador").classList.add("oculto")
    document.getElementById("misReservas").classList.add("oculto")
    document.getElementById("logueadoMob").classList.add("oculto")
    document.getElementById("cerrarSesionMenu").classList.add("oculto")
    document.getElementById("menu").classList.add("visible")
    document.getElementById("navigatorBut").classList.remove("oculto")
    setOcultoReg("")
    setOcultoLog("")
    setOcultoAdmin("oculto")
    setOcultoRes("oculto")
    location.reload()
  }
  function openNav() {
    document.getElementById("navBut").style.width = "100%"
  }
  function closeNav() {
    document.getElementById("navBut").style.width = "0%"
  }

  return (
    <nav>
        <Link to="/" onClick={location.reload}>
          <div className='logo'>
            <img src= "/public/images/logo.png" alt="logo" />
            <h2>Sentite como en tu hogar</h2>
          </div>
        </Link>
        <article id='padre'>
          <div id='administrador'>
                <Link to="/producto" onClick={location.reload}>Administración</Link> 
                <hr />
            </div>
          <div id='misReservas' >
              <Link to="/misReservas" onClick={location.reload}>Mis Reservas</Link> 
              <hr />
          </div>
          <div id='logueado'>
            <h3>{primeraN}{primeraA}</h3>
            <div>
              <h4 onClick={cerrarSesion} id='cerrarSesion' >X</h4>
              <font id="hola" >Hola,</font>
              <font id="nya">{nombre} {apellido}</font>
            </div>
          </div>
        </article>
        <div id='navigatorBut' className='navBut oculto'>
          <Link to="/register" className={ocultoReg} onClick={location.reload}>
            <button>Crear cuenta</button>
          </Link>
          <Link to="/login" className={ocultoLog} onClick={location.reload}>
            <button>Iniciar sesión</button>
          </Link>
        </div>
        {/* MOBILE */}
      <div id='navBut'>
          <p className="closebtn" onClick={closeNav}>X</p>
          <article id='padreMob'>
          <div id='logueadoMob'>
            <div>
            <h3>{primeraN}{primeraA}</h3>
              <h4 onClick={cerrarSesion} id='cerrarSesion' >X</h4>
              <font id="hola" >Hola,</font>
              <font id="nya">{nombre} {apellido}</font>
            </div>
          </div>
        </article>
        <h3 id='menu'>MENÚ</h3>
        <div className='redesMenu'>
          <div className='links'>
          <Link to="/register" className={ocultoReg} onClick={location.reload}>
            <p>Crear cuenta</p>
          </Link>
          <Link to="/login" className={ocultoLog} onClick={location.reload}>
            <p>Iniciar sesión</p>
          </Link>
          <Link to="/producto" id='administrador' className={ocultoAdmin} onClick={location.reload} >
            <p>Administrador</p>
          </Link>
          <Link to="/misReservas" id='misReservas'className={ocultoRes} onClick={location.reload} >
            <p>Mis Reservas</p>
          </Link>
          </div>
          <div id='cerrarSesionMenu'>
            <font color='#383B58'>¿ Deseas  </font> 
            <font color='#1DBEB4' onClick={cerrarSesion}> cerrar sesión</font>
            <font color='#383B58'>?</font>
          </div>
          <hr/>
          <div className='redes'>
            <FontAwesomeIcon icon={faFacebook}/>
            <FontAwesomeIcon icon={faLinkedin}/>
            <FontAwesomeIcon icon={faTwitter}/>
            <FontAwesomeIcon icon={faInstagram}/>
          </div>
        </div>
      </div>
      <button className="openbtn" onClick={openNav}>&#9776;</button>
    </nav>
  )
}

export default Header
