import React, { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const abrirDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <article className="">
        <button
          onClick={abrirDropdown}
          className="flex flex-row gap-[10px] items-center hover:bg-gray-200 rounded-[5px] px-2 py-1 "
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
            <Link
              className="absolute z-10 flex flex-col bg-colorMain text-white p-[10px] mt-[5px] rounded-[5px] max-w-[200px] right-0 mr-[20px] hover:opacity-80 cursor-pointer"
              to="/mi-perfil"
            >Mi Cuenta</Link>
          </>
        )}
      </article>
    </>
  );
}

export default Profile;
