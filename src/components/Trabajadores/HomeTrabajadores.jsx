import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "../partials/headers/Header";
import Sidebar from "../partials/Sidebar";
import TablaDatos from "../Trabajadores/TablaDatosTrabajadores";
import { getTrabajadores } from "../../services/Trabajador";

function HomeTrabajadores() {
  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    const cargarTrabajadores = async () => {
      const dataTrabajadores = await getTrabajadores();
      console.log(dataTrabajadores);
      setTrabajadores(dataTrabajadores);
    };

    cargarTrabajadores();
    const tiempoCarga = setInterval(() => {
      cargarTrabajadores();
    }, 10000); // el useEffect se actualiza cada 10 segundos

    return () => clearInterval(tiempoCarga);
  }, []);

  return (
    <>
      <main className="h-full w-auto flex flex-row bg-colorFondo">
        <div className="fixed h-full">
          <Sidebar />
        </div>

        <section className="flex flex-col w-full h-auto ml-[289px]">
          <Header placeholder={"Buscar por nombre de trabajador"} />

          <section className="m-[50px] flex flex-col rounded-[5px]  gap-[50px]">
            <Link
              className="flex items-center gap-[10px] p-[10px] bg-colorSecundario w-max rounded-[5px] hover:bg-[#4D407E] box-border "
              to="/nuevo-trabajador"
            >
              <img
                src="/src/assets/icons/add-icon.svg"
                alt="icono para agregar un nuevo trabajador"
              />
              <p className="font-sans font-medium text-[14px] text-white">
                Nuevo trabajador
              </p>
            </Link>

            <section>
              <TablaDatos data={trabajadores}/>
            </section>
            
          </section>
        </section>
      </main>
    </>
  );
}

export default HomeTrabajadores;
