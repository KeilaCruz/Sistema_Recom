import React from "react";
import {Link} from 'react-router-dom'

function OrdenCard(props) {
  return (
    <>
      <Link
      to={`/visualizar-orden/${props.idorden}`}
        className="flex flex-col  font-sans bg-white rounded-[5px] shadow-md text-colorMain px-4 py-3 duration-100 hover:scale-105 hover:shadow-lg  mr-auto ml-auto w-[350px] h-auto
      "
      >
        <p className="bg-colorMain text-white rounded-[5px] p-2 font-medium mb-3 text-center">
          Numero de orden: {props.idorden}{" "}
        </p>

        <section className="flex flex-col gap-2">
          <article className="flex flex-row gap-2">
            <p className="font-medium ">Descripcion: </p>
            <p>{props.descripcion} </p>
          </article>
          <article className="flex flex-row gap-2">
            <p className="font-medium ">Fecha de entrega: </p>
            <p>{props.fechaEntrega} </p>
          </article>

          <article className="flex flex-row gap-2 items-center">
            <p className="font-medium ">Estado: </p>
            {props.estado ? (
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

export default OrdenCard;
