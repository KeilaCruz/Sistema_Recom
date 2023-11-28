import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      {/*En genral se deben cambiar el tamaño de los componentes, NO USAR PX, usar mediciones como em, rem, investigar como añadirlo bien */}
      <aside className="bg-colorMain flex flex-col justify-between pt-[20px] p-[40px] h-screen ">
        <section className="flex flex-col ">
          <article className="flex gap-[20px] font-sans ">
            <img
              src="/src/assets/icons/icon-main.svg"
              alt="logotipo de la empresa RECOM"
              title="logotipo de empresa RECOM"
            />
            <div className="flex flex-col text-white">
              <h1 className="text-[20px] font-semibold">RECOM</h1>
              <h2 className="text-[18px] ">
                Taller de Torno<br></br> y Soldadura
              </h2>
            </div>
          </article>

          <ul className="mt-[50px] font-sans gap-[20px] flex flex-col text-white justify-center ">
            <li className="flex flex-row items-center gap-[10px] p-[15px] rounded-[5px] bg-white cursor-default">
              <img src="/src/assets/icons/home-icon-selected.svg" alt="" />
              <p className="text-[18px] font-bold text-colorMain">Home</p>
            </li>
            <Link
              to="/clientes"
              className="flex flex-row items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-colorHover"
            >
              <img src="/src/assets/icons/clientes-icon.svg" alt="" />
              <p className="text-[18px] font-bold text-white">Clientes</p>
            </Link>
            <Link
              to="/clientes"
              className="flex flex-row items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-colorHover"
            >
              <img src="/src/assets/icons/trabajadores-icon.svg" alt="" />
              <p className="text-[18px] font-bold text-white">Trabajadores</p>
            </Link>
            <Link
              to="/clientes"
              className="flex flex-row items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-colorHover"
            >
              <img src="/src/assets/icons/trabajos-icon.svg" alt="" />
              <p className="text-[18px] font-bold text-white">Trabajos</p>
            </Link>
            <Link
              to="/clientes"
              className="flex flex-row items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-colorHover"
            >
              <img src="/src/assets/icons/salarios-icon.svg" alt="" />
              <p className="text-[18px] font-bold text-white">Salarios</p>
            </Link>
          </ul>
        </section>

        <button className="flex flex-row items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-colorHover ">
          <img src="/src/assets/icons/logout-icon.svg" alt="" className="h-[25px]"/>
          <p className="text-white text-[18px] font-bold">Cerrar Sesion</p>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
