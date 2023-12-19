import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginMain from "../Views/V_Login";
import HomeAdministrador from "../Views/V_HomeAdministrador.jsx";
import RecuperarContraseña from "../Views/V_RecuperarContraseña";
import NuevaContraseña from "../components/Auth/NuevaContraseña.jsx";
import NotFound from "../Views/NotFound";
import { RegistrarOrden } from "../components/Administrador/RegistrarOrden";
import { RegistrarTrabajador } from "../components/Administrador/RegistrarTrabajador.jsx"
import { VisualizarOrdenes } from "../components/Administrador/VisualizarOrdenes";
import { Toaster } from "react-hot-toast";
import { VisualizarTrabajadores } from "../components/Administrador/VisualizarTrabajadores";
import { VisualizarTrabajador } from "../components/Administrador/VisualizarTrabajador";


import Clientes from "../Views/V_Clientes.jsx";
import AddCliente from '../Views/V_NuevoCliente.jsx'
import HomeTrabajos from "../Views/V_HomeTrabajos.jsx";



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
      <Route path="/clientes" element={<Clientes />}></Route>
      <Route path="/trabajos" element={<HomeTrabajos />}></Route>
      <Route path="/registrar-orden-trabajo" element={<RegistrarOrden />}></Route>
      {/*<Route path="/trabajos" element={<EventosProvider> <HomeTrabajos /></EventosProvider>}></Route>
      <Route path="/registrar-orden-trabajo" element={<EventosProvider><RegistrarOrden/></EventosProvider>} />*/}

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


    </Routes>

  );
}

export default Rutas;
