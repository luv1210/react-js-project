import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" className="shadow-sm">
            <Container>
                <Navbar.Brand className="fw-bold text-uppercase mx-auto">
                    <FaUsers className="me-2" />
                    Employee Management
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;