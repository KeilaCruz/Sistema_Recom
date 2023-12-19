import React from "react";
export function ModalCalendario({ onClose, orden }) {

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="flex flex-col justify-center items-center bg-cyan-600 p-5 rounded">

                <div key={orden.ordentrabajo}>
                    <p>Número de orden</p>
                    <p>{orden.ordentrabajo}</p>
                    <p>Nombre del cliente</p>
                    <p>{orden.nomcliente}</p>
                    <p>Apellido paterno</p>
                    <p>{orden.apepaterno}</p>
                    <p>Apellido materno</p>
                    <p>{orden.apematerno}</p>
                    <p>Fecha Solicitud</p>
                    <p>{orden.fechasolicitud}</p>
                    <p>Estado</p>
                    {orden.estado_o ? (
                        <p>Pendiente</p>
                    ) : (
                        <p>Entregado</p>
                    )}
                    {/* Aquí ira un icono de una flechita*/}
                    <button onClick={() => handleNavegar(orden.ordentrabajo)}>Detalles</button>
                </div>

                <button onClick={onClose} className="text-white mt-4 px-4 py-2 bg-red-500 rounded">
                    Cerrar
                </button>
            </div>
        </div>
    )
}