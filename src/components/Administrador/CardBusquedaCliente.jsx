export function CardBusquedaCliente({ cliente }) {
  return (
    <>
      <main
        className="mt-5 flex flex-col bg-colorSecundario rounded text-white px-4 py-2 w-max "
        key={cliente.id_cliente}
      >
        <p className="mt-2 font-semibold items-center px-3 py-2 bg-white text-colorMain rounded">
          Id del cliente: {cliente.id_cliente}
        </p>

        <article className="flex gap-3 items-center mt-2">
          <p className="font-medium">Nombre del cliente:</p>
          <p>
            {cliente.nombre} {cliente.ape_paterno} {cliente.ape_materno}
          </p>
        </article>

        <article className="flex gap-3 items-center mt-2">
          <p className="font-medium">Correo:</p>
          <p>{cliente.correo}</p>
        </article>

        <article className="flex gap-3 items-center mt-2">
          <p className="font-medium">Teléfono:</p>
          <p>{cliente.telefono}</p>
        </article>
      </main>
    </>
  );
}
