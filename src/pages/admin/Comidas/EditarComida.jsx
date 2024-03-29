import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import axios from "axios";
import { ProductosContext } from "../../../context/Context";
import Swal from "sweetalert2";

const EditarComida = ({ show, setShow, handleClose }) => {
  const { PasarStates, TraerComidas } = useContext(ProductosContext);

  const { selectId, setSelectId, comida, setComida, Token } = PasarStates;

  const back = import.meta.env.VITE_API_BACK;

  const regexSoloLetra = /^[A-Za-z]+( [A-Za-z]+)?$/;
  const regexDescripcion = /^(?!.*\s{3,}).*$/;

  const esquemaComida = Yup.object().shape({
    Nombre: Yup.string()
      .required("El nombre es requerido")
      .min(4, "El Nombre debe ser igual o mayor a 4 letras")
      .max(15, "El Nombre debe ser igual o menor a 15 digitos")
      .matches(regexSoloLetra, "El nombre solo debe contener letras"),

    Precio: Yup.number()
      .required("El precio es requerido")
      .min(1, "El precio debe ser igual o mayor a 1 digitos")
      .max(10000, "El precio debe ser igual o menor a 100000 digitos"),

    Descripcion: Yup.string()
      .required("La descripcion es requerida")
      .min(15, "La descripcion debe tener 15 o mas digitos")
      .max(50, "La descripcion debe tener 50 o menos digitos")
      .matches(regexDescripcion, "No se permiten multiples espacios"),

    Imagen: Yup.string(),
  });

  const valoresIniciales = {
    Nombre: "",
    Precio: 0,
    Descripcion: "",
    Imagen: "",
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaComida,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        Swal.fire({
          title: "Estas seguro de editar la comida?",
          text: "Puede cambiar los datos actualizados luego",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, estoy seguro!",
          cancelButtonText: "No, mejor no",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("name", values.Nombre);
            formData.append("Price", values.Precio);
            formData.append("Description", values.Descripcion);
            formData.append("Image", values.Imagen);

            const response = await axios.put(
              `${back}/Comida/${selectId}`,
              formData,
              {
                headers: {
                  "auth-token": Token,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            TraerComidas();
            handleClose();
            formik.resetForm();
            setComida(undefined);
            setSelectId("");

            console.log(response.data.message);

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
    },
  });

  const establecerDatos = async () => {
    if (comida) {
      formik.setFieldValue("Nombre", comida.name),
        formik.setFieldValue("Precio", comida.Price),
        formik.setFieldValue("Descripcion", comida.Description);
    }
  };

  useEffect(() => {
    establecerDatos();
  }, [comida]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario para Editar Comida</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Modal.Body>
            <Stack gap={2}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese un nombre a la comida"
                  id="Nombre"
                  min={4}
                  max={15}
                  {...formik.getFieldProps("Nombre")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.Nombre && formik.errors.Nombre,
                    },
                    {
                      "is-valid":
                        formik.touched.Nombre && !formik.errors.Nombre,
                    }
                  )}
                />
                {formik.touched.Nombre && formik.errors.Nombre && (
                  <div>
                    <span className="text-danger">{formik.errors.Nombre}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese un precio"
                  min={1}
                  max={10000}
                  {...formik.getFieldProps("Precio")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.Precio && formik.errors.Precio,
                    },
                    {
                      "is-valid":
                        formik.touched.Precio && !formik.errors.Precio,
                    }
                  )}
                />
                {formik.touched.Precio && formik.errors.Precio && (
                  <div>
                    <span className="text-danger">{formik.errors.Precio}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese una descripcion"
                  min={15}
                  max={50}
                  {...formik.getFieldProps("Descripcion")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.Descripcion && formik.errors.Descripcion,
                    },
                    {
                      "is-valid":
                        formik.touched.Descripcion &&
                        !formik.errors.Descripcion,
                    }
                  )}
                />
                {formik.touched.Descripcion && formik.errors.Descripcion && (
                  <div>
                    <span className="text-danger">
                      {formik.errors.Descripcion}
                    </span>
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="Imagen"
                  onChange={(e) => {
                    formik.setFieldValue("Imagen", e.currentTarget.files[0]);
                  }}
                />
                {formik.touched.Imagen && formik.errors.Imagen && (
                  <div>
                    <span className="text-danger">{formik.errors.Imagen}</span>
                  </div>
                )}
              </Form.Group>
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => {
                setSelectId(""), handleClose(), setComida(undefined);
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
  );
};

export default EditarComida;
