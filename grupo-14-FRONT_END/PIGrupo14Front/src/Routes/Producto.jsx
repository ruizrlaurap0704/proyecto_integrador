import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {faChevronLeft, faCaretDown, faStar, faHeart, faShareNodes,faLocationDot, faWifi, faTv, faPersonSwimming, faCar, faKitchenSet, faPaw, faSnowflake} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleCheck} from '@fortawesome/free-regular-svg-icons'
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import { useGlobalStates } from '../Components/utils/globalContext'


const Producto = () => {
    const navigate = useNavigate()
    const [dataCiudades, setDataCiudades] = useState([])
    useEffect(()=>{ 
        axios("http://localhost:8080/ciudades/list")
        .then(res => setDataCiudades(res.data))
    },[])


    const [imagenes, setImagenes] = useState({
        titulo:'',
        url_imagen1:'',
        url_imagen2:'',
        url_imagen3:'',
        url_imagen4:'',
        url_imagen5:'',
    })
    
    let dataImagen ={
        titulo: imagenes.titulo,
        url_imagen1: imagenes.url_imagen1,
        url_imagen2: imagenes.url_imagen2,
        url_imagen3: imagenes.url_imagen3,
        url_imagen4: imagenes.url_imagen4,
        url_imagen5: imagenes.url_imagen5,
    }
    const urlImagen = `http://localhost:8080/imagenes/crear`
    const settingsImagen ={
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(dataImagen)
    }
    
    
    
    const [caracteristicas, setCaracteristicas] = useState({
        cocina: false,
        televisor: false,
        aire_acondicionado: false,
        apto_mascotas: false,
        estacionamiento_gratuito: false,
        pileta: false,
        wifi: false
    })
    let dataCaracteristica ={
        cocina: caracteristicas.cocina,
        televisor: caracteristicas.televisor,
        aire_acondicionado: caracteristicas.aire_acondicionado,
        apto_mascotas: caracteristicas.apto_mascotas,
        estacionamiento_gratuito: caracteristicas.estacionamiento_gratuito,
        pileta: caracteristicas.pileta,
        wifi: caracteristicas.wifi
    }
    const urlCaracteristica = `http://localhost:8080/caracteristicas/crear`
    const settingsCaracteristica ={
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(dataCaracteristica)
    }
    
    

    const [politicas, setPoliticas] = useState({
        norma_casa1: '',
        norma_casa2: '',
        norma_casa3: '',
        salud_seguridad1: '',
        salud_seguridad2: '',
        salud_seguridad3: '',
        politica_cancelacion1: '',
        politica_cancelacion2: '',
        politica_cancelacion3: ''
    })
    let dataPolitica ={
        norma_casa1: politicas.norma_casa1,
        norma_casa2: politicas.norma_casa2,
        norma_casa3: politicas.norma_casa3,
        salud_seguridad1: politicas.salud_seguridad1,
        salud_seguridad2: politicas.salud_seguridad2,
        salud_seguridad3: politicas.salud_seguridad3,
        politica_cancelacion1: politicas.politica_cancelacion1,
        politica_cancelacion2: politicas.politica_cancelacion2,
        politica_cancelacion3: politicas.politica_cancelacion3
    }
    const urlPolitica = `http://localhost:8080/politicas/crear`
    const settingsPolitica ={
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(dataPolitica)
    }

    const crearPolitica = () =>{
        fetch(urlPolitica, settingsPolitica )
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setProducto({...producto, politica:{idPolitica: data.idPolitica}})
        })
        .catch(error => {
            console.log(error);
        })
    }

    const crearCaracteristica = () =>{
        fetch(urlCaracteristica, settingsCaracteristica )
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setProducto({...producto, caracteristica:{idCaracteristica: data.idCaracteristica}})
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    const crearImagen = () =>{
        fetch(urlImagen, settingsImagen )
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setProducto({...producto, imagen:{idImagen: data.idImagen}})
        })
        .catch(error => {
            console.log(error);
        })
    }
    const [producto, setProducto] = useState({
        titulo: '',
        descripcion: '',
        categoria:{
            idCategoria:undefined
        },
        ciudad:{
            idCiudad:undefined
        },
        imagen:{
            idImagen:undefined
        },
        caracteristica:{
            idCaracteristica:undefined
        },
        politica:{
            idPolitica:undefined    
        }
    })
    
    let dataProducto = {
        titulo: producto.titulo,
        descripcion: producto.descripcion,
        categoria:{
            idCategoria:producto.categoria.idCategoria
        },
        ciudad:{
            idCiudad:producto.ciudad.idCiudad
        },
        imagen:{
            idImagen:producto.imagen.idImagen
        },
        caracteristica:{
            idCaracteristica:producto.caracteristica.idCaracteristica
        },
        politica:{
            idPolitica:producto.politica.idPolitica
        }
    }
    const urlProducto = `http://localhost:8080/productos/crear`
    const settingsProducto ={
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*", 
        },
        body: JSON.stringify(dataProducto)
    }
    const crearProducto = () =>{
        fetch(urlProducto, settingsProducto )
            .then(response => response.json())
            .then(data =>{
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
            navigate('/productoExitoso')
            console.log(producto);

    }
        
    const agregarInput = (tipoInput,num) => {
        document.getElementById(`${tipoInput}${num}`).classList.remove("ocultarInput")
        document.querySelector(`.botonInput${num-1}`).classList.add("oculto")
        document.querySelector(`.borrarInput${num-1}`).classList.remove("oculto")
    }
    const removerInput = (num) => {
        document.querySelector(`.botonInput${num}`).classList.add("oculto")
        document.querySelector(`.borrarInput${num}`).classList.remove("oculto")
    }

    return (
    <article>
        <div className='barra'>
                <div className='barra2'>
                    <h2>Administración</h2>
                </div>
                <Link to="/"  className='arrowProduct'>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </Link>
        </div>
        <article className='productoPadre'>
            <h3>Crear Propiedad</h3>
            <div className='crearProducto'>
                <div className='formProducto'>
                    <form action="">
                        <div>
                            <div>
                                <label htmlFor="" >Nombre de la propiedad</label>
                                <input type="text"  placeholder="Introducí el nombre de la propiedad" onChange={(e) =>{ 
                                    setImagenes({...imagenes, titulo: e.target.value})
                                    setProducto({...producto, titulo: e.target.value})
                                }}/>
                                <label htmlFor="">Dirección</label>
                                <input type="text"  placeholder="Introducí la dirección"/>
                            </div>
                            <div>
                                <label htmlFor="">Categoria</label>
                                <select name="" id="" onChange={(e) => setProducto({...producto, categoria:{idCategoria: e.target.value}})}>
                                    <option hidden>Selecciona la categoria</option>
                                    <option value={1} >Hotel</option>
                                    <option value={2}>Casa</option>
                                    <option value={3}>Bed and BreakFast</option>
                                    <option value={4}>Departamento</option>
                                </select>
                                <label htmlFor="">Ciudad</label>
                                <select className='selectCiudad' placeholder="Selecciona la ciudad" onChange={(e) => setProducto({...producto, ciudad:{idCiudad: e.target.value}})}>
                                    <option hidden>Selecciona la ciudad</option>
                                    {dataCiudades.map(ciudad => 
                                        <option
                                        value={ciudad.idCiudad} key={ciudad.idCiudad} className="ciudades">
                                            {ciudad.nombre}, {ciudad.provincia}
                                        </option>
                                    )}
                                    </select>
                                {/* <p id='completaAt' className={ciudadIncompleto}>Por favor, ingresa tu ciudad para avanzar</p> */}
                            </div>
                        </div>
                        <label htmlFor="">Descripcion</label>
                        <textarea name="" id="" cols="30" rows="10" placeholder='Escribir aquí' onChange={(e) => setProducto({...producto, descripcion: e.target.value})}/>
                    </form>
                </div>
                <div className='formCaracteristica'>
                    <h3>Agregar Caracteristicas</h3>
                    <div>
                        <div id='caractHijo1'>
                            <div>
                                <label htmlFor="">Cocina</label>
                                <FontAwesomeIcon icon={faKitchenSet}/>
                                <input type="checkbox" placeholder='Seleccione las caracteristicas' onChange={(e) => setCaracteristicas({...caracteristicas, cocina: true})}/>
                            </div>
                        </div>
                        <div id='caractHijo2'>
                            <div>
                                <label htmlFor="">Televisor</label>
                                <FontAwesomeIcon icon={faTv}/>
                                <input type="checkbox" placeholder='Seleccione las caracteristicas' onChange={(e) => setCaracteristicas({...caracteristicas, televisor:true})}/>
                            </div>
                        </div>
                        <div id='caractHijo3'>
                            <div>
                                <label htmlFor="">Aire Acondicionado</label>
                                <FontAwesomeIcon icon={faSnowflake}/>
                                <input type="checkbox" placeholder='Seleccione las caracteristicas' onChange={(e) => setCaracteristicas({...caracteristicas, aire_acondicionado: true})}/>
                            </div>
                        </div>
                        <div id='caractHijo4'>
                            <div>
                                <label htmlFor="">Apto Mascotas</label>
                                <FontAwesomeIcon icon={faPaw}/>
                                <input type="checkbox" placeholder='Seleccione las caracteristicas' onChange={(e) => setCaracteristicas({...caracteristicas, apto_mascotas: true})}/>
                            </div>
                        </div>
                        <div id='caractHijo5'>
                            <div>
                                <label htmlFor="">Estacionamiento</label>
                                <FontAwesomeIcon icon={faCar}/>
                                <input type="checkbox" placeholder='Seleccione las caracteristicas' onChange={(e) => setCaracteristicas({...caracteristicas, estacionamiento_gratuito: true})}/>
                            </div>
                        </div>
                        <div id='caractHijo6'>
                            <div>
                                <label htmlFor="">Pileta</label>
                                <FontAwesomeIcon icon={faPersonSwimming}/>
                                <input type="checkbox" placeholder='Seleccione las caracteristicas' onChange={(e) => setCaracteristicas({...caracteristicas, pileta:true})}/>
                            </div>
                        </div>
                        <div id='caractHijo7'>
                            <div>
                                <label htmlFor="">Wifi</label>
                                <FontAwesomeIcon icon={faWifi}/>
                                <input type="checkbox" placeholder='Seleccione las caracteristicas' onChange={(e) => setCaracteristicas({...caracteristicas, wifi: true})}/>
                            </div>
                        </div>
                <button onClick={crearCaracteristica}>Confirmar </button>
                    </div>
                </div>
                <div className='formPolitica'>
                    <h3>Politicas del producto</h3>
                    <div>
                        <div>
                            <h4>Normas de la casa</h4>
                            <div>
                                <label htmlFor="">Descripción</label>
                                <div id='politicaHijo'>
                                    <input type="text" placeholder='Escribir aquí' onChange={(e) => setPoliticas({...politicas, norma_casa1: e.target.value})}/>
                                    <button onClick={() => agregarInput("politicaHijo", 2)} className='botonInput1'>+</button>
                                    <button onClick={() => {removerInput(1), setPoliticas({...politicas, norma_casa1: ''})}} className='borrarInput1 oculto'>X</button>
                                </div>
                                <div id='politicaHijo2' className='ocultarInput'>
                                    <input type="text" placeholder='Escribir aquí' onChange={(e) => setPoliticas({...politicas, norma_casa2: e.target.value})}/>
                                    <button onClick={() => agregarInput("politicaHijo",3)} className='botonInput2'>+</button>
                                    <button onClick={() => {removerInput(2), setPoliticas({...politicas, norma_casa2: ''})}} className='borrarInput2 oculto'>X</button>                                    
                                </div>
                                <div id='politicaHijo3' className='ocultarInput'>
                                        <input type="text" placeholder='Escribir aquí' onChange={(e) => setPoliticas({...politicas, norma_casa3: e.target.value})}/>
                                        <button onClick={() => {removerInput(3), setPoliticas({...politicas, norma_casa3: ''})}} className='borrarInput3'>X</button>                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Politicas y seguridad</h4>
                            <div>
                                <label htmlFor="">Descripción</label>
                                <div id='politicaHijo4'>
                                    <input type="text" placeholder='Escribir aquí' onChange={(e) => setPoliticas({...politicas, salud_seguridad1: e.target.value})}/>
                                    <button onClick={() => agregarInput("politicaHijo", 5)} className='botonInput4'>+</button>
                                    <button onClick={() => {removerInput(4), setPoliticas({...politicas, salud_seguridad1: ''})}} className='borrarInput4 oculto'>X</button>
                                </div>
                                <div id='politicaHijo5' className='ocultarInput'>
                                    <input type="text" placeholder='Escribir aquí' onChange={(e) => setPoliticas({...politicas, salud_seguridad2: e.target.value})}/>
                                    <button onClick={() => agregarInput("politicaHijo",6)} className='botonInput5'>+</button>
                                    <button onClick={() => {removerInput(5), setPoliticas({...politicas, salud_seguridad2: ''})}} className='borrarInput5 oculto'>X</button>                                    
                                </div>
                                <div id='politicaHijo6' className='ocultarInput'>
                                        <input type="text" placeholder='Escribir aquí' onChange={(e) => setPoliticas({...politicas, salud_seguridad3: e.target.value})}/>
                                        <button onClick={() => {removerInput(6), setPoliticas({...politicas, salud_seguridad3: ''})}} className='borrarInput6'>X</button>                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Politica de cancelacion</h4>
                            <div>
                                <label htmlFor="">Descripción</label>
                                <div id='politicaHijo7'>
                                    <input type="text" placeholder='Escribir aquí' onChange={(e) => setPoliticas({...politicas, politica_cancelacion1: e.target.value})}/>
                                    <button onClick={() => agregarInput("politicaHijo", 8)} className='botonInput7'>+</button>
                                    <button onClick={() => {removerInput(7), setPoliticas({...politicas, politica_cancelacion1: ''})}} className='borrarInput7 oculto'>X</button>
                                </div>
                                <div id='politicaHijo8' className='ocultarInput'>
                                    <input type="text" placeholder='Escribir aquí' onChange={(e) => setPoliticas({...politicas, politica_cancelacion2: e.target.value})}/>
                                    <button onClick={() => agregarInput("politicaHijo",9)} className='botonInput8'>+</button>
                                    <button onClick={() => {removerInput(8), setPoliticas({...politicas, politica_cancelacion2: ''})}} className='borrarInput8 oculto'>X</button>                                    
                                </div>
                                <div id='politicaHijo9' className='ocultarInput'>
                                        <input type="text" placeholder='Escribir aquí' onChange={(e) => setPoliticas({...politicas, politica_cancelacion3: e.target.value})}/>
                                        <button onClick={() => {removerInput(9), setPoliticas({...politicas, politica_cancelacion3: ''})}} className='borrarInput9'>X</button>                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={crearPolitica}>Confirmar</button>
                </div>
                <div className='formImagen'>
                    <h3>Cargar Imágenes</h3>
                    <div id='imagenPadre'>
                        <div id='imagenHijo10'>
                            <input type="text" placeholder='Insertar https://' onChange={(e) => setImagenes({...imagenes, url_imagen1: e.target.value})}/>
                            <button onClick={() => agregarInput("imagenHijo",11)} className='botonInput10'>+</button>
                            <button onClick={() => {removerInput(10), setImagenes({...imagenes, url_imagen1: ''})}} className='borrarInput10 oculto'>X</button>
                        </div>
                        <div id='imagenHijo11' className='ocultarInput' >
                            <input type="text" placeholder='Insertar https://' onChange={(e) => setImagenes({...imagenes, url_imagen2: e.target.value})}/>
                            <button onClick={() => agregarInput("imagenHijo",12)} className='botonInput11'>+</button>
                            <button onClick={() => {removerInput(11), setImagenes({...imagenes, url_imagen2: ''})}} className='borrarInput11 oculto'>X</button>
                        </div>
                        <div  id='imagenHijo12' className='ocultarInput' >
                            <input type="text" placeholder='Insertar https://' onChange={(e) => setImagenes({...imagenes, url_imagen3: e.target.value})}/>
                            <button onClick={() => agregarInput("imagenHijo",13)} className='botonInput12'>+</button>
                            <button onClick={() => {removerInput(12), setImagenes({...imagenes, url_imagen3: ''})}} className='borrarInput12 oculto'>X</button>
                        </div>
                        <div id='imagenHijo13' className='ocultarInput'  >
                            <input type="text" placeholder='Insertar https://' onChange={(e) => setImagenes({...imagenes, url_imagen4: e.target.value})}/>
                            <button onClick={() => agregarInput("imagenHijo",14)} className='botonInput13'>+</button>
                            <button onClick={() => {removerInput(13),setImagenes({...imagenes, url_imagen4: ''})}} className='borrarInput13 oculto'>X</button>
                        </div>
                        <div id='imagenHijo14' className='ocultarInput'  >
                            <input type="text" placeholder='Insertar https://' onChange={(e) => setImagenes({...imagenes, url_imagen5: e.target.value})}/>
                            <button onClick={() => {removerInput(14), setImagenes({...imagenes, url_imagen5: ''})}} className='borrarInput14'>X</button>
                        </div>
                    <button onClick={crearImagen}>Confirmar</button>
                    </div>
                </div>
                <button onClick={crearProducto}>Crear</button>
            </div>
        </article>
    </article>
    )
}

export default Producto