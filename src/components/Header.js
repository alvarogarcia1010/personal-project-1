import React from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap"
import SearchInput from './SearchInput';

const Header = props => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand className="ml-4">Alvaro's data client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer exact to="/productos">
              <Nav.Link>Productos</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/usuarios">
              <Nav.Link>Usuarios</Nav.Link>
            </LinkContainer>
            
          </Nav>
          <Nav className="ml-auto mr-4">
            {props.onSearch? <SearchInput onSearch={props.onSearch} placeholder={props.placeholder}/> : null}
            <Navbar.Text className="text-white font-weight-bold">{props.name}</Navbar.Text>
            <LinkContainer exact to="/logout">
              <Nav.Link>Salir</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header;
