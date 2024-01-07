import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buscarCliente } from "../../../services/Cliente";
import Profile from "../Profile";

function Header() {
  const location = useLocation();
  const [tituloHeader, setTituloHeader] = useState("");

  const titulosRuta = {
    "/clientes": "Clientes",
    "/trabajadores": "Trabajadores",
    "/trabajos": "Trabajos",
  };

  useEffect(() => {
    setTituloHeader(titulosRuta[location.pathname] || "Home");
  });

  return (
    <>
      <main className="flex flex-row items-center font-sans bg-white p-[15px] justify-between w-full">
        <p className="text-[#152034] text-[25px] font-bold ml-3">
          {tituloHeader}
        </p>

        <Profile />
      </main>
    </>
  );
}

export default Header;
