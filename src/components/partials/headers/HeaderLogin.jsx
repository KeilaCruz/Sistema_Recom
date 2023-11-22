import React from "react";
import { Link } from "react-router-dom";

function HeaderLogin() {
  return (
    <>
      <main className="flex flex-row bg-[#152034] w-screen p-[20px] gap-[30px]  items-center justify-between font-sans">
        <Link to="/login" className="flex items-center gap-[40px]">
          <picture>
            <img
              src="/src/assets/icons/icon-main.svg"
              alt="logotipo de empresa RECOM"
            />
          </picture>
          <p className="text-white text-[22px]">RECOM Taller y Soldadura</p>
        </Link>

        <section className="flex gap-[50px]">
          <Link to="/contacto" className="text-white text-[22px]">
            Contacto
          </Link>
          <Link to="/faq" className="text-white text-[22px]">
            FAQ
          </Link>
        </section>
      </main>
    </>
  );
}

export default HeaderLogin;
