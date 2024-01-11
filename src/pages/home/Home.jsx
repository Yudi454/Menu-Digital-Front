import React, { useContext, useEffect } from 'react'
import Carrusel from './componentesHome/Carrusel'
import "../../style/Home.css"
import ComidasMostrar from './componentesHome/ComidasMostrar'
import { ProductosContext } from '../../context/Context'
import BebidasMostrar from './componentesHome/BebidasMostrar'

const Home = () => {
  
  const {Comidas, Bebidas , TraerProductos} = useContext(ProductosContext)

    {Comidas === undefined && Bebidas === undefined && (
      TraerProductos()
    )}
    
  return (
    <>
    <div className='text-center'>
    <h1>Productos Destacados</h1>
    </div>
    <Carrusel />
    <div className='text-center'>
    <h1>Comidas</h1>
    </div>
    <ComidasMostrar />
    <div className='text-center'>
      <h1>Bebidas</h1>
    </div>
    <BebidasMostrar />
    </>
  )
}

export default Home