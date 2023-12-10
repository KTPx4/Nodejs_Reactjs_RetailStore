import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Alert, Modal, Button, Form, Image } from "react-bootstrap";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
const urlServer = process.env.REACT_APP_SERVER || "http://localhost:3001";
const urlSendEmail = urlServer + "/api/account/sendactive"


const ConfirmSendEmail = ({ show, handleClose, EMAIL }) => {
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");
  const [ClearForm, setClearForm]= useState(true)
  const [loading, setLoading] = useState(false);
  //let Reload = false;

  const tokenLogin = localStorage.getItem(_Token_Auth) || "";

  let AlertMessage = <></>;

  const ClearMess = () => {
    setError("");
    setSuccess('')
  };

  const handleSave = async () => {
    ClearMess(); 
   

    setLoading(true);
    setTimeout(async ()=>{
      try {
        console.log(urlSendEmail);
        const res = await SendMail(urlSendEmail, tokenLogin,  EMAIL);
        let code = res.code
        let mess = res.message
        ClearMess()
        if(code === 500)
        {
          window.location.replace('/error')
        }
        else if(code === 200)
        {
         // setLoading(false)
          setSuccess(mess)
         
          setTimeout(()=>{
            
            handleClose()
          }, 2300)
        }
        else
        {
          setLoading(false)
          setSuccess("")
          setError(mess)
        }
      } catch (error) {
        console.log("Error in ProtectedRoute:", error);
      }
    }, 500)
  

    return;
  };

  if (error) {
    AlertMessage = (
      <Alert variant="danger" className="AlertMessage text-center">
        <p className="mb-0">{error}</p>
      </Alert>
    );
  }

  if (success) {
    AlertMessage = (
      <Alert variant="success" className="AlertMessage text-center">
        <p className="mb-0">{success}</p>
      </Alert>
    );
  }

  if(ClearForm)
  {
    ClearMess()
    setClearForm(false)
  }
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/css/modal/addStaff.css" />
      </Helmet>
      {/* <Modal show={showModal} onHide={handleClose}> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="Modal-Add-Staff"
      >
        <div className="content">
          <Modal.Header>
            <Modal.Title className="text-Tilte">Gửi Email Kích Hoạt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center text">
                <h5>Bạn muốn gửi email kích hoạt đến email này?</h5>
                <div className="text-dark">
                <p>Email dùng để kích hoạt tài khoản</p>
                <p>Người dùng cũng có thể dùng nó như chức năng quên mật khẩu!</p>
                </div>
            </div>
            <div className="input-Email input-modal">
              <Form.Control
                disabled={true}
                id="input-Email"
                placeholder={EMAIL}
                type={"text"}  
                style={{
                    background: "rgb(181 185 184)"
                }}            
              />
            </div>
            <br />
            {AlertMessage}
          </Modal.Body>

          <Modal.Footer>
            {loading && <Spinner animation="border" variant="danger" />}

            {!loading && (
              <Button variant="success" onClick={handleSave}>
                Gửi
              </Button>
            )}

            <Button variant="primary" onClick={handleClose}>
              Thoát
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </HelmetProvider>
  );
};

const SendMail = async (server, token,  Email) => {
  try {
    let formData = new FormData()

    formData.append("email", Email)
   
    const res = await axios({
      url: server,
      method: 'POST',
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: formData
    });   

    return res.data;

  } catch (err)
  {
    console.log("Error at 'AddStaff' - Create Account: ", err);
    return {
      code: 500,
      data: {
        role: "null",
        email: "null",
      },
      message: "Không thể kết nối server hoặc server bị lỗi",
    };
  }
};

export default ConfirmSendEmail;
