import React from "react";
import { cerrarSesion } from "../../services/Auth/Autenticación";
import { useNavigate } from "react-router-dom";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/headers/HeaderAdministrador";

function Home() {
  const navigate = useNavigate();

  const handelSubmit = async () => {
    const sesion = await cerrarSesion();
    navigate("/login");
  };

  return (
    <>
      <main className="flex flex-row bg-colorFondo h-screen w-screen overflow-auto">
        <div className="bg-black w-[20%] fixed">
          <Sidebar/>
        </div>
        <div className="flex flex-col w-[80%] ml-[300px] h-auto">
          <Header/>
          

        </div>
      </main>
    </>
  );
}

export default Home;
