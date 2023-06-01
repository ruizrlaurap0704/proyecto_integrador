import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot, faWifi, faTv, faPersonSwimming, faCar, faKitchenSet, faPaw, faSnowflake} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useGlobalStates } from './utils/globalContext'

const Hotel = (props) => {
    
    return <div className='padreCard' id='padCards'>
        <h2 className='recomendaciones'>Recomendaciones</h2>
        <div className='cardd'>
                {props.items?.map(producto => {
                return <div className='card' key={producto.idProducto}>
                    {/* <p>{producto.idProducto}</p> */}
            <img src={producto.imagen.url_imagen1} alt={producto.imagen.titulo} className="image-container" />
            <div className="product-info">
                <div className='info-producto'>
                    <div className='calificacion'>
                        <p>{producto.categoria.titulo}</p>
                        <p id='stars'>★★★★★</p>
                    </div>
                    <div className='calificacion2'>
                            <font>8</font>
                            <p>Muy bueno</p>
                    </div>
                    <div>
                        <h2>{producto.titulo}</h2>
                    </div>
                    <div className='location'>
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <p>{producto.ciudad.nombre}, {producto.ciudad.provincia}</p>
                        <span>MOSTRAR EN EL MAPA</span>
                    </div> 
                    <div className='caracteristicas'>
                        { producto.caracteristica.wifi ? <FontAwesomeIcon icon={faWifi} className='caract'/> : <></>}
                        { producto.caracteristica.pileta ?  <FontAwesomeIcon icon={faPersonSwimming} className='caract'/> : <></>}
                        { producto.caracteristica.televisor ? <FontAwesomeIcon icon={faTv} className='caract'/> : <></>}
                        { producto.caracteristica.estacionamiento_gratuito ? <FontAwesomeIcon icon={faCar} className='caract'/> : <></>}
                        { producto.caracteristica.cocina ? <FontAwesomeIcon icon={faKitchenSet} className='caract'/> : <></>}
                        { producto.caracteristica.apto_mascotas ? <FontAwesomeIcon icon={faPaw} className='caract'/> : <></>}
                        { producto.caracteristica.aire_acondicionado ? <FontAwesomeIcon icon={faSnowflake} className='caract'/> : <></>}
                    </div>
                    <span>{
                    producto.descripcion.slice(0, 150)
                    }
                    </span>
                    <span className='mostrarMas'>mas...</span>
                </div>
                <div>
                    <Link to={`/producto/${producto.idProducto}`} className='botones'>
                        <button >Ver Mas</button>
                    </Link>
                </div>
            </div>
            </div>
    })}
        </div>
        <div className='botonesPag'>
            <button onClick={props.prevHandler} className='botonPag'>
                <a href="#padCards">
                    Anterior
                </a>
            </button>
            <p>{props.currentPage}</p>
            <button onClick={props.nextHandler} className='botonPag'>
                <a href="#padCards">
                    Siguiente
                </a>
            </button>
        </div>
    </div>
    
}

export default Hotel