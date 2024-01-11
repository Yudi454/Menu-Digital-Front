import React from 'react'
import { Carousel } from 'react-bootstrap'

const Carrusel = () => {
  return (
    <>
        <Carousel indicators={false} className='mt-3 mb-3'>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../../../../ImagenesDePrueba/image1.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../../../../ImagenesDePrueba/image2.png"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default Carrusel