import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import axios from "axios";
import { ProductosContext } from "../../../../context/Context";
import Swal from "sweetalert2";
const EditarImagenComida = ({ show, setShow, handleClose }) => {

    const { PasarStates, imagenCarruselPorId, traerComidasCarrusel } =
    useContext(ProductosContext);

  const { selectId, setSelectId, imagen, setImagen, imagenesComidas } =
    PasarStates;

  const back = import.meta.env.VITE_API_BACK;

  const esquemaImagenPromocional = Yup.object().shape({
    Imagen: Yup.string(),

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
          title: "Estas seguro de editar esta imagen?",
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

            const response = await axios.put(
              `${back}/ImgCarrusel/${selectId}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            traerComidasCarrusel();
            handleClose();
            formik.resetForm();

            console.log(response.data.message);

            Swal.fire(
              "Imagen editada!",
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

  const establecerDatos = async () => {
    if (imagen) {
      formik.setFieldValue("Posicion", imagen.Position);
    }
  };

  useEffect(() => {
    establecerDatos();
  }, [imagen]);

  let posicionPrimera = ""
  let posicionSegunda = ""
  let posicionTercera = ""

                    {if (imagenesComidas) {
                      posicionPrimera = imagenesComidas.find((imagen) => imagen.Position === "Primera")
                      posicionSegunda = imagenesComidas.find((imagen) => imagen.Position === "Segunda")
                      posicionTercera = imagenesComidas.find((imagen) => imagen.Position === "Tercera")
                    }}

  return (
    <>
         <Modal show={show} onHide={() =>{setSelectId(""), handleClose(), setImagen(undefined)}}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario para Editar la Imagen</Modal.Title>
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
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.Imagen && formik.errors.Imagen,
                    },
                    {
                      "is-valid":
                        formik.touched.Imagen && !formik.errors.Imagen,
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
                  {(!posicionPrimera ||
                    (imagen && imagen.Position === "Primera")) && (
                    <option value="Primera">Primera</option>
                  )}
                  {(!posicionSegunda ||
                    (imagen && imagen.Position === "Segunda")) && (
                    <option value="Segunda">Segunda</option>
                  )}
                  {(!posicionTercera ||
                    (imagen && imagen.Position === "Tercera")) && (
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
            <Button
              variant="secondary"
              onClick={(e) => {
                setSelectId(""), handleClose(), setImagen(undefined);
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditarImagenComida