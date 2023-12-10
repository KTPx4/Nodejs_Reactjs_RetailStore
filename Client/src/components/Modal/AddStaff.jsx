import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Alert, Modal, Button, Form, Image } from "react-bootstrap";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
const urlServer = process.env.REACT_APP_SERVER || "http://localhost:3001";
const urlCreate = urlServer + "/api/account/register"

const AddStaffModal = ({ show, handleClose }) => {
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
   
    let email = document.getElementById("input-Email").value;
    let fullName = document.getElementById("input-fullName").value;
    if (!fullName) {
      setError("Vui Lòng Nhập Họ và Tên");
      return;
    }
    if (!email) {
      setError("Vui Lòng Nhập Email");
      return;
    }

    setLoading(true);
    setTimeout(async ()=>{
      try {
        console.log(urlCreate);
        const res = await CreateAccount(urlCreate, tokenLogin, fullName, email);
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
            <Modal.Title className="text-Tilte">Tạo Tài Khoản Mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Vui lòng nhập đầy đủ Họ và Tên và Email
            <br />
            <div className="input-fullName input-modal">
              <Form.Control
                id="input-fullName"
                placeholder="Họ Và Tên"
                type={"text"}
                onChange={() => {}}
                onFocus={ClearMess}
              />
            </div>
            <div className="input-Email input-modal">
              <Form.Control
                id="input-Email"
                placeholder="Email"
                type={"text"}
                onChange={() => {}}
                onFocus={ClearMess}
              />
            </div>
            <br />
            {AlertMessage}
          </Modal.Body>
          <Modal.Footer>
            {loading && <Spinner animation="border" variant="danger" />}

            {!loading && (
              <Button variant="success" onClick={handleSave}>
                Tạo
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

const CreateAccount = async (server, token, fullName, Email) => {
  try {
    let formData = new FormData()
    formData.append("fullName", fullName)
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

export default AddStaffModal;
