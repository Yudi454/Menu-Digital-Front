import React, { useContext } from "react";
import { ProductosContext } from "../../context/Context";
import { Card, Col, Container, Row } from "react-bootstrap";

const CatalogoComida = () => {
  const { Comidas, TraerProductos } = useContext(ProductosContext);

  {
    Comidas === undefined && TraerProductos();
  }

  return (
    <>
      <section className="text-center">
        <article>
          <h2>Catalogo de Comida</h2>
          <Container>
            <Row>
              {Comidas === undefined ? (
                <div>
                  <h1>Cargando ...</h1>
                </div>
              ) : (
                Comidas.map((Comida) => (
                  <Col
                    xl={4}
                    lg={4}
                    md={4}
                    key={Comida.id}
                    className="mt-2 mb-2"
                  >
                    <Card>
                      <Card.Img variant="top" src={Comida.Imagen} />
                      <Card.Body>
                        <Card.Title>{Comida.Nombre}</Card.Title>
                        <Card.Text className="price">{Comida.Precio}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </article>
      </section>
    </>
  );
};

export default CatalogoComida;
