import {Navigate} from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ErrorPage from "../pages/Error";
import ForbiddenPage from "../pages/Account/Forbidden";
  


  function ProtectedRoute({ children }) {
    const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';
    const _URLServer = process.env.REACT_APP_SERVER || "http://localhost:3001";
    const tokenLogin = localStorage.getItem(_Token_Auth) || "";
    var serverLogin = `${_URLServer}/api/account/login`;

    const [result, setResult] = useState(null);
  
    useEffect(() => {
  
      const fetchData = async () => {
        try 
        {
          // console.log(tokenLogin);
          // console.log(serverLogin);
          const res = await VerifyLogin(serverLogin, tokenLogin);
          let code = res.code;

          // console.log(res);
          if (code !== 200 && code !== 203 && code !== 500) 
          {
           
            if(localStorage.getItem(_Token_Auth))
            {
                localStorage.removeItem(_Token_Auth)
            }
            window.location.replace ('/account/login')
            // setResult(<Navigate to="/account/login" />);
          }
          else if (code === 500) 
          {
            setResult(< ErrorPage />);
          } 
          let role = res.data.role
          
          if(!role.includes("Admin"))
          {
            setResult(< ForbiddenPage />);
          }
          else{
            setResult(children)
          }
          
          
        } catch (error) {
          console.log("Error in ProtectedRoute:", error);
        }
      };
  
      fetchData();
    }, []);
  
    // if (result) 
    // {
    //   return result;
    // }
  
    return result;
  }

const VerifyLogin = async (serverLogin, tokenLogin) => {
try {
  
    const res = await axios.get(serverLogin, {
    headers: {
        authorization: `bearer ${tokenLogin}`,
        "Content-Type": "application/json",
    },
    });
  
    // console.log(res.data);
    return res.data;

} catch (err) {
    console.log("Error at 'Home' fetch verify token: ", err);
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
  
export default ProtectedRoute