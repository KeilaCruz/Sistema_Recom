import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import { detalleCliente, datosCliente } from "../../services/Clientes";
import HeaderPestaña from "../partials/headers/HeaderPestaña";
import CardDatosCliente from "./CardDatosCliente";
import OrdenCard from "./OrdenCard";

function DetalleCliente() {
  const { id } = useParams();
  const [ordenes, setOrdenes] = useState([]);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await datosCliente(id);
      setDatos(datos);
      const trabajos = await detalleCliente(id);
      setOrdenes(trabajos);
    };

    cargarDatos();
  }, []);

  return (
    <>
      <main className="h-full w-auto flex flex-row bg-colorFondo">
        <aside className="fixed h-full">
          <Sidebar />
        </aside>

        <section className="flex flex-col w-full h-auto ml-[289px]">
          <header>
            <HeaderPestaña
              srcArrow="/src/assets/icons/backpage-icon.svg"
              nombrePestaña="Trabajos realizados"
              srcIcon="/src/assets/icons/active/trabajosActive-icon.svg"
              descripcionImagenPestaña="icono de trabajos realizados"
              showPerfil={true}
            />
          </header>

          <section className="my-10 mx-11">
            <CardDatosCliente data={datos} />

            <section className="mt-5 ">
              <p className="font-semibold text-[18px] text-colorMain mb-5">
                Ordenes realizadas
              </p>
              <article className="flex flex-row flex-wrap gap-8  mb-5">
                {ordenes.length !== 0 ? (
                  <>
                    {ordenes.map((orden) => (
                      <>
                        <div key={orden.id_orden}>
                          <OrdenCard
                            idorden={orden.id_orden}
                            descripcion={orden.especificaciones_trabajo}
                            fechaEntrega={orden.fecha_entrega}
                            estado={orden.estado}
                          />
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="bg-colorMain text-white text-[20px] px-4 py-2 rounded">
                      No hay trabajos asignados a este cliente
                    </p>
                  </>
                )}
              </article>
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

export default DetalleCliente;
