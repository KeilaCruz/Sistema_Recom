import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import React, { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import { visualizarCalendario } from "../../services/OrdenTrabajo";
import { ModalCalendario } from "../Modales/ModalCalendario";
import { useNavigate } from "react-router-dom";

function Calendario() {
  const [eventos, setEventos] = useState([]);
  const [infoEvento, setInfoEvento] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRedireccion = () => {
    const idOrden = infoEvento.idorden;
    navigate(`/visualizar-orden/${idOrden}`);
  };

  const handleModal = (info) => {
    setShowModal(true);
    setInfoEvento(info.event.extendedProps);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchEventos = async () => {
    try {
      const data = await visualizarCalendario();
      const eventos = data.map((evento) => {
        const fechaEntrega = parseISO(evento.fechaentrega); // Parsea la fecha en formato ISO
        const fechaEntregaZonificada = utcToZonedTime(
          fechaEntrega,
          "America/Mexico_City"
        ); // Ajusta a la zona horaria de México

        return {
          title: evento.especificacion,
          description: evento.idorden,
          extendedProps: evento,
          start: new Date(fechaEntregaZonificada),
        };
      });
      setEventos(eventos);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div className="w-full px-4 py-3 text-[14px]">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[esLocale]} // Establece el idioma español
        locale="es" // Establece el idioma por defecto
        height={"70vh"}
        events={eventos}
        eventContent={(info) => (
          <div>
            <b className="text-[15px] ">
              {info.event.title.substring(0, 12)}
              {info.event.title.length > 12 ? "..." : ""}
            </b>
            <p>{info.event.description}</p>
          </div>
        )}
        eventClick={(info) => handleModal(info)}
      />
      {showModal && (
        <div>
          <ModalCalendario
            onClose={handleCloseModal}
            orden={infoEvento}
            verOrden={handleRedireccion}
          ></ModalCalendario>
        </div>
      )}
    </div>
  );
}
export default Calendario;
