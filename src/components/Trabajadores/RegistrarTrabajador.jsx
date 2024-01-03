import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { registrarTrabajador } from "../../services/Trabajador";
import Sidebar from "../partials/Sidebar";
import HeaderPestaña from "../partials/headers/HeaderPestaña";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import ErrorInput from "../partials/ErrorInput";
import AcceptButton from "../buttons/AcceptButton";
import CancelButton from "../buttons/CancelButton";
import ModalCancelar from "../Modales/ModalCancelar";

function RegistrarTrabajador() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate()

  const handleMostrarModal = () => {
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };



  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
  } = useForm();

  const selectedValue = watch("tipo_trabajador");
  const validarNombreCompleto = (nombreoApellido) => {
    const nombreCompletoRegex = /^[A-Za-zÁÉÍÓÚáéíóúü\s]{1,40}$/;

    return nombreCompletoRegex.test(nombreoApellido);
  };

  const onSubmit = handleSubmit(async (data) => {
    const nombreValido = validarNombreCompleto(data.nombre);
    const apePaternoValido = validarNombreCompleto(data.apepaterno);
    const apeMaternoValido = validarNombreCompleto(data.apematerno);

    if (!nombreValido) {
      toast.error("El nombre debe incluir máximo 40 letras");
    } else if (!apePaternoValido) {
      toast.error("El apellido paterno debe incluir máximo 40 letras");
    } else if (!apeMaternoValido) {
      toast.error("El apellido materno debe incluir máximo 40 letras");
    } else {
      try {
        const registrado = registrarTrabajador(data);
        if (registrado != null) {
          alert("Se ha registerado el trabajador");
        }
      } catch (e) {
        console.error("Error al crear trabajador: " + e);
      }
    }
  });

  return (
    <>
      <main className="flex h-screen w-full bg-colorFondo">
        <aside className="fixed h-full">
          <Sidebar />
        </aside>
        <section className="flex flex-col w-full h-auto ml-[289px]">
          <HeaderPestaña
            nombrePestaña="Nuevo trabajador"
            srcIcon="/src/assets/icons/active/trabajadoresActive-icon.svg"
            descripcionImagenPestaña="icono de trabajador"
          />

          <section className="bg-white p-[40px] mx-[70px] my-[30px] flex flex-col  font-sans shadow rounded-[5px] ">
            <form onSubmit={onSubmit}>
              <ul className="flex flex-col gap-[30px]">
                <p className="font-semibold underline text-colorSecundario">
                  DATOS DEL TRABAJADOR
                </p>
                <li className="flex flex-row items-center gap-[100px]">
                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Nombre
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="text"
                      placeholder="Ingresa el nombre del trabajador "
                      {...register("nombre", { required: true })}
                    />
                    {errors.nombre && (
                      <>
                        <ErrorInput nombre="El nombre" />
                      </>
                    )}
                  </article>

                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Tipo de trabajador
                    </label>
                    <select
                      id="tipoTrabajador"
                      {...register("tipo_trabajador", { required: true })}
                      className={`px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px] ${
                        dirtyFields.tipo_trabajador
                          ? "bg-colorSecundario text-white"
                          : ""
                      }`}
                    >
                      <option value="" disabled selected hidden>
                        Elija una opción
                      </option>
                      <option
                        value={1}
                        className="bg-colorSecundario text-white  text-[16px]"
                      >
                        Tornero
                      </option>
                      <option
                        value={2}
                        className="bg-colorSecundario text-white  text-[16px]"
                      >
                        Soldador
                      </option>
                      <option
                        value={3}
                        className="bg-colorSecundario text-white  text-[16px]"
                        z
                      >
                        Ayudante
                      </option>
                    </select>
                    {errors.tipo_trabajador && (
                      <>
                        <ErrorInput nombre="El tipo de trabajador" />
                      </>
                    )}
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
                      {...register("apellidoPaterno", { required: true })}
                    />
                    {errors.apellidoPaterno && (
                      <>
                        <ErrorInput nombre="El apellido paterno" />
                      </>
                    )}
                  </article>

                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Apellido Materno
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="text"
                      placeholder="Ingresa el apellido materno del trabajador "
                      {...register("apellidoMaterno", { required: true })}
                    />
                    {errors.apellidoMaterno && (
                      <>
                        <ErrorInput nombre="El apellido materno" />
                      </>
                    )}
                  </article>
                </li>
                <p className="font-semibold underline text-colorSecundario ">
                  DATOS DE CUENTA DEL TRABAJADOR
                </p>
                <li className="flex flex-row items-center gap-[100px]">
                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Correo Electrónico
                    </label>
                    <input
                      className="px-[10px] py-[8px] mt-2 rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="text"
                      placeholder="Ingresa el apellido materno del trabajador "
                      {...register("correo", { required: true })}
                    />
                    {errors.correo && (
                      <>
                        <ErrorInput nombre="El correo" />
                      </>
                    )}
                  </article>

                  <article className="flex flex-col">
                    <label className="text-colorSecundario font-medium">
                      Contraseña del trabajador
                    </label>

                    <input
                      className="px-[10px] py-[8px] rounded-[5px] border-[1px] border-colorSecundario focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F] text-colorSecundario w-[400px]"
                      type="password"
                      placeholder="***********"
                      {...register("contraseña", { required: true })}
                    />
                    {errors.contraseña && (
                      <>
                        <ErrorInput nombre="La contraseña" />
                      </>
                    )}
                  </article>
                </li>
              </ul>
            </form>
            <article className="mt-5 flex flex-row gap-[20px]">
              <AcceptButton label="Registrar" onClick={onSubmit} />
              <CancelButton label="Cancelar" onClick={handleMostrarModal} />
            </article>
            {mostrarModal && (
              <>
                <ModalCancelar mostrar={mostrarModal} onClose={handleCerrarModal} text="¿Estas seguro cancelar el registo del trabajador?"/>
              </>
            )}
          </section>
        </section>
      </main>
    </>
  );
}

export default RegistrarTrabajador;
