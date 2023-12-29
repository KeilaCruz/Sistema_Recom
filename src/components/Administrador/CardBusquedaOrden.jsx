import { useNavigate } from "react-router-dom"

export function CardBusquedaOrden({ orden }) {
    const navigate = useNavigate()
    const handleNavegar = async (idOrden) => {
        navigate(`/visualizar-orden/${idOrden}`)
    }
    return (
        <>
            <div className="mt-5 w-2/4 flex bg-colorSecundario rounded text-white" key={orden.ordentrabajo}>

                <div className="flex-col w-[1/2] ml-10 mb-5">
                    <p className="mt-2">Número de orden</p>
                    <p>{orden.ordentrabajo}</p>
                    <p className="mt-2">Fecha Solicitud</p>
                    <p>{orden.fechasolicitud}</p>
                </div>

                <div className="flex-col w-[1/2] ml-10 mb-5">
                    <p className="mt-2">Nombre del cliente</p>
                    <p>{orden.nomcliente} {orden.apepaterno} {orden.apematerno}</p>
                    <p className="mt-2">Estado </p>
                    {orden.estado_o ? (
                        <p>Pendiente</p>
                    ) : (
                        <p>Entregado</p>
                    )}
                    {/* Aquí ira un icono de una flechita*/}
                    <button className="boton_detalle_busqueda" onClick={() => handleNavegar(orden.ordentrabajo)}>Detalles</button>
                </div>

            </div>
        </>
    )
}

