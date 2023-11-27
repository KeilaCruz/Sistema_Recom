import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginMain from "../Views/V_Login";
import HomeAdministrador from "../Views/V_HomeAdministrador.jsx";
import RecuperarContraseña from "../Views/V_RecuperarContraseña";
import NuevaContraseña from "../components/Auth/NuevaContraseña.jsx";
import NotFound from "../Views/NotFound";

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

      <Route
        path="/nueva-contraseña"
        element={<NuevaContraseña />}
      ></Route>
    </Routes>
  );
}

export default Rutas;
