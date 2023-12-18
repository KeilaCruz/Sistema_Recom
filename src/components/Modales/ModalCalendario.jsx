import React from "react";
export function ModalCalendario({ onClose, orden }) {

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="flex flex-col justify-center items-center bg-cyan-600 p-5 rounded ">

                <div key={orden.idorden}>
                    <p>Número de orden: {orden.idorden}</p>
                    <p>Cliente: {orden.nombre_c} {orden.apepaterno_c} {orden.apematerno_c}</p>
                    <p>Detalles del trabajo: {orden.especificacion}</p>                    
                   
                </div>

                <button onClick={onClose} className="text-white mt-4 px-4 py-2 bg-red-500 rounded">
                    Cerrar
                </button>
            </div>
        </div>
    )
}