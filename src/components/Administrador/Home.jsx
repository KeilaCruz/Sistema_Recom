import React from "react";
import { cerrarSesion } from "../../services/Auth/Autenticación";
import { useNavigate } from "react-router-dom";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/headers/Header";

function Home() {
  const navigate = useNavigate();

  const handelSubmit = async () => {
    const sesion = await cerrarSesion();
    navigate("/login");
  };

  return (
    <>
      <main className="flex flex-row bg-colorFondo h-screen w-screen  ">
        <div className=" fixed h-full">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full h-auto ml-[290px]">
          <Header placeholder={"Buscar por trabajo, cliente, trabajores....."} />
        </div>
      </main>
    </>
  );
}

export default Home;
