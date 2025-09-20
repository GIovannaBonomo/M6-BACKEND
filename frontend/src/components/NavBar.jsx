import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


function NavBar({ searchTerm, setSearchTerm, isLogged, setIsLogged }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="bg-dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Strive Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add-post">Nuovo Post</Nav.Link>
            <Nav.Link href="/">Tutti i Post</Nav.Link>
            <Nav.Link as={Link} to="/authors">Autori</Nav.Link>

          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Cerca..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light">Cerca</Button>
          </Form>
          {isLogged ? (
            <Button className="ms-2" variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link className="btn btn-primary ms-2" to="/login">Login</Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}
export default NavBar;