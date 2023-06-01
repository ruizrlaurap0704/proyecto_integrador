import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCheck} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ReservaExitosa = () => {
  return (
    <div className='exitoPadre'>
        <div>
            <img src="/public/images/badge-check-svgrepo-com.svg" alt="" />
            <h2>¡Muchas Gracias!</h2>
            <h3>Se reserva se ha realizado con exito</h3>
            <Link to="/" onClick={location.reload}>
                <button>Ok</button>
            </Link>
            <Link to="/misReservas" className='verMisReservas' onClick={location.reload}>
                <button>Ver mis reservas</button>
            </Link>
        </div>
    </div>
  )
}

export default ReservaExitosa