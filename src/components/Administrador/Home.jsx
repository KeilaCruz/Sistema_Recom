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
      <main className="flex flex-row bg-[#F4F1ED] h-screen w-screen m-0">
      <Sidebar/>
      <section className="flex flex-col">
        <Header/>

      </section>

     
      </main>

      {/*<Sidebar />
        <section className="flex flex-col">
          <Header/>
        </section> */}
    </>
  );
}

export default Home;
