
export function CardBusquedaCliente({ cliente }) {
    return (
        <>
            <div className="mt-5 w-5/6 flex bg-colorSecundario rounded text-white" key={cliente.id_cliente}>
                <div className="flex-col w-[1/2] ml-10 mb-5">
                    <p className="mt-2 font-semibold">Id del cliente</p>
                    <p>{cliente.id_cliente}</p>
                    <p className="mt-2 font-semibold">Correo</p>
                    <p>{cliente.correo}</p>
                </div>
                <div className="flex-col w-[1/2] ml-80 mb-5">
                    <p className="mt-2 font-semibold">Nombre del cliente</p>
                    <p>{cliente.nombre} {cliente.ape_paterno} {cliente.ape_materno}</p>

                    <p className="mt-2 font-semibold">Teléfono</p>
                    <p>{cliente.telefono}</p>
                </div>

            </div>
        </>
    )
}

