
export function CardBusquedaCliente({ cliente }) {
    return (
        <>
            <div key={cliente.id_cliente}>
                <p>Id del cliente</p>
                <p>{cliente.id_cliente}</p>
                <p>Nombre</p>
                <p>{cliente.nombre}</p>
                <p>Apellido paterno</p>
                <p>{cliente.ape_paterno}</p>
                <p>Apellido materno</p>
                <p>{cliente.ape_materno}</p>
                <p>Correo</p>
                <p>{cliente.correo}</p>
                <p>Telefono</p>
                <p>{cliente.telefono}</p>
            </div>
        </>
    )
}

