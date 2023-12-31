import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginMain from "../Views/V_Login";
import HomeAdministrador from "../Views/V_HomeAdministrador.jsx";
import RecuperarContraseña from "../Views/V_RecuperarContraseña";
import NuevaContraseña from "../components/Auth/NuevaContraseña.jsx";
import NotFound from "../Views/NotFound";
import { RegistrarOrden } from "../components/Administrador/RegistrarOrden";
import  RegistrarTrabajador  from "../components/Administrador/RegistrarTrabajador.jsx"
import { VisualizarOrdenes } from "../components/Administrador/VisualizarOrdenes";
import { Toaster } from "react-hot-toast";
import { VisualizarTrabajadores } from "../components/Administrador/VisualizarTrabajadores";
import { VisualizarTrabajador } from "../components/Administrador/VisualizarTrabajador";
import DetalleCliente from '../components/Clientes/DetalleCliente.jsx'


import Clientes from "../Views/V_Clientes.jsx";
import AddCliente from '../Views/V_NuevoCliente.jsx'

import Trabajadores from "../Views/V_HomeTrabajadores.jsx"
import AddTrabajador from "../Views/V_NuevoTrabajador.jsx"


function Rutas() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="/" element={<HomeAdministrador />}></Route>

      <Route path="/login" element={<LoginMain />}></Route>
      <Route
        path="/recuperar-contraseña"
        element={<RecuperarContraseña />}
      ></Route>

      <Route path="/nueva-contraseña" element={<NuevaContraseña />}></Route>
      <Route path="/clientes" element={<Clientes/>}></Route>
      <Route path="/trabajadores" element={<Trabajadores/>}/>
      <Route path="/registrar-orden-trabajo" element={<RegistrarOrden />} />
      <Route path="/registrar-trabajador" element={<RegistrarTrabajador />} />
      <Route path="/visualizar-ordenes" element={<VisualizarOrdenes />} />
      <Route
        path="/visualizar-trabajadores"
        element={<VisualizarTrabajadores />}
      />
      <Route
        path="/visualizar-trabajador/:id"
        element={<VisualizarTrabajador />}
      />
    
      <Route path="/nuevo-cliente" element={<AddCliente/>}/>

      <Route path='/nuevo-trabajador' element={<AddTrabajador/>}/>

      <Route path="detalle-cliente/:id" element={<DetalleCliente/>}/>
  
    </Routes>
    
  );
}

export default Rutas;
