import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Alert, Modal, Button, Form, Image } from "react-bootstrap";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
const urlServer = process.env.REACT_APP_SERVER || "";
const urlSetStatus = urlServer + "/api/account/setstatus"


const SetStatus = ({ show, handleClose, EMAIL, STATUS }) => {
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");
  const [ClearForm, setClearForm]= useState(true)
  const [loading, setLoading] = useState(false);
  //let Reload = false;

  const tokenLogin = localStorage.getItem(_Token_Auth) || "";

  let AlertMessage = <></>;
    let content_title =<></>
  const ClearMess = () => {
    setError("");
    setSuccess('')
  };

  const handleSave = async () => {
    ClearMess(); 
   

    setLoading(true);
    setTimeout(async ()=>{
      try {
        console.log(urlSetStatus);
        const res = await PostStatus(urlSetStatus, tokenLogin,  EMAIL);
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
            window.location.reload()
            // handleClose()
          }, 2500)
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
  if(STATUS)
  {
    content_title = (
        <>
        <div className="text-center text">
                <h5>Bạn mở khóa tài khoản này?</h5>
                <div className="text-info">
                <p>Nhân viên sẽ có thể đăng nhập hệ thống!</p>
                {/* <p>Người dùng cũng có thể dùng nó như chức năng quên mật khẩu!</p> */}
                </div>
            </div>
        </>
    )
  }
  else
  {
    content_title = (
        <>
       <div className="text-center text">
                <h5>Bạn muốn khóa tài khoản này?</h5>
                <div className="text-warning">
                <p>Nhân viên sẽ không thể đăng nhập nửa!</p>
                {/* <p>Người dùng cũng có thể dùng nó như chức năng quên mật khẩu!</p> */}
                </div>
            </div>
        </>
    )
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
            <Modal.Title className="text-Tilte">Khóa Tài Khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {content_title}
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
              <Button variant={STATUS?"success" : "warning"} onClick={handleSave}>
                {STATUS? "Mở" : "Khóa"} 
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

const PostStatus = async (server, token,  Email) => {
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

export default SetStatus;
