import React from 'react'
import Header from '../partials/headers/HeaderLogin'

function Login() {
  return (
    <main className='flex flex-col overflow-hidden font-sans'>
        <Header/>

        <section className='m-[40px] shadow flex flex-row p-[35px] h-[500px]  items-center gap-[220px] '>

          <article className='flex flex-col gap-[40px] items-center'>
            <h1 className='text-[#3B315F] text-[40px] font-bold '>RYCO <br /> Taller de Torno y Soldadura</h1>
            <picture >
              <img className='h-[300px]' src="/src/assets/icons/icon-main.svg" alt="logotipo de la empresa" />
            </picture>
          </article>

          <section className='flex-col'>
            <p className='text-[40px] text-[#3B315F] font-bold'>Iniciar Sesión</p>

          </section>
            
        </section>
        
    </main>
  )
}

export default Login