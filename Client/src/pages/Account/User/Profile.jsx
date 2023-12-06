import { Helmet, HelmetProvider } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import {Alert,  Modal, Button, Form, Image } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';


const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';
const _SECRET_KEY_LOGIN = process.env.REACT_APP__SECRET_KEY_LOGIN || 'token-login-account'


function ProfileModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [fullName, setFullName] = useState(""); 
  const [oldPass, setOldPass] = useState('')
  const [newPass, setnewPass] = useState('')
  const [confirmPass, setconfirmPass] = useState('')

  
  const [ErrorMess, setError] = useState('')
  
  const [isChangePass, setIsChangePass] = useState(false);
 
  const [showPassword, setShowPassword] = useState(false);

  const [ButtonPass, setButtonPass] = useState(<></>);

  const [isLoading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState('/img/account/3.jpg');


  useEffect(() => {
    setButtonPass(
      <>
        <Button variant="warning" onClick={handleAddInput}>
          Thay đổi mật khẩu
        </Button>
      </>
    );

    // load từ db dữ liệu - session
    let token = localStorage.getItem(_Token_Auth)
    
    const decoded = jwtDecode(token);
    let fullName = decoded.fullName
    setFullName(fullName)
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
     
      reader.readAsDataURL(file);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);

    // this.setState({showPassword: !showPassword})
  };
 
  const handleAddInput = () => {
    setIsChangePass(true);
    setButtonPass(
      <>
        {" "}
        <Button variant="secondary" onClick={handleCloseInput}>
          Hủy
        </Button>
      </>
    );
  };

  const handleCloseInput = () => {
    setIsChangePass(false);
    
    setButtonPass(
      <>
        <Button variant="warning" onClick={handleAddInput}>
          Thay đổi mật khẩu
        </Button>
      </>
    );
  };

  const handleSave = () => {
    if(!fullName)
    {
        setError('Vui lòng nhập đầy đủ họ tên')
        return;
    }
    if(isChangePass)
    {
        if(!oldPass)
        {
            setError('Vui lòng nhập mật khẩu cũ')
            return;
        }
        
        if(!newPass)
        {
            setError('Vui lòng nhập mật khẩu mới')
            return;
        }
    
        if(confirmPass != newPass)
        {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp')
            return;
        }
    }
 
   
    // setLoading(true)
  };

  const ClearError = ()=>{
    setError('')
  }

  return (
    <HelmetProvider>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="/css/account/profile.css"
        />
      </Helmet>
      <Button variant="primary" onClick={handleShow}>
        Quản lý hồ sơ
      </Button>

      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quản lý hồ sơ</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              {/* src={avatar} */}
              <div className="text-center">
                <label htmlFor="imageInput">
                    <Image src={selectedImage}  className="img" /> 

                </label>
                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                    onChange={handleImageChange}
                ></input>
              </div>
              <br />

              {/* <Form.Control type="file" onChange={handleImageUpload} /> */}
            </Form.Group>
            <Form.Group>
              {/* <Form.Label>Họ và Tên</Form.Label> */}

              {/* value={fullName} */}
              <Form.Control
              placeholder="Họ và Tên"
              className="text-center"
                type="text"
                defaultValue={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={ClearError}
              />
            </Form.Group>
            <br />
            <Form.Group id="group-changePass">
              <div className="btnChangePass text-center">{ButtonPass}</div>
              {isChangePass && (
                <>
                  <div className="old-password pass">
                    <Form.Control
                      placeholder="Mật khẩu cũ"
                      className="input-password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setOldPass(e.target.value)}
                      onFocus={ClearError}
                    />
                    <i
                      onClick={toggleShowPassword}
                      className={`showpass fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </div>
                  <div className="new-password pass">
                    <Form.Control
                      placeholder="Mật khẩu mới"
                      className="input-password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setnewPass(e.target.value)}
                      onFocus={ClearError}
                    />
                  </div>
                  <div className="confirm-password pass">
                    <Form.Control
                      placeholder="Xác nhận mật khẩu"
                      className="input_password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setconfirmPass(e.target.value)}
                      onFocus={ClearError}
                    />
                  </div>
                </>
              )}
              <br />
              {ErrorMess && ( 
              <Alert variant="danger">
                {ErrorMess}
            </Alert>)}
             
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            {isLoading && (<div className="lds-ripple"><div></div><div></div></div>)}
            
          <Button className="btn-save" variant="info" onClick={handleSave}>
            Lưu thay đổi
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </HelmetProvider>
  );
}

export default ProfileModal;
