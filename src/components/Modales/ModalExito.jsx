import React, { useEffect, useRef } from "react";
import {useNavigate} from 'react-router-dom'

function 
ModalExito({ mostrar, onClose, children, ruta}) {


  const navigate = useNavigate()
  const modalRef = useRef(null);

  const cerrarModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      onClose();
    }
  };

  useEffect(() => {
    let timer;
    if (mostrar) {
      timer = setTimeout(() => {
        cerrarModal();
        navigate(`/${ruta}`)
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [mostrar]);

  return (
    <>
      <dialog
        ref={modalRef}
        className={` flex flex-col justify-center items-center bg-[#3B315F]  w-[700px] h-auto p-[30px] rounded-[5px] ${
          mostrar ? "block" : "hidden"
        }`}
      >
        <section className="flex flex-row items-center gap-[30px] ">
          <img
            src="/src/assets/icons/valid-icon.svg"
            alt="icono de flecha aceptado"
          />
          <p className="text-[20px] text-white font-sans font-semibold ">
            {children}
          </p>
        </section>
      </dialog>
    </>
  );
}

export default ModalExito;
