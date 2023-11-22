import { useEffect } from "react"
import { useState } from "react"
import { getAllOrdenTrabajo } from "../../services/OrdenTrabajo"

export function VisualizarOrdenes() {
    const [ordenes, setOrdenes] = useState([])
    useEffect(() => {
        async function loadOrdenes() {
            const res = await getAllOrdenTrabajo()
            setOrdenes(res);
        }
        loadOrdenes()
    })
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Orden de trabajo</td>
                        <td>Trabajador</td>
                        <td>Fecha entrega</td>
                        <td>Estado</td>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map((orden) => (
                        <tr key={orden.id_orden}>
                            <td>{orden.id_orden}</td>
                            <td>Nombre trabajador</td>
                            <td>{orden.fecha_entrega}</td>
                            {orden.estado && (
                                <td>Pendiente</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
