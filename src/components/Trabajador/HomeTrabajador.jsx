import React from "react";
import { cerrarSesion } from "../../services/Auth/Autenticación";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function HomeTrabajador() {
  const navigate = useNavigate();
  const onSubmit = async () => {
    const logout = await cerrarSesion();
    if (logout) {
      navigate("/login");
    } else {
      alert("No se pudo cerrar sesión");
    }
  };
  return (
    <>
      <main className="flex flex-col w-full h-full">
        <nav>
          <Header />
        </nav>
        <button onClick={onSubmit}>
          Cerrar sesión
        </button>
        <section className="mx-[40px] my-[20px] justify-center items-center">
          <input
            type="search"
            className="px-5 py-3 rounded-[5px] w-[400px] 
          border-[1px] border-[#3B315F]   text-[16px]  focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
            placeholder="Buscar orden de trabajo"
          />
        </section>

        <section className="mx-[40px] my-[20px] justify-center items-center " >
          <p className="font-medium text-[20px] text-white rounded-[5px] p-[15px] bg-colorMain">Mis trabajos asignados</p>

          <section>

          </section>
        </section>
      </main>
    </>
  );
}

export default HomeTrabajador;
