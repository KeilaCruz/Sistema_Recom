import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarOrden } from './components/Administrador/RegistrarOrden'
import { RegistrarTrabajador } from './components/Administrador/RegistrarTrabajador'
import { VisualizarOrdenes } from './components/Administrador/VisualizarOrdenes'
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/registrar-orden-trabajo' element={<RegistrarOrden />} />
          <Route path='/registrar-trabajador' element={<RegistrarTrabajador />} />
          <Route path='/visualizar-ordenes' element={<VisualizarOrdenes />} />
        </Routes>
      <Toaster/>
    </BrowserRouter >
    </>
  )
}

export default App
