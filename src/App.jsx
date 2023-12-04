import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarOrden } from './components/Administrador/RegistrarOrden'
import { RegistrarTrabajador } from './components/Administrador/RegistrarTrabajador'
import { VisualizarOrdenes } from './components/Administrador/VisualizarOrdenes'
import { VisualizarTrabajadores } from './components/Administrador/VisualizarTrabajadores'
import { VisualizarTrabajador } from './components/Administrador/VisualizarTrabajador'
import { VisualizarOrden } from './components/Administrador/VisualizarOrden'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/registrar-orden-trabajo' element={<RegistrarOrden />} />
          <Route path='/registrar-trabajador' element={<RegistrarTrabajador />} />
          <Route path='/visualizar-ordenes' element={<VisualizarOrdenes />} />
          <Route path='/visualizar-orden/:id' element={<VisualizarOrden />} />
          <Route path='/visualizar-trabajadores' element={<VisualizarTrabajadores />} />
          <Route path='/visualizar-trabajador/:id' element={<VisualizarTrabajador />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
