import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import { ProductosProvider } from "./context/Context"
import Rutas from "./routes/Rutas"

function App() {


  return (
    <>
    <ProductosProvider>
      <NavBar />
      <main>
        <Rutas />
      </main>
      <Footer />
    </ProductosProvider>
    </>
  )
}

export default App
