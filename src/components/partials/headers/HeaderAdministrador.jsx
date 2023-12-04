import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function HeaderAdministrador({ placeholder }) {
  const location = useLocation();
  const [tituloHeader, setTituloHeader] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const titulosRuta = {
    "/clientes": "Clientes",
    "/trabajadores": "Trabajadores",
    "/trabajos": "Trabajos",
  };

  const abrirDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    setTituloHeader(titulosRuta[location.pathname] || "Home");
  }, [location]);

  return (
    <>
      <main className="flex flex-row items-center font-sans bg-white p-[15px] justify-between w-full">
        <p className="text-[#152034] text-[25px] font-bold ml-3">
          {tituloHeader}
        </p>
        <section className="flex items-center ">
          <img
            src="/src/assets/icons/search-icon.svg"
            alt="icono de busqueda"
            className="absolute ml-3"
          />
          <input
            type="search"
            placeholder={placeholder}
            className="gap-[20px] rounded-[10px] border-colorMain border-[2px] w-[600px] py-[10px] pr-[10px] pl-[45px] text-[20px]  focus:border-colorMain
            focus:outline-none focus:ring-1 focus:ring-colorMain"
          />
        </section>

        <article className="profile flex gap-[10px] items-center mr-3">
          <img
            src="/src/assets/icons/profile-user.svg"
            alt="icono de usuario del sistema"
            className="w-[40px]"
          />
          <button onClick={abrirDropdown}>
            {dropdownOpen ? (
              <>
                <section className="absolute flex flex-col bg-black p-[10px]  ">

                </section>
              </>
            ) : (
              <>
                <img
                  src="/src/assets/icons/down-arrow-dropdown.svg"
                  alt="icono de flecha abajo para abrir dropdown"
                  className="w-[20px]"
                />
              </>
            )}
          </button>
        </article>
      </main>
    </>
  );
}

export default HeaderAdministrador;
