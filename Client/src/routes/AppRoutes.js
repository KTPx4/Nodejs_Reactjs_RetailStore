import { Routes, Route, Navigate, Link, Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import NotFound from '../pages/NotFound/NotFound';
import LayoutPage from "../components/Layout/LayoutPage";
import Home from "../pages/Home/Home"
import ProfilePage from "../pages/Account/Profile"
import AdminPage from "../pages/Account/Admin";
import LoginPage from "../pages/Account/Login";
import RegisterPage from "../pages/Account/RegisterAccount";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';
const _URLServer = process.env.REACT_APP_SERVER || 'http://localhost:3001'

const AppRoutes  = (props) =>{

    const tokenLogin = localStorage.getItem(_Token_Auth) || ''
    var serverLogin = `${_URLServer}/api/account/login`;
    const dispatch = useDispatch(); 

    useEffect(() => {
      const fetchData = async () => {
       
        try {

          const res = await axios.get(serverLogin, {
            headers: {
              authorization: `bearer ${tokenLogin}`,
              'Content-Type': 'application/json',
            },
          });
          console.log(res.data);
          const code = res.data.code;
          if (code === 200) 
          {
                        
          } 
          else if (code === 203) 
          {
            handleChange()
          }
          else 
          {
          
          }
          } catch (err) {
            console.log("Error at 'Home' fetch verify token: ", err);
          }
      };
  
       fetchData();
    }, []);

    function handleChange() {
      dispatch({ type: "IS_CHANGE_PASS", payload: true });
    }
    // console.log( "isChangePass at router: ", isChangePass);
    return (
        <>
           
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<Home  />} />
                    <Route path="home" element={<Home />} />
                </Route>          

                {/* <Route path="/account" element={<LayoutPage />} > */}
                <Route path="/account/login" element={ <LoginPage/> }/>
                <Route path="/account/register" element={ <RegisterPage/> }/>
                <Route path="/account" element={<ProtectedRoute><LayoutPage /></ProtectedRoute>} >
                    <Route index element={ < ProfilePage />} />                        
                    <Route path="employee" element={ <AdminPage/> } />
                    <Route path="admin" element={ <AdminPage/> } />
                    
                </Route>    
               
                <Route path="*"  element={ <NotFound />  } />
            </Routes>

        </>
    )
}

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem(_Token_Auth) || ''

    if (!isLoggedIn) {
        return <Navigate to="/account/login" />;
    }

    return children;
}

export default AppRoutes;