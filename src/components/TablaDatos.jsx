import React, { useState } from "react";



const TablaDatos = ({ data }) => {



  const [pestañaActual, setPestañaActual] = useState(1);
  const itemsPagina = 8;

  const ultimoIndice = pestañaActual * itemsPagina;
  const primerIndice = ultimoIndice - itemsPagina;
  const currentItems = data.slice(primerIndice, ultimoIndice);

  const totalPaginas = Math.ceil(data.length / itemsPagina);

  

  const handleSiguientePagina = () => {
    setPestañaActual((prevPage) => prevPage + 1);
  };

  const handlePaginaAnterior = () => {
    setPestañaActual((prevPage) => prevPage - 1);
  };

  return (
    <main>
      <section className="mb-4">
        <table className="w-full text-left shadow">
          <thead className="bg-colorMain text-white sticky">
            <tr>
              <th className="p-[10px] rounded-l-[5px]">No. Cliente</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th className="p-[10px] rounded-r-[5px]"></th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((cliente) => (
              <tr
                key={cliente.idcliente}
                className="font-sans font-normal text-[15px] border-b-[1px] border-black bg-white "
              >
                <td className="p-[10px] ">{cliente.idcliente}</td>
                <td>{cliente.nombre_cliente}</td>
                <td>{cliente.apepaterno}</td>
                <td>{cliente.apematerno}</td>
                <td>
                  <img
                    src="/src/assets/icons/go-details-icon.svg"
                    alt="icono para ver más detalles del cliente"
                    className=""
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="sm:hidden">
        <button
          onClick={handlePaginaAnterior}
          disabled={pestañaActual === 1}
          className="py-2 px-4 bg-colorMain text-white rounded mr-2 disabled:bg-[#15203499] disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={handleSiguientePagina}
          disabled={pestañaActual === totalPaginas}
          className="py-2 px-4 bg-colorMain text-white rounded disabled:bg-[#15203499] disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </section>

      <section className="flex flex-row justify-between items-center font-sans bg-white p- ">
        <section>
          <p className="mt-2 ">
            Mostrando{" "}
            <span className="font-medium">
              {(pestañaActual - 1) * itemsPagina + 1}
            </span>{" "}
            a{" "}
            <span className="font-medium">
              {Math.min(pestañaActual * itemsPagina, data.length)}
            </span>{" "}
            resultados de <span className="font-medium">{data.length}</span>{" "}
            clientes
          </p>
        </section>
        <section>
          <button
            onClick={handlePaginaAnterior}
            disabled={pestañaActual === 1}
            className="py-2 px-4 bg-colorMain text-white rounded mr-2 disabled:bg-[#15203499] disabled:cursor-not-allowed"
          >
            <img
              src="/src/assets/icons/back-pagination-icon.svg"
              alt="icono de pagina anterior"
            />
          </button>
          <button
            onClick={handleSiguientePagina}
            disabled={pestañaActual === totalPaginas}
            className="py-2 px-4 bg-colorMain text-white rounded disabled:bg-[#15203499] disabled:cursor-not-allowed"
          >
            <img
              className="rotate-180"
              src="/src/assets/icons/back-pagination-icon.svg"
              alt="icono de pagina anterior"
            />
          </button>
        </section>
      </section>
    </main>
  );
};

export default TablaDatos;
