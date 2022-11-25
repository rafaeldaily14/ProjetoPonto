import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap'


const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/ponto">Ponto</Nav.Link>
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/cadastro">Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="/relatorio">Relatorio</NavDropdown.Item>
                            <NavDropdown.Item href="/senhas">Senhas</NavDropdown.Item>                            
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;
