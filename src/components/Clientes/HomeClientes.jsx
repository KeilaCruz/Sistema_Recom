import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/headers/Header";
import { Link } from "react-router-dom";
import { getClientes } from "../../services/Cliente";
import TablaDatos from "../TablaDatos";


function HomeClientes() {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cargarClientes = async () => {
      const dataClientes = await getClientes();
      console.log(dataClientes);
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
      <main className="h-screen w-screen flex flex-row bg-colorFondo">
        <div className="fixed h-full">
          <Sidebar />
        </div>
        <section className="flex flex-col w-full h-auto ml-[289px]">
          <Header placeholder={"Buscar por nombre de cliente ..."} />

          <section className="m-[50px] flex flex-col rounded-[5px]  gap-[50px]">
            <Link className="flex items-center gap-[10px] p-[10px] bg-colorSecundario w-[150px] rounded-[5px] hover:bg-[#3b315fd3] "
              to="/nuevo'cliente">
              <img
                src="/src/assets/icons/add-icon.svg"
                alt="icono para agregar un nuevo cliente"
              />
              <p className="font-sans font-medium text-[14px] text-white">
                Nuevo cliente
              </p>
            </Link>

            
            <section>
              <TablaDatos data={clientes}/>
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

export default HomeClientes;

{/*

<table className="w-full text-left shadow">
                <thead className="bg-colorMain text-white ">
                  <tr>
                    <th className="p-[10px] rounded-l-[5px]">No. Cliente</th>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th className="p-[10px] rounded-r-[5px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr
                      key={cliente.idcliente}
                      className="font-sans font-normal text-[15px] border-b-[1px] border-black bg-white "
                    >
                      <td className="p-[10px] ">{cliente.idcliente}</td>
                      <td>{cliente.nombre_cliente}</td>
                      <td>{cliente.apepaterno}</td>
                      <td>{cliente.apematerno}</td>
                      <td>
                        <img
                          src="/src/assets/icons/go-details-icon.svg"
                          alt="icono para ver más detalles del cliente"
                          className=""
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <section className="flex flex-row mt-[30px] items-center justify-center gap-[10px]">
                <button className="rounded-[5px] bg-colorMain p-[5px]">
                  <img
                    className="w-[20px]"
                    src="/src/assets/icons/back-pagination-icon.svg"
                    alt="icono para volver a paginación anterior"
                  />
                </button>
                <section className="gap-[10px] flex flex-row items-center justify-around">
                  <button className=" border-[1px] border-black p-[3px] ">
                    1
                  </button>
                  <button className="border-[1px] border-black p-[3px] ">
                    2
                  </button>
                  <button className=" border-[1px] border-black p-[3px] ">
                    3
                  </button>
                </section>

                <button className="rounded-[5px] bg-colorMain p-[5px]">
                  <img
                    className="w-[20px] rotate-180"
                    src="/src/assets/icons/back-pagination-icon.svg"
                    alt="icono para volver a paginación anterior"
                  />
                </button>
              </section>


*/}