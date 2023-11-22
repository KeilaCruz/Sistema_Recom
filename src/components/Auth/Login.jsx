import React from 'react'
import Header from '../partials/headers/HeaderLogin'
import {Link} from 'react-router-dom'

function Login() {
  return (
    <main className='flex flex-col font-sans'>
        <Header/>

        <section className='m-[40px] shadow flex flex-row p-[20px] items-center gap-[220px] '>

          <article className='flex flex-col gap-[40px] items-center'>
            <h1 className='text-[#3B315F] text-[40px] font-bold '>RYCO <br /> Taller de Torno y Soldadura</h1>
            <picture >
              <img className='h-[300px]' src="/src/assets/icons/icon-main.svg" alt="logotipo de la empresa" />
            </picture>
          </article>

          <section className='flex flex-col'>
            <p className='text-[40px] text-[#3B315F] font-bold mb-[40px]'>Iniciar Sesión</p>
            <section className='flex flex-col'>
              <form action="" className='flex flex-col gap-3 font-sans '>
                <label htmlFor="" className='text-[25px] font-semibold'>Correo Electrónico</label>
                <input type="email" placeholder='example@gmail.com' className='border-[1px] border-[#3B315F] p-[10px] rounded-[5px] w-[450px] text-[22px] visited:border-black '/>
                <label htmlFor="" className='text-[25px] font-semibold'>Contraseña</label>
                <input type="password" placeholder='Ingresa tu contraseña' className='border-[1px] border-[#3B315F] p-[10px] rounded-[5px] w-[450px] text-[22px]'/>
              </form>

              <Link to="/recuperar-contraseña" className=' text-[20px] text-[#3B315F] underline font-semibold mt-[20px] hover:text-[#4D407E]'>¿Olvidaste tu contraseña?</Link> 
              <button className='mt-[50px] bg-[#3B315F] p-[10px] text-white text-[20px] font-sans font-medium rounded hover:bg-[#4D407E]'>Ingresar</button>  
      
            </section>
          </section>
            
        </section>
        
    </main>
  )
}

export default Login