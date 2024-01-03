import React, { useState } from "react";

function CardDatosCliente({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <p>Cargando datos del cliente...</p>;
  }

  return (
    <>
      <details className="bg-colorSecundario gap-[15px] font-sans text-white p-[20px] rounded-[5px] ">
        <summary className="flex gap-3">
          <p className="text-[18px] font-medium ">Datos del cliente</p>
        </summary>

        <section className="flex flex-row items-center font-sans">
          <article className="text-white flex flex-col mt-5 gap-5">
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
