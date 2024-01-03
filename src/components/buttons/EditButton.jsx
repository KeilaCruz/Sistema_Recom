import React from "react";

function EditButton({ onClick }) {
  return (
    <>
      <button
        className="bg-white p-3 rounded-[5px] w-max font-sans font-medium text-colorMain hover:bg-gray-200"
        onClick={onClick}
      >
        <p>Editar</p>
      </button>
    </>
  );
}

export default EditButton;
