import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ProductosContext } from "../../../context/Context";
import EditarComida from "./EditarComida";
import axios from "axios";
import Swal from "sweetalert2";

const TablaComidas = () => {
  const { Comidas, PasarStates, comidaPorId, TraerComidas } =
    useContext(ProductosContext);

  const { selectId, setSelectId, comida } = PasarStates;

  const back = import.meta.env.VITE_API_BACK;

  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [comidasMostrar, setComidasMostrar] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [comidaFiltrada, setComidaFiltrada] = useState("");
  const comidasPerPage = 5;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const indexOfLastComida = currentPage * comidasPerPage;
  const indexOfFirstComida = indexOfLastComida - comidasPerPage;

  useEffect(() => {
    if (Comidas) {
      const currentComidas = Comidas.slice(
        indexOfFirstComida,
        indexOfLastComida
      );
      setComidasMostrar(currentComidas);
    }
  }, [Comidas, indexOfFirstComida, indexOfLastComida]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (comida == undefined && selectId) {
      comidaPorId();
    }
  }, [selectId]);

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (Comidas && Comidas.length > 0) {
      const filteredComidas = Comidas.filter((comida) =>
        comida.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setComidaFiltrada(filteredComidas);
    }
  }, [Comidas, searchTerm]);

  const eliminarComida = (id) => {
    try {
      Swal.fire({
        title: "Estas seguro de eliminar la comida?",
        text: "No se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "No, mejor no",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(`${back}/Comida/${id}`);
          console.log(res);

          TraerComidas();

          Swal.fire(
            "Comida eliminada!",
            "Eliminación realzada exitosamente",
            "success"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-3">
        <input
          className="input-busqueda"
          type="text"
          placeholder="Buscar comida..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="Contenedor-Tabla">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!comidasMostrar ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : comidasMostrar.length <= 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No se encontraron resultados.
                </td>
              </tr>
            ) : !searchTerm ? (
              comidasMostrar.map((Comida) => (
                <tr key={Comida._id}>
                  <td>{Comida._id}</td>
                  <td>
                    <img src={Comida.Image} className="imagenTablas" alt="" />
                  </td>
                  <td>{Comida.name}</td>
                  <td>{Comida.Price}</td>
                  <td>{Comida.Description}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        setSelectId(Comida._id);
                        handleShow();
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        eliminarComida(Comida._id);
                        TraerComidas();
                      }}
                    >
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              comidaFiltrada &&
              comidaFiltrada.map((Comida) => (
                <tr key={Comida._id}>
                  <td>{Comida._id}</td>
                  <td>
                    <img src={Comida.Image} className="imagenTablas" alt="" />
                  </td>
                  <td>{Comida.name}</td>
                  <td>{Comida.Price}</td>
                  <td>{Comida.Description}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        setSelectId(Comida._id);
                        handleShow();
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        eliminarComida(Comida._id);
                        TraerComidas();
                      }}
                    >
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <EditarComida show={show} setShow={setShow} handleClose={handleClose} />
      </div>
      <div className="pagination d-flex justify-content-center">
        {Comidas &&
          Comidas.length > comidasPerPage &&
          Array.from({
            length: Math.ceil(Comidas.length / comidasPerPage),
          }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
    </>
  );
};

export default TablaComidas;
