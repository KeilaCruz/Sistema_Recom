import React from "react";
import { Link} from "react-router-dom";

function OptionSidebar({ ruta ,label, iconBase, iconChange, descripcionImagen , rutaActiva}) {


  return (
    <>
      <Link
        to={ruta}
        className={`flex flex-row items-center gap-[10px] p-[10px]  rounded-[5px]   transition-colors duration-300 ${
          rutaActiva === ruta ? "bg-white hover:bg-none" : "hover:bg-colorHover"
        }`}
      >
        <img src={`${rutaActiva === ruta ? iconChange : iconBase}`} alt={descripcionImagen} />
        <p
          className={`text-[18px] font-bold ${
            rutaActiva === ruta ? "text-colorMain" : "text-white"
          }`}
        >
          {label}
        </p>
      </Link>
    </>
  );
}

export default OptionSidebar;


{/*

Este code es para al final, para hacer dinamico las opciones que coincidan con ciertas subrutas de las opciones
Es decir, que el diseño se mantenga entre las rutas y subrtuas ej; trabajadores>nuevo-trabajdor>visualizartrabajador etc...

import React from "react";
import { Link, useLocation } from "react-router-dom";

function OptionSidebar({ ruta, label, iconBase, iconChange, descripcionImagen }) {
  const location = useLocation();
  const rutaActiva = location.pathname;

  // Definir un array con las rutas relacionadas con trabajadores
  const rutasTrabajadores = ['/nuevo-trabajador', '/visualizar-trabajadores', '/visualizar-trabajador'];

  const isEnRutaTrabajadores = rutasTrabajadores.some(rutaTrabajador =>
    rutaActiva.includes(rutaTrabajador)
  );

  return (
    <>
      <Link
        to={ruta}
        className={`flex flex-row items-center gap-[10px] p-[10px]  rounded-[5px]   transition-colors duration-300 ${
          isEnRutaTrabajadores ? "bg-white hover:bg-none" : "hover:bg-colorHover"
        }`}
      >
        <img src={`${isEnRutaTrabajadores ? iconChange : iconBase}`} alt={descripcionImagen} />
        <p
          className={`text-[18px] font-bold ${
            isEnRutaTrabajadores ? "text-colorMain" : "text-white"
          }`}
        >
          {label}
        </p>
      </Link>
    </>
  );
}

export default OptionSidebar;


*/}