import { useEffect } from "react"
import { useState } from "react"
import { getAllOrdenTrabajo, getOrdenActivas, getOrdenEntregada } from "../../services/OrdenTrabajo"

export function VisualizarOrdenes() {
    const [ordenes, setOrdenes] = useState([])
    const [filtro, setFiltro] = useState("Todos");
    useEffect(() => {
        async function loadOrdenes() {
            let res;
            if (filtro === "Todos") {
                res = await getAllOrdenTrabajo();
            } else if (filtro === "Pendientes") {
                res = await getOrdenActivas();
            } else if (filtro === "Entregado") {
                res = await getOrdenEntregada();
            }
            setOrdenes(res);
        }
        loadOrdenes()
    }, [filtro])
    const handleTodos = () => {
        setFiltro("Todos")
    }
    const handlePendiente = () => {
        setFiltro("Pendientes")
    }
    const handleEntregado = () => {
        setFiltro("Entregado")
    }
    return (
        <>
            <button onClick={handleTodos}>Todos</button>
            <button onClick={handlePendiente}>Pendientes</button>
            <button onClick={handleEntregado}>Entregado</button>
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
