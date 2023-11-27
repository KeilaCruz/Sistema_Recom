import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <main className="bg-[#152034] flex w-screen h-screen items-center justify-center">
        <section className="flex flex-col  justify-between p-[30px] w-[800px] gap-[50px]  bg-white rounded-[5px]">
          <p className="text-3xl text-[#152034] font-semibold">
            LA PÁGINA QUE BUSCAS NO EXISTE
          </p>
          <article className="flex flex-row gap-[30px] ">
            <picture>
              {/* aqui se cambiará por una imagen de error 404 */}
              <img
                src="/src/assets/icons/icon-main.svg"
                alt="imagen de error de página"
                className="w-[250px]"
              />
            </picture>

            <article className="flex flex-col gap-[30px]">
              <p className="text-2xl ">
                Lamentablemente hubo un error y 
                no se encontró la página que
                buscabas
              </p>
              <Link
                to="/"
                className="text-[20px] text-center rounded-[5px] p-[15px] bg-[#152034] text-white w-[250px]"
              >
                {" "}
                Ir a página de inicio
              </Link>
            </article>
          </article>
        </section>
      </main>
    </>
  );
}

export default NotFound;
