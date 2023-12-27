import { useEffect } from "react"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import { buscarOrden, getAllOrdenTrabajo, getOrdenActivas, getOrdenEntregada } from "../../services/OrdenTrabajo"
import { useNavigate } from "react-router-dom";
import { CardBusquedaOrden } from "./CardBusquedaOrden";
import Sidebar from "../partials/Sidebar";


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
        if(resultado.length == 0){
            toast.error('No se encontraron resultados');
        }
    }

    const handleNavegar = async (idOrden) => {
        navigate(`/visualizar-orden/${idOrden}`)
    }
    return (
        <>
            <div className="fixed">
                <Sidebar />
            </div>
            <div className="ml-80">
                <input className="inputs" id="barra_busqueda" placeholder="Núm orden: 123, Fecha solicitud: 0000-00-00, Nombre: Lucas Cruz Romero" onChange={(evt) => setCriterioBusqueda(evt.target.value)} />
                <button className="boton_busqueda" onClick={handleBuscar}>Buscar</button>
                {resultBusqueda.map(orden => (
                    <CardBusquedaOrden orden={orden} />
                ))}

            </div>
            <div className="ml-80 mt-5">
                <button className="boton_filtrado" onClick={() => handleFiltro("Todos")}>Todos</button>
                <button className="boton_filtrado" onClick={() => handleFiltro("Pendientes")}>Pendientes</button>
                <button className="boton_filtrado" onClick={() => handleFiltro("Entregado")}>Entregado</button>
            </div>

            <section className="mb-4">
                <table className="w-4/5 ml-80 text-left shadow">
                    <thead className="bg-colorMain font-sans font-normal text-[18px] text-white sticky">
                        <tr>
                            <td>Orden de trabajo</td>
                            <td>Trabajador</td>
                            <td>Fecha entrega</td>
                            <td>Estado</td>
                            <td>Ver detalles</td>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map((orden) => (
                            <tr key={orden.ordentrabajo} className="font-sans font-normal text-[18px] border-b-[1px] border-black bg-white">
                                <td className="p-[10px] ">{orden.ordentrabajo}</td>
                                <td>{orden.nomtrabajadores[0]}</td>
                                <td>{orden.fechaentrega}</td>
                                {orden.estado_o ? (
                                    <td>Pendiente</td>
                                ) : (
                                    <td>Entregado</td>
                                )}
                                {/* Aquí ira un icono de una flechita*/}
                                <td>
                                    <button className=" hover:bg-[#4D407E]" onClick={() => handleNavegar(orden.ordentrabajo)}>Detalles</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </section>

        </>
    )
}
