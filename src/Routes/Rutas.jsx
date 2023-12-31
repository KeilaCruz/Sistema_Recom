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
import HomeTrabajos from "../Views/V_HomeTrabajos.jsx";
import V_RegistrarOrden from "../Views/V_RegistrarOrden";
import V_RegistrarTrabajador from "../Views/V_RegistrarTrabajador"
import V_VisualizarOrdenes from "../Views/V_VisualizarOrdenes";
import V_VisualizarTrabajadores from "../Views/V_VisualizarTrabajadores";
import V_VisualizarTrabajador from "../Views/V_VisualizarTrabajador";
import V_VisualizarOrden from "../Views/V_VisualizarOrden";import Trabajadores from "../Views/V_HomeTrabajadores.jsx"
import AddTrabajador from "../Views/V_NuevoTrabajador.jsx"


function Rutas() {
  return (
    <Routes>

      <Route path="*" element={<NotFound />}></Route>
      <Route path="/" element={<HomeAdministrador />}></Route>

      <Route path="/login" element={<LoginMain />}></Route>
      <Route path="/recuperar-contraseña" element={<RecuperarContraseña />}></Route>

      <Route path="/nueva-contraseña" element={<NuevaContraseña />}></Route>
      <Route path="/clientes" element={<Clientes />}></Route>

      <Route path="/trabajadores" element={<Trabajadores/>}/>
      <Route path="/trabajos" element={<HomeTrabajos />}></Route>
      <Route path="/registrar-orden-trabajo" element={<V_RegistrarOrden />}></Route>
      <Route path="/visualizar-ordenes" element={<V_VisualizarOrdenes />} />
      <Route path="/visualizar-orden/:id" element={<V_VisualizarOrden />} />
      {/*<Route path="/trabajos" element={<EventosProvider> <HomeTrabajos /></EventosProvider>}></Route>
      <Route path="/registrar-orden-trabajo" element={<EventosProvider><RegistrarOrden/></EventosProvider>} />*/}

      <Route path="/registrar-trabajador" element={<V_RegistrarTrabajador />} />
      <Route path="/visualizar-trabajadores" element={<V_VisualizarTrabajadores />} />
      <Route path="/visualizar-trabajador/:id" element={<V_VisualizarTrabajador />} />

      <Route path='/nuevo-trabajador' element={<AddTrabajador/>}/>

      <Route path="detalle-cliente/:id" element={<DetalleCliente/>}/>

    </Routes>

  );
}

export default Rutas;
