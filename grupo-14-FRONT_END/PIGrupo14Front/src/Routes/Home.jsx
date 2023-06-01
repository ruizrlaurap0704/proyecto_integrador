import React, { useEffect, useState } from 'react'
import Buscador from '../Components/Buscador'
import Categorias from '../Components/Categorias'
import Hoteles from '../Components/Hoteles'

const Home = () => {
  return (
    <div className="body">
      <Buscador/>
      <Categorias/>
      <Hoteles/>
    </div>
  )
}


export default Home