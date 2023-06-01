import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGlobalStates } from './utils/globalContext';

const Categoria = () => {
  const {filtrado, setFiltrado, setDato, dato} = useGlobalStates()
  const [toggle, setToggle] = useState("2")
    const [data, setData] = useState([])
    const url = 'http://localhost:8080/categorias/list'
    useEffect(()=>{ 
        axios(url)
        .then(res => setData(res.data))
    },[])
    data.sort((x,y) => x.idCategoria - y.idCategoria)
    const filtrar = (id) =>{
      const urlFiltrado = `http://localhost:8080/categorias/${id}/productos`
      if (toggle === "2") {
        axios(urlFiltrado)
        .then(res => setFiltrado(res.data))
      }
      else if (toggle === "1") {
        // setFiltrado([])
        axios("http://localhost:8080/productos/list")
        .then(res => setFiltrado(res.data))
        // setDato(false)
        // location.reload()
      }
    }
  return (
    data?.map(cat => 
      <div key={cat.idCategoria} id="cat" className="a" onClick={(e) =>{
        setToggle(toggle === "1" ? "2" :"1")
        filtrar(cat.idCategoria)
        e.currentTarget.classList.toggle("seleccionado")
        }}>
        <img src={cat.url_imagen} alt={cat.titulo}  />
        <h3>{cat.titulo}</h3> 
        <p>{cat.descripcion}</p>
      </div>
    ))
}

export default Categoria