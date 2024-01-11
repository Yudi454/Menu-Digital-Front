import React, { useContext, useState } from 'react'
import { Button, Card } from 'react-bootstrap';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; 
import { ProductosContext } from '../../../context/Context';

const ComidasMostrar = () => {

    const {Comidas, Bebidas} = useContext(ProductosContext)
    

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <>
    <Carousel responsive={responsive} className='mt-3'>
        {Comidas === undefined ? (
            <div>
                <h1>Cargando ...</h1>
            </div>
        ):(
        Comidas.map((Comida) => (
            <Card key={Comida.id} >
            <Card.Img variant="top" src={Comida.Imagen} />
        <Card.Body>
            <Card.Title>{Comida.Nombre}</Card.Title>
            <Card.Text className='price'>
                {Comida.Precio}
            </Card.Text>
        </Card.Body>
        </Card>
        ))
        )}
        </Carousel>;
    
    </>
  )
}

export default ComidasMostrar