import React, { useState , useEffect} from "react";
import Header from "../partials/headers/HeaderLogin";
import ErrorInput from "../partials/ErrorInput";
import {
  iniciarSesion,
  obtenerTipoCuenta,
} from "../../services/Auth/Autenticación";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { supabase } from "../../supabase/connection";

function Login() {
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
    });
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const sesion = await iniciarSesion(data);
    if (sesion != null) {
      console.log(sesion)
      const tipoCuenta = await obtenerTipoCuenta(sesion);
      console.log(tipoCuenta)
      if (tipoCuenta === "administrador") {
        navigate("/");
      } else {
        navigate("/trabajador");
      }
    } else {
      toast.error("No se encontró ninguna cuenta con esos datos");
    }
  });

  const camposVacios = (data) => {
    if (!data.correo && !data.contraseña) {
      setIsEmpty(!isEmpty);
    }

    return false;
  };

  return (
    <main className="flex flex-col font-sans w-screen">
      <Header />

      <section className="m-[40px] flex flex-row p-[20px] items-center gap-[220px] ">
        <article className="flex flex-col gap-[40px] items-center ">
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

        <section className="flex flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] p-[30px]">
          <p className="text-[22px] text-[#3B315F] font-bold mb-[30px]">
            INICIAR SESIÓN
          </p>
          <section className="flex flex-col">
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-3 font-sans "
            >
              <label
                htmlFor="correo"
                className="text-[18px] font-semibold text-colorSecundario"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                {...register("correo", { required: true })}
                className="border-[1px] border-[#3B315F] p-[10px] rounded-[5px] w-[450px] text-[15px] text-colorSecundario focus:border-[#3B315F]
                focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
              />
              {errors.correo && (
                <>
                  <ErrorInput nombre="El correo" />
                </>
              )}
              <label
                htmlFor="contraseña"
                className="text-[18px] font-semibold text-colorSecundario"
              >
                Contraseña
              </label>
              <input
                type="password"
                placeholder="*********"
                {...register("contraseña", { required: true })}
                className="border-[1px] border-[#3B315F] p-[10px] rounded-[5px] w-[450px] text-[15px] text-colorSecundario  focus:border-[#3B315F]
                focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
              />
              {errors.contraseña && (
                <>
                  <ErrorInput nombre="La contraseña" />
                </>
              )}
              <button
                type="submit"
                className="mt-[20px] bg-[#3B315F] p-[10px] text-white text-[20px] font-sans font-medium rounded hover:bg-[#4D407E]"
              >
                Ingresar
              </button>
            </form>

            <Link
              to="/recuperar-contraseña"
              className=" text-[18px] text-[#3B315F] underline font-semibold mt-[18px] hover:text-[#4D407E]"
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
