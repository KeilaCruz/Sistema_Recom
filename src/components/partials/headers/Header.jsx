import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buscarCliente } from "../../../services/Cliente";
import Profile from "../Profile";




function Header({ placeholder }) {
  const location = useLocation();
  const [tituloHeader, setTituloHeader] = useState("");

  const { register, handleSubmit } = useForm();


  const titulosRuta = {
    "/clientes": "Clientes",
    "/trabajadores": "Trabajadores",
    "/trabajos": "Trabajos",
  };

 

  const onSubmit = handleSubmit(async (data) => {
    const resultados = await buscarCliente(data.busqueda);
    console.log(resultados);

  });

  const handlePressEnterKey = (evt) => {
    if ((evt.ket = "enter")) {
      onSubmit();
    }
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
          <section className="flex items-center ">
            <img
              src="/src/assets/icons/search-icon.svg"
              alt="icono de busqueda"
              className="absolute ml-3"
            />
            <input
              type="text"
              placeholder={placeholder}
              onKeyDown={handlePressEnterKey}
              {...register("busqueda")}
              className="gap-[20px] rounded-[10px] border-colorMain border-[2px] w-[600px] py-[10px] pr-[10px] pl-[45px] text-[20px]  focus:border-colorMain
            focus:outline-none focus:ring-1 focus:ring-colorMain"
            />
          </section>

          <article className="profile  mr-3">
            <Profile/>
          </article>
        </main>
      </>

  );
}

export default Header;
