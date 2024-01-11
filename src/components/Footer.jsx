import React from "react";
import { Col, Row } from "react-bootstrap";
import "../style/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="mt-4 text-center">
        <Row>
          <Col lg={4} xl={4}>
            <p>Logo</p>
          </Col>
          <Col lg={4} xl={4}>
            <h3>Informacion de Contacto</h3>
            <ul className="ul-sin-punto">
              <li>
                <p>Numero de Telefono:</p>
              </li>
              <li>
                <p>Email:</p>
              </li>
            </ul>
          </Col>
          <Col lg={4} xl={4}>
            <h3>Redes Sociales:</h3>
            <ul className="ul-sin-punto">
              <li>
                <p>Instagram</p>
              </li>
              <li>
                <p>Facebook</p>
              </li>
              <li>
                <p>Otra..</p>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </>
  );
};

export default Footer;
