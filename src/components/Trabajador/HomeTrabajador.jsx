import React from "react";
import { cerrarSesion } from "../../services/Auth/Autenticación";
import {useNavigate} from 'react-router-dom'

function HomeTrabajador() {
  const navigate = useNavigate()
  const onSubmit = async () => {
    const logout = await cerrarSesion();
    if (logout) {
      navigate("/login");
    } else {
      alert("No se pudo cerrar sesión");
    }
  };
  return (
    <>
      <p>Home trabajador</p>

      <button onClick={onSubmit}>Cerrar sesion</button>
    </>
  );
}

export default HomeTrabajador;
