import React from 'react'

function AcceptButton({label, onClick}) {
  return (
    <>
    <button className='bg-colorMain p-2 rounded-[5px] font-sans font-medium text-white w-[100px] hover:bg-hoverButtonAceptar border-transparent boder' onClick={onClick}>
        {label}
    </button>
    </>
  )
}

export default AcceptButton