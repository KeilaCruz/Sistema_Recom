import React, { useState } from "react";
import Header from "../partials/headers/HeaderLogin";
import { recuperarContraseña } from "../../services/Auth/Autenticación";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function RestorePassword() {
  const navigate = useNavigate();
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { correo } = data;
    const result = await recuperarContraseña(correo);
    if (result) {
      setCorreoEnviado(!correoEnviado);
    }
  });

  const regresar = () => {
    navigate(-1);
  };

  return (
    <>
      <main className="flex flex-col font-sans bg-white">
        <Header />

        <section className="flex flex-row gap-[20px] font-sans m-[50px]">
          <Link onClick={regresar} className="h-[40px] mt-3">
            <img
              src="/src/assets/icons/go-back.svg"
              alt="icono de regresar"
              className=""
            />
          </Link>

          <section className="flex flex-col mr-[100px] ml-[50px]">
            {correoEnviado ? (
              <>
                <p className="text-[40px] text-[#3B315F] font-semibold">
                  Reestablece tu contraseña
                </p>

                <article className="flex flex-col p-[30px] mt-[30px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[737px] h-[363] ">
                  <section className="flex justify-between mb-[50px]">
                    <p className="text-[25px] text-[#152034] font-medium ">
                      Correo Enviado
                    </p>
                    <img
                      src="/src/assets/icons/correo-enviado.svg"
                      alt="icono de correo enviado"
                      title="icono correo enviado"
                      className="h-[50px]"
                    />
                  </section>
                  <p className="text-[22px] text-[#152034] font-medium opacity-[70%]">
                    Te hemos enviado un email con un enlace para que
                    reestablezcas tu contraseña.
                  </p>
                  <br />
                  <p className="text-[22px] text-[#152034] font-medium opacity-[70%]">
                    Revisa tu bandeja principal, las bandejas de spam y/o
                    promociones
                  </p>
                </article>
              </>
            ) : (
              <>
                <p className="text-[40px] text-[#3B315F] font-semibold">
                  Reestablece tu contraseña
                </p>
                <article className="flex flex-col p-[30px] mt-[30px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[737px] h-[363] ">
                  <p className="text-[25px] text-[#152034] font-medium ">
                    Ingresa el correo vinculado a tu cuenta
                  </p>
                  <p className="text-[22px] text-[#152034] opacity-[70%] mt-4">
                    Recibirás un enlace para que reestablezcas tu contraseña.
                  </p>
                  <p className="text-[25px] mt-[30px] font-medium">
                    Correo Electrónico
                  </p>
                  <form
                    className="flex flex-col gap-[20px]"
                    onSubmit={onSubmit}
                  >
                    <div>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        className={`text-[22px] text-[#3B315F] mt-3 rounded p-[10px] w-[500px] border-[1px] border-[#3B315F] ${
                          errors.correo &&
                          "focus:border-[#C71111] focus:ring-[#C71111]  focus:outline-none "
                        } focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F]`}
                        {...register("correo", { required: true })}
                      />
                    </div>
                    {errors.correo && (
                      <>
                        <span className="text-[22px] text-[#C71111] font-medium font-sans">
                          Se debe ingresar un correo electrónico
                        </span>
                      </>
                    )}
                    <button
                      type="submit"
                      className="text-white bg-[#3B315F] rounded-[5px] p-[10px] font-sans font-medium text-[22px] w-[500px] hover:bg-[#2f274d]"
                    >
                      Enviar enlace
                    </button>
                  </form>
                </article>
              </>
            )}
          </section>
          {/* Debo arreglar lo de picture para WR, ya que no se muestra al hacer zoom */}
          <picture>
            <img
              src="/src/assets/icons/icon-main.svg"
              alt="logotipo de la empresa Recom"
              className="w-[400px]"
            />
          </picture>
        </section>
      </main>
    </>
  );
}

export default RestorePassword;
