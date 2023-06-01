import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot, faWifi, faTv, faPersonSwimming, faCar, faKitchenSet, faPaw, faSnowflake} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const MisReservas = () => {
    // const noReservas = () =>{
        //     document.getElementById("notFoundd").classList.add("oculto")
        //     document.getElementById("reservas").classList.remove("oculto")
        //     document.getElementById("notLogin").classList.add("oculto")
        // }
        // const noReservas = () =>{
        //     if (data.length === 0) {
        //     // document.getElementById("notFoundd").classList.remove("oculto")
        //     setTimeout(() => {
        //         document.getElementById("reservas").classList.add("oculto")
        //     }, 3000);
        //     // document.getElementById("notLogin").classList.add("oculto")
        // }
        // }
        
        const [data, setData] = useState([])
        window.onload = function() {
        const obtenerRegistros = () => {
            const datos = sessionStorage.getItem("user")
            if (datos) {
                return JSON.parse(datos)
            } else {return []}
            }
        if (sessionStorage.length > 0) {
            const user = obtenerRegistros()
                axios(`http://localhost:8080/usuarios/${user.idUsuario}/reservas`)
                .then(res => setData(res.data))
                
                }
                else if (sessionStorage.length === 0) {
                    document.getElementById("notLogin").classList.remove("oculto")
                    document.getElementById("reservas").classList.add("oculto")
                    document.getElementById("notFoundd").classList.add("oculto")
                }
                
            }
            if (data.length > 0) {
                document.getElementById("reservas").classList.remove("oculto")
                document.getElementById("notFoundd").classList.add("oculto")
                document.getElementById("notLogin").classList.add("oculto")
            }
            setTimeout(() => {
                if(data.length === 0){
                    setTimeout(() => {
                        document.getElementById("notFoundd").classList.remove("oculto")
                    }, 600);
                }
                // document.getElementById("reservas").classList.add("oculto")
                ; 100})
                setTimeout(() => {
                    if(sessionStorage.length === 0){
                        document.getElementById("notLogin").classList.remove("oculto")
                        document.getElementById("reservas").classList.add("oculto")
                        document.getElementById("notFoundd").classList.add("oculto")                    }
                }, 650);
                
    console.log(data);
    return (
    <div className='padreCard'>
        <div className='oculto notFound' id='notFoundd'>
            <img src="/public/images/magnifying-glass-search-find.svg" alt="" />
            <h1>Aún no has efectuado ninguna reserva.</h1>
            <Link to="/">
                <button>Volver a la pagina principal</button>
            </Link>
        </div>
        <div className='oculto notFound' id='notLogin' >
            <img src="/public/images/user-x-svgrepo-com.svg" alt="" />
            <h1>Tienes que loguearte para tener reservas</h1>
            <Link to="/login">
                <button>Iniciar Sesión</button>
            </Link>
        </div>
        <div id='reservas' className='oculto'>
            <h2 className='recomendaciones'>Mis Reservas</h2>
            <div className='cardd'>
                {data?.map(reserva =>
            <div className='card' key={reserva.idReserva}>
            <img src={reserva.producto.imagen.url_imagen1} alt={reserva.producto.imagen.titulo} className="image-container" />
            <div className="product-info">
                <div className='info-producto'>
                    <div className='calificacion'>
                        <p>{reserva.producto.categoria.titulo}</p>
                        <p id='stars'>★★★★★</p>
                    </div>
                    <div className='calificacion2'>
                            <font>8</font>
                            <p>Muy bueno</p>
                    </div>
                    <div>
                        <h2>{reserva.producto.titulo}</h2>
                    </div>
                    <div className='location'>
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <p>{reserva.producto.ciudad.nombre}, {reserva.producto.ciudad.provincia}</p>
                        <span>MOSTRAR EN EL MAPA</span>
                    </div> 
                    <div className='caracteristicas'>
                        { reserva.producto.caracteristica.wifi ? <FontAwesomeIcon icon={faWifi} className='caract'/> : <></>}
                        { reserva.producto.caracteristica.pileta ?  <FontAwesomeIcon icon={faPersonSwimming} className='caract'/> : <></>}
                        { reserva.producto.caracteristica.televisor ? <FontAwesomeIcon icon={faTv} className='caract'/> : <></>}
                        { reserva.producto.caracteristica.estacionamiento_gratuito ? <FontAwesomeIcon icon={faCar} className='caract'/> : <></>}
                        { reserva.producto.caracteristica.cocina ? <FontAwesomeIcon icon={faKitchenSet} className='caract'/> : <></>}
                        { reserva.producto.caracteristica.apto_mascotas ? <FontAwesomeIcon icon={faPaw} className='caract'/> : <></>}
                        { reserva.producto.caracteristica.aire_acondicionado ? <FontAwesomeIcon icon={faSnowflake} className='caract'/> : <></>}
                    </div>
                    <p>Horario: {reserva.horaComienzoReserva}</p>
                    <p>Fecha de Inicio de Reserva: {reserva.fechaInicio}</p>
                    <p>Fecha de Final de Reserva: {reserva.fechaFinal}</p>
                </div>
                <div>
                    <Link to={`/producto/${reserva.producto.idProducto}`} className='botones'>
                        <button >Ver Mas</button>
                    </Link>
                </div>
            </div>
        </div>
        )}
                {/* <MiReserva/> */}
            </div>
        </div>
    </div>  
    )
    
}

export default MisReservas