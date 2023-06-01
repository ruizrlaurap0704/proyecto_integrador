import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from "./Routes/Home"
import Login from "./Routes/Login"
import Register from './Routes/Register'
import Detail from './Routes/Detail'
import NotFound from "./Routes/NotFound"
import Header from './Components/Header'
import Footer from './Components/Footer'
import Reserva from './Routes/Reserva'
import Producto from './Routes/Producto'
import ReservaExitosa from './Routes/ReservaExitosa'
import ProductoExitoso from './Routes/ProductoExitoso'
import MisReservas from './Routes/MisReservas'

function App() {
  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/producto/:id' element={<Detail/>}/>
        <Route path='/reserva/:id' element={<Reserva/>}/>
        <Route path='/reservaExitosa' element={<ReservaExitosa/>}/>
        <Route path='/producto' element={<Producto/>}/>
        <Route path='/productoExitoso' element={<ProductoExitoso/>}/>
        <Route path='/misReservas' element={<MisReservas/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </main>
  )
}

export default App

