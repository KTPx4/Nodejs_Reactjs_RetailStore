import { Helmet, HelmetProvider } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import {Alert,  Modal, Button, Form, Image } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';
const _SECRET_KEY_LOGIN = process.env.REACT_APP__SECRET_KEY_LOGIN || 'token-login-account'


const ProfileModal = ({ showModal, handleClose , ID, NAME,  AVT, EMAIL , me})  => {

  const [show, setShow] = useState(showModal);
 
  const handleShow = () => setShow(true);
  
  const [fullName, setFullName] = useState(""); 
  const [oldPass, setOldPass] = useState('')
  const [newPass, setnewPass] = useState('')
  const [confirmPass, setconfirmPass] = useState('')

  
  const [ErrorMess, setError] = useState('')
  const [SuccessMess, setSuccess] = useState('')
  
  const [isChangePass, setIsChangePass] = useState(false);
 
  const [showPassword, setShowPassword] = useState(false);

  const [ButtonPass, setButtonPass] = useState(<></>);

  const [isLoading, setLoading] = useState(false)
  const [urlServer, setUrlServer] = useState(process.env.REACT_APP_SERVER || 'http://localhost:3001');
  const [selectedImage, setSelectedImage] = useState('/img/account/3.jpg');
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState('')

  useEffect(() => {    
    
    let idUser = ID
    let avt = AVT
    setFullName(NAME);
    setSelectedImage(AVT);
    setEmail(EMAIL);
    setSelectedImage(`${urlServer}/images/account/${idUser}/${avt}`)
  }, [ID, NAME,  AVT, EMAIL]);

 
  useEffect(() => {
    if(me)
    {
      
      setButtonPass(
        <>
          <Button variant="warning" onClick={handleAddInput}>
            Thay đổi mật khẩu
          </Button>
        </>
      );  
    }

  }, []);
  
 

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
     
      reader.readAsDataURL(f);
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
        
        <Button variant="secondary" onClick={handleCloseInput}>
          Hủy
        </Button>
      </>
    );
  };

  const handleCloseInput = () => {
    setIsChangePass(false);
    ClearMess()
    setButtonPass(
      <>
        <Button variant="warning" onClick={handleAddInput}>
          Thay đổi mật khẩu
        </Button>
      </>
    );
  };

  const handleSave = () => {
    setSuccess('')
   // console.log(fullName);
    if(!fullName)
    {
        setError('Vui lòng nhập đầy đủ họ tên')
        return;
    }
    let formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);

    if(file !== null)
    {
     // console.log("Not null file: ", file);
      formData.append("avt", file);
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
      formData.append("oldPass", oldPass);
      formData.append("newPass", newPass);
      
    }


    const tokenLogin = localStorage.getItem(_Token_Auth) || '';
    let serverLogin = `${urlServer}/api/account/profile`;
   
   
    setLoading(true)
    setTimeout(async()=>{
      await axios({
          url: serverLogin,
          method: 'PUT',
          headers: {
              authorization: `bearer ${tokenLogin}`,
              "Content-Type": 'multipart/form-data' // token auth login,
              
          },
          data: formData
      })
      .then((res) => {

          let code = res.data.code;
          let message = res.data.message;
        
          setLoading(false)
          if (code === 400) 
          {
              setError(message);
          } 
          else if(code === 500)
          {
              setError("Không Thể Kết Nối Đến Server");
          }
          else if (code === 200) 
          { 
            localStorage.setItem(_Token_Auth, res.data.data.token)
            setError('');
            setSuccess('Cập Nhật Thông Tin Thành Công!')
            setTimeout(()=>{
              window.location.reload();
            }, 1200)
          }
      })
      .catch((err) => {
          console.log("Error at login fetch: ", err);
          setError('Lỗi Khi Kết Nối Server');
      });
  }, 1800)
  };

  const ClearMess = ()=>{
    setError('')
    setSuccess('')
  }
 
  return (
    <Modal show={showModal} onHide={handleClose}>
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
            </Form.Group>
            <Form.Group>         
              <Form.Control
              placeholder="Họ và Tên"
              className="text-center"
                type="text"
                defaultValue={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={ClearMess}
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
                      onFocus={ClearMess}
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
                      onFocus={ClearMess}
                    />
                  </div>
                  <div className="confirm-password pass">
                    <Form.Control
                      placeholder="Xác nhận mật khẩu"
                      className="input_password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setconfirmPass(e.target.value)}
                      onFocus={ClearMess}
                    />
                  </div>
                </>
              )}
              <br />
              {ErrorMess && ( 
              <Alert variant="danger">
                {ErrorMess}
            </Alert>)}
              {SuccessMess && ( 
              <Alert variant="success">
                {SuccessMess}
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
    // <HelmetProvider>
    //   <Helmet>
    //     <link
    //       rel="stylesheet"
    //       type="text/css"
    //       href="/css/account/profile.css"
    //     />
    //   </Helmet>
    //   <Button variant="primary" onClick={handleShow}>
    //     Quản lý hồ sơ
    //   </Button>

      
    // </HelmetProvider>
  );
}

export default ProfileModal;
