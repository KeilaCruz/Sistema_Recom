import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import esLocale from "@fullcalendar/core/locales/es"
import React, { useEffect, useState } from "react";
import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { visualizarCalendario } from "../../services/OrdenTrabajo";

function Calendario() {

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await visualizarCalendario();
                const eventos = data.map((evento) => {
                    const fechaEntrega = parseISO(evento.fechaentrega); // Parsea la fecha en formato ISO
                    const fechaEntregaZonificada = utcToZonedTime(fechaEntrega, 'America/Mexico_City'); // Ajusta a la zona horaria de México

                    return {
                        title: evento.especificacion,
                        description: evento.idorden,
                        start: new Date(fechaEntregaZonificada),
                    }
                });
                setEventos(eventos);
                console.log(eventos)
            } catch (error) {
                console.error("Error al obtener eventos:", error);
            }
        }
        fetchEventos();
    }, [])

    return (
        <div className="flex-col p-4 ml-80">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locales={[esLocale]} // Establece el idioma español
                locale="es" // Establece el idioma por defecto
                height={"90vh"}
                events={eventos}
                eventContent={(info) => (
                    <div>
                        <b>{info.event.title}</b>
                        <p>{info.event.description}</p>


                    </div>
                )}
            />
        </div>
    )

}
export default Calendario;
