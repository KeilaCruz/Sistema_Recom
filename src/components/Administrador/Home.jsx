import React from 'react'
import {cerrarSesion} from '../../services/Auth/Autenticación'
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()

  const handelSubmit = async ()=>{
    const sesion = await cerrarSesion()
    navigate("/login")
  }

  return (
    <>
    <h1>Estas en el home del administrador</h1>
    <a href="/login">Login</a>
    <br />
    <button onClick={handelSubmit} className='bg-black text-white p-[7px] rounded-[5px]'>Cerrar sesión</button>
    </>
  )
}

export default Home