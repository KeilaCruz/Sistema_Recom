import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  buscarOrden,
  getAllOrdenTrabajo,
  getOrdenActivas,
  getOrdenEntregada,
} from "../../services/OrdenTrabajo";
import { Link } from "react-router-dom";
import { CardBusquedaOrden } from "./CardBusquedaOrden";
import SearchBar from "../partials/SearchBar";

export function VisualizarOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [seleccionado, setSeleccionado] = useState("Todos");
  const [hoverRow, setHoverRow] = useState(null);

  const handleMouseEnter = (idorden) => {
    setHoverRow(idorden);
  };

  const handleMouseLeave = () => {
    setHoverRow(null);
  };

  useEffect(() => {
    async function loadOrdenes() {
      let res;
      if (filtro === "Todos") {
        res = await getAllOrdenTrabajo();
      } else if (filtro === "Pendientes") {
        res = await getOrdenActivas();
      } else if (filtro === "Entregado") {
        res = await getOrdenEntregada();
      }
      setOrdenes(res);
    }
    loadOrdenes();
  }, [filtro]);

  const handleFiltro = (filtro) => {
    setFiltro(filtro);
    setSeleccionado(filtro);
  };

  return (
    <>
      <main className="flex flex-col h-auto">
        <section className="options mt-3 flex flex-row gap-4">
          <button
            className={`${
              seleccionado === "Todos" ? "boton_seleccionado" : "boton_filtrado"
            }`}
            onClick={() => handleFiltro("Todos")}
          >
            Todos
          </button>
          <button
            className={`${
              seleccionado === "Pendientes"
                ? "boton_seleccionado"
                : "boton_filtrado"
            }`}
            onClick={() => handleFiltro("Pendientes")}
          >
            Pendientes
          </button>
          <button
            className={`${
              seleccionado === "Entregado"
                ? "boton_seleccionado"
                : "boton_filtrado"
            }`}
            onClick={() => handleFiltro("Entregado")}
          >
            Entregado
          </button>
        </section>

        <section className="mt-5 mb-6 shadow-md rounded bg-white overflow-hidden">
          <table className="text-left w-full">
            <thead className="text-white font-medium ">
              <tr className="bg-colorMain">
                <td className="px-3 w-[15%] ">Orden de trabajo</td>
                <td className="px-3 py-3 w-[20%]">Trabajador</td>
                <td className="px-3 py-3 w-[20%]">Fecha entrega</td>
                <td className="px-3 py-3 w-[10%]">Estado</td>
                <td className="px-3 py-3 w-[5%]"></td>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr
                  key={orden.ordentrabajo}
                  className="font-sans font-normal text-[15px] border-b-[1px] border-black bg-white group hover:bg-colorMain hover:text-white"
                >
                  <td className="px-3 py-3">{orden.ordentrabajo}</td>
                  <td className="px-3 py-3">{orden.nomtrabajadores[0]}</td>
                  <td className="px-3 py-3">{orden.fechaentrega}</td>
                  {orden.estado_o ? (
                    <td className="hover:bg-colorMain hover:text-white trabajos_pendientes ">
                      Pendiente
                    </td>
                  ) : (
                    <td className="trabajos_entregados ">Entregado</td>
                  )}

                  <td
                    onMouseEnter={() => {
                      handleMouseEnter(orden.ordentrabajo);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={`/visualizar-orden/${orden.ordentrabajo}`}
                      className=""
                    >
                      <img
                        src={
                          hoverRow === orden.ordentrabajo
                            ? "/src/assets/icons/active/detailsActive-icon.svg"
                            : "/src/assets/icons/go-details-icon.svg"
                        }
                        alt="icono para ver más detalles del trabajo"
                        className="cursor-pointer h-[30px] group-hover:saturate-200 group-hover:brightness-200"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
