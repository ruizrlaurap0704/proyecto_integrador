import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCheck} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const ProductoExitoso = () => {
    return (
    <div className='exitoPadre'>
        <div>
            <img src="/public/images/badge-check-svgrepo-com.svg" alt="" />
            <h3>Su propiedad se ha creado con exito</h3>
            <Link to="/" onClick={location.reload}>
                <button>Volver</button>
            </Link>
        </div>
    </div>  )
}

export default ProductoExitoso