import React from 'react'

function CancelButton({label, onClick}) {
    return (
        <>
        <button className='bg-white p-2 rounded-[5px] font-sans font-medium text-colorMain w-[100px] border border-transparent hover:border-colorMain'
        onClick={onClick}>
            {label}
        </button>
        </>
      )
}

export default CancelButton