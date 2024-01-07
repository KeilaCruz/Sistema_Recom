import React from "react";
import Sidebar from "../partials/Sidebar";
import { VisualizarOrdenes } from "../Administrador/VisualizarOrdenes";
import { Link } from "react-router-dom";
import Header from "../partials/headers/Header";
import SearchBar from "../partials/SearchBar";

function HomeTrabajos() {
  return (
    <>
      <main className=" w-auto flex flex-row bg-colorFondo">
        <div className="fixed h-full">
          <Sidebar />
        </div>

        <section className="flex flex-col w-full h-auto ml-[289px]">
          <Header />
          <section className="my-[30px] mx-[40px]  flex flex-col rounded-[5px]  gap-[10px]">
            <SearchBar />
            <Link
              to="/registrar-orden-trabajo"
              className="flex items-center gap-[10px] p-[10px] bg-colorSecundario w-max rounded-[5px] hover:bg-[#4D407E] box-border "
            >
              <img
                src="/src/assets/icons/add-icon.svg"
                alt="icono para agregar un nuevo trabajador"
              />
              <p className="text-white font-medium">Agregar trabajo</p>
            </Link>

            <VisualizarOrdenes />
          </section>
        </section>
      </main>
    </>
  );
}

export default HomeTrabajos;
