import React, { useState } from "react";
import Header from "../partials/headers/HeaderLogin";
import { actualizarContraseña } from "../../services/Auth/Autenticación";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ModalExito from "../Modales/ModalExito";

function NuevaContraseña() {
  const navigate = useNavigate();
  const [actualizado, setActualizado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleMostrarModal = () => {
    setMostrarModal(true); 
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };
  
  const regresar = () => {
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { contraseña } = data;
    const actualizar = await actualizarContraseña(contraseña);

    if (actualizar) {
      setActualizado(!actualizado);
    }
  });

  return (
    <>
      <main className="flex flex-col">
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
            <p className="text-[40px] text-[#3B315F] font-semibold">
              Actualiza tu contraseña
            </p>
            <section className="flex flex-col p-[30px] mt-[30px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[737px] h-[363] ">
              <form className="flex flex-col gap-[20px]">
                <div className="flex flex-col ">
                  <label
                    htmlFor="nueva contraseña"
                    className="font-semibold text-[25px] text-[#152034]"
                  >
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className={`text-[22px] text-[#3B315F] mt-3 rounded p-[10px] w-[500px] border-[1px] border-[#3B315F] ${
                      errors.contraseña &&
                      "focus:border-[#C71111] focus:ring-[#C71111]  focus:outline-none "
                    } focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F]`}
                    {...register("contraseña", { required: true })}
                  />
                </div>
                <div className="flex flex-col ">
                  <label
                    htmlFor="confirmar nueva contraseña"
                    className="font-semibold text-[25px] text-[#152034]"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Confirma tu nueva contraseña"
                    className={`text-[22px] text-[#3B315F] mt-3 rounded p-[10px] w-[500px] border-[1px] border-[#3B315F] ${
                      errors.contraseñaConfirmada &&
                      "focus:border-[#C71111] focus:ring-[#C71111]  focus:outline-none "
                    } focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F]`}
                    {...register("contraseñaConfirmada", { required: true })}
                  />
                </div>
                {/*{errors.correo && (
                  <>
                    <span className="text-[22px] text-[#C71111] font-medium font-sans">
                      Se debe ingresar un correo electrónico
                    </span>
                  </>
                )} */}
              </form>
              <button
                className="mt-[20px] text-white bg-[#3B315F] rounded-[5px] p-[10px] font-sans font-medium text-[22px] w-[500px] hover:bg-[#2f274d]"
                onClick={handleMostrarModal}
              >
                Actualizar
              </button>
              {mostrarModal && (
                <>
                  <ModalExito
                    mostrar={mostrarModal}
                    onClose={handleCerrarModal}
                  >
                    <p className="uppercase'">Tu contraseña se actualizo correctamente</p>
                    <p>En un momento serás redirigido a la página de logueo.</p>
                  </ModalExito>
                </>
              )}
            </section>
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

export default NuevaContraseña;
