import React from "react";
import { Navigate as Redirect } from "react-router-dom";

const _Root_IMG = __dirname + "img/register"
const _Token_Auth = 'token-auth'
class RegisterPage extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            redirectToLogin: false,
            redirectToHome: false
        };
        
      //  this.handleRegister = this.handleRegister.bind(this);

    }

    componentDidMount()
    {
        const token = localStorage.getItem(_Token_Auth);
        
        if (token ) 
        {
            this.setState({ redirectToHome: true });
        }

   
        document.title= "Đăng Ký";      

        // Change icon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = `${_Root_IMG}/register.ico`; 
        document.head.appendChild(link);
    }

    handleRegister = () =>
    { 
        // register action 

        //set redirect        
        this.setState({ redirectToLogin: true });
       
    }

    render() {

        if(this.state.redirectToHome) {
            return <Redirect to="/" />;
        }
        if(this.state.redirectToLogin)
        {
            return <Redirect to="/account/login" />;
        }
   
    
        return (
            <>
                <button onClick={this.handleRegister} className='btn btn-primary align-items-center'>
                    Đăng Ký Tài Khoản
                </button>
                    
            </>
            );
  


      
    }

}

export default RegisterPage;