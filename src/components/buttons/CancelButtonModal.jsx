import React from 'react'

function CancelButtonModal({onClick}) {
  return (
    <>
     <button
        className="bg-white p-2 rounded-[5px] font-sans font-medium text-colorMain w-[100px] hover:bg-transparent hover:text-white border border-transparent hover:border-white"
        onClick={onClick}
      >
       Cancelar
      </button>
    
    </>
  )
}

export default CancelButtonModal