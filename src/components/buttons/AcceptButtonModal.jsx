import React from "react";

function AcceptButtonModal({ onClick}) {
  return (
    <>
      <button
        className="bg-white p-2 rounded-[5px] font-sans font-medium text-colorMain w-[100px] hover:bg-colorHover hover:text-colorHover"
        onClick={onClick}
      >
       Aceptar
      </button>
    </>
  );
}

export default AcceptButtonModal;
