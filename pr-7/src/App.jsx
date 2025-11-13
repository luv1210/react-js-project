import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import AddMovie from "./Components/AddMovie";
import EditMovie from "./Components/EditMovie";
import MovieDetails from "./Components/MovieDetails";

function App() {
  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar bg="secondary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/"> Movie App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/add">Add Movie</Nav.Link>
              {/* <Nav.Link as={Link} to="/edit">Edit Movie</Nav.Link> */}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMovie />} />
          
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/edit/:id" element={<EditMovie />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
