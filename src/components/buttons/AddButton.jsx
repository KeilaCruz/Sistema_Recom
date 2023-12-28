import React from 'react'

function AddButton(name) {
  return (
    <>
    <button className='bg-colorSecundario p-2 rounded-[5px] font-sans font-medium text-white w-[100px]'>
        {name}
    </button>
    </>
  )
}

export default AddButton