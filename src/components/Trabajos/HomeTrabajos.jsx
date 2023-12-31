import React from "react";
import Sidebar from "../partials/Sidebar";
import Calendario from "./Calendario";
import { VisualizarOrdenes } from "../Administrador/VisualizarOrdenes";

function HomeTrabajos() {
    return (
        <>
            <div className="fixed">
                <Sidebar />
            </div>

            <div className="flex-col p-4 ">
                <button className="bg-[#3B315F] p-[10px] w-[150px] ml-80 mt-0
                 text-white text-[20px] font-sans font-medium rounded 
                 hover:bg-[#4D407E]">
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
