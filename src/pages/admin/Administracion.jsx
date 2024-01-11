import React, { useContext, useState } from "react";
import { ProductosContext } from "../../context/Context";
import "../../style/Administracion.css";
import InicioSesion from "./InicioSesion/InicioSesion";
import TablaComidas from "./Comidas/TablaComidas";
import CrearComida from "./Comidas/CrearComida";
import { Col, Row } from "react-bootstrap";
import TablaBebidas from "./MostrarBebidas/TablaBebidas";
import CrearBebida from "./MostrarBebidas/CrearBebida";
import TablaUsuarios from "./MostrarUsuarios/TablaUsuarios";
import CrearUsuario from "./MostrarUsuarios/CrearUsuario";
import CrearImagenPromocional from "./Carrusel/CrearImagenPromocional";
import TablaImagenPromocional from "./Carrusel/TablaImagenPromocional";
import CrearImagenComida from "./Carrusel/CarruselComida/CrearImagenComida";
import TablaImagenComida from "./Carrusel/CarruselComida/TablaImagenComida";
import CrearImagenBebida from "./Carrusel/CarruselBebida/CrearImagenBebida";
import TablaImagenBebida from "./Carrusel/CarruselBebida/TablaImagenBebida";

const Administracion = () => {
  const {
    PasarStates,
    Comidas,
    Bebidas,
    TraerProductos,
    traerImagenesCarrusel,
  } = useContext(ProductosContext);
  const {
    MostrarInicioSesion,
    MostrarTabla,
    setMostrarInicioSesion,
    setMostarTabla,
  } = PasarStates;

  {
    Comidas === undefined &&
      Bebidas === undefined &&
      (TraerProductos(), traerImagenesCarrusel());
  }

  const [seleccionado, setSeleccionado] = useState("comida");
  const [seleccionadoImagen, setSeleccionadoImagen] = useState("comida");

  const elementoSeleccionado = (elemento) => {
    if (seleccionado !== elemento) {
      setSeleccionado(elemento);
    }
  };

  const imagenSeleccionado = (imagen) => {
    if (seleccionadoImagen != imagen) {
      setSeleccionadoImagen(imagen);
    }
  };

  return (
    <>
      {MostrarTabla === false ? (
        <InicioSesion />
      ) : (
        <>
          <div className="text-center mt-3 mb-3">
            <h1>Administracion</h1>
          </div>
          <Row className="text-center">
            <Col>
              <p
                onClick={() => elementoSeleccionado("comida")}
                className={seleccionado === "comida" ? "seleccionado" : ""}
              >
                Comida
              </p>
            </Col>
            <Col>
              <p
                onClick={() => elementoSeleccionado("bebida")}
                className={seleccionado === "bebida" ? "seleccionado" : ""}
              >
                Bebida
              </p>
            </Col>
            <Col>
              <p
                onClick={() => elementoSeleccionado("usuarios")}
                className={seleccionado === "usuarios" ? "seleccionado" : ""}
              >
                Usuarios
              </p>
            </Col>
            <Col>
              <p
                onClick={() => elementoSeleccionado("carrusel")}
                className={seleccionado === "carrusel" ? " seleccionado" : ""}
              >
                Carrusel
              </p>
            </Col>
          </Row>
          {seleccionado === "comida" ? (
            <div className="text-center">
              <h1>Tabla Comidas</h1>
              <CrearComida />
              <TablaComidas />
            </div>
          ) : seleccionado === "bebida" ? (
            <div className="text-center">
              <h1>Tabla de bebidas</h1>
              <CrearBebida />
              <TablaBebidas />
            </div>
          ) : seleccionado === "usuarios" ? (
            <div className="text-center">
              <h1>Tabla Usuarios</h1>
              <CrearUsuario />
              <TablaUsuarios />
            </div>
          ) : (
            seleccionado === "carrusel" && (
              <div className="text-center">
                <h1>Tabla de Imagenes Carrusel Promocional</h1>
                <CrearImagenPromocional />
                <TablaImagenPromocional />
                <Row className="text-center">
                  <Col>
                    <p
                      onClick={() => imagenSeleccionado("comida")}
                      className={
                        seleccionadoImagen === "comida" ? "seleccionado" : ""
                      }
                    >
                      Comida
                    </p>
                  </Col>
                  <Col>
                    <p
                      onClick={() => imagenSeleccionado("bebida")}
                      className={
                        seleccionadoImagen === "bebida" ? "seleccionado" : ""
                      }
                    >
                      Bebida
                    </p>
                  </Col>
                </Row>
                {seleccionadoImagen === "comida" ? (
            <div className="text-center">
              <h1>Tabla Imagen Carrusel Comidas</h1>
              <CrearImagenComida />
              <TablaImagenComida />
            </div>
          ) : seleccionadoImagen === "bebida" && (
            <div className="text-center">
              <h1>Tabla Imagen Carrusel bebidas</h1>
              <CrearImagenBebida />
              <TablaImagenBebida />
            </div>
          )}
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default Administracion;
