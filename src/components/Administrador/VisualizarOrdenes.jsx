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

export function VisualizarOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [criterioBusqueda, setCriterioBusqueda] = useState("");
  const [resultBusqueda, setResultBusqueda] = useState([]);
  const [idOrden, setIdOrden] = useState(null);
  const [fechaOrden, setFechaOrden] = useState(null);
  const [nombreCliente, setNombre] = useState(null);
  const [apePaterno, setApePaterno] = useState(null);
  const [apeMaterno, setApeMaterno] = useState(null);

  const [seleccionado, setSeleccionado] = useState("Todos");
  const [hoverRow, setHoverRow] = useState(null);

  const validarCriterioBusqueda = (criterioB) => {
    const criterioBRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9\s]{1,120}$/;

    return criterioBRegex.test(criterioB);
  };

  const handleMouseEnter = (idorden) => {
    setHoverRow(idorden);
  };

  const handleMouseLeave = () => {
    setHoverRow(null);
  };

  let numberReg = /^\d+$/;
  let dateReg = /^\d{4}[-]\d{2}[-]\d{2}$/;
  let nombreReg = /^\D+$/;

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

  useEffect(() => {
    if (criterioBusqueda.trim() !== "") {
      handleBusqueda();
    }
  }, [criterioBusqueda]);

  const handleBusqueda = async () => {
    const validacionBusqueda = validarCriterioBusqueda(criterioBusqueda);
    if (validacionBusqueda) {
      const isNumOrden = numberReg.test(criterioBusqueda);
      const isFecha = dateReg.test(criterioBusqueda);
      const isName = nombreReg.test(criterioBusqueda);

      if (isNumOrden) {
        const num_orden = parseInt(criterioBusqueda);
        setIdOrden(num_orden);
        setFechaOrden(null);
        setNombre(null);
        setApePaterno(null);
        setApeMaterno(null);
      } else if (isFecha) {
        setIdOrden(null);
        setFechaOrden(criterioBusqueda);
        setNombre(null);
        setApePaterno(null);
        setApeMaterno(null);
      } else if (isName) {
        const nombres = criterioBusqueda.split(" ");
        setIdOrden(null);
        setFechaOrden(null);
        setNombre(nombres[0]);
        setApePaterno(nombres[1]);
        setApeMaterno(nombres[2]);
      }
    } else {
      toast.error("No es un criterio de búsqueda");
    }
  };

  const handleBuscar = async () => {
    let resultado = await buscarOrden(
      idOrden,
      fechaOrden,
      nombreCliente,
      apePaterno,
      apeMaterno
    );
    setResultBusqueda(resultado);
    if (!Array.isArray(resultado) || resultado.length === 0) {
      toast.error("No se encontraron resultados");
    }
  };

  return (
    <>
      <main className="flex flex-col h-auto">
        <section className="busqueda flex flex-row gap-3 items-center">
          <input
            className="inputs"
            id="barra_busqueda"
            placeholder="Núm orden: 123, Fecha solicitud: 0000-00-00, Nombre: Lucas Cruz Romero"
            onChange={(evt) => setCriterioBusqueda(evt.target.value)}
          />
          <button className="boton_busqueda" onClick={handleBuscar}>
            Buscar
          </button>
        </section>
        <article className="flex flex-row flex-wrap gap-8 mt-5">
          {resultBusqueda &&
            resultBusqueda.map((orden) => (
              <>
                <div key={orden.ordentrabajo}>
                  <CardBusquedaOrden orden={orden} />
                </div>
              </>
            ))}
        </article>

        <section className="options mt-10 flex flex-row gap-4">
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
                    <td className="trabajos_pendientes ">Pendiente</td>
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
