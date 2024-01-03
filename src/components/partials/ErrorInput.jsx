import React from 'react'

function ErrorInput({nombre}) {
  return (
    <>
    <section className=' flex flex-row gap-3 p-3 bg-red-500 font-sans text-white items-center rounded-[5px] m-0'>
        <img src="/src/assets/icons/warning-icon.svg" alt="icono de advertencia" className='h-[20px]'/>
        <p className='text-[15px] font-medium'>{nombre} es obligatorio</p>
    </section>
    </>
  )
}

export default ErrorInput