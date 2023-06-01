import React, { useEffect, useState } from 'react'
import Hotel from '../Components/Hotel'
import axios from 'axios'
import { useGlobalStates } from './utils/globalContext'
  
  const Hoteles = () => {
    const {filtrado, setFiltrado, dato} = useGlobalStates()
    const [currentPage, setCurrentPage] = useState(1)
    const [items, setItems] = useState([])
    const itemsPorPagina = 4
    window.onload = function() {
      if (filtrado.length === 0) {
        // useEffect(()=>{ 
          axios("http://localhost:8080/productos/list")
          .then(res => setFiltrado(res.data))
          // console.log(filtradnpmo);
          // else if (filtrado.length > 0) return;
        // },[]) 
      }
    }
      filtrado.sort((x,y) => x.idProducto - y.idProducto)
        useEffect(()=>{
          setItems([...filtrado].splice(0, itemsPorPagina))
          // console.log("items " + items.length);
        },[filtrado])
        
  const nextHandler = () =>{
    const totalElementos = filtrado.length;
    
    const nextPage = currentPage + 1;

    const firstIndex = (nextPage - 1)* itemsPorPagina;

    if (firstIndex === totalElementos) return;
    
    setItems([...filtrado].splice(firstIndex, itemsPorPagina))
    setCurrentPage(nextPage)

  }
  const prevHandler = () =>{
    const prevPage = currentPage - 1;

    const firstIndex = (prevPage - 1) * itemsPorPagina;

    if(prevPage < 1) return;

    setItems([...filtrado].splice(firstIndex, itemsPorPagina))
    setCurrentPage(prevPage)

  }
  return (
        <Hotel items={items} currentPage={currentPage} nextHandler={nextHandler} prevHandler={prevHandler}> </Hotel>
  )
}

export default Hoteles