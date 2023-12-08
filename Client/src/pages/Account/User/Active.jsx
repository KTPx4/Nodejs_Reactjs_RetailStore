import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useSelector } from "react-redux";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
const _URLServer = process.env.REACT_APP_SERVER || "http://localhost:3001";
var ServerActive = `${_URLServer}/api/account/active`;

const ActivePage = () => {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const token = searchParam.get("token");

  const [countdown, setCountdown] = useState(10);
  const [alertComponent, setAlert] = useState(<></>);

  const _Root_IMG = __dirname + "img/active";
  let textReload = <></>
  

  useEffect(() => {
    let url = ServerActive + `?token=${token}`;

    if (token) {
    
      VeryfiActive(url);
    }


    document.title = "Kích Hoạt";

    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/active.ico`;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    // console.log("1time");
    
    // console.log("ok");
    const timerId = setInterval(() => {
        if (countdown > 0) {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }
    }, 1000);
    if(countdown === 0) window.location.replace("/")
    return () => clearInterval(timerId);
    
    
}, [countdown]);


  const VeryfiActive = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        console.log(res);
        let code = res.data.code;     
    
        if (code === 200) 
        {
          let token = res.data.data.token
          localStorage.setItem(_Token_Auth, token)
          setAlert(success);
        } else {
          setAlert(falled);
        }
      })
      .catch((err) => 
      {
        console.log(err);
        return 400;
      });
  };

  textReload = <p>Trang chủ tự động tải sau <strong>{countdown}s</strong></p>

  const success = (
    <Alert show={true} variant="success" className="text-center">
      <Alert.Heading>Kích Hoạt Tài Khoản Thành Công</Alert.Heading>
      <p>
        Chào mừng bạn đến với hệ thống. Tài khoản của bạn đã có thể sử dụng.
        <br />
      </p>
  

      <hr />
      <Button href="/" variant="outline-dark">
        Trang Chủ
      </Button>
    </Alert>
  );

  const falled = (
    <Alert show={true} variant="danger" className="text-center">
      <Alert.Heading>Kích Hoạt Tài Khoản Thất Bại</Alert.Heading>
      <p>
        Mã xác thực của bạn không đúng hoặc đã hết hạn
        <br />
        Vui lòng liên hệ quản lí để nhận liên kết mới!
        <br />
      </p>
      

      <hr />
      <Button href="/" variant="light">
        Trang Chủ
      </Button>
    </Alert>
  );
  
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/css/active.css" />
      </Helmet>
      {alertComponent}
      {textReload}
    </HelmetProvider>
  );
};

export default ActivePage;
