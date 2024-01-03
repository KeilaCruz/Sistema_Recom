import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/headers/Header";
import { Link } from "react-router-dom";
import { getClientes } from "../../services/Cliente";
import TablaDatos from "../TablaDatosCliente";

import { ResultadosProvider } from "../../Context/ResultadosProvider";

function HomeClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cargarClientes = async () => {
      const dataClientes = await getClientes();
      setClientes(dataClientes);
    };
    cargarClientes();

    const tiempoCarga = setInterval(() => {
      cargarClientes();
    }, 10000); // el useEffect se actualiza cada 10 segundos

    return () => clearInterval(tiempoCarga);
  }, []);

  return (
    <>
      <main className=" w-auto flex flex-row bg-colorFondo ">
        <aside className="fixed h-full">
          <Sidebar />
        </aside>
        <section className="flex flex-col w-full  ml-[289px]">
          <Header placeholder={"Buscar por nombre de cliente ..."} />

          <section className="my-[30px] mx-[40px]  flex flex-col rounded-[5px]  gap-[30px] ">
            <Link
              className="flex items-center gap-[10px] p-[10px] bg-colorSecundario w-[150px] rounded-[5px] hover:bg-[#3b315fd3] "
              to="/nuevo-cliente"
            >
              <img
                src="/src/assets/icons/add-icon.svg"
                alt="icono para agregar un nuevo cliente"
              />
              <p className="font-sans font-medium text-[14px] text-white">
                Nuevo cliente
              </p>
            </Link>

            <section>
             
              <TablaDatos data={clientes} />
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

export default HomeClientes;
