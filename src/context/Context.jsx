import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useAsyncError } from "react-router-dom"


export const ProductosContext = createContext()

export const ProductosProvider = ({children}) => {

    const [selectId,setSelectId] = useState()  
    const [comida, setComida] = useState()
    const [bebida, setBebida] = useState()
    const url = import.meta.env.VITE_API_BACK
    const [Token, setToken] = useState()
    const [Comidas, setComidas] = useState()
    const [Bebidas, setBebidas] = useState()
    const [Usuarios, setUsuarios] = useState()
    const [Usuario, setUsuario] = useState()
    const [MostrarInicioSesion, setMostrarInicioSesion] = useState()
    const [MostrarTabla, setMostrarTabla] = useState(true)
    const [imagenesCarrusel, setImagenesCarrusel] = useState()
    const [imagen, setImagen] = useState()
    const [imagenesComidas, setImagenesComidas] = useState()
    const [imagenesBebidas, setImagenesBebidas] = useState()
    
    useEffect(() => {
        if (!Token) {
            setToken(localStorage.getItem("Token"))
        }
    }, [Token])

    console.log(Token);

    const TraerProductos = async () =>{

        try {
            const resComidaBack = await axios.get(`${url}/Comida`)
            const resComida = await resComidaBack.data
            const resBebidaBack = await axios.get(`${url}/Bebida`)
            const resBebida = await resBebidaBack.data
            const resUsuariosBack = await axios.get(`${url}/usuarios`)
            const resUsuarios = await resUsuariosBack.data
            setUsuarios(resUsuarios)
            setBebidas(resBebida)
            setComidas(resComida)
        } catch (error) {
            console.log(error);
        }
    }

    const traerImagenesCarrusel = async () => {
        try {
            const res = await axios.get(`${url}/ImgCarrusel`)
            setImagenesCarrusel(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const traerComidasCarrusel = async () => {
        try {
            const res = await axios.get(`${url}/ImgComidas`)
            setImagenesComidas(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const traerBebidasCarrusel = async () => {
        try {
            const res = await axios.get(`${url}/ImgBebidas`)
            setImagenesBebidas(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const imagenCarruselPorId = async () => {
        try {
            const res = await axios.get(`${url}/ImgCarrusel/${selectId}`)
            setImagen(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    

    const comidaPorId = async () =>{
        try {
                const res = await axios.get(`${url}/Comida/${selectId}`)
                setComida(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const bebidaPorId = async () => {
        try {
            const res = await axios.get(`${url}/Bebida/${selectId}`)
            setBebida(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const usuarioPorId = async () => {
        try {
            const res = await axios.get(`${url}/usuarios/${selectId}`)
            setUsuario(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const PasarStates = {
        MostrarInicioSesion,
        MostrarTabla,
        setMostrarInicioSesion,
        setMostrarTabla,
        selectId,
        setSelectId,
        comida,
        bebida,
        setBebida,
        setComida,
        Usuario,
        setUsuario,
        Usuarios,
        imagenesCarrusel,
        setImagenesCarrusel,
        imagen,
        setImagen,
        imagenesComidas,
        imagenesBebidas,
        Token

    }

    const PasarDatos = {
        Comidas,
        Bebidas,
        TraerProductos,
        PasarStates,
        comidaPorId,
        bebidaPorId,
        usuarioPorId,
        traerImagenesCarrusel,
        imagenCarruselPorId,
        traerBebidasCarrusel,
        traerComidasCarrusel
    }

  return (
    <>
        <ProductosContext.Provider value={PasarDatos}>
            {children}
        </ProductosContext.Provider>
    </>
  )
}

