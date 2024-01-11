import { useContext } from "react";
import { Button, Card } from "react-bootstrap";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductosContext } from "../../../context/Context";

const BebidasMostrar = () => {
  const { Bebidas } = useContext(ProductosContext);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Carousel responsive={responsive} className="mt-3">
        {Bebidas === undefined ? (
          <div>
            <h1>Cargando ...</h1>
          </div>
        ) : (
          Bebidas.map((Bebida) => (
            <Card key={Bebida.id}>
              <Card.Img variant="top" src={Bebida.Imagen} />
              <Card.Body>
                <Card.Title>{Bebida.Nombre}</Card.Title>
                <Card.Text className="price">{Bebida.Precio}</Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </Carousel>
    </>
  );
};

export default BebidasMostrar;
