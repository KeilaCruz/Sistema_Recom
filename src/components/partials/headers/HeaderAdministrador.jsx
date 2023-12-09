import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown, Button } from "flowbite-react";

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

        <article className="profile  mr-3">
          <button
            onClick={abrirDropdown}
            className="flex flex-row gap-[10px] items-center"
          >
            <img
              src="/src/assets/icons/profile-user.svg"
              alt="icono de usuario del sistema"
              className="w-[40px]"
            />
            {dropdownOpen ? (
              <>
                <img
                  src="/src/assets/icons/down-arrow-dropdown.svg"
                  alt="icono de flecha abajo para abrir dropdown"
                  className="w-[20px] "
                />
              </>
            ) : (
              <>
                <img
                  src="/src/assets/icons/down-arrow-dropdown.svg"
                  alt="icono de flecha abajo para abrir dropdown"
                  className="w-[20px] rotate-180"
                />
              </>
            )}
          </button>

          {dropdownOpen && (
            <>
              <section className="absolute z-10 flex flex-col bg-colorMain p-[10px] mt-[5px] rounded-[5px] max-w-[200px] right-0 mr-[20px]">
                <Link to="/mi-perfil" className="text-white">
                  Mi cuenta
                </Link>
                <hr className="mt-2" />
                <Link
                  to="/setting"
                  className="text-white font-sans flex flex-row gap-[10px]"
                >
                  <div className="bg-white">
                  <img
                    src="/src/assets/icons/active/trabajadoresActive-icon.svg"
                    alt="icono de usuario del sistema"
                    className=""
                  />
                  </div>
                  Configuracion
                </Link>
              </section>
            </>
          )}
        </article>
      </main>
    </>
  );
}

export default HeaderAdministrador;
