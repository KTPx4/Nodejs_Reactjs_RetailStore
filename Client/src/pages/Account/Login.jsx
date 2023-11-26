import React from 'react';
import {Navigate as Redirect } from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';


const _Root_IMG = __dirname + "img/login";
const _Token_Auth = 'token-auth'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            redirectToHome: false,
            redirectToRegister: false
        };

     //   this.handleLogin = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem(_Token_Auth);
        
        if (token ) 
        {
            this.setState({ redirectToHome: true });
        }

        document.title= "Đăng Nhập";      

        // Change icon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = `${_Root_IMG}/login.ico`; 
        document.head.appendChild(link);

    }

    handleLogin = (event) => {
        //action for login


        // store local
        localStorage.setItem(_Token_Auth, 'yourAuthToken');
        this.setState({ redirectToHome: true });
    };
    
    handleRegister = () => 
    {
        this.setState({ redirectToRegister: true });
        
    };

    handleSubmit = (event)=>{
        event.preventDefault();

        if (event.nativeEvent.submitter.classList.contains('btn')) 
        {
            // Nếu nút nhấn là nút "Đăng Nhập"
           
            this.handleLogin(event);

            
        } 
        else if (event.nativeEvent.submitter.classList.contains('btn_register')) 
        {
            // Nếu nút nhấn là nút "Đăng Ký"
            this.handleRegister();
        }
    }

    render() {

        if (this.state.redirectToHome) {
            return <Redirect to="/home" />;
        }
        else if(this.state.redirectToRegister)
        {
            return <Redirect to='/account/register' />;
        }

        const img_wave = `${_Root_IMG}/background-login.png`
        const img_backgroundphone = `${_Root_IMG}/backgroundphone-login.png`
        const img_icon_login = `${_Root_IMG}/icon-login.png`
        
        return (
          <HelmetProvider>
                 <Helmet>
                    <link rel="stylesheet" type="text/css" href="/css/login.css" />
                </Helmet>

                <img src={img_wave}  alt="" class="wave" />
                <div class="container">
                    <div class="img">
                        <img src={img_backgroundphone} alt="login" />
                    </div>
                    <div class="login-container">
                        <form class="form-login" onSubmit={this.handleSubmit}>
                            <img class="avatar" src={img_icon_login} alt="login" />
                            <h2>ĐĂNG NHẬP</h2>
                            <div class="input-div one">
                                <div class="i">
                                    <i class="fas fa-user"> </i>
                                </div>
                                <div class="icon-form">
                                
                                    <input class="input" type="text" placeholder="Tên đăng nhập" />
                                </div>
                            </div>
                            <div class="input-div pass">
                                <div class="i">
                                    <i class="fas fa-lock"> </i>
                                </div>
                                <div class="div">
                                
                                    <input class="input" type="password" placeholder="Mật khẩu" />
                                    <span class="show-btn"><i class="fas fa-eye"></i></span>
                                </div>
                            </div>
                            <a href="#">Quên mật khẩu?</a>
                            <div class="btn__service">
                                <input type="submit" class="btn" value="Đăng Nhập" />
                                <input type="submit" class="btn_register" value="Đăng Ký" />
                            </div>
                        </form>
                    </div>
                </div>
                <script type="text/javascript" src="/js/login.js"></script>
          </HelmetProvider>
        );
    }
}

export default LoginPage;
