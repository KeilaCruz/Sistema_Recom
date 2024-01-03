import React from "react";
import { cerrarSesion } from "../../services/Auth/Autenticación";
import { useNavigate } from "react-router-dom";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/headers/Header";
import Calendario from "../Trabajos/Calendario";

function Home() {
  const navigate = useNavigate();

  const handelSubmit = async () => {
    const sesion = await cerrarSesion();
    navigate("/login");
  };

  return (
    <>
      <main className="flex flex-row bg-colorFondo w-auto  ">
        <aside className=" fixed h-full">
          <Sidebar />
        </aside>
        <section className="flex flex-col w-full h-auto ml-[290px]">
          <header>
            <Header
              placeholder={"Buscar por trabajo, cliente, trabajores....."}
            />

            <section className="bg-white mx-[30px] my-[20px] rounded-[5px]">
              <Calendario/>
            </section>
          </header>
        </section>
      </main>
    </>
  );
}

export default Home;
