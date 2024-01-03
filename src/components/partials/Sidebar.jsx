import React, { useState, useEffect } from "react";
import { cerrarSesion } from "../../services/Auth/Autenticación";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import OptionSidebar from "./OptionSidebar";

function Sidebar() {
  const location = useLocation();
  const [rutaActiva, setRutaActiva] = useState("");
  const navigate = useNavigate();
  const onSubmit = async () => {
    const logout = await cerrarSesion();
    console.log(logout)
    if (logout) {
      navigate("/login");
    } else {
      alert("No se pudo cerrar sesión");
    }
  };

  useEffect(() => {
    setRutaActiva(location.pathname);
  }, [location]);

  return (
    <>
      <aside className="bg-colorMain flex flex-col justify-between pt-[20px] p-[40px] h-screen ">
        <section className="flex flex-col ">
          <article className="flex gap-[20px] font-sans ">
            <img
              src="/src/assets/icons/icon-main.svg"
              alt="logotipo de la empresa RECOM"
              title="logotipo de empresa RECOM"
            />
            <div className="flex flex-col text-white">
              <h1 className="text-[20px] font-semibold">RECOM</h1>
              <h2 className="text-[18px] ">
                Taller de Torno<br></br> y Soldadura
              </h2>
            </div>
          </article>

          <ul className="mt-[50px] font-sans gap-[20px] flex flex-col text-white justify-center ">
            <OptionSidebar
              ruta={"/"}
              label={"Home"}
              iconBase={"/src/assets/icons/home-icon.svg"}
              iconChange={"/src/assets/icons/active/homeActive-icon.svg"}
              descripcionImagen={"icono de opcion home"}
              rutaActiva={rutaActiva}
            />
            <OptionSidebar
              ruta={"/clientes"}
              label={"Clientes"}
              iconBase={"/src/assets/icons/clientes-icon.svg"}
              iconChange={"/src/assets/icons/active/clientesActive-icon.svg"}
              descripcionImagen={"icono de opcion clientes"}
              rutaActiva={rutaActiva}
            />
            <OptionSidebar
              ruta={"/trabajadores"}
              label={"Trabajadores"}
              iconBase={"/src/assets/icons/trabajadores-icon.svg"}
              iconChange={
                "/src/assets/icons/active/trabajadoresActive-icon.svg"
              }
              descripcionImagen={"icono de opcion trabajadores"}
              rutaActiva={rutaActiva}
            />
            <OptionSidebar
              ruta={"/trabajos"}
              label={"Trabajos"}
              iconBase={"/src/assets/icons/trabajos-icon.svg"}
              iconChange={"/src/assets/icons/active/trabajosActive-icon.svg"}
              descripcionImagen={"icono de opcion trabajo"}
              rutaActiva={rutaActiva}
            />
          </ul>
        </section>

        <button
          className="flex flex-row items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-colorHover "
          onClick={onSubmit}
        >
          <img
            src="/src/assets/icons/logout-icon.svg"
            alt=""
            className="h-[25px]"
          />
          <p className="text-white text-[18px] font-bold">Cerrar Sesion</p>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
