import { useContext, useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { ProductosContext } from "../../../context/Context";
import EditarUsuario from "./EditarUsuario";

const TablaUsuarios = () => {
  const { PasarStates, TraerUsuarios, usuarioPorId } =
    useContext(ProductosContext);

  const { selectId, setSelectId, Usuarios, Usuario, Token } = PasarStates;

  const back = import.meta.env.VITE_API_BACK;

  const [usuarioEliminado, setUsuarioEliminado] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosMostrar, setUsuariosMostrar] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [usuarioFiltrado, setusuarioFiltrado] = useState("");
  const usuariosPerPage = 5;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    TraerUsuarios();
  }, [usuarioEliminado]);

  const indexOfLastUsuario = currentPage * usuariosPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;

  useEffect(() => {
    if (Usuarios) {
      const currentUsuarios = Usuarios.slice(
        indexOfFirstUsuario,
        indexOfLastUsuario
      );
      setUsuariosMostrar(currentUsuarios);
    }
  }, [Usuarios, indexOfFirstUsuario, indexOfLastUsuario]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (Usuario == undefined && selectId) {
      usuarioPorId();
    }
  }, [selectId]);

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (Usuarios && Usuarios.length > 0) {
      const filteredUsuarios = Usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setusuarioFiltrado(filteredUsuarios);
    }
  }, [Usuarios, searchTerm]);

  const eliminarUsuario = (id) => {
    try {
      Swal.fire({
        title: "Estas seguro de eliminar el usuario?",
        text: "No se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "No, mejor no",
      }).then((result) => {
        if (result.isConfirmed) {
          const res = axios.delete(`${back}/usuarios/${id}`, {
            headers: {
              "auth-token": Token
            },
          });
          console.log(res);

          setUsuarioEliminado(true);

          Swal.fire(
            "Usuario eliminada!",
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
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="Contenedor-Tabla-Chica">
        <Table striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!usuariosMostrar ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : usuariosMostrar.length <= 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No se encontraron resultados.
                </td>
              </tr>
            ) : !searchTerm ? (
              usuariosMostrar.map((Usuario) => (
                <tr key={Usuario._id}>
                  <td>{Usuario._id}</td>
                  <td>{Usuario.name}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        setSelectId(Usuario._id);
                        handleShow();
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        eliminarUsuario(Usuario._id);
                        TraerUsuarios();
                      }}
                    >
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              usuarioFiltrado &&
              usuarioFiltrado.map((Usuario) => (
                <tr key={Usuario._id}>
                  <td>{Usuario._id}</td>
                  <td>{Usuario.name}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        setSelectId(Usuario._id);
                        handleShow();
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        eliminarUsuario(Usuario._id);
                        TraerUsuarios();
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
        <EditarUsuario
          show={show}
          setShow={setShow}
          handleClose={handleClose}
        />
      </div>
      <div className="pagination d-flex justify-content-center">
        {Usuarios &&
          Usuarios.length > usuariosPerPage &&
          Array.from({
            length: Math.ceil(Usuarios.length / usuariosPerPage),
          }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
    </>
  );
};

export default TablaUsuarios;
