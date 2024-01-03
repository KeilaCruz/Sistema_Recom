import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import { detalleCliente, datosCliente } from "../../services/Clientes";
import HeaderPestaña from "../partials/headers/HeaderPestaña";
import CardDatosCliente from "./CardDatosCliente";
import OrdenesCard from "./OrdenesCard";

function DetalleCliente() {
  const { id } = useParams();
  const [ordenes, setOrdenes] = useState([]);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await datosCliente(id);
      setDatos(datos);
      const trabajos = await detalleCliente(id);
      console.log(trabajos);
    };

    cargarDatos();
  }, []);

  return (
    <>
      <main className="h-screen w-screen flex flex-row bg-colorFondo">
        <aside className="fixed h-full">
          <Sidebar />
        </aside>

        <section className="flex flex-col w-full h-auto ml-[289px]">
          <header>
            <HeaderPestaña
              srcArrow="/src/assets/icons/backpage-icon.svg"
              nombrePestaña="Detalles de trabajos realizados"
              srcIcon="/src/assets/icons/active/trabajosActive-icon.svg"
            />
          </header>

          <section className="my-10 mx-11">
            <CardDatosCliente data={datos} />

            <article className="mt-5 ">
              <OrdenesCard />
            </article>
          </section>
        </section>
      </main>
    </>
  );
}

export default DetalleCliente;
