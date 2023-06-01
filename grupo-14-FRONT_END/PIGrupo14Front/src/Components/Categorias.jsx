import React from 'react'
import Categoria from '../Components/Categoria'

const Categorias = () => {

    return (
    <div className='cat'>
        <h2 className='alojamiento'>Busca por tipo de alojamiento</h2>
        <article className='padreCat'>
            <Categoria/>
        </article>
    </div>
)
}

export default Categorias