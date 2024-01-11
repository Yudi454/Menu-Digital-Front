import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Error404 from '../pages/Error/Error404'
import Administracion from '../pages/admin/Administracion'
import CatalogoComida from '../pages/catalogos/CatalogoComida'
import CatalogoBebida from '../pages/catalogos/CatalogoBebida'

const Rutas = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Error404 />} />
            <Route path='/Administracion' element={<Administracion />} />
            <Route path='/CatalogoComida' element={<CatalogoComida />} />
            <Route path='/CatalogoBebida' element={<CatalogoBebida />} /> 
        </Routes>
    </>
  )
}

export default Rutas