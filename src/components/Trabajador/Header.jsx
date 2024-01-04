import React from "react";
import Profile from "./Profile";

function Header() {
  return (
    <>
      <nav className="bg-colorMain flex flex-row items-center justify-between p-[20px] w-full">
        <section className="flex items-center gap-5 ">
          <img
            src="/src/assets/icons/icon-main.svg"
            alt="icono del logo de la empresa"
            className="h-[30px"
          />
          <p className="text-white font-bold text-[20px]">RECOM Taller de Soldadura y Torneria</p>
        </section>

        <article >
          <Profile />
        </article>
      </nav>
    </>
  );
}

export default Header;
