import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import HeaderPestaña from "../partials/headers/HeaderPestaña";
import CardDatosTrabajador from "../Trabajadores/CardDatosTrabajador";

export function VisualizarTrabajador() {
  const { id } = useParams();

  return (
    <>
      <main className="w-auto h-full flex flex-row bg-colorFondo">
        <aside className="fixed h-full">
          <Sidebar />
        </aside>

        <section className="flex flex-col w-full h-auto ml-[289px]">
          <header>
            <HeaderPestaña
              nombrePestaña="Detalles del trabajador"
              srcIcon="/src/assets/icons/active/trabajadoresActive-icon.svg"
              descripcionImagenPestaña="icono de trabajador"
            />
          </header>

          <section className="my-10 mx-11 ">
            <CardDatosTrabajador id={id} />

            <section className="mt-3">

          
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

