import React, { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const abrirDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <Link className="bg-white rounded flex flex-row gap-3 items-center justify-center font-sans font-medium p-[10px] hover:bg-gray-100">
        <img
          src="/src/assets/icons/profile-user.svg"
          alt="icono de usuario del sistema"
          className="w-[40px]"
        />

        <p className="text-[18px]">Mi cuenta</p>
      </Link>
    </>
  );
}

export default Profile;
