import React, { useState } from "react";
import { Link } from "react-router-dom";

const TablaDatosCliente = ({ data, nombreColumna, nombre }) => {
  const [hoverRow, setHoverRow] = useState(null);
  const handleMouseEnter = (idCliente) => {
    setHoverRow(idCliente);
  };

  const handleMouseLeave = () => {
    setHoverRow(null);
  };

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
    <main className="flex flex-col justify-center items-center">
      <section className="mb-3 overflow-hidden shadow rounded-[5px] w-full">
        <table className="w-full text-left ">
          <thead className=" text-white ">
            <tr className="bg-colorMain">
              <th className="px-3 w-1/10 ">No. Cliente</th>
              <th className="px-3 py-3 w-1/4">Nombre</th>
              <th className="px-3 py-3">Apellido Paterno</th>
              <th className="px-3 py-3">Apellido Materno</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((cliente) => (
              <tr
                key={cliente.idcliente}
                className="font-sans font-normal text-[15px] border-b-[1px] border-black bg-white hover:bg-colorMain hover:text-white"
              >
                <td className="px-3 py-3 ">{cliente.idcliente}</td>
                <td className="px-3 py-3 ">{cliente.nombre_cliente}</td>
                <td className="px-3 py-3 ">{cliente.apepaterno}</td>
                <td className="px-3 py-3 ">{cliente.apematerno}</td>
                <td
                  className="px-2 py-2 "
                  onMouseEnter={() => {
                    handleMouseEnter(cliente.idcliente);
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={`/detalle-cliente/${cliente.idcliente}`}
                    className=""
                  
                  >
                    <img
                      src={
                        hoverRow === cliente.idcliente
                          ? "/src/assets/icons/active/detailsActive-icon.svg"
                          : "/src/assets/icons/go-details-icon.svg"
                      }
                      alt="icono para ver más detalles del cliente"
                      className="cursor-pointer h-[30px]"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex flex-row items-center justify-center font-sans bg-colorMain p-[5px] w-max rounded-[5px]">
        <button
          onClick={handlePaginaAnterior}
          className={`py-2 px-4  text-white mr-2 disabled:bg-[#15203499] rounded-full  ${
            pestañaActual === 1 ? "invisible" : "visible"
          }`}
        >
          <img
            src="/src/assets/icons/back-pagination-icon.svg"
            alt="icono de pagina anterior"
          />
        </button>
        <section>
          <p className="mt-2 text-white">
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
        <button
          onClick={handleSiguientePagina}
          className={`py-2 px-4 text-white mr-2 disabled:bg-[#15203499] rounded-full disabled:cursor-not-allowed ${
            pestañaActual === totalPaginas ? "invisible" : "visible"
          }`}
        >
          <img
            className="rotate-180"
            src="/src/assets/icons/back-pagination-icon.svg"
            alt="icono de pagina anterior"
          />
        </button>
      </section>
    </main>
  );
};

export default TablaDatosCliente;
