import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarOrden } from './components/Administrador/RegistrarOrden'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/registrar-orden-trabajo' element={<RegistrarOrden />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
