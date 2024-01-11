import React, { useContext, useEffect } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import { ProductosContext } from "../../../context/Context";
import "../../../style/InicioSesion.css"
import axios from "axios";

const InicioSesion = () => {
  const { Usuario, PasarStates } = useContext(ProductosContext);
  const {MostrarTabla, setMostrarTabla} = PasarStates

  const back = import.meta.env.VITE_API_BACK

  const regexContraseña = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  const esquemaInicioSesion = Yup.object().shape({
    Usuario: Yup.string()
      .required("El usuario es requerido")
      .min(6, "El usuariod debe ser igual o mayor a 6 digitos")
      .max(15, "El usuario debe ser igual o menor a 15 digitos"),

    Contraseña: Yup.string()
      .required("La contraseña es requerida")
      .min(5, "La contraseña debe ser igual o mayor a 5 digitos")
      .max(14, "La contraseña debe ser igual o menor a 14 digitos")
      .matches(
        regexContraseña,
        "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula."
      ),
  });

  const valoresIniciales = {
    Usuario: "",
    Contraseña: "",
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaInicioSesion,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const user = {
          name: values.Usuario,
          password: values.Contraseña
        }

        const response = await axios.post(`${back}/login`, user)

        console.log(response.data.message);

        setMostrarTabla(true)
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="text-center">
        <h1>Inicia Sesion</h1>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Stack gap={2}>
            <Form.Group className="Contenedor-Inputs">
              <Form.Label>Usuario:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese un usuario"
                id="Usuario"
                minLength={6}
                maxLength={15}
                {...formik.getFieldProps("Usuario")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.Usuario && formik.errors.Usuario,
                  },
                  {
                    "is-valid":
                      formik.touched.Usuario && !formik.errors.Usuario,
                  }
                )}
              />
              {formik.touched.Usuario && formik.errors.Usuario && (
                <div>
                  <span className="text-danger">{formik.errors.Usuario}</span>
                </div>
              )}
            </Form.Group>
            <Form.Group className="Contenedor-Inputs">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese una Contraseña"
                id="Contraseña"
                minLength={5}
                maxLength={14}
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
                  <span className="text-danger">
                    {formik.errors.Contraseña}
                  </span>
                </div>
              )}
            </Form.Group>
          </Stack>
          <Button className="mt-3" type="submit">
            Iniciar Sesion
          </Button>
        </Form>
      </div>
    </>
  );
};

export default InicioSesion;
