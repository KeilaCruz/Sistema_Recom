import React from "react";

function HeaderAdministrador() {
  return (
    <>
      <main className="flex flex-row items-center font-sans bg-white p-[15px] justify-between ">
        <p className="text-[#152034] text-[25px] font-bold ml-3">HOME</p>
        <section className="flex items-center ">
          <img
            src="/src/assets/icons/search-icon.svg"
            alt="icono de busqueda"
            className="absolute ml-3"
          />
          <input
            type="search"
            placeholder="Buscar orden de trabajo, trabajador, cliente ..."
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
          <button>
            <img
              src="/src/assets/icons/down-arrow-dropdown.svg"
              alt="icono de flecha abajo para abrir dropdown"
              className="w-[20px]"
            />
          </button>
        </article>
      </main>
    </>
  );
}

export default HeaderAdministrador;
