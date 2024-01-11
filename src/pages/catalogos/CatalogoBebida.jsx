import { useContext } from "react";
import { ProductosContext } from "../../context/Context";
import { Card, Col, Container, Row } from "react-bootstrap";

const CatalogoBebida = () => {
  const { Bebidas, TraerProductos } = useContext(ProductosContext);

  {
    Bebidas === undefined && TraerProductos();
  }

  return (
    <>
      <section className="text-center">
        <article>
          <h2>Catalogo de Bebida</h2>
          <Container>
            <Row>
              {Bebidas === undefined ? (
                <div>
                  <h1>Cargando ...</h1>
                </div>
              ) : (
                Bebidas.map((Bebida) => (
                  <Col
                    xl={4}
                    lg={4}
                    md={4}
                    key={Bebida.id}
                    className="mt-2 mb-2"
                  >
                    <Card>
                      <Card.Img variant="top" src={Bebida.Imagen} />
                      <Card.Body>
                        <Card.Title>{Bebida.Nombre}</Card.Title>
                        <Card.Text className="price">{Bebida.Precio}</Card.Text>
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

export default CatalogoBebida;
