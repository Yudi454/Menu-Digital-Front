
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


function NavBar() {

  const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Nombre/Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav-link' to={"/"} >Inicio</Link>
            <Link className='nav-link' to={"/CatalogoComida"} >Comida</Link>
            <Link className='nav-link' to={"/CatalogoBebida"} >Bebida</Link>
            <Link className='nav-link' to={"/Administracion"}>Administracion</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;