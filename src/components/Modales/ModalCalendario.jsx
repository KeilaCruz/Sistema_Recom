import React from "react";

export function ModalCalendario({ onClose, orden, verOrden }) {
  return (
    <dialog className="absolute inset-0 flex justify-center items-center z-10 w-[400px]">
      <section className="flex flex-col justify-center items-center bg-[#3B315F] p-5 rounded ">
        <article key={orden.idorden}>
          <p className="text-colorSecundario bg-white px-3 py-1 rounded  text-[18px] mt-4">
            Número de orden: {orden.idorden}
          </p>
          <p className="text-white text-[18px] mt-4 text-pretty">
            Cliente: {orden.nombre_c} {orden.apepaterno_c} {orden.apematerno_c}
          </p>
          <p className="text-white text-[18px] mt-4">
            Detalles del trabajo: {orden.especificacion}
          </p>
        </article>

        <section className="flex gap-4">
          <button
            onClick={verOrden}
            className="text-[#3B315F] text-[18px] mt-4 px-4 bg-white py-2 rounded hover:bg-gray-200"
          >
            Ver completo
          </button>

          <button
            onClick={onClose}
            className="text-white text-[18px] mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-400"
          >
            Cerrar
          </button>
        </section>
      </section>
    </dialog>
  );
}
