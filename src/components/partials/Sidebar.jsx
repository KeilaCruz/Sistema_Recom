import React from "react";

function Sidebar() {
  return (
    <>
      {/*En genral se deben cambiar el tamaño de los componentes, NO USAR PX, usar mediciones como em, rem, investigar como añadirlo bien */}
      <aside className="bg-[#152034] flex flex-col p-[20px] h-screen fixed">
        <article className="flex gap-[20px] font-sans ">
          <img
            src="/src/assets/icons/icon-main.svg"
            alt="logotipo de la empresa RECOM"
            title="logotipo de empresa RECOM"
          />
          <div className="flex flex-col text-white">
            <h1 className="text-[25px]">RECOM</h1>
            <h2 className="text-[20px] ">
              Taller de Torno<br></br> y Soldadura
            </h2>
          </div>
        </article>
      </aside>
    </>
  );
}

export default Sidebar;
