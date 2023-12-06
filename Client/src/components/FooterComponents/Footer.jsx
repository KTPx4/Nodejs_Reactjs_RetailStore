import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const FooterCpn =  () =>{
    let expand = "sm"
    return(
        <Navbar
            sticky="bottom"
            key={expand}
            expand={expand}
            className="bg-body-tertiary "
          
        >

          <Container fluid>
            <Navbar.Brand href="#">Footer</Navbar.Brand>           
            
          </Container>
        </Navbar>
    
    )
}

export default FooterCpn;