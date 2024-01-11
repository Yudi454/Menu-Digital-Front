import { useContext, useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { ProductosContext } from "../../../context/Context";
import EditarImagenPromocional from "./EditarImagenPromocional";

const TablaImagenPromocional = () => {
  const { PasarStates, imagenCarruselPorId, traerImagenesCarrusel } =
    useContext(ProductosContext);

  const { selectId, setSelectId, imagen, imagenesCarrusel } = PasarStates;

  const back = import.meta.env.VITE_API_BACK;

  const [imagenEliminada, setImagenEliminada] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagenesMostrar, setImagenesMostrar] = useState();
  const [imagenFiltrada, setImagenFiltrada] = useState("");
  const imagenesPerPage = 5;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    traerImagenesCarrusel();
  }, [imagenEliminada]);

  
  const indexOfLastImagen = currentPage * imagenesPerPage;
  const indexOfFirstImagen = indexOfLastImagen - imagenesPerPage;

  useEffect(() => {
    if (imagenesCarrusel) {
      const currentImagenes = imagenesCarrusel.slice(
        indexOfFirstImagen,
        indexOfLastImagen
      );
      setImagenesMostrar(currentImagenes);
    }
  }, [imagenesCarrusel, indexOfFirstImagen, indexOfLastImagen]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (imagen == undefined && selectId) {
      imagenCarruselPorId();
    }
  }, [selectId]);



  const eliminarImagen = (id) => {
    try {
      Swal.fire({
        title: "Estas seguro de eliminar la imagen?",
        text: "No se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "No, mejor no",
      }).then((result) => {
        if (result.isConfirmed) {
          const res = axios.delete(`${back}/ImgCarrusel/${id}`);
          console.log(res);

          setImagenEliminada(true);

          Swal.fire(
            "Imagen eliminada!",
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
      <div className="Contenedor-Tabla-Chica">
        <Table striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
              <th>Posicion</th>
              <th>Funcion</th>
              <th>Accuiones</th>
            </tr>
          </thead>
          <tbody>
            {!imagenesMostrar ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : imagenesMostrar.length <= 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No se encontraron resultados.
                </td>
              </tr>
            ) : (
                imagenesMostrar.map((Imagen) => (
                <tr key={Imagen._id}>
                  <td>{Imagen._id}</td>
                  <td>
                    <img src={Imagen.Image} className="imagenTablas" alt="" />
                  </td>
                  <td>{Imagen.Position}</td>
                  <td>{Imagen.Function}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        setSelectId(Imagen._id);
                        handleShow();
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        eliminarImagen(Imagen._id);
                        traerImagenesCarrusel();
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
        <EditarImagenPromocional show={show} setShow={setShow} handleClose={handleClose} />
      </div>
      <div className="pagination d-flex justify-content-center">
        {imagenesCarrusel &&
          imagenesCarrusel.length > imagenesPerPage &&
          Array.from({
            length: Math.ceil(imagenesCarrusel.length / imagenesPerPage),
          }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
    </>
  );
};

export default TablaImagenPromocional;
