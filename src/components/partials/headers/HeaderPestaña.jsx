import React from "react";
import {useNavigate} from "react-router-dom";
import Profile from '../Profile'

function HeaderPestaña({
  srcIcon,
  descripcionImagenPestaña,
  nombrePestaña,
}) {
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };
  return (
    <>
      <header className="flex flex-row justify-between items-center bg-white font-sans p-[20px]">
        <section className="flex gap-[20px]">
          <img
            src="/src/assets/icons/backpage-icon.svg"
            alt="icono para regresar a página anterior"
            onClick={regresar}
            className="h-[30px] cursor-pointer"
          />

          <article className="items-center flex gap-[10px]">
            <img
              src={srcIcon}
              alt={descripcionImagenPestaña}
              className="h-[30px]"
            />
            <p className="text-colorMain font-semibold text-[18px]">{nombrePestaña}</p>
          </article>
        </section>

        <article className="profile">
            <Profile/>
        </article>
      </header>
    </>
  );
}

export default HeaderPestaña;
