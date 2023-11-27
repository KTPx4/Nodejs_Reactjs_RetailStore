import React from "react";
import { Link  } from "react-router-dom";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';

const HeaderNav =  () =>{

    const LogOut = () =>{
        if(localStorage.getItem(_Token_Auth))
        {
            localStorage.removeItem(_Token_Auth)
            window.location.href= '/account/login'
        }
    }
    return(
        <>
             <nav>
                <ul>
                    <li>
                        <Link to="/"><p>Home</p></Link>
                    </li>
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                    <li>
                       <button onClick={LogOut}>Đăng Xuất</button>
                    </li>
                </ul>
            </nav>           
        </>
       
    )
}

export default HeaderNav;