import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ProfileModal from "../../pages/Account/User/Profile";
import { jwtDecode } from 'jwt-decode';

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";

const HeaderNav = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [urlServer, setUrlServer] = useState(process.env.REACT_APP_SERVER || 'http://localhost:3001');  
  
  const [NameUser, setNameUser] = useState('');
  const [idUser, setUserId] = useState('');
  const [avt, setAvt] = useState('');
  const [email, setEmail] = useState(''); 
  const [selectedImage, setSelectedImage] = useState('');
  let modalProfile = <></>

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem(_Token_Auth);
      const decoded = jwtDecode(token);
      console.log(decoded);
      setUserId(decoded.id);
      setNameUser(decoded.fullName);
      setAvt(decoded.avt);
      setEmail(decoded.email);
      setSelectedImage(`${urlServer}/images/account/${decoded.id}/${decoded.avt}`);
    };

    fetchData();
  }, [urlServer]);

  useEffect(() => {
   
      
    
  }, [idUser, NameUser,avt, email]);

  const LogOut = () => {
    if (localStorage.getItem(_Token_Auth)) {
      localStorage.removeItem(_Token_Auth);
      window.location.href = "/account/login";
    }
  };

  const isAdmin = useSelector((state) => state.isAdmin);

  let DIManagerAccount = <></>;

  let expand = "sm";

  if (isAdmin) {
    DIManagerAccount = (
      <NavDropdown
        className="Menu-Title-account"
        title="Tài Khoản"
        id={`offcanvasNavbarDropdown-expand-${expand}`}
      >
        <NavDropdown.Item href="/account/admin">
          Quản Lý Tài Khoản
        </NavDropdown.Item>

        <NavDropdown.Divider />
        <NavDropdown.Item href="#">Để cho đẹp</NavDropdown.Item>
        <NavDropdown.Item href="#">Để cho đẹp</NavDropdown.Item>
        <NavDropdown.Item href="#">Để cho đẹp</NavDropdown.Item>
      </NavDropdown>
    );
  }

  if(NameUser && idUser && email && avt)
  {
    console.log('....', idUser, NameUser,avt, email);
    modalProfile =
    <ProfileModal
      showModal={isProfileModalOpen}
      handleClose={() => setProfileModalOpen(false)}
      ID={idUser}
      NAME={NameUser}
      AVT={avt}
      EMAIL={email}
  />
  }

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/css/Navbar/navbar.css" />
        <link rel="stylesheet" type="text/css" href="/css/account/profile.css" />
      </Helmet>
      {modalProfile}
      <div className="navbar-main-">
      <Navbar sticky="top" key={expand} expand={expand} className=" mb-3 navbar-top nvbar-main-">
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
            <Offcanvas.Body className="nav-body">
              <Nav className="justify-content-center flex-grow-1 pe-3 nav-menu">
              {DIManagerAccount}
                
                
                <Nav.Link className="Menu-Title-product" href="/">Sản Phẩm</Nav.Link>
              </Nav>
              <figure>
                <button className="" onClick={() => setProfileModalOpen(true)}>
                  <img src={selectedImage} alt="User Avatar" />
                </button>
                <Button variant="outline-info btn-logout" onClick={LogOut}>
                  Đăng Xuất
                </Button>
              </figure>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      </div>
    </HelmetProvider>
  );
};

export default HeaderNav;
