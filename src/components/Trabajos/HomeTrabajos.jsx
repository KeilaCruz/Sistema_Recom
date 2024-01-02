import React from "react";
import Sidebar from "../partials/Sidebar";
import Calendario from "./Calendario";
import { VisualizarOrdenes } from "../Administrador/VisualizarOrdenes";
import { useNavigate } from "react-router-dom";

function HomeTrabajos() {
    const navigate = useNavigate()    
    return (
        <>
            <div className="fixed">
                <Sidebar />
            </div>

            <div className="flex-col p-4 ">
                <button className="ml-80 boton_generico" onClick={() => navigate("/registrar-orden-trabajo")}>
                    Agregar trabajo
                </button>
            </div>

            <div>
                <Calendario/>
            </div>
            <div>
                <VisualizarOrdenes></VisualizarOrdenes>
            </div>

        </>
    );
}

export default HomeTrabajos;
