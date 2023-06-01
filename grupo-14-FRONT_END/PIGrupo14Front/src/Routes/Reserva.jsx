import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {faChevronLeft, faLocationDot, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker";
import { useGlobalStates } from '../Components/utils/globalContext'

const Reserva = () => {
    const {setEstarLoggueado, numCalen, setNumCalen, fechasReservadas, setFechasReservadas} = useGlobalStates()
    const {id} = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [ciudad, setCiudad] = useState("")
    const [calenIncompleto, setCalenIncompleto] = useState("oculto")
    const [horaIncompleta, setHoraIncompleto] = useState("oculto")
    const [ciudadIncompleto, setCiudadIncompleto] = useState("oculto")
    const urlProducto = `http://localhost:8080/productos/buscar/${id}`
    const [dateRange, setDateRange] = useState([new Date() , new Date()]);
    const [startDate, endDate] = dateRange;
    window.onload = function() {
        if (screen.width < 420) {
        setNumCalen(1)
    }
    if (screen.width > 420) {
        setNumCalen(2)
    }
    }
    useEffect(()=>{ 
        axios.get(urlProducto)
        .then(res => setData([res.data]))
    },[])    
    const obtenerRegistros = () => {
        const datos = sessionStorage.getItem("user")
        if (datos) {
            return JSON.parse(datos)
        } else {return []}
        }
    const user = obtenerRegistros()
    console.log(user.rol);
    const [reserva, setReserva] = useState({
        horaComienzoReserva: '',
        fechaInicio: '',
        fechaFinal: '',
        usuario:{
            idUsuario:user.idUsuario
        },
        producto:{
            idProducto: id
        }
    })
    let dataReserva ={
        horaComienzoReserva: reserva.horaComienzoReserva,
        fechaInicio: reserva.fechaInicio,
        fechaFinal: reserva.fechaFinal,
        usuario:{
            idUsuario:reserva.usuario.idUsuario
        },
        producto:{
            idProducto: reserva.producto.idProducto
        }
    }
    const urlReserva = `http://localhost:8080/reservas/crear`
    const settingsReserva ={
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(dataReserva)
    }

    const arrayNoDisponibles = []
    const url = `http://localhost:8080/reservas/list`
        useEffect(()=>{ 
            axios(url)
            .then(res => setFechasReservadas(res.data))
    },[])
            fechasReservadas.forEach(e =>{
                const fechadeinicio = new Date(e.fechaInicio).setDate(new Date(e.fechaInicio).getDate()+1)
                const fechadefinal = new Date(e.fechaFinal).setDate(new Date(e.fechaFinal).getDate()+2)
                const objeto ={ start: fechadeinicio, end: fechadefinal};
                arrayNoDisponibles.push(objeto)
            })
            
        const crearReserva = () =>{
            fetch(urlReserva, settingsReserva )
            .then(response => response.json())
            .then(data =>{
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    let dataUsuario ={
        idUsuario: user.idUsuario,
        nombre: user.nombre,
        apellido:  user.apellido,
        email:  user.email,
        password:  user.password,
        ciudad: ciudad,
        rol: {
            idRol: 2
        }
    }
    const urlUsuario = "http://localhost:8080/usuarios/modificar"
    const settingsUsuario ={
        method: 'PUT',
        headers:{
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*", 
        },
        body: JSON.stringify(dataUsuario)
    }
    const modificarUsuario = () =>{
        fetch(urlUsuario, settingsUsuario)
            .then(response => response.json())
            .then(data =>{
                resolve(data ? data.json() : {});
            })
            .catch(error => {
                console.log(error);
            })
    }

    const diaInicio = new Date(startDate).getDate()
    const mesInicio = new Date(startDate).getMonth() + 1
    const anioInicio = new Date(startDate).getFullYear()
    
    const diaFinal = new Date(endDate).getDate()
    const mesFinal = new Date(endDate).getMonth() + 1
    const anioFinal = new Date(endDate).getFullYear()

    const fechaDeInicio =`${diaInicio}/${mesInicio}/${anioInicio}`
    const fechaDeFinal = `${diaFinal}/${mesFinal}/${anioFinal}`

    const subirHora = (e) =>{
        setReserva({...reserva, horaComienzoReserva: e.target.value})
    }
    useEffect(function () {
        setReserva({...reserva, fechaFinal:  new Date(endDate).setDate(new Date(endDate).getDate()+1)})
    },[reserva.fechaInicio])

    const incluyeFechasReservadas = () =>{
            arrayNoDisponibles.map(e => {
                    console.log(e);
            })
    }
    const handleSubmit = () =>{
        if (sessionStorage.length > 0 && ciudad.length > 3 && reserva.fechaInicio !== '' && reserva.fechaFinal.length !== '' && reserva.horaComienzoReserva.length > 0){
            modificarUsuario()
            crearReserva()
            setEstarLoggueado("oculto")  
            navigate('/reservaExitosa')
            }
        else if (sessionStorage.length === 0) {
            setEstarLoggueado("false")  
            navigate('/login')
        }
        if (reserva.fechaInicio === '' || reserva.fechaFinal === '') {
            setCalenIncompleto("")
        }
        else if (reserva.fechaInicio !== '' || reserva.fechaFinal !== '') {
            setCalenIncompleto("oculto")
        }
        if (reserva.horaComienzoReserva === '') {
            setHoraIncompleto("")
        }
        else if (reserva.horaComienzoReserva !== '') {
            setHoraIncompleto("oculto")
        }
        if (ciudad.length < 3) {
            setCiudadIncompleto("")
        }
        else if (ciudad.length > 3) {
            setCiudadIncompleto("oculto")
        }
    }
    const urlId = `/producto/${id}`
    
    return (
    <article className='reservaPadre'>
        {data?.map((producto) =>
        <div key={id}>
            <div className='barra'>
                <div className='barra2'>
                    <h4>{producto.categoria.titulo}</h4>
                    <h2>{producto.titulo}</h2>
                </div>
                <Link to={urlId}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </Link>
            </div>
            <div className='detalles'>
                <div className='izquierda'>
                    <div className='formReserva'>
                        <h3>Completá tus datos</h3>
                        <form>
                            <div>
                                <div>
                                    <label htmlFor="" >Nombre</label>
                                    <input type="text" disabled placeholder={user.nombre}/>
                                    <label htmlFor="">Correo Electronico</label>
                                    <input type="email" disabled placeholder={user.email}/>
                                </div>
                                <div>
                                    <label htmlFor="">Apellido</label>
                                    <input type="text" disabled placeholder={user.apellido}/>
                                    <label htmlFor="">Ciudad</label>
                                    <input type="text" placeholder='Ciudad'required onChange={(e) => setCiudad(e.target.value)}/>
                                    <p id='completaAt' className={ciudadIncompleto}>Por favor, ingresa tu ciudad para avanzar</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='calen'>
                        <h3>Selecciona tu fecha de reserva</h3><h4 className={calenIncompleto} id='completaAt'>Por favor seleccione tu fecha de reserva para avanzar</h4>
                        <div className='calenReserva'>
                        <DatePicker
                        calendarClassName="bordeCalendario"
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        excludeDateIntervals={arrayNoDisponibles}
                        minDate={new Date()}
                        onChange={(update) => {
                            setDateRange(update);
                            setReserva({...reserva, fechaInicio: new Date(startDate).setDate(new Date(startDate).getDate()+1)})
                        }}
                        monthsShown={numCalen}
                        inline
                        /></div>
                    </div>
                    <div className='horaLlegada'>
                        <h3>Tu horario de llegada</h3>
                        <div className='horario'>
                            <div>
                                <FontAwesomeIcon icon={faCircleCheck}/>
                                <p>Tu habitacion va a estar lista para el check-in entre las 10:00AM y las  11:00PM</p> 
                                <h4 className={horaIncompleta} id='completaAt'>Por favor selecciona tu horario de llegada para avanzar</h4>
                            </div>
                            <div className='horas'>
                                <p>Indicá tu horario estimado de llegada</p>
                                <select placeholder='Seleccionar hora de llegada' name='horas' onChange={subirHora}>
                                    <option hidden>Seleccionar hora de llegada</option>
                                    <option value="01:00 AM">01:00 AM</option>
                                    <option value="02:00 AM">02:00 AM</option>
                                    <option value="03:00 AM">03:00 AM</option>
                                    <option value="04:00 AM">04:00 AM</option>
                                    <option value="05:00 AM">05:00 AM</option>
                                    <option value="06:00 AM">06:00 AM</option>
                                    <option value="07:00 AM">07:00 AM</option>
                                    <option value="08:00 AM">08:00 AM</option>
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="12:00 AM">12:00 AM</option>
                                    <option value="01:00 PM">01:00 PM</option>
                                    <option value="02:00 PM">02:00 PM</option>
                                    <option value="03:00 PM">03:00 PM</option>
                                    <option value="04:00 PM">04:00 PM</option>
                                    <option value="05:00 PM">05:00 PM</option>
                                    <option value="06:00 PM">06:00 PM</option>
                                    <option value="07:00 PM">07:00 PM</option>
                                    <option value="08:00 PM">08:00 PM</option>
                                    <option value="09:00 PM">09:00 PM</option>
                                    <option value="10:00 PM">10:00 PM</option>
                                    <option value="11:00 PM">11:00 PM</option>
                                    <option value="12:00 PM">12:00 PM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='derecha'>
                <article className='iz'>
                        <h3>Detalle de la reserva</h3>
                        <img src={producto.imagen.url_imagen1} alt="" />
                </article>
                    <div>
                        <p>{producto.categoria.titulo}</p>
                        <h3>{producto.titulo}</h3>
                        <p id='stars'>★★★★★</p>
                        <div className='location'>
                            <FontAwesomeIcon icon={faLocationDot}/>
                            <p>{producto.ciudad.nombre}, {producto.ciudad.provincia}</p>
                        </div>
                        <div className='checks'>
                            <hr/>
                            <div>
                                <p>Check in</p>
                                <p>{fechaDeInicio}</p>
                            </div>
                            <hr/>
                            <div>
                                <p>Check out</p>
                                <p>{fechaDeFinal}</p>
                            </div>
                            <hr/>
                        </div>
                        <button onClick={handleSubmit} className='botonReserva'>Confirmar Reserva</button>
                    </div>
                </div>
            </div>
            <div className='saber'>
                <h3>Que tenes que saber sobre {producto.titulo}</h3>
                <hr/>
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
                        <p>{producto.politica.politica_cancelacion}</p>
                    </div>
                </div>
            </div>
        </div>
        )}
    </article>
    )
    
}

export default Reserva