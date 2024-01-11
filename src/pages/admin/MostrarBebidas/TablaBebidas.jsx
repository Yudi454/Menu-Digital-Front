import { useContext, useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";

import axios from "axios";
import Swal from "sweetalert2";
import { ProductosContext } from "../../../context/Context";
import EditarBebida from "./EditarBebida";

const TablaBebidas = () => {
  const { PasarStates, bebidaPorId, TraerProductos, Bebidas } =
    useContext(ProductosContext);

  const { selectId, setSelectId, bebida } = PasarStates;

  const back = import.meta.env.VITE_API_BACK;

  const [bebidaEliminada, setBebidaEliminada] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bebidasMostrar, setBebidasMostrar] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [bebidaFiltrada, setBebidaFiltrada] = useState("");
  const bebidasPerPage = 5;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    TraerProductos();
  }, [bebidaEliminada]);

  const indexOfLastBebida = currentPage * bebidasPerPage;
  const indexOfFirstBebida = indexOfLastBebida - bebidasPerPage;

  useEffect(() => {
    if (Bebidas) {
      const currentBebidas = Bebidas.slice(
        indexOfFirstBebida,
        indexOfLastBebida
      );
      setBebidasMostrar(currentBebidas);
    }
  }, [Bebidas, indexOfFirstBebida, indexOfLastBebida]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (bebida == undefined && selectId) {
      bebidaPorId();
    }
  }, [selectId]);

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (Bebidas && Bebidas.length > 0) {
      const filteredBebidas = Bebidas.filter((bebida) =>
        bebida.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setBebidaFiltrada(filteredBebidas);
    }
  }, [Bebidas, searchTerm]);

  const eliminarBebida = (id) => {
    try {
      Swal.fire({
        title: "Estas seguro de eliminar la bebida?",
        text: "No se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "No, mejor no",
      }).then((result) => {
        if (result.isConfirmed) {
          const res = axios.delete(`${back}/Bebida/${id}`);
          console.log(res);

          setBebidaEliminada(true);

          Swal.fire(
            "Bebida eliminada!",
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
          placeholder="Buscar bebida..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="Contenedor-Tabla">
        <Table striped>
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
            {!bebidasMostrar ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : bebidasMostrar.length <= 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No se encontraron resultados.
                </td>
              </tr>
            ) : !searchTerm ? (
              bebidasMostrar.map((Bebida) => (
                <tr key={Bebida._id}>
                  <td>{Bebida._id}</td>
                  <td>
                    <img src={Bebida.Image} className="imagenTablas" alt="" />
                  </td>
                  <td>{Bebida.name}</td>
                  <td>{Bebida.Price}</td>
                  <td>{Bebida.Description}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        setSelectId(Bebida._id);
                        handleShow();
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        eliminarBebida(Bebida._id);
                        TraerProductos();
                      }}
                    >
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              bebidaFiltrada &&
              bebidaFiltrada.map((Bebida) => (
                <tr key={Bebida._id}>
                  <td>{Bebida._id}</td>
                  <td>
                    <img src={Bebida.Image} className="imagenTablas" alt="" />
                  </td>
                  <td>{Bebida.name}</td>
                  <td>{Bebida.Price}</td>
                  <td>{Bebida.Description}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        setSelectId(Bebida._id);
                        handleShow();
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        eliminarBebida(Bebida._id);
                        TraerProductos();
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
        {/*<EditarComida show={show} setShow={setShow} handleClose={handleClose} />*/}
        <EditarBebida show={show} setShow={setShow} handleClose={handleClose} />
      </div>
      <div className="pagination d-flex justify-content-center">
        {Bebidas &&
          Bebidas.length > bebidasPerPage &&
          Array.from({
            length: Math.ceil(Bebidas.length / bebidasPerPage),
          }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
    </>
  );
};

export default TablaBebidas;
