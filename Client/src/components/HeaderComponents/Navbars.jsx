import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from "react-redux";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';


const HeaderNav =  () =>{
    const LogOut = () =>{
        if(localStorage.getItem(_Token_Auth))
        {
            localStorage.removeItem(_Token_Auth)
            window.location.href= '/account/login'
        }
    }

    const isAdmin = useSelector((state)=> state.isAdmin)

    let DIManagerAccount = <></>
    
    

    if(isAdmin)
    {
      DIManagerAccount = (<NavDropdown.Item href="/account/admin">Quản Lý Tài Khoản</NavDropdown.Item>)
    }

    let expand = "sm"
    return (
      
      <Navbar
          sticky="top"
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3"
          
        >
            <Container fluid sticky="top">
          
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="top"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-center flex-grow-1 pe-3">                    
                    
                    <NavDropdown 
                      title="Tài Khoản"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                   
                        <NavDropdown.Item href="/account">Trang Cá Nhân</NavDropdown.Item>    
                        {DIManagerAccount}

                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link href="/">Sản Phẩm</Nav.Link>
                    <Button variant="outline-info" onClick={LogOut}>Đăng Xuất</Button>
                  </Nav>
                
                 
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
      
        </Navbar>
    );
   
}

export default HeaderNav;