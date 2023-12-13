import { useEffect } from "react"
import { useState } from "react"
import { buscarOrden, getAllOrdenTrabajo, getOrdenActivas, getOrdenEntregada } from "../../services/OrdenTrabajo"
import { useNavigate } from "react-router-dom";
import { CardBusquedaOrden } from "./CardBusquedaOrden";

export function VisualizarOrdenes() {
    const [ordenes, setOrdenes] = useState([])
    const [filtro, setFiltro] = useState("Todos");
    const [criterioBusqueda, setCriterioBusqueda] = useState("");
    const [resultBusqueda, setResultBusqueda] = useState([])
    const [idOrden, setIdOrden] = useState(null);
    const [fechaOrden, setFechaOrden] = useState(null);
    const [nombreCliente, setNombre] = useState(null)
    const [apePaterno, setApePaterno] = useState(null);
    const [apeMaterno, setApeMaterno] = useState(null);
    const navigate = useNavigate();

    let numberReg = /^\d+$/;
    let dateReg = /^\d{4}[-]\d{2}[-]\d{2}$/;
    let nombreReg = /^\D+$/;

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
    const handleFiltro = (filtro) => {
        setFiltro(filtro)
    }
    useEffect(() => {
        const handleBusqueda = async () => {
            const isNumOrden = numberReg.test(criterioBusqueda);
            const isFecha = dateReg.test(criterioBusqueda);
            const isName = nombreReg.test(criterioBusqueda);

            if (isNumOrden) {
                const num_orden = parseInt(criterioBusqueda);
                setIdOrden(num_orden);
                setFechaOrden(null);
                setNombre(null);
                setApePaterno(null);
                setApeMaterno(null);
            } else if (isFecha) {
                setIdOrden(null);
                setFechaOrden(criterioBusqueda);
                setNombre(null);
                setApePaterno(null);
                setApeMaterno(null);
            } else if (isName) {
                const nombres = criterioBusqueda.split(" ");
                setIdOrden(null);
                setFechaOrden(null);
                setNombre(nombres[0]);
                setApePaterno(nombres[1]);
                setApeMaterno(nombres[2]);
            } else {
                //mostrar toast que no es un criterio válido
                console.log("No es un criterio de búsqueda");
                return;
            }
        }
        handleBusqueda();
    }, [criterioBusqueda])

    const handleBuscar = async () => {
        let resultado = await buscarOrden(idOrden, fechaOrden, nombreCliente, apePaterno, apeMaterno);
        setResultBusqueda(resultado);
    }

    const handleNavegar = async (idOrden) => {
        navigate(`/visualizar-orden/${idOrden}`)
    }
    return (
        <>
            <input id="barra_busqueda" placeholder="Núm orden: 123, Fecha solicitud: 0000-00-00, Nombre: Lucas Cruz Romero" onChange={(evt) => setCriterioBusqueda(evt.target.value)} />
            <button onClick={handleBuscar}>Buscar</button>
            {resultBusqueda.map(orden => (
                <CardBusquedaOrden orden={orden} />
            ))}
            <button onClick={() => handleFiltro("Todos")}>Todos</button>
            <button onClick={() => handleFiltro("Pendientes")}>Pendientes</button>
            <button onClick={() => handleFiltro("Entregado")}>Entregado</button>
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
                        <tr key={orden.ordentrabajo}>
                            <td>{orden.ordentrabajo}</td>
                            <td>{orden.nomtrabajadores[0]}</td>
                            <td>{orden.fechaentrega}</td>
                            {orden.estado_o ? (
                                <td>Pendiente</td>
                            ) : (
                                <td>Entregado</td>
                            )}
                            {/* Aquí ira un icono de una flechita*/}
                            <td>
                                <button onClick={() => handleNavegar(orden.ordentrabajo)}>Detalles</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
