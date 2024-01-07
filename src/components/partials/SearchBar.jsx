import React, { useState, useEffect } from "react";
import { buscarOrden } from "../../services/OrdenTrabajo";
import { CardBusquedaOrden } from "../../components/Administrador/CardBusquedaOrden";

function SearchBar() {
  const [criterioBusqueda, setCriterioBusqueda] = useState("");
  const [resultBusqueda, setResultBusqueda] = useState([]);
  const [idOrden, setIdOrden] = useState(null);
  const [fechaOrden, setFechaOrden] = useState(null);
  const [nombreCliente, setNombre] = useState(null);
  const [apePaterno, setApePaterno] = useState(null);
  const [apeMaterno, setApeMaterno] = useState(null);

  const validarCriterioBusqueda = (criterioB) => {
    const criterioBRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9\s-]{1,120}$/;

    return criterioBRegex.test(criterioB);
  };
  let numberReg = /^\d+$/;
  let dateReg = /^\d{4}[-]\d{2}[-]\d{2}$/;
  let nombreReg = /^\D+$/;

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

  const handlePressEnterKey = (evt) => {
    if ((evt.ket = "enter")) {
      handleBuscar();
    }
  };
  return (
    <>
      <section className="busqueda flex flex-row gap-3 items-center">
        <section className="flex items-center">
          <img
            src="/src/assets/icons/search-icon.svg"
            alt="icono de busqueda"
            className="absolute ml-3 h-[25px]"
          />
          <input
            className="border-[2px] border-[#3B315F] pr-4 pl-[45px] py-2 rounded-[5px] w-[650px]  text-[16px]  focus:border-[#3B315F] focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
            id="barra_busqueda"
            placeholder="Buscar por numero de orden, fecha de solicitud o nombre completo de cliente"
            onChange={(evt) => setCriterioBusqueda(evt.target.value)}
            onKeyDown={handlePressEnterKey}
          />
        </section>

        <button className="boton_busqueda" onClick={handleBuscar}>
          Buscar
        </button>
      </section>
      <article className="flex flex-row flex-wrap gap-8 ">
        {resultBusqueda &&
          resultBusqueda.map((orden) => (
            <>
              <div key={orden.ordentrabajo}>
                <CardBusquedaOrden orden={orden} />
              </div>
            </>
          ))}
      </article>
    </>
  );
}

export default SearchBar;
