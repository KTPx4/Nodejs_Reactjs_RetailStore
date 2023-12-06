

import React, { useState, useEffect } from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

import { useDispatch } from "react-redux";

const _Root_IMG = __dirname + "img/login";
const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';

const LoginPage = (props) => {
    const dispatch = useDispatch();

    const [redirectToHome, setRedirectToHome] = useState(false);
    const [redirectToRegister, setRedirectToRegister] = useState(false);
    const [error, setError] = useState('');
    
    const [urlServer, setUrlServer] = useState(process.env.REACT_APP_SERVER || 'http://localhost:3001');

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
        link.href = `${_Root_IMG}/login.ico`; 
        document.head.appendChild(link);
    }, []);


    const handleLogin = (event) => {
        event.preventDefault();

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
    
        axios({
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
            // console.log(res.data);

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
    };
    
    const handleRegister = (event) => {
        setRedirectToRegister(true);
    };

    const img_wave = `${_Root_IMG}/background-login.png`;
    const img_backgroundphone = `${_Root_IMG}/backgroundphone-login.png`;
    const img_icon_login = `${_Root_IMG}/icon-login.png`;

    let AlertMessage = <div></div>;
    if (error) {
        AlertMessage = (
            <Alert variant="danger" className="AlertMessage">
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
                <link rel="stylesheet" type="text/css" href="/css/login.css" />
            </Helmet>

            <img src={img_wave} alt="" className="wave" />
            <div className="container">
                <div className="img">
                    <img src={img_backgroundphone} alt="login" />
                </div>
                <div className="login-container">
                    <form className="form-login" onSubmit={handleLogin}>
                        <img className="avatar" src={img_icon_login} alt="login" />
                        <h2>ĐĂNG NHẬP</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user"> </i>
                            </div>
                            <div className="icon-form">
                                <input name='user' className="input" type="text" placeholder="Tên đăng nhập" />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"> </i>
                            </div>
                            <div className="div">
                                <input name='password' className="input" type="password" placeholder="Mật khẩu" />
                                <span className="show-btn"><i className="fas fa-eye"></i></span>
                            </div>
                        </div>
                        {AlertMessage}
                        {/* <a href="#">Quên mật khẩu?</a> */}
                        <div className="btn__service">
                            <input type="submit" className="btn" value="Đăng Nhập" />
                            {/* <input type="button" className="btn_register" value="Đăng Ký" onClick={handleRegister}></input> */}
                        </div>
                    </form>
                </div>
            </div>

            <script type="text/javascript" src="/js/login.js"></script>
        </HelmetProvider>
    );
};

export default LoginPage;
