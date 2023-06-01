import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalStates } from './utils/globalContext';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Buscador = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const {setFiltrado, numCalen,setNumCalen, filtrado} = useGlobalStates()
  const [nombre, setNombre] = useState(undefined)
  window.onload = function() {
    if (screen.width < 420) {
    setNumCalen(1)
  }
  if (screen.width > 420) {
    setNumCalen(2)
  }
  }
  const [data, setData] = useState([])
    useEffect(()=>{ 
        axios("http://localhost:8080/ciudades/list")
        .then(res => setData(res.data))
    },[])
    const diaInicio = new Date(startDate).getDate()
    const mesInicio = new Date(startDate).getMonth() + 1
    const anioInicio = new Date(startDate).getFullYear()
    
    const diaFinal = new Date(endDate).getDate()
    const mesFinal = new Date(endDate).getMonth() + 1
    const anioFinal = new Date(endDate).getFullYear()

    const fechaDeInicio =`${anioInicio}-${mesInicio}-${diaInicio}`
    const fechaDeFinal = `${anioFinal}-${mesFinal}-${diaFinal}`

    const filtrarPorCiudadYFecha = (fechaDeInicio, fechaDeFinal, nombre) => {
      
      if (nombre === undefined) {
        const urlFiltradoFechas = `http://localhost:8080/productos/listarPorFechas/${fechaDeInicio}/${fechaDeFinal}`
        axios(urlFiltradoFechas)
        .then(res => setFiltrado(res.data))
        console.log(filtrado);
        console.log(nombre);
      //   console.log("seleccione una ciudad");
      //   document.getElementById("errorCiudad").classList.remove("oculto")
      }
      else{
        const urlFiltradoCiudadYFechas = `http://localhost:8080/productos/listarPorFechasYCiudad/${fechaDeInicio}/${fechaDeFinal}/${nombre}`
        axios(urlFiltradoCiudadYFechas)
        .then(res => setFiltrado(res.data))
        console.log(filtrado);
        // document.getElementById("errorCiudad").classList.add("oculto")
      }

      }
      
      const limpiarFiltros = () => {
          axios("http://localhost:8080/productos/list")
          .then(res => setFiltrado(res.data))
          document.getElementById("selectCiudad").selectedIndex = 0;
          setDateRange([null, null])
    }

  return (
    <div className="busca">
      <h1>Busca ofertas en hoteles, casas y mucho más</h1>
      <div className='busc'>
          <div className='selectCiudades'>
            <select placeholder="¿A dónde vamos?" id='selectCiudad' className='bus' onChange={(e) => setNombre(e.target.value)}>
              <option hidden>¿A dónde vamos?</option>
              {/* <option value='Todos'>Mostrar Todos</option> */}
              {data.map(ciudad => 
                <option
                value={ciudad.nombre} key={ciudad.idCiudad} className="ciudades">
                    📍 {ciudad.nombre} - {ciudad.provincia}
                </option>
            )}
            </select>
          {/* <div className='errorCiudad oculto' id='errorCiudad'>
            <FontAwesomeIcon icon={faCircleExclamation}/>
            <p>Por favor, selecciona una ciudad</p>
          </div> */}
        </div>
      <DatePicker className='calendario'
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        monthsShown={numCalen}
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
        placeholderText="Check in - Check out"
        />
      <button type="submit" className="buscar" onClick={()=>{
        filtrarPorCiudadYFecha(fechaDeInicio, fechaDeFinal, nombre)
      }}>
        Buscar
      </button>
      <button className='buscar' onClick={limpiarFiltros}>
        Limpiar
      </button>
    </div>
    </div>
  );
};

export default Buscador;

