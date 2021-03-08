import React from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {LinkContainer} from "react-router-bootstrap"
import SearchInput from './SearchInput';

const Header = props => {
  const userName = useSelector(state => state.auth.name)
  
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand className="ml-4">Parroquia San Esteban - Tepecoyo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer exact to="/bautismos">
              <Nav.Link>Bautismo</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/confirmaciones">
              <Nav.Link>Confirmación</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/matrimonios">
              <Nav.Link>Matrimonios</Nav.Link>
            </LinkContainer>
            
          </Nav>
          <Nav className="ml-auto mr-4">
            {props.onSearch? <SearchInput onSearch={props.onSearch} placeholder={props.placeholder}/> : null}
            <Navbar.Text className="text-white font-weight-bold">{userName}</Navbar.Text>
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
