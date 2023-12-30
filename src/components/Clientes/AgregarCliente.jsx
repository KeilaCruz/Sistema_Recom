import React from "react";
import Sidebar from "../partials/Sidebar";
import Profile from "../partials/Profile";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import AcceptButton from "../buttons/AcceptButton";
import CancelButton from "../buttons/CancelButton";

function AgregarCliente() {
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };


  const {register, handleSubmit, formState: {errors}} = useForm()

  return (
    <>
      <main className="h-screen w-screen flex flex-row bg-colorFondo">
        <section className="fixed h-full">
          <Sidebar />
        </section>

        <section className="flex flex-col w-full h-screen ml-[289px]">
          <nav className="flex items-center justify-between bg-white p-[20px] font-sans font-semibold">
            <section className="flex items-center gap-[20px]">
              <img
                src="/src/assets/icons/backpage-icon.svg"
                alt="icono para regresar a página principal "
                className="h-[30px] cursor-pointer"
                onClick={regresar}
              />
              <article className="flex items-center gap-[10px]">
                <img
                  src="/src/assets/icons/active/clientesActive-icon.svg"
                  alt="icono de agregar cliente"
                  className="h-[30px]"
                />
                <p className="text-[18px]">Nuevo Cliente</p>
              </article>
            </section>

            <section>
              <Profile />
            </section>
          </nav>

          <section className="bg-white p-[40px] mx-[70px] my-[30px] flex flex-col  font-sans shadow rounded-[5px] w-[1000px]">
            <form action="">
              <ul className="flex flex-col gap-[30px]">
                <li className="flex flex-row items-center gap-[100px]">
                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Nombre
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="text"
                      placeholder="Ingresa el nombre del cliente "
                      {...register("nombre", {required: true})}
                    />
                    {errors.nombre && (<>Esto es necesario</>)}
                  </article>

                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Correo Electrónico
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="email"
                      placeholder="Ingresa el correo electrónico del cliente "
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
                      placeholder="Ingresa el apellido paterno del cliente"
                    />
                  </article>

                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Teléfono
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px] "
                      type="tel"
                      placeholder="Ingresa el teléfono del cliente"
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
                    placeholder="Ingresa el apellido materno del cliente "
                  />
                </article>
              </ul>
              <article className="flex gap-[20px] items-center mt-[40px]">
                <AcceptButton label="Agregar" />
                <CancelButton label="Cancelar" />
              </article>
            </form>
          </section>
        </section>
      </main>
    </>
  );
}

export default AgregarCliente;
