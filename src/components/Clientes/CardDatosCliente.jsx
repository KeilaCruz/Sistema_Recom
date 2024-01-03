import React, { useState } from "react";

function CardDatosCliente({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!data || Object.keys(data).length === 0) {
    return <p>Cargando datos del cliente...</p>;
  }

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <details
        className="bg-colorSecundario gap-[15px] font-sans text-white rounded-[5px] px-4 py-4"
        onClick={toggleDetails}
        open={true}
      >
        <summary className="flex flex-row items-center justify-between cursor-pointer">
          <p className="text-[18px] font-medium ">Datos del cliente</p>

          <img
            src="/src/assets/icons/active/detailsActive-icon.svg"
            alt="icono para bajar dropdown"
            className={`${isOpen ? "rotate-90" : "-rotate-90"}`}
          />
        </summary>

        <section className="flex flex-row items-center font-sans">
          <article className="text-white flex flex-col mt-5 gap-5 ">
            <li className="flex flex-row gap-10 items-center">
              <p className="text-[16px]">
                <strong>Nombre</strong>: {data[0].nombre}
              </p>
              <p className="text-[16px]">
                <strong>Apellido Paterno</strong>: {data[0].ape_paterno}
              </p>
              <p className="text-[16px]">
                <strong>Apellido Materno</strong>: {data[0].ape_materno}
              </p>
              <p className="text-[16px]">
                <strong>Correo</strong>: {data[0].correo}
              </p>
              <p className="text-[16px]">
                <strong>Telefono</strong>: {data[0].telefono}
              </p>
            </li>
          </article>
        </section>
      </details>
    </>
  );
}

export default CardDatosCliente;
