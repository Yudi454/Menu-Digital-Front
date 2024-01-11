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

  const { imagenesComidas } = PasarStates;

  const back = import.meta.env.VITE_API_BACK;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h1>c</h1>
    </>
  );
};

export default CrearImagenComida;
