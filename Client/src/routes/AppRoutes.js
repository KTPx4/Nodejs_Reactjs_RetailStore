import {
  Routes,
  Route,
  
} from "react-router-dom";

import React, { useEffect } from "react";


import AdminRouter from "../routes/AdminRouter";
import UserRouter from "../routes/UserRouter";

import NotFound from "../pages/NotFound/NotFound";
import LayoutPage from "../components/Layout/LayoutPage";
import Home from "../pages/Home/Home";
import ProfilePage from "../pages/Account/User/Profile";
import AdminPage from "../pages/Account/Admin";
import LoginPage from "../pages/Account/User/Login";
import ErrorPage from "../pages/Error";
import ActivePage from "../pages/Account/User/Active";

import TestPage from "../pages/TestPage";

import { useVerifyLogin } from "../hook/HookLogin";

const AppRoutes = (props) => {
  useVerifyLogin() // xác thực token xem còn hạn/ hết hạn. đồng thời kiểm tra role

  useEffect(() => {

  }, []);
  
  return (
    <>
      <Routes>
        {/* <Route path="/error" element={<ErrorPage />} /> */}
        <Route path="/" element={<UserRouter><LayoutPage /></UserRouter>}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/error" element={<ErrorPage/>}/>
        <Route path="/TestPage" element={<LayoutPage />}>
          <Route index element={<TestPage/>}></Route>
        </Route>

        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/active" element={<ActivePage />} />
       
     
        <Route path="/account" element={<AdminRouter><LayoutPage /></AdminRouter>}>
          <Route index element={<AdminPage />} />   
          <Route path="admin" element={<AdminPage/>}/>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};



export default AppRoutes;
