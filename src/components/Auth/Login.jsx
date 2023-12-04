import React from "react";
import Header from "../partials/headers/HeaderLogin";
import { iniciarSesion } from "../../services/Auth/Autenticación";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const sesion = await iniciarSesion(data);
    if (sesion) {
      navigate("/");
    } else {
      alert("usuario o constraseña incorrectos");
    }
  });

  return (
    <main className="flex flex-col font-sans w-screen">
      <Header />

      <section className="m-[40px] flex flex-row p-[20px] items-center gap-[220px] ">
        <article className="flex flex-col gap-[40px] items-center">
          <h1 className="text-[#3B315F] text-[40px] font-bold ">
            RYCO <br /> Taller de Torno y Soldadura
          </h1>
          <picture>
            <img
              className="h-[300px]"
              src="/src/assets/icons/icon-main.svg"
              alt="logotipo de la empresa"
            />
          </picture>
        </article>

        <section className="flex flex-col">
          <p className="text-[40px] text-[#3B315F] font-bold mb-[40px]">
            Iniciar Sesión
          </p>
          <section className="flex flex-col">
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-3 font-sans "
            >
              <label htmlFor="correo" className="text-[25px] font-semibold">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                {...register("correo")}
                className="border-[1px] border-[#3B315F] p-[10px] rounded-[5px] w-[450px] text-[22px]  focus:border-[#3B315F]
                focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
              />
              <label htmlFor="contraseña" className="text-[25px] font-semibold">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                {...register("contraseña")}
                className="border-[1px] border-[#3B315F] p-[10px] rounded-[5px] w-[450px] text-[22px]  focus:border-[#3B315F]
                focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
              />
               <button type="submit" className="mt-[20px] bg-[#3B315F] p-[10px] text-white text-[20px] font-sans font-medium rounded hover:bg-[#4D407E]">
              Ingresar
            </button>
            </form>

            <Link
              to="/recuperar-contraseña"
              className=" text-[20px] text-[#3B315F] underline font-semibold mt-[20px] hover:text-[#4D407E]"
            >
              ¿Olvidaste tu contraseña?
            </Link>

           
          </section>
        </section>
      </section>
    </main>
  );
}

export default Login;
