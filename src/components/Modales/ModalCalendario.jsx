import React from "react";

export function ModalCalendario({ onClose, orden, verOrden }) {    
    
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="flex flex-col justify-center items-center bg-[#3B315F] p-5 rounded ">

                <div key={orden.idorden}>
                    <p className="text-white text-[18px] mt-4">Número de orden: {orden.idorden}</p>
                    <p className="text-white text-[18px] mt-4">Cliente: {orden.nombre_c} {orden.apepaterno_c} {orden.apematerno_c}</p>
                    <p className="text-white text-[18px] mt-4">Detalles del trabajo: {orden.especificacion}</p>

                </div>

                <button onClick={verOrden} className="text-[#3B315F] text-[18px] mt-4 px-4 bg-white py-2 rounded">
                    Ver completo
                </button>

                <button onClick={onClose} className="text-white text-[18px] mt-4 px-4 py-2 bg-red-500 rounded">
                    Cerrar
                </button>
            </div>
        </div>
    )
}