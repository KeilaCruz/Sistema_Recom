import React from 'react'

function DeleteButton({onClick}) {
  return (
    <>
    <button className='bg-colorMain p-3 rounded-[5px] w-max font-medium hover:bg-red-500' onClick={onClick}>
        <p>Eliminar</p>
    </button>
    </>
  )
}

export default DeleteButton