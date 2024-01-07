import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import HeaderPestaña from "../partials/headers/HeaderPestaña";
import CardDatosTrabajador from "../Trabajadores/CardDatosTrabajador";
import { getTrabajosAsignados } from "../../services/Trabajador";
import OrdenCard from "../Trabajadores/OrdenCard";

export function VisualizarTrabajador() {
  const { id } = useParams();

  const [trabajos, setTrabajos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await getTrabajosAsignados(id);
      console.log(datos);
      setTrabajos(datos);
    };

    cargarDatos();
  }, []);

  return (
    <>
      <main className="w-auto h-full flex flex-row bg-colorFondo">
        <aside className="fixed h-full">
          <Sidebar />
        </aside>

        <section className="flex flex-col w-full h-auto ml-[289px]">
          <header>
            <HeaderPestaña
              nombrePestaña="Detalles del trabajador"
              srcIcon="/src/assets/icons/active/trabajadoresActive-icon.svg"
              descripcionImagenPestaña="icono de trabajador"
              showPerfil={true}
            />
          </header>

          <section className="my-10 mx-11 ">
            <CardDatosTrabajador id={id} />

            <section className="mt-5 ">
              <p className="font-semibold text-[18px] text-colorMain mb-5">
                Ordenes asignadas
              </p>
              <article className="flex flex-row flex-wrap gap-8  mb-5">
                {trabajos.length!==0 ? (
                  <>
                    {trabajos.map((orden) => (
                      <>
                        <div key={orden.ordentrabajo}>
                          <OrdenCard
                            idorden={orden.ordentrabajo}
                            descripcion={orden.especificaciones}
                            fechaEntrega={orden.fechaentrega}
                            estado={orden.estadot}
                          />
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                  <p className="bg-colorMain text-white text-[20px] px-4 py-2 rounded">No hay trabajos asignados a este trabajador</p>
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
