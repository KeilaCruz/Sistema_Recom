import React, { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const abrirDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
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
    </>
  );
}

export default Profile;
