import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Profile from "../partials/Profile";

function AgregarTrabajador() {
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };

  return (
    <>
      <main className="flex h-screen w-full bg-colorFondo">
        <aside className="fixed h-full">
          <Sidebar />
        </aside>

        <section className="flex flex-col w-full h-auto ml-[289px]">
          <header className="flex flex-row w-full justify-between items-center bg-white p-[20px] font-sans">
            <article className="flex items-center justify-evenly gap-[10px]">
              <img
                src="/src/assets/icons/backpage-icon.svg"
                alt="icono para regresar a página anterior"
                className="h-[30px] cursor-pointer"
                onClick={regresar}
              />
              <img
                src="/src/assets/icons/active/trabajadoresActive-icon.svg"
                alt="icono de trabajador"
                className="h-[30px]"
              />
              <p className="font-bold text-[20px]">Nuevo Trabajador</p>
            </article>

            <article>
              <Profile />
            </article>
          </header>

          <section className="bg-white p-[40px] mx-[70px] my-[30px] flex flex-col i font-sans shadow rounded-[5px] w-[1000px]">
            <form>
              <ul className="flex flex-col gap-[30px]">
                <li className="flex flex-row items-center gap-[100px]">
                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Nombre
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="text"
                      placeholder="Ingresa el nombre del trabajador "
                    />
                  </article>

                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Correo Electrónico
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="email"
                      placeholder="Ingresa el correo electrónico del trabajador "
                    />
                  </article>
                </li>

                <li className="flex flex-row items-center gap-[100px]">
                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Apellido Paterno
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="text"
                      placeholder="Ingresa el apellido paterno del trabajador "
                    />
                  </article>

                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Teléfono
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="tel"
                      placeholder="Ingresa el teléfono del trabajador "
                    />
                  </article>
                </li>
                <article className="flex flex-col">
                  <label className="text-colorSecundario font-medium">
                    Apellido Materno
                  </label>
                  <input
                    className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                    type="text"
                    placeholder="Ingresa el apellido materno del trabajador "
                  />
                </article>

                <article className="flex flex-col">
                  <label className="text-colorSecundario font-medium">
                    Contraseña del trabajador
                  </label>
                  <article className="flex flex-row items-center gap-4 mt-2">
                    <button className="bg-colorSecundario rounded-[5px] text-white font-sans font-medium px-[10px] py-[8px] w-[120px]">
                      Generar
                    </button>
                    <input
                      className="px-[10px] py-[8px] rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="password"
                      placeholder="***********"
                    />
                  </article>
                </article>
              </ul>

              <section className="mt-10 flex items-center gap-5">
                <button className="bg-colorSecundario p-2 rounded-[5px] font-sans font-medium text-white w-[100px]">
                  Agregar
                </button>
                <button className="bg-colorSecundario p-2 rounded-[5px] font-sans font-medium text-white w-[100px]">
                  Cancelar
                </button>
              </section>
            </form>
          </section>
        </section>
      </main>
    </>
  );
}

export default AgregarTrabajador;
