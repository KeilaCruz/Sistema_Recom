import React from "react";

function HeaderAdministrador() {
  return (
    <>
      <main className="flex flex-row font-sans ">
        <p className="text-[#152034] text-[35px] font-bold">HOME</p>
        <section>
          <img src="/src/assets/icons/search-icon.svg" alt="icono de busqueda" />
          <input
            type="search"
            placeholder="Buscar orden de trabajo, trabajador, cliente ..."
            className="gap-[20px] rounded-[10px]"
          />
        </section>

        <article className="profile flex gap-[10px] items-center">
          <img src="/src/assets/icons/profile-user.svg" alt="icono de usuario del sistema" />
          <img src="/src/assets/icons/down-arrow-dropdown.svg" alt="icono de flecha abajo para abrir dropdown" />
        </article>
      </main>
    </>
  );
}

export default HeaderAdministrador;
