import React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginMain from '../Views/Login'

function Rutas() {

  return (
    <Routes>
        <Route path="/login" element={<LoginMain/>}></Route>
    </Routes>
  )
}

export default Rutas