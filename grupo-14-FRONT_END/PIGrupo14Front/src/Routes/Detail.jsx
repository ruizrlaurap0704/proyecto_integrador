import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage,faStar, faHeart, faShareNodes,faLocationDot, faWifi, faTv, faPersonSwimming, faCar, faKitchenSet, faPaw, faSnowflake} from '@fortawesome/free-solid-svg-icons'
import Calendario from '../Components/Calendar'
import { useGlobalStates } from '../Components/utils/globalContext'
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";

const Detail = () => {
    const {id} = useParams()
    const {numCalen,setNumCalen} = useGlobalStates()
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [data, setData] = useState([])
    const galeriaPadre1 = document.getElementById('gale')
    const galeriaPadre2 = document.getElementById('gal')
    const punto = document.querySelectorAll('.punto')
    const [translate, setTranslate] = useState(-20)
    window.onload = function() {
      if (screen.width < 420) {
        setNumCalen(1)
      }
      if (screen.width > 420) {
        setNumCalen(2)
      }
    }
    // const mediaQuery = window.matchMedia("(max-width : 770px)")
    // const funcion = (mediaQuery) => {
    //   if (mediaQuery.matches) {
    //     galeriaPadre1.classList.remove("ocultarGaleria")
    //   }
    // }
    // funcion;

    const url = `http://localhost:8080/productos/buscar/${id}`
    useEffect(()=>{ 
        axios.get(url)
        .then(res => setData([res.data]))
    },[])
    const estrellas = Array(5).fill(0)
    const [valorActual, setValorActual] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined)
    const handleClick = value =>{
      setValorActual(value)
    }
    const handleMouseOver = value =>{
      setHoverValue(value)
    }
    const handleMouseLeave = () =>{
      setHoverValue(undefined)
    }

    const arrayNoDisponibles = []
    const [fechasReservadas, setFechasReservadas] = useState([])
    const urlReserva = `http://localhost:8080/reservas/list`
    useEffect(()=>{ 
      axios(urlReserva)
      .then(res => setFechasReservadas(res.data))
    },[])
    fechasReservadas.forEach(e =>{
      const fechadeinicio = new Date(e.fechaInicio).setDate(new Date(e.fechaInicio).getDate()+1)
      const fechadefinal = new Date(e.fechaFinal).setDate(new Date(e.fechaFinal).getDate()+2)
      const objeto ={ start: fechadeinicio, end: fechadefinal};
      arrayNoDisponibles.push(objeto)
    })
    
    const verGaleria = () => {
          galeriaPadre1.classList.remove("ocultarGaleria")
          document.querySelector('.verGaleriaResponsive').classList.add("oculto")
  }
  const sacarGaleria = () =>{
      galeriaPadre1.classList.add("ocultarGaleria")
  }

  punto.forEach((cadaPunto, i) => {
    punto[i].addEventListener('click', () => {
      let posicion = i - 2
      let operacion = posicion * translate
      galeriaPadre2.style.transform= `translateX(${operacion}%)`
      punto.forEach((cadaPunto, i) => {
        punto[i].classList.remove('activo')
      })
      punto[i].classList.add('activo')
    })
  });
  return (
    <article className='hotelPadre'>
    {data?.map((producto) =>  
      <div key={id}>
        <div className='barra'>
          <div className='barra2'>
            <h4>{producto.categoria.titulo}</h4>
            <h2>{producto.titulo}</h2>
          </div>
          <Link to="/" >
            <FontAwesomeIcon icon={faChevronLeft}/>
          </Link>
        </div>
        <div className='baja'>
          <div className='baja2'>
            <FontAwesomeIcon icon={faLocationDot} className='caract'/>
            <p>{producto.ciudad.nombre}, {producto.ciudad.provincia}</p>
          </div>
          <div className='baja3'>
            <div className='estrellas'>
              {estrellas.map((_, index) =>{
                return(
                  <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  color={(hoverValue || valorActual) > index ? "#1DBEB4": "#BEBEBE"}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  />
                  )
                })}
              </div>
              <p>{valorActual * 2}</p>
          </div>
        </div>
        <div className='compar'>
          <div>
            <FontAwesomeIcon icon={faShareNodes}/>
            <FontAwesomeIcon icon={faHeart}/>
            <FontAwesomeIcon icon={faImage} className='verGaleriaResponsive' onClick={() => verGaleria()}/>
          </div>
        </div>
          <article  id='gale' className='ocultarGaleria'>
          <div className='galeria'>
            <div id='gal'>
              <img src={producto.imagen.url_imagen1} alt="1" />
              <img src={producto.imagen.url_imagen2} alt="2" />
              <img src={producto.imagen.url_imagen3} alt="3" />
              <img src={producto.imagen.url_imagen4} alt="4" />
              <img src={producto.imagen.url_imagen5} alt="5" />
            </div>
            <ul className="puntos">
              <li className="punto activo"></li>
              <li className="punto"></li>
              <li className="punto"></li>
              <li className="punto"></li>
              <li className="punto"></li>
            </ul>
            <p onClick={sacarGaleria}>X</p>
          </div>
        </article>
        <div className='picture'>
          <div className='picmain'>
            <img src={producto.imagen.url_imagen1} alt="bed" />
          </div>  
          <div className='picgrilla'> 
            <img src={producto.imagen.url_imagen2} alt="bath" />
            <img src={producto.imagen.url_imagen3} alt="window" />
            <img src={producto.imagen.url_imagen4} alt="room" />
            <img src={producto.imagen.url_imagen5} alt="food" />
          </div>
        </div>
        <div className='verGaleria' >
            <p 
            onClick={() => verGaleria()}
            >Ver más</p>
        </div>
        <div className='desc'>
          <div>
          <h3>Alojate en el corazon de {producto.ciudad.provincia}</h3>
          <p>{producto.descripcion}</p>
          </div>
        </div>
        <div className='serv'>
          <h3>¿Que ofrece {producto.titulo}?</h3>
          <hr />
          <div className='serv2'>
            { producto.caracteristica.wifi ? <div className='caractPadre'><FontAwesomeIcon icon={faWifi} className='caractDet'/> <p>Wifi</p></div> : <></>}
            { producto.caracteristica.pileta ? <div className='caractPadre'><FontAwesomeIcon icon={faPersonSwimming} className='caractDet'/> <p>Pileta</p></div> : <></>}
            { producto.caracteristica.televisor ? <div className='caractPadre'><FontAwesomeIcon icon={faTv} className='caractDet'/> <p>Televisor</p></div> : <></>}
            { producto.caracteristica.estacionamiento_gratuito ? <div className='caractPadre'><FontAwesomeIcon icon={faCar} className='caractDet'/> <p>Estacionamiento Gratuito</p></div> : <></>}
            { producto.caracteristica.cocina ? <div className='caractPadre'><FontAwesomeIcon icon={faKitchenSet} className='caractDet'/> <p>Cocina</p></div> : <></>}
            { producto.caracteristica.apto_mascotas ? <div className='caractPadre'><FontAwesomeIcon icon={faPaw} className='caractDet'/> <p>Apto mascotas</p></div>  : <></>}
            { producto.caracteristica.aire_acondicionado ? <div className='caractPadre'><FontAwesomeIcon icon={faSnowflake} className='caractDet'/> <p>Aire acondicionado</p></div> : <></>}
          </div>
        </div>
        <div className='calen'>
          <h3>Fechas disponibles</h3>
          <div className='calen2'>
            <div className='contenedor-calendario'>
              <div className='calendario-producto'>
                <DatePicker
                  calendarClassName="bordeCalendario"
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  excludeDateIntervals={arrayNoDisponibles}
                  minDate={new Date()}
                  onChange={(update) => {
                      setDateRange(update);
                    }}
                    monthsShown={numCalen}
                    inline
                /></div>
              </div>
            <div className="modal"> 
              <h4>Agrega tus fechas de viaje para obtener precios exactos</h4>
              <Link to={`/reserva/${producto.idProducto}`} className='botones'>
                <button>Iniciar reserva</button>
              </Link>
            </div>
          </div>
        </div>
        <div className='mapa'>
          <h3>¿Donde vas a estar?</h3>
          <hr />
          <p>{producto.ciudad.nombre}, {producto.ciudad.provincia}</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.682220884832!2d-57.54236318467563!3d-38.007872079717615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dc3da0acdc39%3A0x2ce98e1c1d4cdebd!2sHotel%20Hermitage!5e0!3m2!1ses!2sar!4v1678818268056!5m2!1ses!2sar"></iframe>
        </div>
        <div className='saber'>
          <h3>Que tenes que saber sobre {producto.titulo}</h3>
          <hr />
          <div className='saber2'>
          <div>
            <h4>Normas de la casa</h4>
            <p>{producto.politica.norma_casa1}</p>
            <p>{producto.politica.norma_casa2}</p>
            <p>{producto.politica.norma_casa3}</p>
          </div>
          <div>
          <h4>Salud y seguridad</h4>
          <p>{producto.politica.salud_seguridad1}</p>
          <p>{producto.politica.salud_seguridad2}</p>
          <p>{producto.politica.salud_seguridad3}</p>
          </div>
          <div>
          <h4>Politica de cancelacion</h4>
          <p>{producto.politica.politica_cancelacion1}</p>
          <p>{producto.politica.politica_cancelacion2}</p>
          <p>{producto.politica.politica_cancelacion3}</p>
          </div>
          </div>
        </div>
      </div>
    )}
    </article>
    )
}

export default Detail