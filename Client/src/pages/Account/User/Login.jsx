

import React, { useState, useEffect } from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from "react-redux";

const _Root_IMG = __dirname + "img";
const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';

const LoginPage = (props) => {
    const dispatch = useDispatch();

    const [redirectToHome, setRedirectToHome] = useState(false);
    const [redirectToRegister, setRedirectToRegister] = useState(false);
    const [error, setError] = useState('');
    const [Loading, setLoading] = useState(<></>)
    const [urlServer, setUrlServer] = useState(process.env.REACT_APP_SERVER || 'http://localhost:3001');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    }
    useEffect(() => 
    {
        const token = localStorage.getItem(_Token_Auth);
        
        if (token) {
            setRedirectToHome(true);
        }

        document.title = "Đăng Nhập";      

        // Change icon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = `${_Root_IMG}/logo.png`;
        document.head.appendChild(link);
    }, []);


    const handleLogin = (event) => {
        event.preventDefault();
        setError('')
        const user = event.target.elements.user.value;
        const password = event.target.elements.password.value;

        if (!user) {
            setError("Vui Lòng Nhập User");
            return;
        } else if (!password) {
            setError("Vui Lòng Nhập Password");
            return;
        }

        let formData = new FormData();
        formData.append("user", user);
        formData.append("password", password);

        let serverLogin = `${urlServer}/api/account/login`;
        setLoading(<Spinner animation="border" variant="info" id='wait_loading'/>)
        setTimeout(async()=>{
            await axios({
                url: serverLogin,
                method: 'POST',
                headers: {
                    authorization: '', // token auth login,
                    "Content-Type": 'application/json'
                },
                data: formData
            })
            .then((res) => {

                let code = res.data.code;
                let message = res.data.message;
              
                setLoading(<></>)
                if (code === 400) 
                {
                    setError(message);
                } 
                else if(code === 500)
                {
                    setError("Không Thể Kết Nối Đến Server");
                }
                else if (code === 203 || code === 200) {
                    console.log("ok");
                    let token = res.data.data.token;
                    let role = res.data.data.role;
                    setError('');
                    //console.log("Success Login, ", token);
    
                    localStorage.setItem(_Token_Auth, token);
                
    
                    if(role.includes("Admin"))
                    {
                        dispatch({ type: "IS_ADMIN", payload: true });
                    }
    
                    if (code === 203)  // Lần đầu Đăng Nhập
                    {
                        dispatch({ type: "IS_CHANGE_PASS", payload: true });
                    }
                    else if(200)
                    {
                        
                    }
    
                    setRedirectToHome(true);
                }
            })
            .catch((err) => {
                console.log("Error at login fetch: ", err);
            });
        }, 1500)
    };
    
    const handleRegister = (event) => {
        setRedirectToRegister(true);
    };
    const clearError = () =>{
        setError('');
    }

    const img_wave = `${_Root_IMG}/background-login.png`;
    const img_backgroundphone = `${_Root_IMG}/backgroundphone-login.png`;
    const img_icon_login = `${_Root_IMG}/icon-login.png`;
    
 
    let AlertMessage = <div></div>;
    
    if (error) {
        AlertMessage = (
            <Alert variant="danger" className="AlertMessage " style={{width: "100%"}}>
                <p className="mb-0">
                    {error}
                </p>
            </Alert>
        );
    }

    if (redirectToHome) {
      //  console.log("Page login: ", isChangePass);
        return <Redirect to='/'     />;
    }

    return (
      <HelmetProvider>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/css/account/login.css" />
        </Helmet>
        <div className="container">
          <div className="screen">
            <div className="screen__content">
              
                
              <form className="login" onSubmit={handleLogin}>
                <div className="text-center sniping"  >
                    {Loading}
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    name='user'
                    type="text"
                    className="login__input"
                    placeholder="User name / Email"
                    onFocus={clearError}
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    name='password'
                    type={showPassword ? "text" : "password"}
                    className="login__input"
                    placeholder="Password"
                    onFocus={clearError}
                />
                <i onClick={toggleShowPassword} className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </div>

                {AlertMessage}
                        
                <button className="button login__submit">
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>             
            </div>
            <div className="screen__background">
              {/* <span className="screen__background__shape screen__background__shape4"></span> */}
              {/* <span className="screen__background__shape screen__background__shape3"></span> */}
              {/* <span className="screen__background__shape screen__background__shape2"></span> */}
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>

        <script type="text/javascript" src="/js/login.js"></script>
      </HelmetProvider>
    );
};

export default LoginPage;
