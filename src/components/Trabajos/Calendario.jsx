import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import esLocale from "@fullcalendar/core/locales/es"
import React, { useEffect, useState } from "react";

import { getOrdenActivas } from "../../services/OrdenTrabajo";

function Calendario() {

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await getOrdenActivas();
                const eventos = data.map((evento) => ({
                    title: evento.ordentrabajo,
                    //description: evento.especificacionestrabajo,
                    start: new Date(evento.fechaentrega),                    
                }));
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
