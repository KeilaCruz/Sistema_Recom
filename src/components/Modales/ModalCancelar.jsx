import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AcceptButtonModal from "../buttons/AcceptButtonModal";
import CancelButtonModal from "../buttons/CancelButtonModal";

function ModalCancelar({ mostrar, onClose, text }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };

  const cerrarModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      onClose();
    }
  };

  /*  useEffect(() => {
      let timer;
      if (mostrar) {
        timer = setTimeout(() => {
          cerrarModal();
        }, 3000);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [mostrar]);
   */
  return (
    <>
      <dialog
        ref={modalRef}
        className={` flex flex-col justify-center bg-[#3B315F]  w-[500px] h-auto p-[30px] rounded-[5px] ${
          mostrar ? "block" : "hidden"
        }`}
      >
        <section className="flex flex-row items-center justify-center gap-7 ">
          <img
            src="/src/assets/icons/warning-icon.svg"
            alt="icono de flecha aceptado"
          />
          <p className="text-[20px] text-white font-sans font-semibold text-left ">
            {text}
          </p>
        </section>
        <section className="flex flex-row gap-[20px] font-sans mt-[20px] ml-auto">
          <CancelButtonModal onClick={cerrarModal} />
          <AcceptButtonModal onClick={regresar} />
        </section>
      </dialog>
    </>
  );
}

export default ModalCancelar;
