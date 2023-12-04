import { useNavigate } from "react-router-dom"

export function CardBusqueda({ orden }) {
    const navigate = useNavigate()
    const handleNavegar = async (idOrden) => {
        navigate(`/visualizar-orden/${idOrden}`)
    }
    return (
        <>
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
        </>
    )
}

