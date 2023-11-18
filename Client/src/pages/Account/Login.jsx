import React from 'react';
import {Navigate as Redirect } from 'react-router-dom';

const _Root_IMG = __dirname + "img/login";
const _Token_Auth = 'token-auth'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToHome: false,
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem(_Token_Auth);
        
        if (token) 
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

    handleLogin() {
        //action for login


        // store local
        localStorage.setItem(_Token_Auth, 'yourAuthToken');
        this.setState({ redirectToHome: true });
    }

    render() {

        if (this.state.redirectToHome) {
            return <Redirect to="/home" />;
        }

        return (
          <>
                <button onClick={this.handleLogin} className='btn btn-primary align-items-center'>
                    Đăng nhập
                </button>

                
                <a href="/account/register">Đăng Ký Ngay</a>
                
          </>
        );
    }
}

export default LoginPage;
