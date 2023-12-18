import React from "react";
import Sidebar from "../partials/Sidebar";

function AgregarCliente() {
  return (
    <>
      <main className="h-screen w-screen flex flex-row bg-colorFondo">
        <section className="fixed h-full">
          <Sidebar />
        </section>

        <section className="flex flex-col w-full h-auto ml-[289px]">
          <nav className="flex items-center justify-beetween bg-white">
            <section className="flex items-center">
              <img
                src="/src/assets/icons/backpage-icon.svg"
                alt="icono para regresar a página principal "
              />
              <article className="flex items-center">
                <img
                  src="/src/assets/icons/active/clientesActive-icon.svg"
                  alt="icono de agregar cliente"
                />
                <p>Nuevo Cliente</p>
              </article>
            </section>

            <section>
                
            </section>
          </nav>
        </section>
      </main>
    </>
  );
}

export default AgregarCliente;
