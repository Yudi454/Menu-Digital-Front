import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import axios from "axios";
import { ProductosContext } from "../../../context/Context";
import Swal from "sweetalert2";

const EditarUsuario = ({ show, setShow, handleClose }) => {

    const { PasarStates, usuarioPorId, TraerProductos } = useContext(ProductosContext);

  const { selectId, setSelectId, Usuario, setUsuario } = PasarStates

  const back = import.meta.env.VITE_API_BACK
  
  const regexEspacio = /^\S*$/  ;
  const regexContraseña = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  const esquemaUsuario = Yup.object().shape({
    Nombre: Yup.string()
      .required("El nombre es requerido")
      .min(5, "El Nombre debe ser igual o mayor a 5 caracteres")
      .max(15, "El Nombre debe ser igual o menor a 15 caracteres")
      .matches(regexEspacio, "El nombre solo debe contener letras"),

    Contraseña: Yup.string()
      .required("La contraseña es requerida")
      .min(6, "La contraseña debe ser igual o mayor a 6 caracteres")
      .max(16, "La contraseña debe ser igual o menor a 16 caracteres")
      .matches(
        regexContraseña,
        "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula."
      ),
  });

  const valoresIniciales = {
    Nombre: "",
    Contraseña: "",
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaUsuario,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values);

      try {
        Swal.fire({
            title: "Estas seguro de editar el usuario?",
            text: "Puede modificar los datos actualizados luego",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, estoy seguro!",
            cancelButtonText: "No, mejor no",
        }).then(async (result) => {
          if (result.isConfirmed) {
            
            const usuario = {
              name: values.Nombre,
              password: values.Contraseña,
            };

            const response = await axios.put(`${back}/usuarios/${selectId}`, usuario);

            TraerProductos()
            handleClose()
            formik.resetForm()
            setUsuario(undefined)
            setSelectId("")

            console.log(response.data.message);

            Swal.fire(
              "Usuario modificado!",
              "Modificacion realzada exitosamente",
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
    if (Usuario) {
        formik.setFieldValue("Nombre", Usuario.name)
    }
  }

  useEffect(() => {
    establecerDatos()
  
  }, [Usuario])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario para Editar un Usuario</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Modal.Body>
            <Stack gap={2}>
              <Form.Group>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del Usuario"
                  id="Nombre"
                  min={5}
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
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese una contraseña"
                  min={6}
                  max={16}
                  {...formik.getFieldProps("Contraseña")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.Contraseña && formik.errors.Contraseña,
                    },
                    {
                      "is-valid":
                        formik.touched.Contraseña && !formik.errors.Contraseña,
                    }
                  )}
                />
                {formik.touched.Contraseña && formik.errors.Contraseña && (
                  <div>
                    <span className="text-danger">{formik.errors.Contraseña}</span>
                  </div>
                )}
              </Form.Group>
            </Stack>
          </Modal.Body>
          <Modal.Footer>
          <Button
              variant="secondary"
              onClick={(e) => {
                setSelectId(""), handleClose(), setUsuario(undefined);
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Editar Usuario
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditarUsuario