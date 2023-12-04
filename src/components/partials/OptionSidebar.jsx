import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
