import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import HeaderPestaña from "../partials/headers/HeaderPestaña";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabase/connection";
import {toast} from 'react-hot-toast'

import CancelButton from "../buttons/CancelButton";
import AcceptButton from "../buttons/AcceptButton";

import {
  actualizarContraseña,
  actualizarCorreo,
} from "../../services/Auth/Autenticación";

function MyProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [session, setSession] = useState(null);
  const [emailUser, setEmailUser] = useState(null);
  const [activateEdit, setActivateEdit] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setEmailUser(session.user.email);
    });
  }, []);

  const handleActivateEdit = () => {
    setActivateEdit(!activateEdit);
  };

  const onSubmit = handleSubmit(async (data) => {
    const { contraseña } = data;

    const actualizarContraseña = await actualizarCorreo(contraseña);

    if (actualizarContraseña) {
      toast.success("Se cambio la contraseña correctamente")
    }
  });

  return (
    <>
      <main className="flex flex-row bg-colorFondo w-auto">
        <aside className="fixed h-full">
          <Sidebar />
        </aside>

        <section className="flex flex-col w-full h-auto ml-[289px]">
          <header>
            <HeaderPestaña
              srcIcon="/src/assets/icons/profile-user.svg"
              showPerfil=""
              descripcionImagenPestaña="icono de perfil"
              nombrePestaña="Mi cuenta"
            />
          </header>

          <section className="bg-white p-[40px] mx-[70px] my-[30px] rounded-[5px]">
            <p className="text-colorMain  uppercase font-sans font-bold text-[20px]">
              Mi cuenta
            </p>

            <form className="flex flex-col mt-5" onSubmit={onSubmit}>
              <section className="flex flex-row gap-[100px] ">
                <article className="flex font-medium gap-3 items-center">
                  <label className="text-[18px]">Correo: </label>
                  <input
                    className="font-normal  bg-white text-colorSecundario px-2 py-1 rounded-[5px] border border-colorSecundario focus:border-2 focus:border-colorSecundario  w-[250px] h-[36px] text-[16px]  focus:outline-none focus:ring-1 focus:ring-[#3B315F] "
                    {...register("correo")}
                    type="text"
                    disabled={!activateEdit}
                    value={emailUser}
                  />
                </article>

                <article className="flex font-medium gap-3 items-center">
                  <label className="text-[18px]">Contraseña: </label>
                  <input
                    placeholder="**********"
                    className="font-normal  bg-white text-colorSecundario px-2 py-1 rounded-[5px] border border-colorSecundario focus:border-2 focus:border-colorSecundario  w-[250px] h-[36px] text-[16px]  focus:outline-none focus:ring-1 focus:ring-[#3B315F] "
                    {...register("contraseña")}
                    type="password"
                    disabled={!activateEdit}
                  />
                </article>
              </section>
            </form>

            <section className="flex flex-row gap-6 mt-4">
              {activateEdit ? (
                <>
                  <AcceptButton label="Aceptar" onClick={onSubmit} />
                  <CancelButton
                    label="Cancelar"
                    onClick={() => {
                      setActivateEdit(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <button
                    className="bg-colorMain p-2 rounded-[5px] w-[100px] font-sans font-medium text-white hover:bg-[#1d2c46]"
                    onClick={handleActivateEdit}
                  >
                    Editar
                  </button>
                </>
              )}
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

export default MyProfile;
