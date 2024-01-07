import { Link } from "react-router-dom";

export function CardBusquedaOrden({ orden }) {
  return (
    <>
      <Link
        to={`/visualizar-orden/${orden.ordentrabajo}`}
        className="flex flex-col  font-sans bg-white rounded-[5px] shadow-md text-colorMain px-4 py-3 duration-100 hover:scale-105 hover:shadow-lg  mr-auto ml-auto w-max h-auto mb-5"
      >
        <p className="bg-colorMain text-white rounded-[5px] p-2 font-medium mb-3 text-center">
          Numero de orden: {orden.ordentrabajo}{" "}
        </p>

        <section className="flex flex-col gap-2">
          <article className="flex flex-row  gap-2">
            <p className="font-medium ">Nombre del cliente:</p>
            <p>
              {orden.nomcliente} {orden.apepaterno} {orden.apematerno}
            </p>
          </article>

          <article className="flex flex-row gap-2 items-center">
            <p className="font-medium ">Estado: </p>
            {orden.estado_o ? (
              <>
                <p className="text-white bg-red-500 rounded-[5px] px-3 py-1 ">
                  Pendiente
                </p>
              </>
            ) : (
              <>
                <p className="text-white bg-green-500 rounded-[5px] px-3 py-1">
                  Entregado
                </p>
              </>
            )}
          </article>
        </section>
      </Link>
    </>
  );
}
