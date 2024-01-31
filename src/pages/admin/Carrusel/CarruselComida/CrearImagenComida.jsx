import { useContext, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import axios from "axios";
import Swal from "sweetalert2";
import { ProductosContext } from "../../../../context/Context";

const CrearImagenComida = () => {
  const [show, setShow] = useState(false);

  const { TraerProductos, PasarStates, traerComidasCarrusel } =
    useContext(ProductosContext);

  const { imagenesComidas, Token } = PasarStates;

  const back = import.meta.env.VITE_API_BACK;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let posicionPrimera = ""
  let posicionSegunda = ""
  let posicionTercera = ""

{if (imagenesComidas) {
posicionPrimera = imagenesComidas.find((imagen) => imagen.Position === "Primera")
posicionSegunda = imagenesComidas.find((imagen) => imagen.Position === "Segunda")
posicionTercera = imagenesComidas.find((imagen) => imagen.Position === "Tercera")
}}


  const esquemaImagenPromocional = Yup.object().shape({
    Imagen: Yup.string().required("El nombre es requerido"),

    Posicion: Yup.string().required("La posición es requerida"),
  });

  const valoresIniciales = {
    Imagen: "",
    Posicion: "",
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaImagenPromocional,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {

      try {
        Swal.fire({
          title: "Estas seguro de crear esta imagen?",
          text: "Luego lo puede modificar",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, estoy seguro!",
          cancelButtonText: "No, mejor no",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("Image", values.Imagen);
            formData.append("Position", values.Posicion);
            formData.append("Function", "Comida");

            const response = await axios.post(`${back}/ImgCarrusel`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            traerComidasCarrusel();
            handleClose();
            formik.resetForm();

            Swal.fire(
              "Imagen creada!",
              "Creación realzada exitosamente",
              "success"
            );
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      {imagenesComidas && imagenesComidas.length === 3 ? (
      <div className="text-center">
        <h3>No puede crear mas imagenes hasta que eimine alguna</h3>
      </div>
    ): ( 
      <Button variant="primary" onClick={handleShow}>
        Crear Imagen
      </Button>
    )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario para Crear una Imagen en el Carrusel de Comidas</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Modal.Body>
            <Stack gap={2}>
              <Form.Group>
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="Imagen"
                  onChange={(e) => {
                    formik.setFieldValue("Imagen", e.currentTarget.files[0]);
                  }}
                  className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Imagen && formik.errors.Imagen
                    },{
                        "is-valid" : formik.touched.Imagen && !formik.errors.Imagen
                    }
                  )}
                />
                {formik.touched.Imagen && formik.errors.Imagen && (
                  <div>
                    <span className="text-danger">{formik.errors.Imagen}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Posción:</Form.Label>
                <Form.Select
                  id="Posicion"
                  {...formik.getFieldProps("Posicion")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.Posicion && formik.errors.Posicion,
                    },
                    {
                      "is-valid":
                        formik.touched.Posicion && !formik.errors.Posicion,
                    }
                  )}
                >
                  <option value="">Selecciona una opción</option>
                  {!posicionPrimera && (
                    <option value="Primera">Primera</option>
                  )}
                  {!posicionSegunda && (
                    <option value="Segunda">Segunda</option>
                  )}
                  {!posicionTercera && (
                    <option value="Tercera">Tercera</option>
                  )}
                </Form.Select>
                {formik.touched.Posicion && formik.errors.Posicion && (
                  <div>
                    <span className="text-danger">
                      {formik.errors.Posicion}
                    </span>
                  </div>
                )}
              </Form.Group>
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Crear Imagen
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </>
  );
};

export default CrearImagenComida;
